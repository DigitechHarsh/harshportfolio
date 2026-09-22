<?php
/**
 * Dashboard Analytics & Stats REST API Endpoint
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();
Auth::requireApiAuth();

$db = Database::getConnection();

// 1. Projects Count
$totalProjects = (int)$db->query("SELECT COUNT(*) FROM projects")->fetchColumn();
$activeProjects = (int)$db->query("SELECT COUNT(*) FROM projects WHERE is_active = 1")->fetchColumn();
$featuredProjects = (int)$db->query("SELECT COUNT(*) FROM projects WHERE is_featured = 1")->fetchColumn();

// 2. Count by Category
$categoryStatsStmt = $db->query("SELECT c.name, c.slug, c.accent_color, COUNT(p.id) AS count 
                                  FROM categories c 
                                  LEFT JOIN projects p ON c.id = p.category_id 
                                  GROUP BY c.id");
$categoryStats = $categoryStatsStmt->fetchAll();

// 3. Messages Summary
$totalMessages = (int)$db->query("SELECT COUNT(*) FROM messages")->fetchColumn();
$newMessages = (int)$db->query("SELECT COUNT(*) FROM messages WHERE status = 'new'")->fetchColumn();

// 4. Tools Count
$totalTools = (int)$db->query("SELECT COUNT(*) FROM tools WHERE is_active = 1")->fetchColumn();

// 5. Recent Inquiries
$recentMessagesStmt = $db->query("SELECT id, name, email, subject, status, created_at FROM messages ORDER BY created_at DESC LIMIT 5");
$recentMessages = $recentMessagesStmt->fetchAll();

// 6. Recent Projects
$recentProjectsStmt = $db->query("SELECT p.id, p.title, p.video_src, p.is_active, p.created_at, c.name AS category_name 
                                  FROM projects p 
                                  JOIN categories c ON p.category_id = c.id 
                                  ORDER BY p.id DESC LIMIT 5");
$recentProjects = $recentProjectsStmt->fetchAll();

jsonResponse(true, 'Telemetry & stats retrieved', [
    'summary' => [
        'total_projects'    => $totalProjects,
        'active_projects'   => $activeProjects,
        'featured_projects' => $featuredProjects,
        'total_messages'    => $totalMessages,
        'new_messages'      => $newMessages,
        'total_tools'       => $totalTools
    ],
    'categories'      => $categoryStats,
    'recent_messages' => $recentMessages,
    'recent_projects' => $recentProjects,
    'system_info'     => [
        'php_version' => PHP_VERSION,
        'server_time' => date('Y-m-d H:i:s'),
        'os'          => PHP_OS
    ]
]);
