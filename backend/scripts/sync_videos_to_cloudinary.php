<?php
/**
 * Bulk Video Sync to Cloudinary Script
 * Usage via CLI: php sync_videos_to_cloudinary.php
 * Usage via Web: https://portfolio.harshaicreations.com/scripts/sync_videos_to_cloudinary.php (Protected)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/cloudinary.php';
require_once __DIR__ . '/../config/auth.php';

// If running in browser, require admin authentication
if (php_sapi_name() !== 'cli') {
    Auth::requireAuth('../admin/login.php');
}

echo "=========================================================\n";
echo "⚡ AI Creations - Bulk Cloudinary Video Sync Tool\n";
echo "Cloud Name: " . CloudinaryService::getCloudName() . "\n";
echo "=========================================================\n\n";

if (!CloudinaryService::isConfigured()) {
    die("❌ Cloudinary is not configured! Please check backend/config/cloudinary.php\n");
}

$db = Database::getConnection();
$stmt = $db->query("SELECT id, title, video_src FROM projects");
$projects = $stmt->fetchAll();

$rootDir = dirname(__DIR__, 2); // Portfolio root

$successCount = 0;
$skippedCount = 0;
$failedCount = 0;

foreach ($projects as $proj) {
    $src = $proj['video_src'];
    echo "Processing [ID {$proj['id']}]: {$proj['title']}...\n";

    // Skip if already a Cloudinary URL or external URL
    if (str_starts_with($src, 'http://') || str_starts_with($src, 'https://')) {
        echo "  ↳ ⏩ Skipped: Already an online URL ({$src})\n\n";
        $skippedCount++;
        continue;
    }

    // Resolve local file path
    // e.g. /videos/ads/TataSierra_AD_Complete.mp4 -> public/videos/ads/...
    $cleanRelPath = ltrim($src, '/\\');
    $localFile = $rootDir . '/public/' . $cleanRelPath;

    if (!file_exists($localFile)) {
        // Try direct root relative
        $localFile = $rootDir . '/' . $cleanRelPath;
    }

    if (!file_exists($localFile)) {
        echo "  ↳ ⚠️ Warning: Local file not found at: {$localFile}\n\n";
        $failedCount++;
        continue;
    }

    echo "  ↳ 📤 Uploading (" . round(filesize($localFile) / 1024 / 1024, 2) . " MB) to Cloudinary CDN...";
    
    $result = CloudinaryService::upload($localFile, 'video', 'harsh_ai_portfolio');

    if ($result['success']) {
        $cUrl = $result['url'];
        echo " ✓ Done!\n";
        echo "  ↳ Cloud URL: {$cUrl}\n";

        // Update database with Cloudinary URL
        $updateStmt = $db->prepare("UPDATE projects SET video_src = :c_url WHERE id = :id");
        $updateStmt->execute(['c_url' => $cUrl, 'id' => $proj['id']]);
        $successCount++;
    } else {
        echo " ❌ Failed: " . ($result['message'] ?? 'Unknown error') . "\n";
        $failedCount++;
    }

    echo "\n";
}

echo "=========================================================\n";
echo "📊 Sync Summary:\n";
echo "✓ Successfully Uploaded & Updated: {$successCount}\n";
echo "⏩ Skipped (Already Online): {$skippedCount}\n";
echo "❌ Failed / Not Found: {$failedCount}\n";
echo "=========================================================\n";
