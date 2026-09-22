<?php
/**
 * Tools & Tech Stack Manager
 */
require_once __DIR__ . '/includes/header.php';

$tools = $db->query("SELECT * FROM tools ORDER BY sort_order ASC, id ASC")->fetchAll();
?>

<!-- Header Actions -->
<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
    <div>
        <h2 style="font-size: 1.3rem; color: #fff;">Neural Tech Stack & AI Models</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Manage tools displayed in hero glowing chips and Tech Stack section</p>
    </div>

    <button onclick="openModal('toolFormModal')" class="btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        <span>Add New Tool</span>
    </button>
</div>

<!-- Tools Grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px;">
    <?php foreach ($tools as $tool): ?>
        <div class="glass-card" id="tool-card-<?= $tool['id'] ?>" style="padding: 22px; position: relative; overflow: hidden;">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="font-size: 2rem;"><?= htmlspecialchars($tool['icon']) ?></div>
                    <div>
                        <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 2px;"><?= htmlspecialchars($tool['name']) ?></h4>
                        <span class="badge badge-violet" style="font-size: 0.65rem; padding: 2px 6px;">
                            <?= htmlspecialchars($tool['version']) ?>
                        </span>
                    </div>
                </div>

                <div style="display: flex; gap: 6px;">
                    <button onclick="editTool(<?= htmlspecialchars(json_encode($tool)) ?>)" class="btn-icon" style="width:30px; height:30px;" title="Edit Tool">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </button>
                    <button onclick="deleteTool(<?= $tool['id'] ?>, '<?= htmlspecialchars(addslashes($tool['name'])) ?>')" class="btn-icon" style="width:30px; height:30px; color:#fb7185;" title="Delete Tool">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                </div>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                <?= htmlspecialchars($tool['description']) ?>
            </p>

            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 12px; font-size: 0.75rem; color: var(--text-muted);">
                <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="led-indicator <?= htmlspecialchars($tool['status']) ?>"></span>
                    <span style="text-transform: uppercase; font-weight: 700;">Status: <?= htmlspecialchars($tool['status']) ?></span>
                </div>
                <span>Sort Order: #<?= $tool['sort_order'] ?></span>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<!-- Add / Edit Tool Modal -->
<div id="toolFormModal" class="modal-overlay">
    <div class="modal-dialog glass-card">
        <div class="modal-header">
            <h3 id="toolModalTitle" style="color: #fff; font-size: 1.15rem;">Add New AI Tool</h3>
            <button onclick="closeModal('toolFormModal')" class="btn-icon">✕</button>
        </div>
        
        <form onsubmit="handleToolSubmit(event)">
            <div class="modal-body">
                <input type="hidden" id="toolId" value="">

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="toolName">Tool / Model Name *</label>
                        <input type="text" id="toolName" class="form-input" placeholder="e.g. Veo 3.1" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="toolVersion">Version Tag</label>
                        <input type="text" id="toolVersion" class="form-input" placeholder="e.g. V3.1-PRO">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="toolIcon">Emoji / Icon *</label>
                        <input type="text" id="toolIcon" class="form-input" placeholder="🎬 or ⚡ or 🎨" required value="⚡">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="toolStatus">LED Status Indicator</label>
                        <select id="toolStatus" class="form-select">
                            <option value="led-green">🟢 led-green (Online)</option>
                            <option value="led-cyan">🔵 led-cyan (Active)</option>
                            <option value="led-violet">🟣 led-violet (High-HD)</option>
                            <option value="led-red">🔴 led-red (Busy)</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="toolDescription">Capability Description *</label>
                    <textarea id="toolDescription" class="form-textarea" rows="3" placeholder="Short description of what this model powers" required></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="toolSort">Sort Order</label>
                        <input type="number" id="toolSort" class="form-input" value="1">
                    </div>

                    <div class="form-group" style="display:flex; align-items:center; padding-top:28px;">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem; color: #fff;">
                            <input type="checkbox" id="toolActive" checked style="accent-color: var(--accent-cyan); width:16px; height:16px;">
                            <span>Active / Visible</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" onclick="closeModal('toolFormModal')" class="btn-secondary">Cancel</button>
                <button type="submit" class="btn-primary">
                    <span>Save Tool</span>
                </button>
            </div>
        </form>
    </div>
</div>

<script>
function editTool(tool) {
    document.getElementById('toolModalTitle').textContent = 'Edit Tool: ' + tool.name;
    document.getElementById('toolId').value = tool.id;
    document.getElementById('toolName').value = tool.name;
    document.getElementById('toolVersion').value = tool.version;
    document.getElementById('toolIcon').value = tool.icon;
    document.getElementById('toolStatus').value = tool.status;
    document.getElementById('toolDescription').value = tool.description;
    document.getElementById('toolSort').value = tool.sort_order;
    document.getElementById('toolActive').checked = tool.is_active == 1;

    openModal('toolFormModal');
}

async function handleToolSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('toolId').value;
    const isEdit = Boolean(id);

    const payload = {
        id: id ? parseInt(id) : undefined,
        name: document.getElementById('toolName').value,
        version: document.getElementById('toolVersion').value,
        icon: document.getElementById('toolIcon').value,
        status: document.getElementById('toolStatus').value,
        description: document.getElementById('toolDescription').value,
        sort_order: parseInt(document.getElementById('toolSort').value),
        is_active: document.getElementById('toolActive').checked ? 1 : 0
    };

    try {
        const res = await fetch(`${API_BASE}/tools.php${isEdit ? '?id=' + id : ''}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            showToast(isEdit ? 'Tool updated!' : 'Tool added!', 'success');
            setTimeout(() => location.reload(), 700);
        } else {
            showToast(data.message || 'Operation failed', 'error');
        }
    } catch (err) {
        showToast('Network error while saving tool', 'error');
    }
}

async function deleteTool(id, name) {
    if (!confirm(`Are you sure you want to remove "${name}" from your tech stack?`)) return;

    try {
        const res = await fetch(`${API_BASE}/tools.php?id=${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Tool deleted', 'success');
            const card = document.getElementById(`tool-card-${id}`);
            if (card) card.remove();
        } else {
            showToast(data.message || 'Delete failed', 'error');
        }
    } catch (err) {
        showToast('Network error while deleting', 'error');
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
