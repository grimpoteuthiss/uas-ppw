<?php
session_start();

include "db.php";

echo json_encode(save_user($_SESSION['user']['username']));