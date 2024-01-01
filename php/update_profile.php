<?php
session_start();
include "db.php";

$username = $_POST['username'];
$old_username = $_POST['old_username'];
$name = $_POST['name'];
$url = $_POST['url'];
$user = $_SESSION['user'];
$res = update_user($old_username, $username, $name, $url);
$user['username'] = $username;
$_SESSION['user'] = $user;

echo $res;