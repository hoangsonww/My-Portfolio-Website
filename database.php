<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'password');
define('DB_NAME', 'your_database');
define('DB_CHARSET', 'utf8mb4');

// Connect to Database
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}

function createTable($table_name, $fields) {
    global $pdo;
    $sql = "CREATE TABLE IF NOT EXISTS $table_name ($fields)";
    $pdo->exec($sql);
}

function dropTable($table_name) {
    global $pdo;
    $sql = "DROP TABLE IF EXISTS $table_name";
    $pdo->exec($sql);
}

// CRUD Operations for Users

// User Authentication
function authenticateUser($username, $password) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() == 1) {
        $user = $stmt->fetch();
        return password_verify($password, $user['password']);
    }
    return false;
}

function createUser($username, $password) {
    global $pdo;
    $sql = "INSERT INTO users (username, password) VALUES (:username, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->execute();
}

function readUsers() {
    global $pdo;
    $sql = "SELECT * FROM users";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function updateUser($id, $username, $password) {
    global $pdo;
    $sql = "UPDATE users SET username = :username, password = :password WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function deleteUser($id) {
    global $pdo;
    $sql = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function readUser($id) {
    global $pdo;
    $sql = "SELECT * FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

// CRUD Operations for Projects
function createProject($title, $description) {
    global $pdo;
    $sql = "INSERT INTO projects (title, description) VALUES (:title, :description)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->execute();
}

function readProjects() {
    global $pdo;
    $sql = "SELECT * FROM projects";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function updateProject($id, $title, $description) {
    global $pdo;
    $sql = "UPDATE projects SET title = :title, description = :description WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function deleteProject($id) {
    global $pdo;
    $sql = "DELETE FROM projects WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function readProject($id) {
    global $pdo;
    $sql = "SELECT * FROM projects WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

$username = 'user';
$password = 'pass';

if (authenticateUser($username, $password)) {
    echo "User authenticated successfully!";
    // Perform CRUD operations or other logic
}
else {
    echo "Authentication failed!";
}

// Error Handling
set_exception_handler(function($e) {
    error_log($e->getMessage());
    echo "An error occurred!";
});
?>
