<?php

// Connect to DB
require 'db.php';

session_start();

$conn = db_connect();

//echo json_encode(array("files"=>$_FILES, "post"=>$_POST, "get"=>$_GET, "server"=>$_SERVER, "session"=>$_SESSION));


if($_SERVER['REQUEST_METHOD'] === 'GET' ) {
    $posts = get_all_posts();
    echo json_encode($posts);
}

if($_SERVER['REQUEST_METHOD'] === 'POST' ) {


    $user_id = $_SESSION['user']['id'];
    $text = $_POST['text'];
    $filename = $_FILES['img']['name'];
    $tmp_name = $_FILES['img']['tmp_name'];
    $ext = explode('.', $filename)[1];
//    $upload_dir = '/Applications/XAMPP/xamppfiles/htdocs/uas-ppw/upload/';
    $upload_dir = '/var/www/html/upload/';
    $file  = uniqid().'.'.$ext;
    $uploaded = move_uploaded_file($tmp_name, $upload_dir.$file);
    $uri = 'https://ppw.ktsabit.com/upload/' . $file;
    $post_id = create_post($user_id, $text, $upload_dir.$file);
    echo json_encode($uri);

}


if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {

    $post_id = $_POST['post_id'];

    delete_post($conn, $post_id);

    echo "Post deleted successfully";

}