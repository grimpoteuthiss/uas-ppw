<?php

include 'db.php';

if($_POST) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    echo verify_login( $username, $password);
}
