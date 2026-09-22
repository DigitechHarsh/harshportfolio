<?php
/**
 * Contact Form & Inquiries REST API Endpoint
 */

require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/auth.php';

handleCors();

$method = $_SERVER['REQUEST_METHOD'];
$db = Database::getConnection();

switch ($method) {
    case 'POST':
        // Public submission of contact form
        $input = getJsonInput();

        $name = trim($input['name'] ?? '');
        $email = trim($input['email'] ?? '');
        $phone = trim($input['phone'] ?? '');
        $subject = trim($input['subject'] ?? 'Portfolio Inquiry');
        $message = trim($input['message'] ?? '');

        if (empty($name) || empty($email) || empty($message)) {
            jsonResponse(false, 'Name, Email, and Message are required fields.', null, 422);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonResponse(false, 'Please provide a valid email address.', null, 422);
        }

        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

        $stmt = $db->prepare("INSERT INTO messages (name, email, phone, subject, message, status, ip_address, user_agent)
                              VALUES (:name, :email, :phone, :subject, :message, 'new', :ip, :ua)");
        $stmt->execute([
            'name'    => $name,
            'email'   => $email,
            'phone'   => $phone,
            'subject' => $subject,
            'message' => $message,
            'ip'      => substr($ip, 0, 45),
            'ua'      => substr($userAgent, 0, 500)
        ]);

        $messageId = (int)$db->lastInsertId();

        // Optional: Send Email Notification via PHP mail()
        $adminEmail = 'aicreationsbyharsh@gmail.com';
        $emailSubject = "⚡ New Portfolio Inquiry from {$name}";
        $emailBody = "You received a new inquiry from portfolio.harshaicreations.com\n\n" .
                     "Name: {$name}\n" .
                     "Email: {$email}\n" .
                     "Phone: {$phone}\n" .
                     "Subject: {$subject}\n\n" .
                     "Message:\n{$message}\n\n" .
                     "--\nSent automatically from AI Creations Portfolio Terminal";
        $headers = "From: noreply@harshaicreations.com\r\n" .
                   "Reply-To: {$email}\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        @mail($adminEmail, $emailSubject, $emailBody, $headers);

        jsonResponse(true, 'Message sent successfully! We will get back to you shortly.', ['id' => $messageId], 201);
        break;

    case 'GET':
        // Admin: list inquiries
        Auth::requireApiAuth();

        $status = $_GET['status'] ?? null;
        $sql = "SELECT * FROM messages WHERE 1=1";
        $params = [];

        if ($status) {
            $sql .= " AND status = :status";
            $params['status'] = $status;
        }

        $sql .= " ORDER BY created_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $messages = $stmt->fetchAll();

        // Also get unread count
        $unreadStmt = $db->query("SELECT COUNT(*) AS unread_count FROM messages WHERE status = 'new'");
        $unreadCount = (int)($unreadStmt->fetch()['unread_count'] ?? 0);

        jsonResponse(true, 'Messages retrieved', [
            'messages'     => $messages,
            'unread_count' => $unreadCount
        ]);
        break;

    case 'PUT':
        // Admin: update message status (read, replied, archived)
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));
        $status = $input['status'] ?? 'read';

        if (!$id) {
            jsonResponse(false, 'Message ID is required', null, 422);
        }

        $stmt = $db->prepare("UPDATE messages SET status = :status WHERE id = :id");
        $stmt->execute([
            'status' => $status,
            'id'     => $id
        ]);

        jsonResponse(true, 'Message status updated successfully');
        break;

    case 'DELETE':
        // Admin: delete message
        Auth::requireApiAuth();
        $input = getJsonInput();
        $id = (int)($input['id'] ?? ($_GET['id'] ?? 0));

        if (!$id) {
            jsonResponse(false, 'Message ID is required', null, 422);
        }

        $stmt = $db->prepare("DELETE FROM messages WHERE id = :id");
        $stmt->execute(['id' => $id]);

        jsonResponse(true, 'Message deleted successfully');
        break;

    default:
        jsonResponse(false, 'Method not allowed', null, 405);
}
