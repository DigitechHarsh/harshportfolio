-- ====================================================================
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

INSERT INTO projects (category_id, title, slug, description, client_name, tools_used, video_src, thumbnail_src, duration_seconds, aspect_ratio, is_featured, is_active, sort_order) VALUES
(1, 'Futuristic AI Visuals', 'futuristic-ai-visuals-1', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790062710/portfolio/ai-ads/umzcguswvtugww4vaaug.mp4', '', 33, '9:16', 1, 1, 1),
(1, 'DiamondLuxuryAd', 'diamondluxuryad-2', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790062979/portfolio/ai-ads/ecgvba8pxd2owgx9i7cd.mp4', '', 20, '9:16', 1, 1, 2),
(1, 'EONSolution(1)', 'eonsolution-1-3', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790062844/portfolio/ai-ads/fj7wwxnb1sdsiuygpm98.mp4', '', 37, '9:16', 1, 1, 3),
(1, 'FlavourOfIndia', 'flavourofindia-4', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790063300/portfolio/ai-ads/cjzlzqyriohfq9iuk1mt.mp4', '', 49, '16:9', 1, 1, 4),
(1, 'MANGO PULP AD 3', 'mango-pulp-ad-3-5', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790063319/portfolio/ai-ads/ufdzqkyke26nlhdczexp.mp4', '', 23, '9:16', 0, 1, 5),
(1, 'MonsterEnergyDrinkDone', 'monsterenergydrinkdone-6', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790063694/portfolio/ai-ads/c5yjieee5f8sem7sxqcu.mp4', '', 27, '9:16', 0, 1, 6),
(1, 'OMDivine YashSoc 1 916', 'omdivine-yashsoc-1-916-7', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790080758/portfolio/ai-ads/yfp36rcvu9m7jsyovge4.mp4', '', 30, '9:16', 0, 1, 7),
(1, 'Puma Fly Runner Commercial', 'puma-fly-runner-commercial-8', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790081118/portfolio/ai-ads/i3r9azrt8x7q43pkxgjq.mp4', '', 29, '9:16', 0, 1, 8),
(1, 'Tata Sierra AI Commercial', 'tata-sierra-ai-commercial-9', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790081504/portfolio/ai-ads/fsrc0pndtwwnrshaodu3.mp4', '', 60, '16:9', 0, 1, 9),
(1, 'The Good Vibe Fashion', 'the-good-vibe-fashion-10', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790081513/portfolio/ai-ads/y8caywmdwtdb76dpraaj.mp4', '', 13, '9:16', 0, 1, 10),
(2, 'Futuristic AI Visuals', 'futuristic-ai-visuals-11', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790081520/portfolio/ai-teasers/mhebbuthefnnfixlcewx.mp4', '', 15, '16:9', 0, 1, 11),
(2, 'Futuristic AI Visuals', 'futuristic-ai-visuals-12', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790081525/portfolio/ai-teasers/dwpkkhpgsjt3j7ccddzx.mp4', '', 15, '16:9', 0, 1, 12),
(2, 'Futuristic AI Visuals', 'futuristic-ai-visuals-13', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790081529/portfolio/ai-teasers/ntnef4a9fhsoldnk2i8l.mp4', '', 15, '16:9', 0, 1, 13),
(2, 'Divine Shloka AI Concept', 'divine-shloka-ai-concept-14', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790082132/portfolio/ai-teasers/a6vx5dng11nllbrm484h.mp4', '', 42, '9:16', 0, 1, 14),
(2, 'Futuristic AI Visuals', 'futuristic-ai-visuals-15', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790082139/portfolio/ai-teasers/jqqcmlkxfqv6vfq8cqsr.mp4', '', 15, '16:9', 0, 1, 15),
(2, 'Cinematic Encounter Teaser', 'cinematic-encounter-teaser-16', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790082148/portfolio/ai-teasers/dsey3f4wwxabilgf7ftw.mp4', '', 30, '16:9', 0, 1, 16),
(2, 'Mountain Dew AI Action', 'mountain-dew-ai-action-17', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790082258/portfolio/ai-teasers/voibtdtylp2j32miz71e.mp4', '', 48, '9:16', 0, 1, 17),
(2, 'Cyber Samurai AI Teaser', 'cyber-samurai-ai-teaser-18', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790082293/portfolio/ai-teasers/dzvtgar5uvvs1woorsoe.mp4', '', 15, '9:16', 0, 1, 18),
(2, 'Action School Sequence', 'action-school-sequence-19', 'Next-gen AI visual production crafted with cutting-edge diffusion and neural motion pipelines.', 'Creative Studio', 'Midjourney v6, Runway Gen-3, Premiere Pro', 'https://res.cloudinary.com/la4ig9t3/video/upload/v1790082327/portfolio/ai-teasers/ref1xg6swvhg1z0isbcf.mp4', '', 13, '9:16', 0, 1, 19);

-- 4. TOOLS & TECH STACK TABLE
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
