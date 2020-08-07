

//Vue开始
var forgetpwd = new Vue({
	el: '#forgetpwd',
	data: {
		interLang: interLang,			//国际化
		loginFont: interLang.dpAdd1,
		passwordFont: interLang.dpAdd2,
		passwordmsg: interLang.dpAdd2,
		countryCode: '86',
		mobile: '',
		password: '',
		inputMob: 100,
		registerBotton: interLang.nextstep,
		aeskeys: '',
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
					that.aeskeys = aeskey.data;
					
				}else{
					app.showToast({
						title: aeskey.errmsg,
						duraiton: 1500
					})
				}
			}, 
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
		//测试
		checkPass(){
			var that = this;
			var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
			
			if(reg.test(that.password)){
				var pwd = that.password;
				var k = that.aeskeys;
				var c = '';
				
				for(var i=0;i<pwd.length;i++){
					var b = String.fromCharCode(pwd.charCodeAt(i)^k.charCodeAt(i));
					c =c + b;
				}
				console.log(c);
				var keys = Base64.encode(c);
				console.log(keys);
				var datarr = {
					pwd: keys,
					aeskey: that.aeskeys
				}
				$.ajax({				
					url:"http://u.api.priormatch.com/forget/resetpwd/"+app.urlc,  
					type : 'POST',				
					data: datarr, 
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					success:function(resetpwd) {  
						console.log(resetpwd);
						if(resetpwd.errno==0){
							
							location.replace('login.html');
							
						}else{
							app.showToast({
								title: resetpwd.errmsg,
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
										that.aeskeys = aeskey.data;
										
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
				
				});			
				
			}else{
				app.showToast({
					title: that.passwordmsg,
					duraiton: 2000
				})
			}
			
				
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
