<?php
session_start();
include "db.php";
$uid = $_SESSION['user']['id'];
$pid = $_GET['pid'];
$action = $_GET['action'];

if ($action == 'like'){
    like($pid, $uid);
} else {
    unlike($pid, $uid);
}