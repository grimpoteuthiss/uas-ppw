<?php
session_start();
include "db.php";

$username = $_POST['username'];
$old_username = $_POST['old_username'];
$name = $_POST['name'];
$user = $_SESSION['user'];

$url = '';
if (isset($_FILES['img'])) {
    $filename = $_FILES['img']['name'];
    $tmp_name = $_FILES['img']['tmp_name'];
    $uri = null;
    $ext = explode('.', $filename)[1];
    $url  = uniqid().'.'.$ext;
    $upload_dir = '../upload/';
    $uploaded = move_uploaded_file($tmp_name, $upload_dir.$url);
    if ($uploaded) {
        $url  = 'https://ppw.ktsabit.com/upload/' . $url;
    } else {
        $url = null;
    }
} else {
    $url = $_POST['url'];
}

echo $tmp_name . 'aa'. $upload_dir.'aa' . $url;


$res = update_user($old_username, $username, $name, $url);

//echo $res;


//if($_SERVER['REQUEST_METHOD'] === 'POST' ) {
//
//
//    $user_id = $_SESSION['user']['id'];
//    $text = $_POST['text'];
//    $file = '';
//    if (isset($_FILES['img'])) {
//        $filename = $_FILES['img']['name'];
//        $tmp_name = $_FILES['img']['tmp_name'];
//        $uri = null;
//        $ext = explode('.', $filename)[1];
//        $file  = uniqid().'.'.$ext;
//        $upload_dir = '../upload/';
//        $uploaded = move_uploaded_file($tmp_name, $upload_dir.$file);
//        if ($uploaded) {
//            $file  = 'https://ppw.ktsabit.com/upload/' . $file;
//        } else {
//            $file = null;
//        }
//    } else {
//        $file = null;
//    }
//
////    $upload_dir = '/Applications/XAMPP/xamppfiles/htdocs/uas-ppw/upload/';
//
//    $post_id = create_post($user_id, $text, $file);
//    echo json_encode('yes');
//
//}