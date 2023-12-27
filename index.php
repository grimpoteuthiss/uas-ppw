<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/');
$dotenv->load();

if (isset($_SESSION['user'])) {
    header('Location: home_page.html');
} else {
    header('Location: login_page.html');
}
