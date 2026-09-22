import os
import sys
import json
import time
import hashlib
import subprocess
import requests

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CLOUD_NAME = "la4ig9t3"
API_KEY = "427994134557492"
API_SECRET = "_3vxKU6--GfaMPJqs-zuc9gB9lY"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_FILE = os.path.join(BASE_DIR, "cloudinary_video_cache.json")
TEMP_DIR = os.path.join(BASE_DIR, ".temp_compressed")

os.makedirs(TEMP_DIR, exist_ok=True)

FOLDERS = [
    {"dir": os.path.join(BASE_DIR, "AI Ads"), "category_id": 1, "category_slug": "ai-ads"},
    {"dir": os.path.join(BASE_DIR, "AI Teasers"), "category_id": 2, "category_slug": "ai-teasers"}
]

def get_signature(params_dict, secret):
    sorted_keys = sorted(params_dict.keys())
    to_sign = "&".join([f"{k}={params_dict[k]}" for k in sorted_keys])
    to_sign += secret
    return hashlib.sha1(to_sign.encode('utf-8')).hexdigest()

def compress_if_large(filepath):
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    if size_mb <= 50:
        return filepath
    
    base_name = os.path.splitext(os.path.basename(filepath))[0]
    out_path = os.path.join(TEMP_DIR, f"{base_name}_opt.mp4")
    
    # If already exists and < 70MB, use it
    if os.path.exists(out_path):
        cur_size = os.path.getsize(out_path) / (1024 * 1024)
        if cur_size < 70 and cur_size > 0:
            return out_path
        else:
            try: os.remove(out_path)
            except: pass
        
    print(f"  [FFMPEG] Compressing {os.path.basename(filepath)} ({size_mb:.1f}MB -> Web 1080p)...", flush=True)
    cmd = [
        "ffmpeg", "-y", "-i", filepath,
        "-c:v", "libx264", "-crf", "27", "-maxrate", "3.5M", "-bufsize", "7M", "-preset", "veryfast",
        "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "128k",
        out_path
    ]
    try:
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        new_size = os.path.getsize(out_path) / (1024 * 1024)
        print(f"  [FFMPEG OK] Reduced from {size_mb:.1f}MB to {new_size:.1f}MB!", flush=True)
        return out_path
    except Exception as e:
        print(f"  [FFMPEG WARN] {e}, fallback to original", flush=True)
        return filepath

def upload_video(filepath, folder):
    timestamp = int(time.time())
    params = {
        "folder": folder,
        "timestamp": timestamp
    }
    sig = get_signature(params, API_SECRET)
    
    upload_url = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/video/upload"
    
    data = {
        "api_key": API_KEY,
        "timestamp": timestamp,
        "signature": sig,
        "folder": folder
    }
    
    with open(filepath, "rb") as f:
        files = {"file": f}
        resp = requests.post(upload_url, data=data, files=files, timeout=600)
        
    if resp.status_code != 200:
        raise Exception(f"Cloudinary error {resp.status_code}: {resp.text}")
        
    return resp.json()

def format_title(filename):
    name = os.path.splitext(filename)[0]
    name = name.replace("-", " ").replace("_", " ")
    lower = name.lower()
    if "shloka" in lower: return "Divine Shloka AI Concept"
    if "sierra" in lower: return "Tata Sierra AI Commercial"
    if "puma" in lower: return "Puma Fly Runner Commercial"
    if "mango" in lower: return "Mango Pulp Commercial Ad"
    if "monster" in lower: return "Monster Energy Cinematic"
    if "dew" in lower: return "Mountain Dew AI Action"
    if "samurai" in lower: return "Cyber Samurai AI Teaser"
    if "school" in lower: return "Action School Sequence"
    if "eon" in lower: return "EON Corporate Solutions"
    if "diamond" in lower: return "Diamond Luxury Jewelry Ad"
    if "flavour" in lower: return "Flavour Of India Culinary"
    if "vibe" in lower: return "The Good Vibe Fashion"
    if "encounter" in lower: return "Cinematic Encounter Teaser"
    if len(name) > 35 or "video" in lower:
        return "Futuristic AI Visuals"
    return name.strip()

