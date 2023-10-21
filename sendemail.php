<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];

        $to = "your_email_address@example.com";
        $headers = "From: $email" . "\r\n";

        mail($to, $subject, $message, $headers);
        header('Location: thank-you.html');
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);

    }
?>
