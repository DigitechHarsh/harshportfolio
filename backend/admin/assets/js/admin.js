/**
 * AI Creations Admin Panel - JavaScript Core
 * AJAX API Client, Modals, Video Preview & Dynamic Handlers
 */

const API_BASE = '../api';

// Toast Notification Helper
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✓' : '⚠️';
    toast.innerHTML = `<span style="font-weight:bold; color:${type === 'success' ? '#4ade80' : '#fb7185'}">${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Modal Controllers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop any playing video in preview modal
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.src = '';
        }
    }
}

// Preview Video In Modal
function previewVideo(src, title = 'Video Preview') {
    const modal = document.getElementById('videoPreviewModal');
    if (!modal) return;

    const titleEl = modal.querySelector('#previewVideoTitle');
    const player = modal.querySelector('#previewVideoPlayer');

    if (titleEl) titleEl.textContent = title;
    if (player) {
        player.src = src;
        player.load();
        player.play().catch(() => {});
    }

    openModal('videoPreviewModal');
}

// Mobile Sidebar Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }

    // Close modal on click outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
        }
    });

    // Live Clock In Topbar
    const liveClock = document.getElementById('liveClock');
    if (liveClock) {
        const updateTime = () => {
            const now = new Date();
            liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
        };
        updateTime();
        setInterval(updateTime, 1000);
    }
});

// File Upload Helper (Uploads to /api/upload.php)
async function uploadFile(fileInput, type = 'auto') {
    const file = fileInput.files[0];
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
        const res = await fetch(`${API_BASE}/upload.php`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            return data.data.url;
        } else {
            showToast(data.message || 'Upload failed', 'error');
            return null;
        }
    } catch (err) {
        showToast('Network error during upload', 'error');
        return null;
    }
}
