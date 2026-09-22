<?php
/**
 * Admin Logout Handler
 */
require_once __DIR__ . '/../../config/auth.php';

Auth::logout();
header("Location: login.php");
exit;
