<?php

function db_connect()
{

    $conn = mysqli_connect('103.150.196.125', 'kaisan', 'password', 'social_media');

    if (!$conn) {
        die("Database connection failed");
    }

    return $conn;
}

function register_user($name, $password, $username)
{

    $conn = db_connect();
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users(name, username, password) VALUES(?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $name, $username, $hashed_password);
    try {
        mysqli_stmt_execute($stmt);

    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() == 1062) {
            return -1;
        } else {
            throw $e;
        }
    }

    return mysqli_insert_id($conn);
}

function n_rand($n) {
    $temp = "";

    for ($i = 0; $i < $n; $i++) {
        $temp .= rand(0, 9);
    }

    return $temp;
}


function register_user_google($name, $google_id)
{
    $conn = db_connect();
    $sql = "INSERT INTO users(name, username, google_id) VALUES(?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    $username = 'user' . n_rand(10);
    mysqli_stmt_bind_param($stmt, "sss", $name, $username, $google_id);
    try {
        mysqli_stmt_execute($stmt);

    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() == 1062) {
            return -1;
        } else {
            throw $e;
        }
    }

    return mysqli_insert_id($conn);
}

function username_exists($username)
{

    $conn = db_connect();

    $sql = "SELECT * FROM users WHERE username = ?";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        return true;
    } else {
        return false;
    }

}

function google_id_exists($google_id)
{

    $conn = db_connect();

    $sql = "SELECT * FROM users WHERE google_id = ?";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param($stmt, "s", $google_id);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        return true;
    } else {
        return false;
    }

}

// Get user by username
function get_user($username)
{
    $conn = db_connect();
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    return mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
}

function get_user_by_gid($google_id)
{
    $conn = db_connect();
    $sql = "SELECT * FROM users WHERE google_id = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $google_id);
    mysqli_stmt_execute($stmt);
    return mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
}


// Verify login
function verify_login($username, $password)
{

    if (!username_exists($username)) {
        return "Username doesn't exist";
    }

    $user = get_user($username);

    if (password_verify($password, $user['password'])) {
        return "Login success";
    } else {
        return "Wrong password";
    }

}

//echo verify_login('kaisan','kaisan');
//register_user('kaisan', 'ktsabit@gmail.com', 'abc123');

function create_post($user_id, $text, $image_url)
{

    $conn = db_connect();
    $sql = "INSERT INTO posts(user_id, text, image_url) 
          VALUES(?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "iss", $user_id, $text, $image_url);
    mysqli_stmt_execute($stmt);
    return mysqli_insert_id($conn);

}

//create_post(1, "jangan kalian begitu malas", "https sekian sekian");

function get_post($id)
{

    $conn = db_connect();

    $sql = "SELECT * FROM posts WHERE id=?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    return mysqli_fetch_assoc($result);

}


// Get single post
function get_post2($id)
{

    $conn = db_connect();

    $sql = "SELECT * FROM posts WHERE id = ?";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    return mysqli_fetch_assoc($result);
}

function get_all_posts()
{

    $conn = db_connect();

    $sql = "SELECT * FROM posts";

    $result = mysqli_query($conn, $sql);

    return mysqli_fetch_all($result, MYSQLI_ASSOC);

}

function update_post($id, $text)
{

    $conn = db_connect();

    $sql = "UPDATE posts 
          SET text=?  
          WHERE id=?";

    $stmt = mysqli_prepare($conn, $sql);

    mysqli_stmt_bind_param($stmt, "si", $text, $id);

    mysqli_stmt_execute($stmt);

}

function delete_post($id)
{

    $conn = db_connect();

    $sql = "DELETE FROM posts WHERE id=?";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);

    mysqli_stmt_execute($stmt);
}