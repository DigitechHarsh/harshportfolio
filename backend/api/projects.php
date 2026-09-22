<?php
/**
 * Projects REST API Endpoint
 * Handles fetching, creating, updating, and deleting video projects
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'GET':
        // Optional query filters
        $categoryId = isset($_GET['category_id']) ? (int)$_GET['category_id'] : null;
        $categorySlug = $_GET['category'] ?? null;
        $onlyActive = isset($_GET['all']) ? false : true;
        $featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
        $id = isset($_GET['id']) ? (int)$_GET['id'] : null;

        if ($id) {
            $stmt = $db->prepare("SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.accent_color 
                                   FROM projects p 
                                   JOIN categories c ON p.category_id = c.id 
                                   WHERE p.id = :id");
            $stmt->execute(['id' => $id]);
            $project = $stmt->fetch();

            if (!$project) {
                jsonResponse(false, 'Project not found', null, 404);
            }

            // Increment view count
            $db->prepare("UPDATE projects SET views_count = views_count + 1 WHERE id = :id")->execute(['id' => $id]);

            jsonResponse(true, 'Project retrieved successfully', $project);
        }

        $sql = "SELECT p.*, c.name AS category_name, c.slug AS category_slug, c.accent_color 
                FROM projects p 
                JOIN categories c ON p.category_id = c.id 
                WHERE 1=1";
        $params = [];

        if ($onlyActive && !Auth::check()) {
            $sql .= " AND p.is_active = 1";
        }

        if ($categoryId) {
            $sql .= " AND p.category_id = :cat_id";
            $params['cat_id'] = $categoryId;
        }

        if ($categorySlug) {
            $sql .= " AND c.slug = :cat_slug";
            $params['cat_slug'] = $categorySlug;
        }

        if ($featured !== null) {
            $sql .= " AND p.is_featured = :featured";
            $params['featured'] = $featured;
        }

        $sql .= " ORDER BY p.sort_order ASC, p.id DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $projects = $stmt->fetchAll();

        // Optional format: group by category slug for direct frontend consumption
        if (isset($_GET['grouped']) && $_GET['grouped'] === 'true') {
            $grouped = [];
            foreach ($projects as $proj) {
                $slug = $proj['category_slug'];
                if (!isset($grouped[$slug])) {
                    $grouped[$slug] = [];
                }
                $grouped[$slug][] = [
                    'id'          => (int)$proj['id'],
                    'title'       => $proj['title'],
                    'src'         => $proj['video_src'],
                    'thumbnail'   => $proj['thumbnail_src'],
                    'description' => $proj['description'],
                    'tools_used'  => $proj['tools_used'],
                    'is_featured' => (bool)$proj['is_featured']
                ];
            }
            jsonResponse(true, 'Projects retrieved successfully', $grouped);
        }

        jsonResponse(true, 'Projects retrieved successfully', $projects);
        break;

    case 'POST':
        Auth::requireApiAuth();
        $input = getJsonInput();

        // Handle reordering batch update
        if (isset($input['action']) && $input['action'] === 'reorder' && !empty($input['order'])) {
            $updateStmt = $db->prepare("UPDATE projects SET sort_order = :sort WHERE id = :id");
            foreach ($input['order'] as $item) {
                if (isset($item['id'], $item['sort_order'])) {
                    $updateStmt->execute([
                        'sort' => (int)$item['sort_order'],
                        'id'   => (int)$item['id']
                    ]);
                }
            }
            jsonResponse(true, 'Project ordering updated successfully');
        }

        // Create new project
        $title = trim($input['title'] ?? '');
        $categoryId = (int)($input['category_id'] ?? 0);
        $videoSrc = trim($input['video_src'] ?? '');

        if (empty($title) || empty($categoryId) || empty($videoSrc)) {
            jsonResponse(false, 'Title, Category, and Video Source URL are required.', null, 422);
        }

        // Calculate next sort order
        $sortStmt = $db->prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_sort FROM projects WHERE category_id = :cat_id");
        $sortStmt->execute(['cat_id' => $categoryId]);
        $nextSort = (int)($sortStmt->fetch()['next_sort'] ?? 1);

        $stmt = $db->prepare("INSERT INTO projects (
            category_id, title, slug, description, client_name, tools_used,
            video_src, thumbnail_src, duration_seconds, aspect_ratio, is_featured, is_active, sort_order
        ) VALUES (
            :category_id, :title, :slug, :description, :client_name, :tools_used,
            :video_src, :thumbnail_src, :duration_seconds, :aspect_ratio, :is_featured, :is_active, :sort_order
        )");

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));

        $stmt->execute([
            'category_id'      => $categoryId,
            'title'            => $title,
            'slug'             => $slug,
            'description'      => $input['description'] ?? '',
            'client_name'      => $input['client_name'] ?? '',
            'tools_used'       => $input['tools_used'] ?? 'Veo 3.1, Seedance 2.0',
            'video_src'        => $videoSrc,
            'thumbnail_src'    => $input['thumbnail_src'] ?? null,
            'duration_seconds' => (int)($input['duration_seconds'] ?? 0),
            'aspect_ratio'     => $input['aspect_ratio'] ?? '16:9',
            'is_featured'      => !empty($input['is_featured']) ? 1 : 0,
            'is_active'        => isset($input['is_active']) ? (int)$input['is_active'] : 1,
            'sort_order'       => isset($input['sort_order']) ? (int)$input['sort_order'] : $nextSort
        ]);

        $newId = (int)$db->lastInsertId();
        jsonResponse(true, 'Project created successfully', ['id' => $newId], 201);
        break;

    case 'PUT':
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Project ID is required', null, 422);
        }

        // Toggle status shortcut
        if (isset($input['toggle_active'])) {
            $stmt = $db->prepare("UPDATE projects SET is_active = NOT is_active WHERE id = :id");
            $stmt->execute(['id' => $id]);
            jsonResponse(true, 'Project status toggled successfully');
        }

        $title = trim($input['title'] ?? '');
        $categoryId = (int)($input['category_id'] ?? 0);
        $videoSrc = trim($input['video_src'] ?? '');

        if (empty($title) || empty($categoryId) || empty($videoSrc)) {
            jsonResponse(false, 'Title, Category, and Video Source URL are required.', null, 422);
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title), '-'));

        $stmt = $db->prepare("UPDATE projects SET 
            category_id = :category_id,
            title = :title,
            slug = :slug,
            description = :description,
            client_name = :client_name,
            tools_used = :tools_used,
            video_src = :video_src,
            thumbnail_src = :thumbnail_src,
            duration_seconds = :duration_seconds,
            aspect_ratio = :aspect_ratio,
            is_featured = :is_featured,
            is_active = :is_active,
            sort_order = :sort_order
            WHERE id = :id");

        $stmt->execute([
            'id'               => $id,
            'category_id'      => $categoryId,
            'title'            => $title,
            'slug'             => $slug,
            'description'      => $input['description'] ?? '',
            'client_name'      => $input['client_name'] ?? '',
            'tools_used'       => $input['tools_used'] ?? 'Veo 3.1, Seedance 2.0',
            'video_src'        => $videoSrc,
            'thumbnail_src'    => $input['thumbnail_src'] ?? null,
            'duration_seconds' => (int)($input['duration_seconds'] ?? 0),
            'aspect_ratio'     => $input['aspect_ratio'] ?? '16:9',
            'is_featured'      => !empty($input['is_featured']) ? 1 : 0,
            'is_active'        => isset($input['is_active']) ? (int)$input['is_active'] : 1,
            'sort_order'       => (int)($input['sort_order'] ?? 0)
        ]);

        jsonResponse(true, 'Project updated successfully');
        break;

    case 'DELETE':
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Project ID is required', null, 422);
        }

        // Retrieve video path if local file to optionally delete
        $fetchStmt = $db->prepare("SELECT video_src, thumbnail_src FROM projects WHERE id = :id");
        $fetchStmt->execute(['id' => $id]);
        $proj = $fetchStmt->fetch();

        $stmt = $db->prepare("DELETE FROM projects WHERE id = :id");
        $stmt->execute(['id' => $id]);

        jsonResponse(true, 'Project deleted successfully');
        break;

    default:
        jsonResponse(false, 'Method not allowed', null, 405);
}
