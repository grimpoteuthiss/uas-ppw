<?php

include "db.php";

$pid = $_GET['pid'];
echo delete_post($pid);