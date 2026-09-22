<?php
/**
 * Studio & System Settings Manager
 */
require_once __DIR__ . '/includes/header.php';

// Fetch all settings as associative array
$rows = $db->query("SELECT setting_key, setting_value, setting_group FROM site_settings")->fetchAll();
$settings = [];
foreach ($rows as $r) {
    $settings[$r['setting_key']] = $r['setting_value'];
}
?>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
    <!-- Left: Settings Forms -->
    <div style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- General & Hero Settings -->
        <div class="glass-card" style="padding: 24px;">
            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 4px;">Hero & Availability Telemetry</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Configure availability indicator and headlines on portfolio.harshaicreations.com</p>
            </div>

            <form onsubmit="handleSettingsSave(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="system_status">System Availability Status</label>
                        <select id="system_status" name="system_status" class="form-select">
                            <option value="Available" <?= ($settings['system_status'] ?? '') === 'Available' ? 'selected' : '' ?>>🟢 Available (Taking New Projects)</option>
                            <option value="In Production" <?= ($settings['system_status'] ?? '') === 'In Production' ? 'selected' : '' ?>>🟡 In Production</option>
                            <option value="Limited Slots" <?= ($settings['system_status'] ?? '') === 'Limited Slots' ? 'selected' : '' ?>>🟣 Limited Slots Available</option>
                            <option value="Busy" <?= ($settings['system_status'] ?? '') === 'Busy' ? 'selected' : '' ?>>🔴 Busy</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="creator_name">Creator Display Name</label>
                        <input type="text" id="creator_name" name="creator_name" class="form-input" value="<?= htmlspecialchars($settings['creator_name'] ?? 'Harsh') ?>">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="hero_heading_1">Hero Heading Line 1</label>
                        <input type="text" id="hero_heading_1" name="hero_heading_1" class="form-input" value="<?= htmlspecialchars($settings['hero_heading_1'] ?? 'Crafting AI-Powered') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="hero_heading_2">Hero Heading Line 2</label>
                        <input type="text" id="hero_heading_2" name="hero_heading_2" class="form-input" value="<?= htmlspecialchars($settings['hero_heading_2'] ?? 'Video Magic') ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="site_description">Meta Description / Hero Subtitle</label>
                    <textarea id="site_description" name="site_description" class="form-textarea" rows="2"><?= htmlspecialchars($settings['site_description'] ?? '') ?></textarea>
                </div>

                <div style="text-align: right;">
                    <button type="submit" class="btn-primary">Save Hero Settings</button>
                </div>
            </form>
        </div>

        <!-- Telemetry Stats Numbers -->
        <div class="glass-card" style="padding: 24px;">
            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 4px;">Telemetry Data Readout Numbers</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">The 3 statistics counters displayed under the hero section</p>
            </div>

            <form onsubmit="handleSettingsSave(event)">
                <div class="form-row" style="grid-template-columns: 1fr 1fr 1fr;">
                    <div class="form-group">
                        <label class="form-label" for="stat_completed_projects">Completed Projects</label>
                        <input type="text" id="stat_completed_projects" name="stat_completed_projects" class="form-input" value="<?= htmlspecialchars($settings['stat_completed_projects'] ?? '18+') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="stat_video_ads">AI Video Ads</label>
                        <input type="text" id="stat_video_ads" name="stat_video_ads" class="form-input" value="<?= htmlspecialchars($settings['stat_video_ads'] ?? '10+') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="stat_cinematic_teasers">Cinematic Teasers</label>
                        <input type="text" id="stat_cinematic_teasers" name="stat_cinematic_teasers" class="form-input" value="<?= htmlspecialchars($settings['stat_cinematic_teasers'] ?? '8+') ?>">
                    </div>
                </div>

                <div style="text-align: right;">
                    <button type="submit" class="btn-primary">Update Telemetry Numbers</button>
                </div>
            </form>
        </div>

        <!-- Contact Info -->
        <div class="glass-card" style="padding: 24px;">
            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 4px;">Studio Contact & Uplink Ports</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Public contact information shown in the contact section and footer</p>
            </div>

            <form onsubmit="handleSettingsSave(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="contact_phone">Contact Phone</label>
                        <input type="text" id="contact_phone" name="contact_phone" class="form-input" value="<?= htmlspecialchars($settings['contact_phone'] ?? '+91-8160587315') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="contact_email">Contact Email</label>
                        <input type="email" id="contact_email" name="contact_email" class="form-input" value="<?= htmlspecialchars($settings['contact_email'] ?? 'aicreationsbyharsh@gmail.com') ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="contact_address">Physical Address</label>
                    <input type="text" id="contact_address" name="contact_address" class="form-input" value="<?= htmlspecialchars($settings['contact_address'] ?? '') ?>">
                </div>

                <div class="form-group">
                    <label class="form-label" for="contact_map_url">Google Maps URL</label>
                    <input type="text" id="contact_map_url" name="contact_map_url" class="form-input" value="<?= htmlspecialchars($settings['contact_map_url'] ?? '') ?>">
                </div>

                <div style="text-align: right;">
                    <button type="submit" class="btn-primary">Save Contact Information</button>
                </div>
            </form>
        </div>

        <!-- Cloudinary CDN Storage Configuration -->
        <div class="glass-card" style="padding: 24px; border-color: rgba(6, 182, 212, 0.3);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 20px;">
                <div>
                    <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 4px; display:flex; align-items:center; gap:8px;">
                        <span class="led-indicator led-cyan"></span>
                        <span>Cloudinary CDN Video Storage</span>
                    </h3>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">Configure high-speed video streaming & CDN hosting (No local server storage limits)</p>
                </div>
                <span class="badge badge-cyan" style="font-size: 0.7rem;">
                    <?= !empty($settings['cloudinary_cloud_name']) ? '⚡ Active' : '○ Not Configured' ?>
                </span>
            </div>

            <form onsubmit="handleSettingsSave(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="cloudinary_cloud_name">Cloud Name *</label>
                        <input type="text" id="cloudinary_cloud_name" name="cloudinary_cloud_name" class="form-input" placeholder="e.g. dxyz12345" value="<?= htmlspecialchars($settings['cloudinary_cloud_name'] ?? '') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="cloudinary_api_key">API Key</label>
                        <input type="text" id="cloudinary_api_key" name="cloudinary_api_key" class="form-input" placeholder="e.g. 123456789012345" value="<?= htmlspecialchars($settings['cloudinary_api_key'] ?? '') ?>">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label" for="cloudinary_api_secret">API Secret</label>
                        <input type="password" id="cloudinary_api_secret" name="cloudinary_api_secret" class="form-input" placeholder="••••••••••••••••••••" value="<?= htmlspecialchars($settings['cloudinary_api_secret'] ?? '') ?>">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="cloudinary_upload_preset">Upload Preset (Optional)</label>
                        <input type="text" id="cloudinary_upload_preset" name="cloudinary_upload_preset" class="form-input" placeholder="e.g. harsh_portfolio_preset" value="<?= htmlspecialchars($settings['cloudinary_upload_preset'] ?? '') ?>">
                    </div>
                </div>

                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom: 16px;">
                    When configured, any video uploaded via the Projects manager is automatically optimized, transcoded, and streamed via Cloudinary CDN worldwide.
                </div>

                <div style="text-align: right;">
                    <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, var(--accent-cyan), #3b82f6);">
                        <span>Save Cloudinary Credentials</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Right: Security & Password Update -->
    <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Security & Admin Password -->
        <div class="glass-card" style="padding: 24px;">
            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 1.1rem; color: #fff; margin-bottom: 4px;">Admin Security</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted);">Update your superadmin access password</p>
            </div>

            <form onsubmit="handlePasswordChange(event)">
                <div class="form-group">
                    <label class="form-label" for="current_password">Current Password</label>
                    <input type="password" id="current_password" class="form-input" placeholder="••••••••••••" required>
                </div>

                <div class="form-group">
                    <label class="form-label" for="new_password">New Password (min. 6 chars)</label>
                    <input type="password" id="new_password" class="form-input" placeholder="••••••••••••" required minlength="6">
                </div>

                <div class="form-group">
                    <label class="form-label" for="confirm_password">Confirm New Password</label>
                    <input type="password" id="confirm_password" class="form-input" placeholder="••••••••••••" required minlength="6">
                </div>

                <button type="submit" class="btn-primary" style="width: 100%;">
                    <span>Update Security Password</span>
                </button>
            </form>
        </div>

        <!-- Deployment Info Badge -->
        <div class="glass-card" style="padding: 22px;">
            <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
                <span class="led-indicator led-green"></span>
                <span>Hostinger Configuration</span>
            </h4>
            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.6;">
                <p>When deploying to your Hostinger plan on subdomain <strong>portfolio.harshaicreations.com</strong>:</p>
                <ol style="padding-left: 18px; margin-top: 8px; color: var(--text-muted);">
                    <li>Import <code>backend/database.sql</code> into phpMyAdmin.</li>
                    <li>Update DB credentials in <code>config/database.php</code>.</li>
                    <li>Access your Admin Panel at <code>/admin/login.php</code>.</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<script>
async function handleSettingsSave(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    const settings = {};

    inputs.forEach(input => {
        if (input.name) {
            settings[input.name] = input.value;
        }
    });

    try {
        const res = await fetch(`${API_BASE}/settings.php`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settings: settings })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Settings saved successfully!', 'success');
        } else {
            showToast(data.message || 'Failed to save settings', 'error');
        }
    } catch (err) {
        showToast('Network error while saving settings', 'error');
    }
}

async function handlePasswordChange(e) {
    e.preventDefault();
    const currentPass = document.getElementById('current_password').value;
    const newPass = document.getElementById('new_password').value;
    const confirmPass = document.getElementById('confirm_password').value;

    if (newPass !== confirmPass) {
        showToast('New passwords do not match!', 'error');
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth.php?action=change_password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_password: currentPass,
                new_password: newPass
            })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Password updated successfully! Please remember your new password.', 'success');
            e.target.reset();
        } else {
            showToast(data.message || 'Failed to update password', 'error');
        }
    } catch (err) {
        showToast('Network error while changing password', 'error');
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
