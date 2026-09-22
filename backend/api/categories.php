<?php
/**
 * Categories REST API Endpoint
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'GET':
        $stmt = $db->query("SELECT c.*, COUNT(p.id) AS project_count 
                            FROM categories c 
                            LEFT JOIN projects p ON c.id = p.category_id 
                            GROUP BY c.id 
                            ORDER BY c.sort_order ASC");
        $categories = $stmt->fetchAll();
        jsonResponse(true, 'Categories retrieved successfully', $categories);
        break;

    case 'POST':
        Auth::requireApiAuth();
        $input = getJsonInput();

        $name = trim($input['name'] ?? '');
        $slug = trim($input['slug'] ?? '');
        $sectionId = trim($input['section_id'] ?? $slug);

        if (empty($name) || empty($slug)) {
            jsonResponse(false, 'Category Name and Slug are required.', null, 422);
        }

        $stmt = $db->prepare("INSERT INTO categories (slug, name, section_id, subtitle, accent_color, sort_order, is_active)
                              VALUES (:slug, :name, :section_id, :subtitle, :accent_color, :sort_order, :is_active)");
        $stmt->execute([
            'slug'         => $slug,
            'name'         => $name,
            'section_id'   => $sectionId,
            'subtitle'     => $input['subtitle'] ?? '',
            'accent_color' => $input['accent_color'] ?? 'violet',
            'sort_order'   => (int)($input['sort_order'] ?? 0),
            'is_active'    => isset($input['is_active']) ? (int)$input['is_active'] : 1
        ]);

        jsonResponse(true, 'Category created successfully', ['id' => (int)$db->lastInsertId()], 201);
        break;

    case 'PUT':
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Category ID is required', null, 422);
        }

        $stmt = $db->prepare("UPDATE categories SET 
            slug = :slug,
            name = :name,
            section_id = :section_id,
            subtitle = :subtitle,
            accent_color = :accent_color,
            sort_order = :sort_order,
            is_active = :is_active
            WHERE id = :id");

        $stmt->execute([
            'id'           => $id,
            'slug'         => trim($input['slug'] ?? ''),
            'name'         => trim($input['name'] ?? ''),
            'section_id'   => trim($input['section_id'] ?? ''),
            'subtitle'     => $input['subtitle'] ?? '',
            'accent_color' => $input['accent_color'] ?? 'violet',
            'sort_order'   => (int)($input['sort_order'] ?? 0),
            'is_active'    => isset($input['is_active']) ? (int)$input['is_active'] : 1
        ]);

        jsonResponse(true, 'Category updated successfully');
        break;

    case 'DELETE':
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Category ID is required', null, 422);
        }

        $stmt = $db->prepare("DELETE FROM categories WHERE id = :id");
        $stmt->execute(['id' => $id]);

        jsonResponse(true, 'Category deleted successfully');
        break;

    default:
        jsonResponse(false, 'Method not allowed', null, 405);
}
