<?php

require_once 'vendor/autoload.php';


$client = new Google\Client();
$client->setAuthConfig('client_credentials.json');
$client->addScope("email");
$client->addScope("profile");
$redirectUri = 'https://ppw.ktsabit.com/google_login.php';
$client->setRedirectUri($redirectUri);
$url = $client->createAuthUrl();
echo $url;

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);

    $google_oauth = new Google\Service\Oauth2($client);

    $google_account_info = $google_oauth->userinfo->get();
    echo "hmm";
    foreach ($google_account_info as $key=>$item) {
        echo $item . '<br>';
        echo $key . '<br>';
    }
    $email = $google_account_info->email;
} else {
    header('Location: ' . $url);
}




//$service = new Google\Service\Books($client);
//$query = 'Henry David Thoreau';
//$optParams = [
//    'filter' => 'free-ebooks',
//];
//$results = $service->volumes->listVolumes($query, $optParams);
//
//foreach ($results->getItems() as $item) {
//    echo $item['volumeInfo']['title'], "<br /> \n";
//}