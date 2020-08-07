//Vue开始
var verification = new Vue({
	el: '#verification',
	data: {
		interLang: interLang,			//国际化
		loginFont: interLang.dpLoginFont,
		mobfont1: interLang.dpMobfont1,
		mobfont2: interLang.dpMobfont2,
		countryCode: '86',
		mobile: '',
		password: '',
		inputMob: 100,
		loginBotton: interLang.loginBotton,
		loginVerification: interLang.loginVerification,
		loginforget: interLang.loginforget,
		loginSend: interLang.dpLoginSend,
		sendNumber: 60,
		smsCode: '',
		msg: '',
		msg1: '',
		msg2: '',
		msg3: '',
		msg4: '',
		msg5: '',
		msg6: '',
		msgLength: 0,
		ScreenH: 0,
	},
	mounted() {
		this.ScreenH = app.clientH;
		var that = this;
		that.inputMob = app.clientW - 110;
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));
		that.mobile = loginCon.mobile;
		that.countryCode = loginCon.countryCode;
		that.sendCode();
	},
	methods: {
		tapMobile() {
		
			if(this.smsCode.length > 1){
				$('.login-font').css('background-image',"url(../image/login/rightbotton@2x.png)");	
				$('.login-font').css('color',"#121212");	
			}else{
				$('.login-font').css('background-image',"url(../image/login/botton@2x.png)");	
				$('.login-font').css('color',"#B89E61");	
			}
		},
		sendCode(){
			var that = this;
			var datarr = {
				regionid: that.countryCode,
				phone: that.mobile,
				type: 'login'
			}
			$.ajax({
				url:"http://u.api.priormatch.com/common/sendsms/"+app.urlc,  
				type : 'post',				
				data: datarr,
				xhrFields: {
					withCredentials: true
				},	
				success:function(sendsms) {
					if(sendsms.errno==0){
						that.sendTime();
						app.showToast({
							title: "发送成功",
							duraiton: 1500
						})
					}else{
						app.showToast({
							title: sendsms.errmsg,
							duraiton: 1500
						})
					}
					//console.log(sendsms);
				}, 
			});
		},
		sendTime() {
			var that = this;
			if (that.sendNumber == 0) {
				that.sendNumber = 60;
				return;
			} else {
				that.sendNumber--;
			}
			//console.log(that.sendNumber);
			setTimeout(function() {
				that.sendTime();
			},1000);
		},
		focus(){
			this.tapMobile();
			this.$refs.pwd.focus();
		},
		//输入框置空
		tapEmpty(){
			this.password = '';
			this.tapMobile();
			$('.login_mobile').focus();
		},

		//测试
		checkPass() {
			var that = this;
			var datarr = {
				regionid: that.countryCode,
				phone: that.mobile,
				smscode: that.smsCode,
			}
			$.ajax({
				url:"http://u.api.priormatch.com/user/login/"+app.urlc,  
				type : 'post',				
				data: datarr,
				xhrFields: {
					withCredentials: true
				},	
				success:function(login) {
					console.log(login);
					if(login.errno == 0){
						$.ajax({  
								url:"http://u.api.priormatch.com/common/token/"+app.urlc,  
								type : 'get',
								data: '', 
								xhrFields: {
									withCredentials: true
								},	
								success:function(token) {  			
									//console.log(token);
									if(token.errno == 0){
										var tokens = 'bl_time='+ token.data.bl_time +'&bl_token='+ token.data.bl_token+'&uid='+ token.data.uid;
										localStorage.setItem('token', tokens);
										localStorage.setItem('rYToken', token.data.bl_token);
										$.ajax({
											url:"http://m.api.priormatch.com/user/myinfo"+app.urlc+"&"+tokens,
											type : 'get',				
											data: '', 
											xhrFields: {
												withCredentials: true
											},
											success:function(res) {
												//console.log('查看', res);
												if(res.errno == 0) {
													var userArr = res.data.uinfo;
													localStorage.setItem('userArr', JSON.stringify(userArr));
													location.replace('page/index.html');
												}else{
													app.showToast({
														title: res.errmsg,
														duraiton: 1500
													})
													window.location.href = '../index.html';
												}
																			
											},  
										});
										
										
									}else{
										app.showToast({
											title: token.errmsg,
											duraiton: 1500
										})
										
									}
								},  
								timeout:3000  
							});
					}else{
						app.showToast({
							title: login.errmsg,
							duraiton: 1500
						})
					}
					//console.log(login);
				}, 
			});			
		}
	},
	watch: {
		msg(curVal) {
			this.tapMobile();
			if(/[^\d]/g.test(curVal)) {
				this.msg = this.msg.replace(/[^\d]/g, '');
			} else {
				var cl = curVal.length;
				//console.log(curVal);
				if(cl == 0) {
					this.msg1 = '';
					this.msg2 = '';
					this.msg3 = '';
					this.msg4 = '';
					this.msg5 = '';
					this.msg6 = '';
				} else if(cl == 1) {
					this.msg1 = curVal.substr(curVal.length - 1, 1);
					this.msg2 = '';
					this.msg3 = '';
					this.msg4 = '';
					this.msg5 = '';
					this.msg6 = '';
				} else if(cl == 2) {
					this.msg2 = curVal.substr(curVal.length - 1, 1);
					this.msg3 = '';
					this.msg4 = '';
					this.msg5 = '';
					this.msg6 = '';
				} else if(cl == 3) {
					this.msg3 = curVal.substr(curVal.length - 1, 1);
					this.msg4 = '';
					this.msg5 = '';
					this.msg6 = '';
				} else if(cl == 4) {
					this.msg4 = curVal.substr(curVal.length - 1, 1);
					this.msg5 = '';
					this.msg6 = '';
				} else if(cl == 5) {
					this.msg5 = curVal.substr(curVal.length - 1, 1);
					this.msg6 = '';
				} else {
					this.msg6 = curVal.substr(curVal.length - 1, 1);
				}
				this.smsCode = curVal;
			}
		},
	},

	computed: {
		min() {

		}
	}
})