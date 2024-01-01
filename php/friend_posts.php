<?php
session_start();

require 'db.php';
include 'header.php';

$conn = db_connect();

if (isset($_GET)) {
    $posts = get_friend_posts($_SESSION['user']['id']);
    echo json_encode($posts);
}