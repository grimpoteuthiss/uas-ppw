<?php
session_start();
include "db.php";
$post = $_POST['post'];
$usr = $_SESSION['user']['id'];
$comment = $_POST['comment'];
$id = add_comment($post, $usr, $comment);
$res = get_comment($id);
echo json_encode($res);
