<?php
/**
 * Admin Login Page
 */
require_once __DIR__ . '/../../config/auth.php';

// If already logged in, redirect straight to dashboard
if (Auth::check()) {
    header("Location: index.php");
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($identifier) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        $result = Auth::login($identifier, $password);
        if ($result['success']) {
            header("Location: index.php");
            exit;
        } else {
            $error = $result['message'];
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login | AI Creations Control Terminal</title>
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="assets/css/admin.css">
    <style>
        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            position: relative;
            z-index: 1;
        }
        .login-card {
            width: 100%;
            max-width: 440px;
            padding: 36px 32px;
            border-radius: 24px;
        }
        .login-hud-ring {
            width: 72px;
            height: 72px;
            margin: 0 auto 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2));
            border: 1px solid rgba(255,255,255,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 30px rgba(139,92,246,0.3);
            position: relative;
        }
    </style>
</head>
<body>
    <div class="bg-mesh"></div>

    <div class="login-container">
        <div class="login-card glass-card">
            <!-- HUD Core Icon -->
            <div class="login-hud-ring">
                <img src="/logo.png" alt="Logo" style="width: 42px; height: 42px; object-fit: contain;" onerror="this.style.display='none'; document.getElementById('altIcon').style.display='block';">
                <span id="altIcon" style="display:none; font-size:24px;">⚡</span>
            </div>

            <!-- Title -->
            <div style="text-align: center; margin-bottom: 28px;">
                <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 6px;">
                    <span class="gradient-text">Control Terminal</span>
                </h1>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">
                    Authenticate to manage AI video projects & telemetry
                </p>
            </div>

            <!-- Error Banner -->
            <?php if (!empty($error)): ?>
                <div style="background: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.3); border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; color: #fb7185; font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                    <span>⚠️</span>
                    <span><?= htmlspecialchars($error) ?></span>
                </div>
            <?php endif; ?>

            <!-- Login Form -->
            <form method="POST" action="login.php">
                <div class="form-group">
                    <label class="form-label" for="username">Username or Email</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        class="form-input" 
                        placeholder="admin or aicreationsbyharsh@gmail.com" 
                        required 
                        autofocus
                        value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                    >
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Security Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-input" 
                        placeholder="••••••••••••" 
                        required
                    >
                </div>

                <div style="margin-top: 26px;">
                    <button type="submit" class="btn-primary" style="width: 100%; padding: 13px;">
                        <span>Uplink to Terminal</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </form>

            <!-- Demo Credentials Helper -->
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle); text-align: center; font-size: 0.78rem; color: var(--text-muted);">
                <div>Default Login: <strong style="color: var(--text-secondary);">admin</strong> / <strong style="color: var(--text-secondary);">password123</strong></div>
                <div style="margin-top: 4px;">Host: <code style="color: var(--accent-cyan);">portfolio.harshaicreations.com</code></div>
            </div>
        </div>
    </div>
</body>
</html>
