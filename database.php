<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'xyz123');
define('DB_NAME', 'postgresql');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');
define('DB_PREFIX', '');

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

function createDatabase($database_name) {
    global $pdo;
    $sql = "CREATE DATABASE IF NOT EXISTS $database_name";
    $pdo->exec($sql);
}

function dropDatabase($database_name) {
    global $pdo;
    $sql = "DROP DATABASE IF EXISTS $database_name";
    $pdo->exec($sql);
}

function createDatabaseTable($database_name, $table_name, $fields) {
    global $pdo;
    $sql = "CREATE TABLE IF NOT EXISTS $database_name.$table_name ($fields)";
    $pdo->exec($sql);
}

function dropDatabaseTable($database_name, $table_name) {
    global $pdo;
    $sql = "DROP TABLE IF EXISTS $database_name.$table_name";
    $pdo->exec($sql);
}

function createDatabaseTableColumn($database_name, $table_name, $column_name, $column_type) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name ADD $column_name $column_type";
    $pdo->exec($sql);
}

function dropDatabaseTableColumn($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name DROP COLUMN $column_name";
    $pdo->exec($sql);
}

function createDatabaseTableColumnIndex($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name ADD INDEX ($column_name)";
    $pdo->exec($sql);
}

function dropDatabaseTableColumnIndex($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name DROP INDEX $column_name";
    $pdo->exec($sql);
}

function createDatabaseTableColumnForeignKey($database_name, $table_name, $column_name, $foreign_table_name, $foreign_column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name ADD FOREIGN KEY ($column_name) REFERENCES $foreign_table_name($foreign_column_name)";
    $pdo->exec($sql);
}

function dropDatabaseTableColumnForeignKey($database_name, $table_name, $column_name, $foreign_table_name, $foreign_column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name DROP FOREIGN KEY $column_name";
    $pdo->exec($sql);
}

function createDatabaseTableColumnUnique($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name ADD UNIQUE ($column_name)";
    $pdo->exec($sql);
}

function dropDatabaseTableColumnUnique($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name DROP INDEX $column_name";
    $pdo->exec($sql);
}

function createDatabaseTableColumnAutoIncrement($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name MODIFY $column_name INT AUTO_INCREMENT";
    $pdo->exec($sql);
}

function dropDatabaseTableColumnAutoIncrement($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name MODIFY $column_name INT";
    $pdo->exec($sql);
}

function createDatabaseTableColumnPrimaryKey($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name ADD PRIMARY KEY ($column_name)";
    $pdo->exec($sql);
}

function dropDatabaseTableColumnPrimaryKey($database_name, $table_name, $column_name) {
    global $pdo;
    $sql = "ALTER TABLE $database_name.$table_name DROP PRIMARY KEY $column_name";
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

// CRUD Operations for Tasks
function createTask($title, $description, $project_id) {
    global $pdo;
    $sql = "INSERT INTO tasks (title, description, project_id) VALUES (:title, :description, :project_id)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->bindParam(':project_id', $project_id, PDO::PARAM_INT);
    $stmt->execute();
}

function readTasks() {
    global $pdo;
    $sql = "SELECT * FROM tasks";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function updateTask($id, $title, $description, $project_id) {
    global $pdo;
    $sql = "UPDATE tasks SET title = :title, description = :description, project_id = :project_id WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->bindParam(':project_id', $project_id, PDO::PARAM_INT);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function deleteTask($id) {
    global $pdo;
    $sql = "DELETE FROM tasks WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function readTask($id) {
    global $pdo;
    $sql = "SELECT * FROM tasks WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

function readTasksByProject($project_id) {
    global $pdo;
    $sql = "SELECT * FROM tasks WHERE project_id = :project_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':project_id', $project_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll();
}

function chat($message) {
    global $pdo;
    $sql = "INSERT INTO chat (message) VALUES (:message)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->execute();
}

function chatBot($message) {
    global $pdo;
    $sql = "INSERT INTO chatbot (message) VALUES (:message)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->execute();
}

function readChat() {
    global $pdo;
    $sql = "SELECT * FROM chat";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function readChatBot() {
    global $pdo;
    $sql = "SELECT * FROM chatbot";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function userCreate($username, $password) {
    global $pdo;
    $sql = "INSERT INTO users (username, password) VALUES (:username, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->execute();
}

function userRead() {
    global $pdo;
    $sql = "SELECT * FROM users";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function userUpdate($id, $username, $password) {
    global $pdo;
    $sql = "UPDATE users SET username = :username, password = :password WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function userDelete($id) {
    global $pdo;
    $sql = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function chatBotResponse($message) {
    global $pdo;
    $sql = "INSERT INTO chatbot (message) VALUES (:message)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    $stmt->execute();
}

function chatBotRead() {
    global $pdo;
    $sql = "SELECT * FROM chatbot";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function authenticatedUser($username, $password) {
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

function skillsCreate($username, $password) {
    global $pdo;
    $sql = "INSERT INTO skills (username, password) VALUES (:username, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->execute();
}

function skillsUpdate($id, $username, $password) {
    global $pdo;
    $sql = "UPDATE skills SET username = :username, password = :password WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function skillsDelete($id) {
    global $pdo;
    $sql = "DELETE FROM skills WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function skillsRead($id) {
    global $pdo;
    $sql = "SELECT * FROM skills WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

function servicesCreate($username, $password) {
    global $pdo;
    $sql = "INSERT INTO services (username, password) VALUES (:username, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->execute();
}

function servicesUpdate($id, $username, $password) {
    global $pdo;
    $sql = "UPDATE services SET username = :username, password = :password WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function servicesDelete($id) {
    global $pdo;
    $sql = "DELETE FROM services WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function servicesRead($id) {
    global $pdo;
    $sql = "SELECT * FROM services WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

function qualificationsCreate($username, $password) {
    global $pdo;
    $sql = "INSERT INTO qualifications (username, password) VALUES (:username, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->execute();
}

function qualificationsUpdate($id, $username, $password) {
    global $pdo;
    $sql = "UPDATE qualifications SET username = :username, password = :password WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function qualificationsDelete($id) {
    global $pdo;
    $sql = "DELETE FROM qualifications WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
}

function qualificationsRead($id) {
    global $pdo;
    $sql = "SELECT * FROM qualifications WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch();
}

function resume($username, $password) {
    global $pdo;
    $sql = "INSERT INTO resume (username, password) VALUES (:username, :password)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
    $stmt->execute();
}

// Create Tables
createTable('users', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL');
createTable('projects', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT');
createTable('tasks', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, project_id INT(11) NOT NULL');
createTable('chat', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, message VARCHAR(255) NOT NULL');
createTable('chatbot', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, message VARCHAR(255) NOT NULL');
createTable('skills', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL');
createTable('services', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL');
createTable('qualifications', 'id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL');

// Drop Tables
dropTable('users');
dropTable('projects');
dropTable('tasks');
dropTable('chat');
dropTable('chatbot');
dropTable('skills');
dropTable('services');
dropTable('qualifications');

$username = 'user';
$password = 'pass';

if (authenticateUser($username, $password)) {
    echo "User authenticated successfully!";
    authenticatedUser($username, $password);
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
