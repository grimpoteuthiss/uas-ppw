<?php
session_start();

include 'db.php';

$uname = $_GET['u'];
$user = get_user($uname, $_SESSION['user']['id']);
echo json_encode($user);