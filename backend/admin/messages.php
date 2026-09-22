<?php
/**
 * Contact Form Inquiries Manager
 */
require_once __DIR__ . '/includes/header.php';

// Filter by Status
$filterStatus = $_GET['status'] ?? '';
$sql = "SELECT * FROM messages";
$params = [];

if ($filterStatus) {
    $sql .= " WHERE status = :status";
    $params['status'] = $filterStatus;
}

$sql .= " ORDER BY created_at DESC";
$stmt = $db->prepare($sql);
$stmt->execute($params);
$messages = $stmt->fetchAll();

// Get counts
$allCount = (int)$db->query("SELECT COUNT(*) FROM messages")->fetchColumn();
$newCount = (int)$db->query("SELECT COUNT(*) FROM messages WHERE status = 'new'")->fetchColumn();
$readCount = (int)$db->query("SELECT COUNT(*) FROM messages WHERE status = 'read'")->fetchColumn();
$repliedCount = (int)$db->query("SELECT COUNT(*) FROM messages WHERE status = 'replied'")->fetchColumn();
?>

<!-- Header Status Filter Bar -->
<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
    <!-- Status Tabs -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <a href="messages.php" class="btn-secondary" style="<?= empty($filterStatus) ? 'background:rgba(139,92,246,0.2); border-color:var(--accent-violet);' : '' ?>">
            <span>All Inquiries (<?= $allCount ?>)</span>
        </a>
        <a href="messages.php?status=new" class="btn-secondary" style="<?= $filterStatus === 'new' ? 'background:rgba(244,63,94,0.2); border-color:rgba(244,63,94,0.5);' : '' ?>">
            <span style="color:#fb7185;">● New (<?= $newCount ?>)</span>
        </a>
        <a href="messages.php?status=read" class="btn-secondary" style="<?= $filterStatus === 'read' ? 'background:rgba(6,182,212,0.2); border-color:var(--accent-cyan);' : '' ?>">
            <span>Read (<?= $readCount ?>)</span>
        </a>
        <a href="messages.php?status=replied" class="btn-secondary" style="<?= $filterStatus === 'replied' ? 'background:rgba(34,197,94,0.2); border-color:rgba(34,197,94,0.5);' : '' ?>">
            <span style="color:#86efac;">Replied (<?= $repliedCount ?>)</span>
        </a>
    </div>

    <!-- Search -->
    <input 
        type="text" 
        id="messagesSearch" 
        placeholder="Search sender, email, or message..." 
        class="form-input" 
        style="width: 260px; padding: 8px 14px; font-size: 0.85rem;"
        oninput="filterMessagesTable()"
    >
</div>

<!-- Messages Table Card -->
<div class="glass-card" style="padding: 24px;">
    <div class="table-container">
        <table class="admin-table" id="messagesTable">
            <thead>
                <tr>
                    <th>Date / Time</th>
                    <th>Sender Name</th>
                    <th>Contact Info</th>
                    <th>Subject & Snippet</th>
                    <th>Status</th>
                    <th style="text-align: right; width: 140px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($messages)): ?>
                    <tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">No inquiries found in this view.</td></tr>
                <?php else: ?>
                    <?php foreach ($messages as $msg): ?>
                        <tr id="msg-row-<?= $msg['id'] ?>">
                            <td style="font-size: 0.78rem; color: var(--text-muted); white-space: nowrap;">
                                <?= date('M d, Y', strtotime($msg['created_at'])) ?><br>
                                <span style="font-size:0.7rem; font-family:monospace;"><?= date('H:i:s', strtotime($msg['created_at'])) ?></span>
                            </td>
                            <td>
                                <strong style="color: #fff; font-size: 0.9rem;"><?= htmlspecialchars($msg['name']) ?></strong>
                            </td>
                            <td>
                                <div style="font-size: 0.82rem; color: var(--accent-cyan);">
                                    <a href="mailto:<?= htmlspecialchars($msg['email']) ?>" style="color: inherit; text-decoration: none;">
                                        <?= htmlspecialchars($msg['email']) ?>
                                    </a>
                                </div>
                                <?php if (!empty($msg['phone'])): ?>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">
                                        <?= htmlspecialchars($msg['phone']) ?>
                                    </div>
                                <?php endif; ?>
                            </td>
                            <td style="max-width: 320px;">
                                <div style="font-weight: 600; color: #fff; font-size: 0.85rem; margin-bottom: 2px;">
                                    <?= htmlspecialchars($msg['subject'] ?: 'Portfolio Inquiry') ?>
                                </div>
                                <div style="font-size: 0.75rem; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                                    <?= htmlspecialchars($msg['message']) ?>
                                </div>
                            </td>
                            <td>
                                <select 
                                    onchange="updateMessageStatus(<?= $msg['id'] ?>, this.value)" 
                                    class="form-select" 
                                    style="padding: 4px 8px; font-size: 0.75rem; width: auto; background: rgba(0,0,0,0.5);"
                                >
                                    <option value="new" <?= $msg['status'] === 'new' ? 'selected' : '' ?>>🔴 New</option>
                                    <option value="read" <?= $msg['status'] === 'read' ? 'selected' : '' ?>>🔵 Read</option>
                                    <option value="replied" <?= $msg['status'] === 'replied' ? 'selected' : '' ?>>🟢 Replied</option>
                                    <option value="archived" <?= $msg['status'] === 'archived' ? 'selected' : '' ?>>⚪ Archived</option>
                                </select>
                            </td>
                            <td style="text-align: right;">
                                <div style="display: inline-flex; gap: 8px;">
                                    <button onclick="viewMessage(<?= htmlspecialchars(json_encode($msg)) ?>)" class="btn-icon" title="View Full Message">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                    </button>
                                    <a href="mailto:<?= htmlspecialchars($msg['email']) ?>?subject=Re: <?= urlencode($msg['subject']) ?>" class="btn-icon" style="color:var(--accent-cyan);" title="Reply via Email">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                                    </a>
                                    <button onclick="deleteMessage(<?= $msg['id'] ?>)" class="btn-icon" style="color:#fb7185;" title="Delete Message">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<!-- View Message Modal -->