def generate_sql(items):
    sql = f"""-- ====================================================================
-- HARSH AI CREATIONS - PORTFOLIO DATABASE SCHEMA & SEED DATA
-- Target Database: u315909654_portfolio
-- Target Host: portfolio.harshaicreations.com
-- Seeded with real Cloudinary Video URLs
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS tools;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS admin_users;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) DEFAULT 'Admin',
    role ENUM('admin', 'editor') DEFAULT 'admin',
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'contact@harshaicreations.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Harsh AI Admin', 'admin');

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    accent_color VARCHAR(50) DEFAULT '#3b82f6',
    description TEXT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO categories (id, name, slug, accent_color, description, sort_order) VALUES
(1, 'AI Commercials & Ads', 'ai-ads', '#3b82f6', 'High conversion commercial AI video campaigns', 1),
(2, 'AI Teasers & Concepts', 'ai-teasers', '#8b5cf6', 'Cinematic concept trailers, music videos & teasers', 2);

-- 3. PROJECTS (VIDEOS) TABLE
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT NULL,
    client_name VARCHAR(150) NULL,
    tools_used VARCHAR(255) DEFAULT 'Midjourney, Runway Gen-3, Adobe Premiere',
    video_src TEXT NOT NULL,
    thumbnail_src TEXT NULL,
    duration_seconds INT DEFAULT 0,
    aspect_ratio VARCHAR(20) DEFAULT '16:9',
    is_featured TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX (category_id),
    INDEX (is_active),
    INDEX (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

"""
    if items:
        sql += "INSERT INTO projects (category_id, title, slug, description, client_name, tools_used, video_src, thumbnail_src, duration_seconds, aspect_ratio, is_featured, is_active, sort_order) VALUES\n"
        rows = []
        for idx, item in enumerate(items):
            is_feat = 1 if idx < 4 else 0
            title_esc = item['title'].replace("'", "''")
            slug = item['title'].lower()
            slug = "".join([c if c.isalnum() else "-" for c in slug]).strip("-") + f"-{idx+1}"
            dur = item.get('duration_seconds', 15) or 15
            aspect = item.get('aspect_ratio', '16:9')
            rows.append(f"({item['category_id']}, '{title_esc}', '{slug}', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', '{item['video_src']}', '', {dur}, '{aspect}', {is_feat}, 1, {idx+1})")
        sql += ",\n".join(rows) + ";\n\n"

    sql += """-- 4. TOOLS & TECH STACK TABLE
CREATE TABLE IF NOT EXISTS tools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'Generation',
    badge_text VARCHAR(50) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tools (name, category, badge_text, sort_order) VALUES
('Midjourney v6', 'Image Generation', 'Core Engine', 1),
('Runway Gen-3 Alpha', 'Video Generation', 'Video FX', 2),
('Luma Dream Machine', '3D & Motion', 'Motion 3D', 3),
('Kling AI', 'Video Synthesis', 'Fluid Motion', 4),
('ComfyUI & Stable Diffusion', 'Custom Workflows', 'Pipelines', 5),
('ElevenLabs', 'Audio & Voice Synthesis', 'Neural Voice', 6),
('Udio & Suno AI', 'AI Music & Score', 'Soundtrack', 7),
('Adobe Premiere Pro & After Effects', 'Post-Production', 'VFX & Color', 8);

-- 5. CONTACT MESSAGES / LEADS TABLE
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL,
    service_interested VARCHAR(100) NULL,
    budget_range VARCHAR(100) NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. SITE SETTINGS & TELEMETRY TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NULL,
    setting_group VARCHAR(50) DEFAULT 'general',
    description VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO site_settings (setting_key, setting_value, setting_group, description) VALUES
('site_title', 'Harsh AI Creations | Next-Gen AI Video Production', 'general', 'Main website title'),
('site_tagline', 'Transforming Ideas into Cinematic AI Masterpieces', 'general', 'Hero tagline'),
('contact_email', 'contact@harshaicreations.com', 'contact', 'Public inquiry email'),
('contact_phone', '+91 98765 43210', 'contact', 'WhatsApp / Phone contact'),
('instagram_url', 'https://instagram.com/harshaicreations', 'social', 'Instagram handle'),
('youtube_url', 'https://youtube.com/@harshaicreations', 'social', 'YouTube channel'),
('cloudinary_cloud_name', 'la4ig9t3', 'cloudinary', 'Cloudinary Cloud Name'),
('cloudinary_api_key', '427994134557492', 'cloudinary', 'Cloudinary API Key'),
('stat_projects_completed', '50+', 'stats', 'Telemetry counter: Projects Done'),
('stat_views_generated', '2.5M+', 'stats', 'Telemetry counter: Total Views'),
('stat_client_satisfaction', '99%', 'stats', 'Telemetry counter: Satisfaction Rate');
"""
    sql_path = os.path.join(BASE_DIR, "backend", "database.sql")
    with open(sql_path, "w", encoding="utf-8") as f:
        f.write(sql)
    print(f"[OK] Successfully generated {sql_path}", flush=True)

