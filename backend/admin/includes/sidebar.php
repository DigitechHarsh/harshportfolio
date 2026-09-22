<?php
/**
 * Admin Sidebar Navigation Include
 */
$currentPage = basename($_SERVER['PHP_SELF'], '.php');
?>
<aside class="sidebar">
    <!-- Brand / Logo -->
    <div class="sidebar-header">
        <div class="sidebar-logo">
            <img src="/logo.png" alt="Logo" onerror="this.src='/harsh2.jpeg'">
        </div>
        <div>
            <div class="sidebar-title">
                <span class="gradient-text">AI Creations</span>
            </div>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                Control Terminal
            </div>
        </div>
    </div>

    <!-- Navigation Links -->
    <nav class="sidebar-nav">
        <div class="nav-section-title">Telemetry & Overview</div>
        
        <a href="index.php" class="nav-link <?= $currentPage === 'index' ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Dashboard</span>
        </a>

        <div class="nav-section-title">Content & Media</div>

        <a href="projects.php" class="nav-link <?= $currentPage === 'projects' && empty($_GET['cat']) ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            <span>All Video Projects</span>
        </a>

        <a href="projects.php?cat=ai-ads" class="nav-link <?= $currentPage === 'projects' && ($_GET['cat'] ?? '') === 'ai-ads' ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>AI Video Ads</span>
        </a>

        <a href="projects.php?cat=ai-teasers" class="nav-link <?= $currentPage === 'projects' && ($_GET['cat'] ?? '') === 'ai-teasers' ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>AI Teasers</span>
        </a>

        <a href="tools.php" class="nav-link <?= $currentPage === 'tools' ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <span>Tech Stack Tools</span>
        </a>

        <div class="nav-section-title">Communication</div>

        <a href="messages.php" class="nav-link <?= $currentPage === 'messages' ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>Inquiries / Inbox</span>
            <?php if (!empty($unreadMessagesCount) && $unreadMessagesCount > 0): ?>
                <span class="nav-badge"><?= $unreadMessagesCount ?></span>
            <?php endif; ?>
        </a>

        <div class="nav-section-title">System Configuration</div>

        <a href="settings.php" class="nav-link <?= $currentPage === 'settings' ? 'active' : '' ?>">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            <span>Site & Telemetry Settings</span>
        </a>
    </nav>

    <!-- Sidebar Footer / Current Admin Info -->
    <div class="sidebar-footer">
        <div class="user-profile">
            <img src="<?= htmlspecialchars($currentUser['avatar_url'] ?? '/harsh2.jpeg') ?>" alt="Admin Avatar" class="user-avatar" onerror="this.src='/harsh2.jpeg'">
            <div style="min-width: 0;">
                <div style="font-size: 0.82rem; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    <?= htmlspecialchars($currentUser['display_name'] ?? 'Admin') ?>
                </div>
                <div style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 600;">
                    Superadmin
                </div>
            </div>
        </div>

        <a href="logout.php" class="btn-icon" title="Logout from Terminal" style="color: #fb7185;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </a>
    </div>
</aside>
