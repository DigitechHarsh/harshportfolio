<?php
/**
 * CORS & Response Utility
 * Handles Cross-Origin Resource Sharing for Next.js frontend & mobile apps
 */

function handleCors() {
    $allowedOrigins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://portfolio.harshaicreations.com',
        'https://harshaicreations.com',
        'http://portfolio.harshaicreations.com'
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // Fallback for public API access
        header("Access-Control-Allow-Origin: *");
    }

    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Auth-Token");
    header("Access-Control-Max-Age: 86400"); // 24 hours cache

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }

    header('Content-Type: application/json; charset=utf-8');
}

function jsonResponse(bool $success, string $message, $data = null, int $statusCode = 200): void {
    http_response_code($statusCode);
    echo json_encode([
        'success'   => $success,
        'message'   => $message,
        'data'      => $data,
        'timestamp' => time()
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function getJsonInput(): array {
    $input = file_get_contents('php://input');
    $decoded = json_decode($input, true);
    return is_array($decoded) ? $decoded : [];
}
