<?php

header("Content-type: text/html; charset=utf-8");
$appid = 'wxcc05318c3a52edf7';
header('location:https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$appid.'&redirect_uri=http://wap.bothlive.com/WX/oauth.php&response_type=code&scope=snsapi_userinfo&state=12d3&connect_redirect=1#wechat_redirect');

?>