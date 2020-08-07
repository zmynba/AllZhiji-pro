

//Vue开始
var passlogin = new Vue({
	el: '#passlogin',
	data: {
		loginFont: "设置登录密码",
		passwordFont: "密码由6-20位字母和数字组成",
		passwordmsg: '密码由6-20位字母和数字组成',
		countryCode: '86',
		mobile: '',
		password: '',
		inputMob: 100,
		registerBotton: "下一步",
		ScreenH: 0,
		interLang: interLang,	//国际化

	},
	mounted() {
		var that = this;
		that.ScreenH = app.clientH;
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
				$('.login-font').css('background-image',"url(../page/img/loginShow.png)");				
			}else{
				$('.login-font').css('background-image',"url(../page/img/loginBottom.png)");				
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
				var k = that.aeskey;
				var c = '';
				var code = JSON.parse(window.localStorage.getItem('code'));	
				for(var i=0;i<pwd.length;i++){
					var b = String.fromCharCode(pwd.charCodeAt(i)^k.charCodeAt(i));
					c =c + b;
				}
				pwd = Base64.encode(c);
				console.log(pwd);
				var decode = Base64.decode(pwd);
				console.log(decode);
				var datarr = {
					pwd: pwd,
					pcode: code,
					aeskey: that.aeskey
				}
				$.ajax({
					url:"http://u.api.priormatch.com/user/reg/"+app.urlc,  
					type : 'post',				
					data: datarr,  
					xhrFields: {
						withCredentials: true
					},	
					success:function(regarr) {  
						console.log(regarr);
						if(regarr.errno == 0){
							localStorage.setItem('userArr', JSON.stringify(regarr.data));	
							if(regarr.data.gender == 0){
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
										location.replace('page/index.html');
										
									}else{
										app.showToast({
											title: token.errmsg,
											duraiton: 1500
										})
										
									}
								},  
								timeout:3000  
							});
								
						}
					}else{
						app.showToast({
							title: regarr.errmsg,
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
					
			}else{
				app.showToast({
					title: that.interLang.dpAdd2,
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
