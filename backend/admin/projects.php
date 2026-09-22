<?php
/**
 * Projects Manager (CRUD)
 */
require_once __DIR__ . '/includes/header.php';

// Fetch Categories for filters & dropdowns
$categories = $db->query("SELECT * FROM categories ORDER BY sort_order ASC")->fetchAll();

// Category Filter
$filterCategorySlug = $_GET['cat'] ?? '';
$filterCategoryId = null;

if ($filterCategorySlug) {
    foreach ($categories as $c) {
        if ($c['slug'] === $filterCategorySlug) {
            $filterCategoryId = $c['id'];
            break;
        }
    }
}

// Fetch Projects
$sql = "SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.accent_color 
        FROM projects p 
        JOIN categories c ON p.category_id = c.id";
$params = [];

if ($filterCategoryId) {
    $sql .= " WHERE p.category_id = :cat_id";
    $params['cat_id'] = $filterCategoryId;
}

$sql .= " ORDER BY p.sort_order ASC, p.id DESC";
$stmt = $db->prepare($sql);
$stmt->execute($params);
$projects = $stmt->fetchAll();

// Edit Project Mode
$editProject = null;
if (isset($_GET['edit'])) {
    $editId = (int)$_GET['edit'];
    $editStmt = $db->prepare("SELECT * FROM projects WHERE id = :id");
    $editStmt->execute(['id' => $editId]);
    $editProject = $editStmt->fetch();
}
?>

<!-- Header Actions & Search Bar -->
<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
    <!-- Category Tabs -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <a href="projects.php" class="btn-secondary <?= empty($filterCategorySlug) ? 'active' : '' ?>" style="<?= empty($filterCategorySlug) ? 'background:rgba(139,92,246,0.2); border-color:var(--accent-violet);' : '' ?>">
            <span>All Projects (<?= count($projects) ?>)</span>
        </a>
        <?php foreach ($categories as $cat): ?>
            <a href="projects.php?cat=<?= urlencode($cat['slug']) ?>" class="btn-secondary" style="<?= $filterCategorySlug === $cat['slug'] ? 'background:rgba(6,182,212,0.2); border-color:var(--accent-cyan);' : '' ?>">
                <span><?= htmlspecialchars($cat['name']) ?></span>
            </a>
        <?php endforeach; ?>
    </div>

    <!-- Right: Search & Add Button -->
    <div style="display: flex; gap: 12px; align-items: center;">
        <input 
            type="text" 
            id="projectSearch" 
            placeholder="Search projects..." 
            class="form-input" 
            style="width: 220px; padding: 8px 14px; font-size: 0.85rem;"
            oninput="filterProjectsTable()"
        >
        
        <button onclick="openModal('projectFormModal')" class="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            <span>Add New Video</span>
        </button>
    </div>
</div>

<!-- Projects Table Card -->
<div class="glass-card" style="padding: 24px;">
    <div class="table-container">
        <table class="admin-table" id="projectsTable">
            <thead>
                <tr>
                    <th style="width: 50px;">Sort</th>
                    <th>Project & Preview</th>
                    <th>Category</th>
                    <th>Tools Used</th>
                    <th>Status</th>
                    <th style="text-align: right; width: 140px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($projects)): ?>
                    <tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-muted);">No video projects found in this category.</td></tr>
                <?php else: ?>
                    <?php foreach ($projects as $proj): ?>
                        <tr id="proj-row-<?= $proj['id'] ?>">
                            <td style="color: var(--text-muted); font-weight: 700; font-family: monospace;">
                                #<?= $proj['sort_order'] ?>
                            </td>
                            <td>
                                <div style="display:flex; align-items:center; gap:14px;">
                                    <!-- Play Viewfinder Button -->
                                    <button 
                                        onclick="previewVideo('<?= htmlspecialchars($proj['video_src']) ?>', '<?= htmlspecialchars(addslashes($proj['title'])) ?>')" 
                                        class="btn-icon" 
                                        style="width:38px; height:38px; border-radius:10px; color:var(--accent-cyan); background:rgba(6,182,212,0.1); border-color:rgba(6,182,212,0.25);" 
                                        title="Play Video Stream"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                    </button>
                                    
                                    <div>
                                        <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">
                                            <?= htmlspecialchars($proj['title']) ?>
                                            <?php if ($proj['is_featured']): ?>
                                                <span class="badge badge-amber" style="font-size:0.65rem; margin-left:6px;">Featured</span>
                                            <?php endif; ?>
                                        </div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top:2px;">
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
                                <span style="font-size: 0.8rem; color: var(--text-secondary);">
                                    <?= htmlspecialchars($proj['tools_used'] ?: 'Veo 3.1') ?>
                                </span>
                            </td>
                            <td>
                                <button 
                                    onclick="toggleProjectStatus(<?= $proj['id'] ?>)" 
                                    id="status-btn-<?= $proj['id'] ?>"
                                    class="badge <?= $proj['is_active'] ? 'badge-green' : 'badge-rose' ?>" 
                                    style="cursor: pointer; border: none;"
                                    title="Click to toggle status"
                                >
                                    <?= $proj['is_active'] ? '● Active' : '○ Hidden' ?>
                                </button>
                            </td>
                            <td style="text-align: right;">
                                <div style="display: inline-flex; gap: 8px;">
                                    <button onclick="editProject(<?= htmlspecialchars(json_encode($proj)) ?>)" class="btn-icon" title="Edit Details">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                    </button>
                                    <button onclick="deleteProject(<?= $proj['id'] ?>, '<?= htmlspecialchars(addslashes($proj['title'])) ?>')" class="btn-icon" style="color:#fb7185;" title="Delete Project">
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

