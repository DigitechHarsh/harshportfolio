<?php
/**
 * Tools & Tech Stack REST API Endpoint
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'GET':
        $onlyActive = isset($_GET['all']) ? false : true;
        $sql = "SELECT * FROM tools";
        if ($onlyActive && !Auth::check()) {
            $sql .= " WHERE is_active = 1";
        }
        $sql .= " ORDER BY sort_order ASC, id ASC";

        $stmt = $db->query($sql);
        $tools = $stmt->fetchAll();
        jsonResponse(true, 'Tools retrieved successfully', $tools);
        break;

    case 'POST':
        Auth::requireApiAuth();
        $input = getJsonInput();

        $name = trim($input['name'] ?? '');
        $description = trim($input['description'] ?? '');

        if (empty($name) || empty($description)) {
            jsonResponse(false, 'Tool name and description are required.', null, 422);
        }

        $stmt = $db->prepare("INSERT INTO tools (name, version, status, description, icon, gradient, chip_color, col_span, sort_order, is_active)
                              VALUES (:name, :version, :status, :description, :icon, :gradient, :chip_color, :col_span, :sort_order, :is_active)");
        $stmt->execute([
            'name'        => $name,
            'version'     => $input['version'] ?? 'V1.0',
            'status'      => $input['status'] ?? 'led-green',
            'description' => $description,
            'icon'        => $input['icon'] ?? '⚡',
            'gradient'    => $input['gradient'] ?? 'from-violet-500/20 to-indigo-500/20',
            'chip_color'  => $input['chip_color'] ?? 'text-violet-400 border-violet-500/25 bg-violet-500/5 hover:border-violet-400/40',
            'col_span'    => $input['col_span'] ?? 'md:col-span-2',
            'sort_order'  => (int)($input['sort_order'] ?? 0),
            'is_active'   => isset($input['is_active']) ? (int)$input['is_active'] : 1
        ]);

        jsonResponse(true, 'Tool added successfully', ['id' => (int)$db->lastInsertId()], 201);
        break;

    case 'PUT':
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Tool ID is required', null, 422);
        }

        $stmt = $db->prepare("UPDATE tools SET 
            name = :name,
            version = :version,
            status = :status,
            description = :description,
            icon = :icon,
            gradient = :gradient,
            chip_color = :chip_color,
            col_span = :col_span,
            sort_order = :sort_order,
            is_active = :is_active
            WHERE id = :id");

        $stmt->execute([
            'id'          => $id,
            'name'        => trim($input['name'] ?? ''),
            'version'     => $input['version'] ?? 'V1.0',
            'status'      => $input['status'] ?? 'led-green',
            'description' => trim($input['description'] ?? ''),
            'icon'        => $input['icon'] ?? '⚡',
            'gradient'    => $input['gradient'] ?? 'from-violet-500/20 to-indigo-500/20',
            'chip_color'  => $input['chip_color'] ?? 'text-violet-400 border-violet-500/25 bg-violet-500/5 hover:border-violet-400/40',
            'col_span'    => $input['col_span'] ?? 'md:col-span-2',
            'sort_order'  => (int)($input['sort_order'] ?? 0),
            'is_active'   => isset($input['is_active']) ? (int)$input['is_active'] : 1
        ]);

        jsonResponse(true, 'Tool updated successfully');
        break;

    case 'DELETE':
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Tool ID is required', null, 422);
        }

        $stmt = $db->prepare("DELETE FROM tools WHERE id = :id");
        $stmt->execute(['id' => $id]);

        jsonResponse(true, 'Tool deleted successfully');
        break;

    default:
        jsonResponse(false, 'Method not allowed', null, 405);
}
