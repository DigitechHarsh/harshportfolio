<?php
/**
 * Admin Topbar & Header Include
 */
require_once __DIR__ . '/../../config/auth.php';
Auth::requireAuth();

$currentUser = Auth::user();
$db = Database::getConnection();

// Get unread inquiries count
$unreadMessagesCount = (int)$db->query("SELECT COUNT(*) FROM messages WHERE status = 'new'")->fetchColumn();

// Get active page name for header title
$currentPage = basename($_SERVER['PHP_SELF'], '.php');
$pageTitles = [
    'index'    => 'Dashboard & Telemetry',
    'projects' => 'Video Projects Manager',
    'messages' => 'Contact Inquiries',
    'tools'    => 'Tech Stack & Neural Tools',
    'settings' => 'Studio & System Settings'
];
$title = $pageTitles[$currentPage] ?? 'Control Terminal';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?> | AI Creations Admin</title>
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="assets/css/admin.css">
</head>
<body>
    <div class="bg-mesh"></div>

    <div class="admin-wrapper">
        <?php include __DIR__ . '/sidebar.php'; ?>

        <div class="main-content">
            <!-- Topbar Header -->
            <header class="topbar">
                <div class="topbar-left">
                    <button id="mobileMenuToggle" class="btn-icon" style="display:none;" aria-label="Toggle Navigation">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                    <h1 class="page-title"><?= htmlspecialchars($title) ?></h1>
                </div>

                <div class="topbar-right">
                    <!-- Live Clock -->
                    <div class="telemetry-tag">
                        <span class="led-indicator led-green"></span>
                        <span>SYS.UTC: <strong id="liveClock" style="color:#fff;">00:00:00</strong></span>
                    </div>

                    <!-- Target Host Tag -->
                    <div class="telemetry-tag" style="border-color: rgba(6, 182, 212, 0.3);">
                        <span class="led-indicator led-cyan"></span>
                        <span>HOST: <strong>portfolio.harshaicreations.com</strong></span>
                    </div>

                    <!-- Live Portfolio Website Link -->
                    <a href="/" target="_blank" class="btn-secondary" style="padding: 7px 14px; font-size: 0.8rem;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                        <span>View Live Site</span>
                    </a>
                </div>
            </header>

            <main class="content-body">
