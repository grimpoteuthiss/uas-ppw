<?php
session_start();


require_once '../vendor/autoload.php';
include "db.php";

$dotenv = Dotenv\Dotenv::createImmutable('../');
$dotenv->load();

$client = new Google\Client();
$client->setAuthConfig('../client_credentials.json');
$client->addScope("email");
$client->addScope("profile");
$redirectUri = $_SERVER['hostpath'] . 'php/google_login.php';
echo $redirectUri;
$client->setRedirectUri($redirectUri);
$url = $client->createAuthUrl();
echo $url;

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    $google_oauth = new Google\Service\Oauth2($client);

    $user = $google_oauth->userinfo->get();
    if (!google_id_exists($user->id)) {
        register_user_google($user->name, $user->id, $user->picture);
    }
    $_SESSION['user'] = get_user_by_gid($user->id);

    header('Location: ../pages/home_page.html');

} else {
    header('Location: ' . $url);
}
