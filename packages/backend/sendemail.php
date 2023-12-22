<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];

        $to = "hoangson091104@gmail.com";
        $headers = "From: $email" . "\r\n";

        mail($to, $subject, $message, $headers);
        header('Location: about.html');
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);

    }
?>
        
<?php
$host = 'localhost';
$db   = 'portfolio';
$user = 'username';
$pass = 'password';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

function getArticles($pdo) {
    $stmt = $pdo->query('SELECT * FROM articles');
    return $stmt->fetchAll();
}

function getArticle($pdo, $id) {
    $stmt = $pdo->prepare('SELECT * FROM articles WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->fetch();
}

function createArticle($pdo, $title, $content) {
    $stmt = $pdo->prepare('INSERT INTO articles (title, content) VALUES (?, ?)');
    $stmt->execute([$title, $content]);
}

function updateArticle($pdo, $id, $title, $content) {
    $stmt = $pdo->prepare('UPDATE articles SET title = ?, content = ? WHERE id = ?');
    $stmt->execute([$title, $content, $id]);
}

function deleteArticle($pdo, $id) {
    $stmt = $pdo->prepare('DELETE FROM articles WHERE id = ?');
    $stmt->execute([$id]);
}
