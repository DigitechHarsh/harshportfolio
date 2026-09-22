# 🚀 AI Creations - PHP Backend & Admin Panel Deployment Guide

**Target Subdomain:** `portfolio.harshaicreations.com`  
**Host:** Hostinger (cPanel / hPanel)  
**Database:** MySQL / MariaDB  

---

## 📁 Architecture Overview

```
portfolio/
├── backend/
│   ├── api/                  # REST API Endpoints (CORS Enabled)
│   │   ├── auth.php          # Admin authentication & token handler
│   │   ├── categories.php    # Category management (AI Ads, AI Teasers)
│   │   ├── contact.php       # Contact form submissions & email alerts
│   │   ├── projects.php      # Full video projects CRUD & ordering
│   │   ├── settings.php      # Telemetry readout & site copy config
│   │   ├── stats.php         # Dashboard analytics & system info
│   │   ├── tools.php         # Neural tools & tech stack chips
│   │   └── upload.php        # Video (MP4/WebM) & Image uploader
│   │
│   ├── admin/                # Sleek Cyberpunk Dark Glassmorphism Admin UI
│   │   ├── assets/           # High-end CSS & AJAX JS
│   │   ├── includes/         # Header, Sidebar, Footer components
│   │   ├── index.php         # Telemetry Dashboard
│   │   ├── login.php         # Cyber-styled Login Portal
│   │   ├── logout.php        # Session termination
│   │   ├── messages.php      # Inquiries Inbox & reply
│   │   ├── projects.php      # Video Projects Manager (Add/Edit/Preview)
│   │   ├── settings.php      # Studio, Hero & Password Settings
│   │   └── tools.php         # Neural Models & Tools Manager
│   │
│   ├── config/
│   │   ├── auth.php          # Session & JWT validation
│   │   ├── cors.php          # Cross-Origin headers for Next.js & Subdomains
│   │   └── database.php      # PDO Connection Handler
│   │
│   ├── uploads/              # Upload storage (protected by .htaccess)
│   │   ├── thumbnails/
│   │   └── videos/
│   │
│   ├── .htaccess             # Apache / LiteSpeed configuration (512MB limits)
│   └── database.sql          # Complete MySQL schema & pre-seeded projects
│
└── src/                      # Next.js Frontend
```

---

## 🛠️ Step-by-Step Hostinger Deployment

### Step 1: Create the MySQL Database in Hostinger
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Databases** ➔ **Management**.
3. Create a new MySQL Database:
   - **Database Name:** e.g., `u123456789_portfolio`
   - **Username:** e.g., `u123456789_admin`
   - **Password:** Generate or choose a strong password (copy it!).
4. Click **Create**.

---

### Step 2: Import `database.sql` into phpMyAdmin
1. In Hostinger hPanel under your new database, click **Enter phpMyAdmin**.
2. Click the **Import** tab at the top.
3. Choose the file `backend/database.sql` from this project.
4. Click **Go** / **Import**.
5. All 6 tables (`admin_users`, `categories`, `projects`, `tools`, `messages`, `site_settings`) and **all 18 existing portfolio projects** will be pre-seeded automatically!

---

### Step 3: Update `backend/config/database.php`
Open `backend/config/database.php` and replace the credentials with your Hostinger database details:

```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'u123456789_portfolio'); // Your Hostinger DB Name
define('DB_USER', 'u123456789_admin');     // Your Hostinger DB Username
define('DB_PASS', 'YOUR_STRONG_PASSWORD'); // Your Hostinger DB Password
```

---

### Step 4: Upload the Backend to Hostinger Subdomain
1. In Hostinger hPanel, go to **Domains** ➔ **Subdomains**.
2. Create or verify your subdomain: `portfolio.harshaicreations.com`.
3. Open **File Manager** and navigate to the directory for `portfolio.harshaicreations.com` (usually `public_html/portfolio` or `domains/portfolio.harshaicreations.com/public_html`).
4. Upload all files from the `backend/` folder into this root directory.

---

### Step 5: Configure PHP Upload Limits in Hostinger hPanel
Since high-definition AI videos can be large:
1. In Hostinger hPanel, search for **PHP Configuration** ➔ **PHP Options**.
2. Set:
   - `upload_max_filesize` = **512M**
   - `post_max_size` = **512M**
   - `memory_limit` = **512M**
   - `max_execution_time` = **300**
3. Click **Save**.

---

## 🔐 Logging into the Admin Panel

1. Open your browser and navigate to:  
   👉 **`https://portfolio.harshaicreations.com/admin/login.php`**

2. Default Credentials:
   - **Username / Email:** `admin` (or `aicreationsbyharsh@gmail.com`)
   - **Password:** `password123`

3. Once logged in, go to **Site & Telemetry Settings** ➔ **Admin Security** to change your password to a private one.

---

## ⚡ API Endpoints Reference

| Endpoint | Method | Purpose | Authentication |
|---|---|---|---|
| `/api/projects.php` | `GET` | List active video projects | Public |
| `/api/projects.php?grouped=true` | `GET` | Grouped by `ai-ads` & `ai-teasers` | Public |
| `/api/projects.php` | `POST` | Add a new video project | Admin Bearer / Session |
| `/api/projects.php?id={id}` | `PUT` | Update video project | Admin Bearer / Session |
| `/api/projects.php?id={id}` | `DELETE` | Delete video project | Admin Bearer / Session |
| `/api/contact.php` | `POST` | Submit portfolio inquiry | Public |
| `/api/contact.php` | `GET` | View inquiries list | Admin Bearer / Session |
| `/api/tools.php` | `GET` | Get neural tools stack | Public |
| `/api/settings.php` | `GET` | Get telemetry & site copy | Public |
| `/api/upload.php` | `POST` | Upload video (MP4/WebM) or thumbnail | Admin Bearer / Session |
| `/api/auth.php?action=login`| `POST` | Authenticate & get token | Public |
