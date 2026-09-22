<?php
/**
 * Cloudinary Storage Handler
 * Enables high-speed CDN video and image hosting for portfolio.harshaicreations.com
 */

require_once __DIR__ . '/database.php';

class CloudinaryService {
    private static ?string $cloudName = null;
    private static ?string $apiKey = null;
    private static ?string $apiSecret = null;
    private static ?string $uploadPreset = null;

    /**
     * Load credentials from site_settings table or environment
     */
    public static function init(): void {
        if (self::$cloudName !== null) return;

        // Try environment variables or hardcoded defaults
        self::$cloudName = getenv('CLOUDINARY_CLOUD_NAME') ?: 'la4ig9t3';
        self::$apiKey = getenv('CLOUDINARY_API_KEY') ?: '427994134557492';
        self::$apiSecret = getenv('CLOUDINARY_API_SECRET') ?: '_3vxKU6--GfaMPJqs-zuc9gB9lY';
        self::$uploadPreset = getenv('CLOUDINARY_UPLOAD_PRESET') ?: '';

        // If not in env, load from database site_settings
        try {
            $db = Database::getConnection();
            $stmt = $db->query("SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN ('cloudinary_cloud_name', 'cloudinary_api_key', 'cloudinary_api_secret', 'cloudinary_upload_preset')");
            $rows = $stmt->fetchAll();
            foreach ($rows as $r) {
                if ($r['setting_key'] === 'cloudinary_cloud_name' && empty(self::$cloudName)) self::$cloudName = $r['setting_value'];
                if ($r['setting_key'] === 'cloudinary_api_key' && empty(self::$apiKey)) self::$apiKey = $r['setting_value'];
                if ($r['setting_key'] === 'cloudinary_api_secret' && empty(self::$apiSecret)) self::$apiSecret = $r['setting_value'];
                if ($r['setting_key'] === 'cloudinary_upload_preset' && empty(self::$uploadPreset)) self::$uploadPreset = $r['setting_value'];
            }
        } catch (Exception $e) {
            // Silently fallback
        }
    }

    public static function isConfigured(): bool {
        self::init();
        return !empty(self::$cloudName) && (!empty(self::$apiSecret) || !empty(self::$uploadPreset));
    }

    public static function getCloudName(): string {
        self::init();
        return self::$cloudName ?? '';
    }

    public static function getUploadPreset(): string {
        self::init();
        return self::$uploadPreset ?? '';
    }

    /**
     * Upload a video or image file to Cloudinary via cURL API
     */
    public static function upload(string $filePath, string $resourceType = 'auto', string $folder = 'harsh_portfolio'): array {
        self::init();

        if (!self::isConfigured()) {
            return ['success' => false, 'message' => 'Cloudinary credentials are not configured.'];
        }

        $cloudName = self::$cloudName;
        $url = "https://api.cloudinary.com/v1_1/{$cloudName}/{$resourceType}/upload";

        $postData = [
            'file' => new CURLFile($filePath),
            'folder' => $folder
        ];

        // Signed Upload (Preferred)
        if (!empty(self::$apiKey) && !empty(self::$apiSecret)) {
            $timestamp = time();
            $postData['timestamp'] = $timestamp;
            $postData['api_key'] = self::$apiKey;

            // Generate SHA signature: sorted params string + api_secret
            $paramsToSign = "folder={$folder}&timestamp={$timestamp}" . self::$apiSecret;
            $postData['signature'] = sha1($paramsToSign);
        } elseif (!empty(self::$uploadPreset)) {
            // Unsigned Upload Preset fallback
            $postData['upload_preset'] = self::$uploadPreset;
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 300); // 5 min timeout for large videos

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            return ['success' => false, 'message' => 'cURL Error: ' . $error];
        }

        $data = json_decode($response, true);

        if ($httpCode >= 200 && $httpCode < 300 && !empty($data['secure_url'])) {
            return [
                'success'       => true,
                'url'           => $data['secure_url'],
                'public_id'     => $data['public_id'] ?? '',
                'duration'      => $data['duration'] ?? 0,
                'format'        => $data['format'] ?? '',
                'bytes'         => $data['bytes'] ?? 0,
                'resource_type' => $data['resource_type'] ?? 'video'
            ];
        }

        $errorMsg = $data['error']['message'] ?? 'Cloudinary upload failed with HTTP ' . $httpCode;
        return ['success' => false, 'message' => $errorMsg];
    }
}
