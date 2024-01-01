<?php

session_start();
include 'header.php';

require 'db.php';

$conn = db_connect();

if (isset($_GET)) {
    $posts = get_own_posts($_SESSION['user']['id']);
    echo json_encode($posts);
}