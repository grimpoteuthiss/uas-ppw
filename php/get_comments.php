<?php

session_start();

include "db.php";
$res = get_comments($_GET['id']);
echo json_encode($res);
