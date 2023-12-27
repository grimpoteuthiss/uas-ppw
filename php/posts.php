<?php

// Connect to DB
require 'db.php';

$conn = db_connect();

if(isset($_GET)) {
    $posts = get_all_posts();
    echo json_encode($posts);
//    echo "got it";
}

if($_POST && isset($_POST['create'])) {

    $user_id = $_POST['user_id'];
    $text = $_POST['text'];
    $image_url = $_POST['image_url'];

    $post_id = create_post($conn, $user_id, $text, $image_url);

    echo "Post created successfully with ID: $post_id";

}

if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {

    $post_id = $_POST['post_id'];
    $text = $_POST['text'];

    update_post($conn, $post_id, $text);

    echo "Post updated successfully";

}

if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {

    $post_id = $_POST['post_id'];

    delete_post($conn, $post_id);

    echo "Post deleted successfully";

}