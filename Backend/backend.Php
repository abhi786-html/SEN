<?php
// Database configuration
$host = 'localhost';
$dbname = 'sfben_db';
$username = 'root'; // Use your MySQL username
$password = ''; // Use your MySQL password

// Connect to the database
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Function to fetch articles
function getArticles($pdo, $category) {
    $query = "SELECT * FROM articles WHERE category = :category ORDER BY date DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['category' => $category]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Handle AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['category'])) {
    $category = $_POST['category'];
    $articles = getArticles($pdo, $category);
    echo json_encode($articles);
    exit;
}
