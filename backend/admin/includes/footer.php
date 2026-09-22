            </main>
        </div>
    </div>

    <!-- Global Video Preview Modal -->
    <div id="videoPreviewModal" class="modal-overlay">
        <div class="modal-dialog glass-card" style="max-width: 800px; padding: 0; overflow: hidden;">
            <div class="modal-header">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span class="led-indicator led-violet"></span>
                    <h3 id="previewVideoTitle" style="font-size:1.1rem; color:#fff;">Video Stream Preview</h3>
                </div>
                <button onclick="closeModal('videoPreviewModal')" class="btn-icon" aria-label="Close">✕</button>
            </div>
            <div class="modal-body" style="padding: 0; background: #000;">
                <video id="previewVideoPlayer" controls playsinline style="width: 100%; aspect-ratio: 16/9; display: block; background: #000;"></video>
            </div>
            <div class="modal-footer" style="background: rgba(0,0,0,0.5);">
                <button onclick="closeModal('videoPreviewModal')" class="btn-secondary">Close Viewport</button>
            </div>
        </div>
    </div>

    <!-- Toast Notifications Container -->
    <div class="toast-container"></div>

    <script src="assets/js/admin.js"></script>
</body>
</html>
