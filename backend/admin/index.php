<?php
/**
 * Admin Dashboard & Telemetry Overview
 */
require_once __DIR__ . '/includes/header.php';

// Fetch statistics
$totalProjects = (int)$db->query("SELECT COUNT(*) FROM projects")->fetchColumn();
$aiAdsCount = (int)$db->query("SELECT COUNT(*) FROM projects WHERE category_id = 1")->fetchColumn();
$aiTeasersCount = (int)$db->query("SELECT COUNT(*) FROM projects WHERE category_id = 2")->fetchColumn();
$totalInquiries = (int)$db->query("SELECT COUNT(*) FROM messages")->fetchColumn();
$unreadInquiries = (int)$db->query("SELECT COUNT(*) FROM messages WHERE status = 'new'")->fetchColumn();
$activeToolsCount = (int)$db->query("SELECT COUNT(*) FROM tools WHERE is_active = 1")->fetchColumn();

// Fetch System Status Setting
$sysStatusStmt = $db->query("SELECT setting_value FROM site_settings WHERE setting_key = 'system_status'");
$sysStatus = $sysStatusStmt->fetch()['setting_value'] ?? 'Available';

// Recent Projects
$recentProjects = $db->query("SELECT p.*, c.name AS category_name, c.accent_color 
                              FROM projects p 
                              JOIN categories c ON p.category_id = c.id 
                              ORDER BY p.id DESC LIMIT 6")->fetchAll();

// Recent Messages
$recentMessages = $db->query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 5")->fetchAll();
?>

<!-- Telemetry Stat Grid -->
<div class="stat-grid">
    <div class="glass-card stat-card">
        <div class="stat-header">
            <span class="stat-title">Total Projects</span>
            <div class="stat-icon" style="color:var(--accent-violet);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </div>
        </div>
        <div class="stat-value gradient-text"><?= $totalProjects ?></div>
        <div class="stat-subtext"><?= $aiAdsCount ?> Ads &bull; <?= $aiTeasersCount ?> Teasers</div>
    </div>

    <div class="glass-card stat-card">
        <div class="stat-header">
            <span class="stat-title">AI Video Ads</span>
            <div class="stat-icon" style="color:var(--accent-violet);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
        </div>
        <div class="stat-value" style="color:#c4b5fd;"><?= $aiAdsCount ?></div>
        <div class="stat-subtext">Commercial Advertisements</div>
    </div>

    <div class="glass-card stat-card">
        <div class="stat-header">
            <span class="stat-title">AI Teasers</span>
            <div class="stat-icon" style="color:var(--accent-cyan);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
        </div>
        <div class="stat-value" style="color:#67e8f9;"><?= $aiTeasersCount ?></div>
        <div class="stat-subtext">Cinematic Short Films</div>
    </div>

    <div class="glass-card stat-card">
        <div class="stat-header">
            <span class="stat-title">Inquiries / Leads</span>
            <div class="stat-icon" style="color:#fb7185;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
        </div>
        <div class="stat-value" style="color:<?= $unreadInquiries > 0 ? '#fb7185' : '#fff' ?>;"><?= $totalInquiries ?></div>
        <div class="stat-subtext"><strong style="color:#fb7185;"><?= $unreadInquiries ?></strong> new unread messages</div>
    </div>
</div>

<!-- Quick Action Strip -->
<div class="glass-card" style="padding: 18px 24px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
    <div style="display:flex; align-items:center; gap:12px;">
        <span class="led-indicator led-green"></span>
        <span style="font-size: 0.9rem; color: var(--text-secondary);">System Status: <strong style="color: #fff;"><?= htmlspecialchars($sysStatus) ?></strong></span>
    </div>

    <div style="display:flex; gap:10px;">
        <a href="projects.php?action=new" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            <span>Add New Project</span>
        </a>
        <a href="messages.php" class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/></svg>
            <span>View Inbox</span>
        </a>
        <a href="settings.php" class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            <span>Telemetry Config</span>
        </a>
    </div>
</div>

<!-- Main Two-Column Layout -->
<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
    <!-- Left: Recent Projects -->
    <div class="glass-card" style="padding: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <div>
                <h3 style="font-size: 1.15rem; color: #fff;">Recent Video Projects</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Latest uploaded commercials and cinematic teasers</p>
            </div>
            <a href="projects.php" class="btn-secondary" style="font-size: 0.78rem; padding: 6px 12px;">View All (<?= $totalProjects ?>)</a>
        </div>

        <div class="table-container">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th style="text-align: right;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($recentProjects)): ?>
                        <tr><td colspan="4" style="text-align:center; padding: 30px; color: var(--text-muted);">No projects found.</td></tr>
                    <?php else: ?>
                        <?php foreach ($recentProjects as $proj): ?>
                            <tr>
                                <td>
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <button onclick="previewVideo('<?= htmlspecialchars($proj['video_src']) ?>', '<?= htmlspecialchars(addslashes($proj['title'])) ?>')" class="btn-icon" style="width:32px; height:32px; color:var(--accent-cyan);" title="Play Video">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                        </button>
                                        <div>
                                            <strong style="color:#fff; font-size:0.9rem;"><?= htmlspecialchars($proj['title']) ?></strong>
                                            <div style="font-size:0.75rem; color:var(--text-muted); font-family:monospace; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                                <?= htmlspecialchars($proj['video_src']) ?>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-<?= $proj['accent_color'] ?? 'violet' ?>">
                                        <?= htmlspecialchars($proj['category_name']) ?>
                                    </span>
                                </td>
                                <td>
                                    <span class="badge <?= $proj['is_active'] ? 'badge-green' : 'badge-rose' ?>">
                                        <?= $proj['is_active'] ? 'Active' : 'Hidden' ?>
                                    </span>
                                </td>
                                <td style="text-align: right;">
                                    <a href="projects.php?edit=<?= $proj['id'] ?>" class="btn-icon" title="Edit Project">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Right: Recent Inquiries & System Feed -->
    <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Recent Inquiries -->
        <div class="glass-card" style="padding: 24px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                <h3 style="font-size: 1.1rem; color: #fff;">Recent Inquiries</h3>
                <a href="messages.php" style="font-size: 0.78rem; color: var(--accent-cyan); text-decoration: none;">Inbox &rarr;</a>
            </div>

            <?php if (empty($recentMessages)): ?>
                <div style="text-align:center; padding: 24px 0; color: var(--text-muted); font-size: 0.85rem;">
                    No messages received yet.
                </div>
            <?php else: ?>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <?php foreach ($recentMessages as $msg): ?>
                        <div style="padding: 12px 14px; background: rgba(0,0,0,0.3); border-radius: 10px; border: 1px solid var(--border-subtle);">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
                                <strong style="color: #fff; font-size: 0.85rem;"><?= htmlspecialchars($msg['name']) ?></strong>
                                <span class="badge <?= $msg['status'] === 'new' ? 'badge-rose' : 'badge-green' ?>" style="font-size:0.65rem; padding: 2px 6px;">
                                    <?= ucfirst($msg['status']) ?>
                                </span>
                            </div>
                            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                <?= htmlspecialchars($msg['subject']) ?>
                            </div>
                            <div style="font-size: 0.7rem; color: var(--text-muted); display:flex; justify-content:space-between;">
                                <span><?= htmlspecialchars($msg['email']) ?></span>
                                <span><?= date('M d, H:i', strtotime($msg['created_at'])) ?></span>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <!-- Server & Subdomain Info Card -->
        <div class="glass-card" style="padding: 22px;">
            <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 14px; display:flex; align-items:center; gap:8px;">
                <span class="led-indicator led-cyan"></span>
                <span>Hostinger Deployment Status</span>
            </h4>
            <div style="font-size: 0.8rem; color: var(--text-secondary); display:flex; flex-direction:column; gap:8px;">
                <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
                    <span>Target Domain:</span>
                    <strong style="color:#fff;">portfolio.harshaicreations.com</strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
                    <span>PHP Runtime:</span>
                    <strong style="color:var(--accent-cyan);"><?= PHP_VERSION ?></strong>
                </div>
                <div style="display:flex; justify-content:space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">
                    <span>Upload Directory:</span>
                    <strong style="color:#4ade80;">/uploads/videos/</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span>Database:</span>
                    <strong style="color:#a78bfa;"><?= htmlspecialchars(DB_NAME) ?></strong>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
