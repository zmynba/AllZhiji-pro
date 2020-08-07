<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<title>Bothlive</title>
	<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	 <style type="text/css">	
		.layout {
			position: absolute;
			top: 40%;
			left: 40%;
			width: 20%;
			height: 20%;
			z-index: 1001;
			text-align:center;
		}
	</style>
</head>
<body>
<div id="layout" class="layout"><img src="o_31.gif" style="width:100%;"/></div>
<?php
/****
header("Content-Type: text/html;charset=utf-8");

$code = $_GET["code"];

$redirect_uri = urlencode("https://wap.bothlive.com/page/h6/call.php");

if(!$code){

	echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Bothlive</title></head><body><script>BLJsBridge.post('finish');</script></body></html>";
	exit;
}

$data = file_get_contents("https://graph.facebook.com/v3.3/oauth/access_token?client_id=450876385474679&client_secret=078e90b26dff944d7584a7f3679f31ec&redirect_uri={$redirect_uri}&code={$code}");

$data = json_decode($data, true);

$access_token = $data['access_token'];

if(!$access_token){
	header('Location: https://www.facebook.com/v3.3/dialog/oauth?client_id=450876385474679&redirect_uri=https%3A%2F%2Fwap.bothlive.com%2Fpage%2Fh6%2Fcall.php&response_type=code&scope');
	exit;
}

$accountinfo = file_get_contents("https://graph.facebook.com/debug_token?access_token=450876385474679%7C078e90b26dff944d7584a7f3679f31ec&input_token={$access_token}");


$accountinfo = json_decode($accountinfo, true);

$openid = $accountinfo["data"]["user_id"];

if(!$openid){
	header('Location: https://www.facebook.com/v3.3/dialog/oauth?client_id=450876385474679&redirect_uri=https%3A%2F%2Fwap.bothlive.com%2Fpage%2Fh6%2Fcall.php&response_type=code&scope');
	exit;
}

$accountinfo = file_get_contents("https://graph.facebook.com/{$openid}?access_token={$access_token}");

$accountinfo = json_decode($accountinfo, true);

$nick = $accountinfo["name"];

$post_data = "facebook".json_encode(array(
	"errno"=>0,
    "id"=>$openid, 
    "name"=>$nick
));

echo "<script>BLJsBridge.post('" . $post_data . "');</script>";
****/
?>
</body>
</html>