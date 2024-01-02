<?php
session_start();
include "db.php";
$pid = $_GET['pid'];
$uid = $_SESSION['user']['id'];
$res = is_user_post($uid, $pid);
echo $res;