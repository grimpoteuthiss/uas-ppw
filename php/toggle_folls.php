<?php
session_start();

include 'db.php';

$uname = $_GET['u'];
$res = toggle_folls($uname,$_SESSION['user']['id']);
//$user = get_user($uname, $_SESSION['user']['id']);
echo json_encode($res);