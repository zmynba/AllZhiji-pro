

//Vue开始
var passlogin = new Vue({
	el: '#passlogin',
	data: {
		interLang: interLang,			//国际化
		loginFont: interLang.phoneloginFont,
		mobfont1: interLang.mobfont1,
		mobfont2: interLang.mobfont2,
		countryCode: '86',
		mobile: '',
		password: '',
		inputMob: 100,
		loginBotton: interLang.loginBotton,
		loginVerification: interLang.loginVerification,
		loginforget: interLang.loginforget,
		aeskey: '',
		ScreenH: 0,
	},
	mounted() {
		this.ScreenH = app.clientH;
		var that = this;
		that.inputMob = app.clientW-110;
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));			
		that.mobile = loginCon.mobile;
		that.countryCode = loginCon.countryCode;	
		$.ajax({  
			url:"http://u.api.priormatch.com/common/aeskey/"+app.urlc,  
			type : 'get',				
			data: '', 
			xhrFields: {
				withCredentials: true
			},	
			success:function(aeskey) {  			
				console.log(aeskey);
				if(aeskey.errno == 0){
					that.aeskey = aeskey.data;
					
				}else{
					app.showToast({
						title: aeskey.errmsg,
						duraiton: 1500
					})
				}
			},  
			timeout:3000  
		});	
	},
	methods: {
		tapMobile(){
			if(this.min > 0){
				$('.login-font').css('background-image',"url(../image/login/rightbotton@2x.png)");	
				$('.login-font').css('color',"#121212");	
			}else{
				$('.login-font').css('background-image',"url(../image/login/botton@2x.png)");	
				$('.login-font').css('color',"#B89E61");	
			}
		},
		//输入框置空
		tapEmpty(){
			this.password = '';
			this.tapMobile();
			$('.login_mobile').focus();
		},
		//点击登录
		checkPass(){
			var that = this;
			var pwd = that.password;
			var k = that.aeskey;
			var c = '';
			
			for(var i=0;i<pwd.length;i++){
				var b = String.fromCharCode(pwd.charCodeAt(i)^k.charCodeAt(i));
				c =c + b;
			}
			pwd = Base64.encode(c);
			//console.log(pwd);
			var decode = Base64.decode(pwd);
			//console.log(decode);
			var datarr = {
				regionid: that.countryCode,
				phone: that.mobile,
				pwd: pwd,
				aeskey: that.aeskey
			}
			$.ajax({
				url:"http://u.api.priormatch.com/user/login/"+app.urlc,  
				type : 'post',				
				data: datarr,  
				xhrFields: {
					withCredentials: true
				},	
				success:function(checkphone) {  
					console.log(checkphone);
					if(checkphone.errno == 0){
						localStorage.setItem('userArr', JSON.stringify(checkphone.data));
						if(checkphone.data.gender == 0){
							location.replace('editinformation.html');
						}else{
							$.ajax({  
								url:"http://u.api.priormatch.com/common/token/"+app.urlc,  
								type : 'get',
								data: '', 
								xhrFields: {
									withCredentials: true
								},	
								success:function(token) {  			
									console.log(token);
									if(token.errno == 0){
										var tokens = 'bl_time='+ token.data.bl_time +'&bl_token='+ token.data.bl_token+'&uid='+ token.data.uid;
										localStorage.setItem('token', tokens);
										localStorage.setItem('rYToken', token.data.bl_token);
										location.replace('page/online.html');
										
									}else{
										app.showToast({
											title: "请输入密码",
											duraiton: 1500
										})
										
									}
								},  
								timeout:3000  
							});
												
						}
					}else{
						app.showToast({
							title: checkphone.errmsg,
							duraiton: 1500
						})
						that.tapEmpty();
						$.ajax({  
								url:"http://u.api.priormatch.com/common/aeskey/"+app.urlc,  
								type : 'get',				
								data: '', 
								xhrFields: {
									withCredentials: true
								},	
								success:function(aeskey) {  			
									console.log(aeskey);
									if(aeskey.errno == 0){
										that.aeskey = aeskey.data;
										
									}else{
										app.showToast({
											title: aeskey.errmsg,
											duraiton: 1500
										})
									}
								},  
								timeout:3000  
							});	
					}
				},  
				timeout:3000  
			});			
			
	
		},
		
	},
	computed: {
		min(){
			if(this.password){
				return this.password.length;
			}
			
		}
	}
})
