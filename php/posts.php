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


//    $user_id = $_SESSION['user']['id'];
    $text = $_POST['text'];
    $file = '';
    if (isset($_FILES['img'])) {
        $filename = $_FILES['img']['name'];
        $tmp_name = $_FILES['img']['tmp_name'];
        $uri = null;
        $ext = explode('.', $filename)[1];
        $file  = uniqid().'.'.$ext;
        $upload_dir = '../upload/';
        $uploaded = move_uploaded_file($tmp_name, $upload_dir.$file);
        if ($uploaded) {
            $file  = 'https://ppw.ktsabit.com/upload/' . $file;
        } else {
            $file = null;
        }
    } else {
        $file = null;
    }

//    $upload_dir = '/Applications/XAMPP/xamppfiles/htdocs/uas-ppw/upload/';

    $post_id = create_post(20, $text, $file);
    echo json_encode('yes');

}

//$ftp_conn = ftp_connect('103.150.196.125');
//ftp_login($ftp_conn, 'ktsabit', 'kaisan');
//
//if (ftp_put($ftp_conn, '/var/www/html/uploads/'.$file, $tmp_name, FTP_BINARY)) {
//    $status = "File uploaded successfully!";
//} else {
//    $status =  "Error uploading file.";
//}
//ftp_close($ftp_conn);


if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {

    $post_id = $_POST['post_id'];

    delete_post($conn, $post_id);

    echo "Post deleted successfully";

}