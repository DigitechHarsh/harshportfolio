<?php
/**
 * Site Settings REST API Endpoint
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'GET':
        $stmt = $db->query("SELECT setting_key, setting_value, setting_group, description FROM site_settings");
        $rows = $stmt->fetchAll();

        $settings = [];
        foreach ($rows as $row) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }

        jsonResponse(true, 'Settings retrieved successfully', [
            'key_value' => $settings,
            'raw'       => $rows
        ]);
        break;

    case 'POST':
    case 'PUT':
        Auth::requireApiAuth();
        $input = getJsonInput();

        if (empty($input['settings']) || !is_array($input['settings'])) {
            jsonResponse(false, 'Settings payload must contain an associative array of key-value pairs.', null, 422);
        }

        $stmt = $db->prepare("INSERT INTO site_settings (setting_key, setting_value) 
                              VALUES (:key, :val) 
                              ON DUPLICATE KEY UPDATE setting_value = :val2");

        foreach ($input['settings'] as $key => $val) {
            $stmt->execute([
                'key'  => $key,
                'val'  => (string)$val,
                'val2' => (string)$val
            ]);
        }

        jsonResponse(true, 'Site settings updated successfully');
        break;

    default:
        jsonResponse(false, 'Method not allowed', null, 405);
}
