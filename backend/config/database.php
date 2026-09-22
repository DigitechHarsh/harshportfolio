<?php
/**
 * Database Connection Handler (PDO)
 * Compatible with Localhost (XAMPP/WAMP/Laragon) & Hostinger Cloud/Shared Hosting
 * Target Host: portfolio.harshaicreations.com
 */

// Hostinger / Production or Localhost Credentials
// You can also set these via server environment variables in Hostinger hPanel
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'u315909654_portfolio');
define('DB_USER', getenv('DB_USER') ?: 'u315909654_aibyharshport');
define('DB_PASS', getenv('DB_PASS') ?: 'Hpp_200311');

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];

            try {
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, $options);
            } catch (PDOException $e) {
                // Return clean JSON error if requested via API
                if (str_contains($_SERVER['REQUEST_URI'] ?? '', '/api/')) {
                    header('Content-Type: application/json; charset=utf-8');
                    http_response_code(500);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Database connection failed. Please check Hostinger database configuration in config/database.php.',
                        'error'   => $e->getMessage()
                    ]);
                    exit;
                }
                
                die("<div style='font-family:system-ui;background:#0f0f13;color:#fff;padding:2rem;border-radius:12px;margin:2rem auto;max-width:600px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 30px rgba(0,0,0,0.5);'>
                    <h2 style='color:#ef4444;margin-top:0;'>⚠️ Database Connection Error</h2>
                    <p style='color:rgba(255,255,255,0.7);'>Could not connect to MySQL database <code>" . htmlspecialchars(DB_NAME) . "</code> on <code>" . htmlspecialchars(DB_HOST) . "</code>.</p>
                    <p style='font-size:0.9rem;background:rgba(0,0,0,0.4);padding:1rem;border-radius:8px;color:#f87171;'><strong>Error:</strong> " . htmlspecialchars($e->getMessage()) . "</p>
                    <p style='font-size:0.85rem;color:rgba(255,255,255,0.5);'>Please verify your database credentials in <code>backend/config/database.php</code> or import <code>backend/database.sql</code> via phpMyAdmin.</p>
                </div>");
            }
        }

        return self::$instance;
    }
}