<!-- Add / Edit Project Modal -->
<div id="projectFormModal" class="modal-overlay <?= $editProject ? 'active' : '' ?>">
    <div class="modal-dialog glass-card">
        <div class="modal-header">
            <h3 id="modalHeading" style="color: #fff; font-size: 1.15rem;">
                <?= $editProject ? 'Edit Video Project' : 'Add New Video Project' ?>
            </h3>
            <button onclick="closeModal('projectFormModal')" class="btn-icon">✕</button>
        </div>
        
        <form id="projectForm" onsubmit="handleProjectSubmit(event)">
            <div class="modal-body">
                <input type="hidden" id="projectId" value="<?= $editProject['id'] ?? '' ?>">

                <!-- Title & Category Row -->
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="projectTitle">Project Title *</label>
                        <input type="text" id="projectTitle" class="form-input" placeholder="e.g. Tata Sierra Commercial" required value="<?= htmlspecialchars($editProject['title'] ?? '') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="projectCategory">Category *</label>
                        <select id="projectCategory" class="form-select" required>
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?= $cat['id'] ?>" <?= ($editProject['category_id'] ?? '') == $cat['id'] ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($cat['name']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <!-- Video Source (Direct Path / URL or File Upload) -->
                <div class="form-group">
                    <label class="form-label" for="projectVideoSrc">Video Source File / URL *</label>
                    <div style="display:flex; gap:8px;">
                        <input 
                            type="text" 
                            id="projectVideoSrc" 
                            class="form-input" 
                            placeholder="/videos/ads/TataSierra_AD_Complete.mp4 or https://..." 
                            required 
                            value="<?= htmlspecialchars($editProject['video_src'] ?? '') ?>"
                        >
                        <button type="button" class="btn-secondary" onclick="document.getElementById('videoFileInput').click()" style="white-space:nowrap;">
                            <span>📁 Upload MP4</span>
                        </button>
                    </div>
                    <input type="file" id="videoFileInput" accept="video/mp4,video/webm,video/mov" style="display:none;" onchange="handleVideoUpload(this)">
                    <p style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
                        Tip: You can enter an existing path like <code>/videos/ads/...</code> or click Upload to upload an MP4 directly to Hostinger server.
                    </p>
                </div>

                <!-- Tools & Aspect Ratio Row -->
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="projectTools">AI Tools Used</label>
                        <input type="text" id="projectTools" class="form-input" placeholder="e.g. Veo 3.1, Seedance 2.0" value="<?= htmlspecialchars($editProject['tools_used'] ?? 'Veo 3.1, Seedance 2.0') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="projectSort">Sort Order</label>
                        <input type="number" id="projectSort" class="form-input" value="<?= $editProject['sort_order'] ?? 1 ?>">
                    </div>
                </div>

                <!-- Description -->
                <div class="form-group">
                    <label class="form-label" for="projectDescription">Project Description / Notes</label>
                    <textarea id="projectDescription" class="form-textarea" rows="3" placeholder="Optional background story or technical notes"><?= htmlspecialchars($editProject['description'] ?? '') ?></textarea>
                </div>

                <!-- Toggles -->
                <div style="display: flex; gap: 20px; align-items: center; padding-top: 6px;">
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem; color: #fff;">
                        <input type="checkbox" id="projectFeatured" <?= !empty($editProject['is_featured']) ? 'checked' : '' ?> style="accent-color: var(--accent-violet); width:16px; height:16px;">
                        <span>Featured Project</span>
                    </label>

                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem; color: #fff;">
                        <input type="checkbox" id="projectActive" <?= ($editProject['is_active'] ?? 1) ? 'checked' : '' ?> style="accent-color: var(--accent-cyan); width:16px; height:16px;">
                        <span>Active (Publicly Visible)</span>
                    </label>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" onclick="closeModal('projectFormModal')" class="btn-secondary">Cancel</button>
                <button type="submit" id="saveProjectBtn" class="btn-primary">
                    <span>Save Project</span>
                </button>
            </div>
        </form>
    </div>
