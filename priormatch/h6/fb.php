<?php

$code = $_GET["code"];

$redirect_uri = urlencode("https://wap.bothlive.com/page/h6/call.php");

$data = file_get_contents("https://graph.facebook.com/v3.3/oauth/access_token?client_id=450876385474679&client_secret=078e90b26dff944d7584a7f3679f31ec&redirect_uri={$redirect_uri}&code={$code}");

$data = json_decode($data, true);

$access_token = $data['access_token'];

$accountinfo = file_get_contents("https://graph.facebook.com/debug_token?access_token=450876385474679%7C078e90b26dff944d7584a7f3679f31ec&input_token={$access_token}");

$accountinfo = json_decode($accountinfo, true);

$openid = $accountinfo["id"];

$accountinfo = file_get_contents("https://graph.facebook.com/{$openid}?access_token={$access_token}");

$accountinfo = json_decode($accountinfo, true);

$nick = $accountinfo["name"];


