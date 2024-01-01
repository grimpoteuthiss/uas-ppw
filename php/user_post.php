<?php


session_start();

require 'db.php';

$conn = db_connect();

if (isset($_GET)) {
    $posts = get_user_post($_GET['u']);
    echo json_encode($posts);
}