const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'la4ig9t3',
  api_key: '427994134557492',
  api_secret: '_3vxKU6--GfaMPJqs-zuc9gB9lY',
  secure: true
});

const TEMP_COMPRESSED_DIR = path.join(__dirname, '.temp_compressed');
if (!fs.existsSync(TEMP_COMPRESSED_DIR)) {
  fs.mkdirSync(TEMP_COMPRESSED_DIR, { recursive: true });
}

function uploadFile(filePath, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function compressVideoIfLarge(inputPath) {
  const stats = fs.statSync(inputPath);
  const sizeMb = stats.size / (1024 * 1024);
  
  if (sizeMb <= 80) {
    return inputPath;
  }

  const base = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(TEMP_COMPRESSED_DIR, `${base}_opt.mp4`);

  if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
    return outputPath;
  }

  console.log(`  [FFMPEG] Compressing ${path.basename(inputPath)} (${sizeMb.toFixed(1)}MB -> Web 1080p)...`);
  try {
    const cmd = `ffmpeg -y -i "${inputPath}" -c:v libx264 -crf 23 -preset fast -movflags +faststart -c:a aac -b:a 128k "${outputPath}"`;
    execSync(cmd, { stdio: 'ignore' });
    const newStats = fs.statSync(outputPath);
    console.log(`  [FFMPEG OK] Reduced from ${sizeMb.toFixed(1)}MB to ${(newStats.size / (1024*1024)).toFixed(1)}MB!`);
    return outputPath;
  } catch (err) {
    console.warn(`  [FFMPEG WARN] Compression failed, using original:`, err.message);
    return inputPath;
  }
}

const FOLDERS = [
  { dir: path.join(__dirname, 'AI Ads'), categoryId: 1, categorySlug: 'ai-ads' },
  { dir: path.join(__dirname, 'AI Teasers'), categoryId: 2, categorySlug: 'ai-teasers' }
];

async function main() {
  console.log('====================================================');
  console.log('Starting Cloudinary Batch Upload & Auto-Optimization');
  console.log('Account: la4ig9t3');
  console.log('====================================================');
  
  const resultsFile = path.join(__dirname, 'cloudinary_video_cache.json');
  let map = {};
  if (fs.existsSync(resultsFile)) {
    try {
      map = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    } catch (e) {}
  }

  const allUploaded = [];

  for (const { dir, categoryId, categorySlug } of FOLDERS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => /\.(mp4|webm|mov)$/i.test(f));
    
    for (const file of files) {
      const originalFilePath = path.join(dir, file);
      
      if (map[file] && map[file].video_src) {
        console.log(`[CACHED] ${file} -> ${map[file].video_src}`);
        allUploaded.push(map[file]);
        continue;
      }

      const fileToUpload = compressVideoIfLarge(originalFilePath);
      const sizeMb = (fs.statSync(fileToUpload).size / (1024 * 1024)).toFixed(1);

      console.log(`\n[UPLOADING ${sizeMb} MB] ${file}...`);
      try {
        const res = await uploadFile(fileToUpload, {
          resource_type: 'video',
          folder: `portfolio/${categorySlug}`,
          chunk_size: 6000000
        });
        
        console.log(`✓ [UPLOADED] ${file} -> ${res.secure_url}`);
        const item = {
          filename: file,
          category_id: categoryId,
          category_slug: categorySlug,
          title: formatTitle(file),
          video_src: res.secure_url,
          public_id: res.public_id,
          duration_seconds: Math.round(res.duration || 0),
          aspect_ratio: (res.width && res.height && res.height > res.width) ? '9:16' : '16:9'
        };
        map[file] = item;
        allUploaded.push(item);
        fs.writeFileSync(resultsFile, JSON.stringify(map, null, 2));
      } catch (err) {
        console.error(`✗ [ERROR] Failed to upload ${file}:`, err.message || err);
      }
    }
  }

  console.log(`\n====================================================`);
  console.log(`Finished Uploads! Total Synced: ${allUploaded.length}`);
  console.log(`====================================================`);
  
  generateSqlFile(allUploaded);
  
  // Clean temp folder
  try {
    fs.rmSync(TEMP_COMPRESSED_DIR, { recursive: true, force: true });
  } catch (e) {}

  // Re-create backend-deploy.zip with updated SQL file
  console.log('\nCreating updated backend-deploy.zip...');
  try {
    execSync('powershell -Command "Compress-Archive -Path \'backend\\*\' -DestinationPath \'backend-deploy.zip\' -Force"');
    console.log('✓ backend-deploy.zip successfully updated!');
  } catch (e) {
    console.error('Failed to create backend-deploy.zip:', e.message);
  }
}

function formatTitle(filename) {
  let name = filename.replace(/\.(mp4|webm|mov)$/i, '');
  name = name.replace(/[-_]+/g, ' ');
  if (name.includes('video') || name.length > 35) {
    if (name.toLowerCase().includes('shloka')) return 'Divine Shloka AI Concept';
    if (name.toLowerCase().includes('sierra')) return 'Tata Sierra AI Commercial';
    if (name.toLowerCase().includes('puma')) return 'Puma Fly Runner Commercial';
    if (name.toLowerCase().includes('mango')) return 'Mango Pulp Commercial Ad';
    if (name.toLowerCase().includes('monster')) return 'Monster Energy Cinematic';
    if (name.toLowerCase().includes('dew')) return 'Mountain Dew AI Action';
    if (name.toLowerCase().includes('samurai')) return 'Cyber Samurai AI Teaser';
    if (name.toLowerCase().includes('school')) return 'Action School Sequence';
    if (name.toLowerCase().includes('eon')) return 'EON Corporate Solutions';
    if (name.toLowerCase().includes('diamond')) return 'Diamond Luxury Jewelry Ad';
    if (name.toLowerCase().includes('flavour')) return 'Flavour Of India Culinary';
    if (name.toLowerCase().includes('vibe')) return 'The Good Vibe Fashion';
    if (name.toLowerCase().includes('encounter')) return 'Cinematic Encounter Teaser';
    return 'Futuristic AI Visuals';
  }
  return name.trim();
}

function generateSqlFile(items) {
  let sql = `-- ====================================================================
-- HARSH AI CREATIONS - PORTFOLIO DATABASE SCHEMA & SEED DATA
-- Database: u315909654_portfolio
-- Host: portfolio.harshaicreations.com
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

-- Default Admin Credentials: username 'admin', password 'password123'
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

`;

  if (items.length > 0) {
    sql += `INSERT INTO projects (category_id, title, slug, description, client_name, tools_used, video_src, thumbnail_src, duration_seconds, aspect_ratio, is_featured, is_active, sort_order) VALUES\n`;
    const rows = items.map((item, idx) => {
      const isFeatured = idx < 4 ? 1 : 0;
      const titleEscaped = item.title.replace(/'/g, "''");
      const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + (idx + 1);
      const desc = 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.';
      return `(${item.category_id}, '${titleEscaped}', '${slug}', '${desc}', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', '${item.video_src}', '', ${item.duration_seconds || 15}, '${item.aspect_ratio || '16:9'}', ${isFeatured}, 1, ${idx + 1})`;
    });
    sql += rows.join(',\n') + ';\n\n';
  }

  sql += `-- 4. TOOLS & TECH STACK TABLE
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
`;

  fs.writeFileSync(path.join(__dirname, 'backend', 'database.sql'), sql, 'utf8');
  console.log('✓ Successfully generated backend/database.sql with accurate Cloudinary URLs!');
}

main().catch(console.error);
