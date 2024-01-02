<?php

session_start();

include "db.php";


$id = $_GET['id'];
$post = get_post($id);
echo json_encode($post);