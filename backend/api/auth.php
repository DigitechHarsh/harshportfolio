<?php
/**
 * Authentication API Endpoint
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $action = $_GET['action'] ?? 'login';

        if ($action === 'login') {
            $input = getJsonInput();
            $username = trim($input['username'] ?? '');
            $password = trim($input['password'] ?? '');

            if (empty($username) || empty($password)) {
                jsonResponse(false, 'Username/Email and Password are required.', null, 422);
            }

            $result = Auth::login($username, $password);
            if ($result['success']) {
                jsonResponse(true, $result['message'], [
                    'user'  => $result['user'],
                    'token' => $result['token']
                ]);
            } else {
                jsonResponse(false, $result['message'], null, 401);
            }
        } elseif ($action === 'logout') {
            Auth::logout();
            jsonResponse(true, 'Logged out successfully');
        } elseif ($action === 'change_password') {
            Auth::requireApiAuth();
            $input = getJsonInput();
            $currentPassword = $input['current_password'] ?? '';
            $newPassword = $input['new_password'] ?? '';

            if (empty($currentPassword) || empty($newPassword) || strlen($newPassword) < 6) {
                jsonResponse(false, 'New password must be at least 6 characters long.', null, 422);
            }

            $user = Auth::user();
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT password_hash FROM admin_users WHERE id = :id");
            $stmt->execute(['id' => $user['id']]);
            $currentHash = $stmt->fetch()['password_hash'] ?? '';

            if (!password_verify($currentPassword, $currentHash)) {
                jsonResponse(false, 'Current password is incorrect.', null, 400);
            }

            $newHash = password_hash($newPassword, PASSWORD_BCRYPT);
            $updateStmt = $db->prepare("UPDATE admin_users SET password_hash = :hash WHERE id = :id");
            $updateStmt->execute(['hash' => $newHash, 'id' => $user['id']]);

            jsonResponse(true, 'Password changed successfully.');
        } else {
            jsonResponse(false, 'Invalid action', null, 400);
        }
        break;

    case 'GET':
        // Check session or token validity
        if (Auth::check()) {
            $user = Auth::user();
            jsonResponse(true, 'Authenticated', ['user' => $user]);
        } else {
            jsonResponse(false, 'Unauthenticated', null, 401);
        }
        break;

    default:
        jsonResponse(false, 'Method not allowed', null, 405);
}