<div id="viewMessageModal" class="modal-overlay">
    <div class="modal-dialog glass-card" style="max-width: 600px;">
        <div class="modal-header">
            <h3 id="msgModalSubject" style="color: #fff; font-size: 1.1rem;">Inquiry Details</h3>
            <button onclick="closeModal('viewMessageModal')" class="btn-icon">✕</button>
        </div>
        <div class="modal-body" style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--border-subtle); padding-bottom:14px;">
                <div>
                    <h4 id="msgModalSender" style="color:#fff; font-size:1.1rem; margin-bottom:4px;">Sender Name</h4>
                    <div style="font-size:0.85rem; color:var(--accent-cyan);" id="msgModalEmail">sender@email.com</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);" id="msgModalPhone">+91-0000000000</div>
                </div>
                <div style="text-align:right; font-size:0.75rem; color:var(--text-muted);" id="msgModalTime">
                    Date
                </div>
            </div>

            <div>
                <label class="form-label" style="text-transform:uppercase; font-size:0.7rem;">Message Content</label>
                <div id="msgModalBody" style="background: rgba(0,0,0,0.5); padding: 16px; border-radius: 10px; border: 1px solid var(--border-subtle); font-size: 0.9rem; line-height: 1.6; color: #fff; white-space: pre-wrap;">
                </div>
            </div>

            <div style="font-size:0.72rem; color:var(--text-muted); font-family:monospace;" id="msgModalMeta">
                IP: 127.0.0.1
            </div>
        </div>
        <div class="modal-footer">
            <a id="msgModalReplyLink" href="#" class="btn-primary" style="margin-right:auto;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>Direct Email Reply</span>
            </a>
            <button onclick="closeModal('viewMessageModal')" class="btn-secondary">Close</button>
        </div>
    </div>
</div>

<script>
function filterMessagesTable() {
    const query = document.getElementById('messagesSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#messagesTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

function viewMessage(msg) {
    document.getElementById('msgModalSubject').textContent = msg.subject || 'Portfolio Inquiry';
    document.getElementById('msgModalSender').textContent = msg.name;
    document.getElementById('msgModalEmail').textContent = msg.email;
    document.getElementById('msgModalPhone').textContent = msg.phone ? 'Phone: ' + msg.phone : 'No phone provided';
    document.getElementById('msgModalTime').textContent = new Date(msg.created_at).toLocaleString();
    document.getElementById('msgModalBody').textContent = msg.message;
    document.getElementById('msgModalMeta').textContent = `Client IP: ${msg.ip_address || 'Unknown'} | Origin: portfolio.harshaicreations.com`;
    document.getElementById('msgModalReplyLink').href = `mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Inquiry')}`;

    openModal('viewMessageModal');

    // Auto mark as read if new
    if (msg.status === 'new') {
        updateMessageStatus(msg.id, 'read');
    }
}

async function updateMessageStatus(id, newStatus) {
    try {
        const res = await fetch(`${API_BASE}/contact.php?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Message status updated', 'success');
        }
    } catch (err) {
        showToast('Failed to update status', 'error');
    }
}

async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
        const res = await fetch(`${API_BASE}/contact.php?id=${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Message deleted', 'success');
            const row = document.getElementById(`msg-row-${id}`);
            if (row) row.remove();
        } else {
            showToast(data.message || 'Delete failed', 'error');
        }
    } catch (err) {
        showToast('Network error while deleting', 'error');
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
