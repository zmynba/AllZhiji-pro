<?php
require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$access_token = $qc->qq_callback();
echo $openid = $qc->get_openid();
$unionid = $qc->get_unionid();
exit;
header('Content-Type:text/html;charset=utf-8');
echo "<script src='../../../page/js/jquery-3.1.1.min.js'></script>";
echo "<script type='text/javascript'>
		var code = JSON.parse(window.localStorage.getItem('code'));	
		var dar = {
			type: 'qq',
			access_token: '".$access_token."',
			openid: '".$unionid."',
			pcode: code,
		};
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
						window.location.href = '../../../triplogin.html';
					}else if(rea.data.needfill== 1){
						window.location.href = '../../../editinformation.html?type=trip';
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
									window.location.href = '../../../page/index.html';
								}else{
									app.showToast({
										title: token.errmsg,
										duraiton: 1500
									})
									window.location.href = '../../../index.html';
									
								}
							},
							timeout:3000  
						});
					}
					
				}else{
					window.location.href = '../../../index.html';					
				}
			},
			timeout:3000  
		});
	</script>";