def main():
    cache = {}
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                cache = json.load(f)
        except Exception:
            pass

    all_items = []
    
    for folder_cfg in FOLDERS:
        dir_path = folder_cfg["dir"]
        cat_id = folder_cfg["category_id"]
        cat_slug = folder_cfg["category_slug"]
        
        if not os.path.exists(dir_path):
            continue
            
        files = [f for f in os.listdir(dir_path) if f.lower().endswith(('.mp4', '.webm', '.mov'))]
        
        for file in files:
            full_path = os.path.join(dir_path, file)
            
            if file in cache and "video_src" in cache[file]:
                print(f"[CACHED] {file} -> {cache[file]['video_src']}", flush=True)
                all_items.append(cache[file])
                continue
                
            file_to_upload = compress_if_large(full_path)
            size_mb = os.path.getsize(file_to_upload) / (1024 * 1024)
            print(f"\n[UPLOADING {size_mb:.1f} MB] {file}...", flush=True)
            
            try:
                res = upload_video(file_to_upload, f"portfolio/{cat_slug}")
                print(f"[OK UPLOADED] {file} -> {res.get('secure_url')}", flush=True)
                
                w = res.get('width', 1920)
                h = res.get('height', 1080)
                aspect = "9:16" if (h and w and h > w) else "16:9"
                
                item = {
                    "filename": file,
                    "category_id": cat_id,
                    "category_slug": cat_slug,
                    "title": format_title(file),
                    "video_src": res.get('secure_url'),
                    "public_id": res.get('public_id'),
                    "duration_seconds": int(round(res.get('duration', 0) or 0)),
                    "aspect_ratio": aspect
                }
                cache[file] = item
                all_items.append(item)
                
                with open(CACHE_FILE, "w", encoding="utf-8") as f:
                    json.dump(cache, f, indent=2)
            except Exception as e:
                print(f"[ERROR] {file}: {e}", flush=True)

    print(f"\n==================================================", flush=True)
    print(f"Total Synced Videos: {len(all_items)} / 19", flush=True)
    print(f"==================================================", flush=True)
    
    generate_sql(all_items)
    
    # Repackage backend-deploy.zip
    print("\nUpdating backend-deploy.zip...", flush=True)
    try:
        subprocess.run(
            ["powershell", "-Command", "Compress-Archive -Path 'backend\\*', 'backend\\.htaccess', 'backend\\.user.ini' -DestinationPath 'backend-deploy.zip' -Force"],
            cwd=BASE_DIR, check=True
        )
        print("[OK] backend-deploy.zip updated successfully!", flush=True)
    except Exception as e:
        print(f"Error zipping: {e}", flush=True)

if __name__ == "__main__":
    main()
