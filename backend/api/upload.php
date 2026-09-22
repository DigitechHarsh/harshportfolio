<?php
/**
 * Universal File Upload Handler
 * Supports Cloudinary CDN (Video & Images) with Automatic Local Server Fallback
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/auth.php';
require_once __DIR__ . '/../config/cloudinary.php';

handleCors();
Auth::requireApiAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Only POST method is allowed for uploads', null, 405);
}

if (empty($_FILES['file'])) {
    jsonResponse(false, 'No file was uploaded.', null, 400);
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    $errors = [
        UPLOAD_ERR_INI_SIZE   => 'The uploaded file exceeds the server upload_max_filesize limit.',
        UPLOAD_ERR_FORM_SIZE  => 'The uploaded file exceeds the MAX_FILE_SIZE limit.',
        UPLOAD_ERR_PARTIAL    => 'The file was only partially uploaded.',
        UPLOAD_ERR_NO_FILE    => 'No file was uploaded.',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder on server.',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
        UPLOAD_ERR_EXTENSION  => 'A PHP extension stopped the file upload.'
    ];
    $msg = $errors[$file['error']] ?? 'Unknown upload error.';
    jsonResponse(false, $msg, null, 400);
}

$allowedVideoExts = ['mp4', 'webm', 'mov', 'm4v', 'avi', 'mkv'];
$allowedImageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

$originalName = pathinfo($file['name'], PATHINFO_FILENAME);
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

$isVideo = in_array($extension, $allowedVideoExts, true);
$isImage = in_array($extension, $allowedImageExts, true);

if (!$isVideo && !$isImage) {
    jsonResponse(false, 'Invalid format. Supported: MP4, WebM, MOV, JPG, PNG, WebP.', null, 422);
}

$resourceType = $isVideo ? 'video' : 'image';

// 1. If Cloudinary is configured, upload to Cloudinary CDN
if (CloudinaryService::isConfigured()) {
    $cResult = CloudinaryService::upload($file['tmp_name'], $resourceType, 'harsh_ai_portfolio');
    if ($cResult['success']) {
        jsonResponse(true, 'File uploaded to Cloudinary CDN successfully!', [
            'storage'       => 'cloudinary',
            'url'           => $cResult['url'],
            'public_id'     => $cResult['public_id'],
            'file_size'     => $cResult['bytes'] ?? $file['size'],
            'duration'      => $cResult['duration'] ?? 0,
            'file_type'     => $resourceType,
            'original_name' => $file['name']
        ], 201);
    }
}

// 2. Local Storage Fallback (if Cloudinary is not configured or fails)
$subDir = $isVideo ? 'videos' : 'thumbnails';
$uploadBaseDir = dirname(__DIR__) . '/uploads/' . $subDir;

if (!is_dir($uploadBaseDir)) {
    mkdir($uploadBaseDir, 0755, true);
}

$cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalName);
$uniqueFilename = substr($cleanName, 0, 30) . '_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
$destinationPath = $uploadBaseDir . '/' . $uniqueFilename;

if (!move_uploaded_file($file['tmp_name'], $destinationPath)) {
    jsonResponse(false, 'Failed to save uploaded file to local server.', null, 500);
}

$publicUrl = '/uploads/' . $subDir . '/' . $uniqueFilename;

jsonResponse(true, 'File uploaded to server storage successfully', [
    'storage'       => 'local',
    'url'           => $publicUrl,
    'file_name'     => $uniqueFilename,
    'original_name' => $file['name'],
    'file_size'     => $file['size'],
    'file_type'     => $resourceType,
    'extension'     => $extension
], 201);
