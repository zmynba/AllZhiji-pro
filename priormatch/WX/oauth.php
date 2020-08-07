<?php
//php.ini 找到 extension=php_openssl.dll 需要开启这个。
header("Content-type: text/html; charset=utf-8");
$code = $_GET['code'];
$state = $_GET['state'];

//换成自己的接口信息
$appid = 'wxcc05318c3a52edf7';
$appsecret = '74dd5f9e88a2e91385ee20bddef8c07f';
if (empty($code)) $this->error('授权失败');
$token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$appsecret.'&code='.$code.'&grant_type=authorization_code';
$token = json_decode(file_get_contents($token_url, false));

if (isset($token->errcode)) {
    echo '<h1>错误：</h1>'.$token->errcode;
    echo '<br/><h2>错误信息：</h2>'.$token->errmsg;
    exit;
}
$access_token_url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='.$appid.'&grant_type=refresh_token&refresh_token='.$token->refresh_token;
//转成对象
$access_token = json_decode(file_get_contents($access_token_url, false));
if (isset($access_token->errcode)) {
    echo '<h1>错误：</h1>'.$access_token->errcode;
    echo '<br/><h2>错误信息：</h2>'.$access_token->errmsg;
    exit;
}



$user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$access_token->access_token.'&openid='.$access_token->openid.'&lang=zh_CN';
//转成对象
$user = file_get_contents($user_info_url, false);
$user_info = json_decode($user);
if (isset($user_info->errcode)) {
    echo '<h1>错误：</h1>'.$user_info->errcode;
    echo '<br/><h2>错误信息：</h2>'.$user_info->errmsg;
    exit;
}
$access_token = $access_token->access_token;
$openid=$user_info->openid;
$unionid=$user_info->unionid;

header('Content-Type:text/html;charset=utf-8');
echo "<script src='../page/js/jquery-3.1.1.min.js'></script>";
echo "<script type='text/javascript'>
		var code = '';
		try{
		    code = JSON.parse(window.localStorage.getItem('code'));
		    if(code == null){
		        code = '';
		    }
		}catch(err){
		    code = ''
		}
		var dar = {
			type: 'weixin',
			access_token: '".$access_token."',
			openid: '".$unionid."',
			pcode: code,
		}
		$.ajax({  
			url:'http://u.api.bothlive.com/other/accesstoken/?__plat=h5&__version=1.0&channel=h5',  
			type : 'POST',
			data: dar, 
			xhrFields: {
				withCredentials: true
			},	
			success:function(rea) {  
				if(rea.errno == 0){
					if(rea.data.hasphone==0){
						window.location.href = '../triplogin.html';
					}else if(rea.data.needfill== 1){
						window.location.href = '../editinformation.html?type=trip';
					}else{
						$.ajax({  
							url:'http://u.api.bothlive.com/common/token/?__plat=h5&__version=1.0&channel=h5',  
							type : 'get',
							data: '', 
							xhrFields: {
								withCredentials: true
							},	
							success:function(token) {  			
								if(token.errno == 0){
									var tokens = 'bl_time='+ token.data.bl_time +'&bl_token='+ token.data.bl_token+'&uid='+ token.data.uid;
									localStorage.setItem('token', tokens);
									localStorage.setItem('rYToken', token.data.bl_token);
									window.location.href = '../page/index.html';
								}else{
									app.showToast({
										title: token.errmsg,
										duraiton: 1500
									})
									window.location.href = '../index.html';
									
								}
							},
							timeout:3000  
						});
					}
					
				}else{
					window.location.href = '../index.html';					
				}
			},
			timeout:3000  
		});
	</script>";
?>
