<?php

require 'db.php';

$conn = db_connect();

if (isset($_GET)) {
    $users = search_user($_GET['q']);
    echo json_encode($users);
}