<?php
session_start();

include 'db.php';

if($_POST) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    $res = verify_login( $username, $password);

    if ($res == 'Login success') {
        $user= save_user($username);
        $_SESSION['user'] = $user;
    }

    echo $res;
}
