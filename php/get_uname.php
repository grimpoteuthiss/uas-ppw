<?php
session_start();

include 'db.php';
include 'header.php';


$uname = $_GET['u'];
$user = get_user_cmp($uname, $_SESSION['user']['id']);
echo json_encode($user);