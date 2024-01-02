<?php

session_start();
include "db.php";
$res = get_follw($_GET['u']);
echo json_encode($res);