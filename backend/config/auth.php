<?php
/**
 * Authentication and Session Management
 */

if (session_status() === PHP_SESSION_NONE) {
    // Set secure cookie parameters
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    
    // If HTTPS is active
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', '1');
    }
    
    session_start();
}

require_once __DIR__ . '/database.php';

class Auth {
    /**
     * Authenticate admin user by username/email and password
     */
    public static function login(string $identifier, string $password): array {
        $db = Database::getConnection();
        
        $stmt = $db->prepare("SELECT * FROM admin_users WHERE (username = :id OR email = :id) AND is_active = 1 LIMIT 1");
        $stmt->execute(['id' => $identifier]);
        $user = $stmt->fetch();

        if (!$user) {
            return ['success' => false, 'message' => 'Invalid username or email address.'];
        }

        if (!password_verify($password, $user['password_hash'])) {
            return ['success' => false, 'message' => 'Incorrect password.'];
        }

        // Update last login timestamp
        $updateStmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = :id");
        $updateStmt->execute(['id' => $user['id']]);

        // Generate session & token
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_username'] = $user['username'];
        $_SESSION['admin_display_name'] = $user['display_name'];
        $_SESSION['admin_role'] = $user['role'];
        $_SESSION['admin_logged_in'] = true;

        $token = self::generateToken($user['id']);

        return [
            'success' => true,
            'message' => 'Login successful.',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'display_name' => $user['display_name'],
                'email' => $user['email'],
                'avatar_url' => $user['avatar_url'],
                'role' => $user['role']
            ],
            'token' => $token
        ];
    }

    /**
     * Check if user is authenticated (supports both Session and Bearer Token)
     */
    public static function check(): bool {
        if (!empty($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
            return true;
        }

        // Check Bearer Token header
        $headers = self::getRequestHeaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            return self::validateToken($token);
        }

        return false;
    }

    /**
     * Get current authenticated user details
     */
    public static function user(): ?array {
        if (!self::check()) {
            return null;
        }

        $userId = $_SESSION['admin_id'] ?? null;
        if (!$userId) return null;

        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT id, username, email, display_name, avatar_url, role, last_login FROM admin_users WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        return $stmt->fetch() ?: null;
    }

    /**
     * Require authentication for web pages (Redirects to login if unauthenticated)
     */
    public static function requireAuth(string $loginUrl = 'login.php'): void {
        if (!self::check()) {
            header("Location: $loginUrl");
            exit;
        }
    }

    /**
     * Require authentication for API endpoints (Returns 401 JSON)
     */
    public static function requireApiAuth(): void {
        if (!self::check()) {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Unauthorized: Valid admin authentication required.'
            ]);
            exit;
        }
    }

    /**
     * Log out current admin
     */
    public static function logout(): void {
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
    }

    private static function generateToken(int $userId): string {
        $payload = base64_encode(json_encode([
            'uid' => $userId,
            'exp' => time() + (86400 * 30) // 30 days
        ]));
        $signature = hash_hmac('sha256', $payload, 'harsh_ai_secret_key_2026');
        return $payload . '.' . $signature;
    }

    private static function validateToken(string $token): bool {
        $parts = explode('.', $token);
        if (count($parts) !== 2) return false;

        [$payload, $signature] = $parts;
        $expectedSignature = hash_hmac('sha256', $payload, 'harsh_ai_secret_key_2026');

        if (!hash_equals($expectedSignature, $signature)) {
            return false;
        }

        $data = json_decode(base64_decode($payload), true);
        if (!$data || ($data['exp'] ?? 0) < time()) {
            return false;
        }

        $_SESSION['admin_id'] = $data['uid'];
        $_SESSION['admin_logged_in'] = true;
        return true;
    }

    private static function getRequestHeaders(): array {
        if (function_exists('apache_request_headers')) {
            return apache_request_headers();
        }
        $headers = [];
        foreach ($_SERVER as $key => $value) {
            if (str_starts_with($key, 'HTTP_')) {
                $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
                $headers[$header] = $value;
            }
        }
        return $headers;
    }
}
