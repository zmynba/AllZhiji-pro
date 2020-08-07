<?php 
	header("Content-type: text/html; charset=utf-8");
	$client_id = 6772912;
	$redirect_uri = 'http://wapx.bothlive.com/index.html';
	$v = '5.101';
	$token_url = 'https://oauth.vk.com/authorize?client_id='.$client_id.'&display=page&redirect_uri='.$redirect_uri.'&scope=friends&response_type=token&v='.$v;
	header("Location: ".$token_url); 
	exit;

?>