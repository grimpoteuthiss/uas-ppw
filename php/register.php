<?php

include 'db.php';

if ($_POST) {

    $username = $_POST['username'];
    $password = $_POST['password'];
    $name = $_POST['name'];

    $userid = register_user($name, $password, $username);


    if(!$userid) {
        $error = "Error registering user";
        return;
    }

    if($userid == -1) {
        echo "Username already exist";
        return;
    }
        echo "User registered successfully";


}