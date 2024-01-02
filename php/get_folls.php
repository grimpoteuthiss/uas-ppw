<?php

session_start();
include "db.php";
$res = get_folls($_GET['u']);
echo json_encode($res);