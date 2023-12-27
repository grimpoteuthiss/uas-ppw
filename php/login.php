<?php
session_start();

include 'db.php';

if($_POST) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    $res = verify_login( $username, $password);

    if ($res == 'Login success') {
        $_SESSION['user'] = get_user($username);
    }

    echo $res;
}