</div>

<script>
// Instant Search Filter for table
function filterProjectsTable() {
    const query = document.getElementById('projectSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#projectsTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

// Upload Video File via AJAX
async function handleVideoUpload(input) {
    if (!input.files[0]) return;
    const btn = document.getElementById('saveProjectBtn');
    btn.disabled = true;
    showToast('Uploading video file to server...', 'success');

    const url = await uploadFile(input, 'video');
    btn.disabled = false;

    if (url) {
        document.getElementById('projectVideoSrc').value = url;
        showToast('Video uploaded successfully!', 'success');
    }
}

// Edit Project Modal Setup
function editProject(proj) {
    document.getElementById('modalHeading').textContent = 'Edit Video Project: ' + proj.title;
    document.getElementById('projectId').value = proj.id;
    document.getElementById('projectTitle').value = proj.title;
    document.getElementById('projectCategory').value = proj.category_id;
    document.getElementById('projectVideoSrc').value = proj.video_src;
    document.getElementById('projectTools').value = proj.tools_used || '';
    document.getElementById('projectSort').value = proj.sort_order || 1;
    document.getElementById('projectDescription').value = proj.description || '';
    document.getElementById('projectFeatured').checked = proj.is_featured == 1;
    document.getElementById('projectActive').checked = proj.is_active == 1;

    openModal('projectFormModal');
}

// Submit Project (Create / Update)
async function handleProjectSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('projectId').value;
    const isEdit = Boolean(id);

    const payload = {
        id: id ? parseInt(id) : undefined,
        title: document.getElementById('projectTitle').value,
        category_id: parseInt(document.getElementById('projectCategory').value),
        video_src: document.getElementById('projectVideoSrc').value,
        tools_used: document.getElementById('projectTools').value,
        sort_order: parseInt(document.getElementById('projectSort').value),
        description: document.getElementById('projectDescription').value,
        is_featured: document.getElementById('projectFeatured').checked ? 1 : 0,
        is_active: document.getElementById('projectActive').checked ? 1 : 0
    };

    try {
        const res = await fetch(`${API_BASE}/projects.php${isEdit ? '?id=' + id : ''}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
            showToast(isEdit ? 'Project updated successfully!' : 'Project added successfully!', 'success');
            setTimeout(() => location.reload(), 800);
        } else {
            showToast(data.message || 'Operation failed', 'error');
        }
    } catch (err) {
        showToast('Network error while saving project', 'error');
    }
}

// Toggle Project Visibility (Active / Hidden)
async function toggleProjectStatus(id) {
    try {
        const res = await fetch(`${API_BASE}/projects.php?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, toggle_active: true })
        });
        const data = await res.json();
        if (data.success) {
            const btn = document.getElementById(`status-btn-${id}`);
            const isNowActive = btn.classList.contains('badge-rose');
            btn.className = `badge ${isNowActive ? 'badge-green' : 'badge-rose'}`;
            btn.textContent = isNowActive ? '● Active' : '○ Hidden';
            showToast('Project status updated', 'success');
        }
    } catch (err) {
        showToast('Failed to toggle status', 'error');
    }
}

// Delete Project with Confirmation
async function deleteProject(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/projects.php?id=${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Project deleted', 'success');
            const row = document.getElementById(`proj-row-${id}`);
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
