//Vue开始
var forget = new Vue({
	el: '#forget',
	data: {
		interLang: interLang,			//国际化
		countryCode: '86',
		mobile: '',
		password: '',
		inputMob: 100,
		loginBotton: interLang.loginBotton,
		registerBotton: interLang.nextstep,
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
		that.inputMob = app.clientW-110;
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));			
		that.mobile = loginCon.mobile;
		that.countryCode = loginCon.countryCode;	
		that.sendCode();
			
	},
	methods: {
		sendCode(){
			var that = this;
			var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));
			that.mobile = loginCon.mobile;
			that.countryCode = loginCon.countryCode;
			that.countryCodeEn = loginCon.countryCodeEn;
			var datarr = {
				regionid: that.countryCode,
				phone: that.mobile,
				type: 'forget'
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
							title: that.interLang.dpSendMobile,
							duraiton: 1500
						})
					}else{
						app.showToast({
							title: sendsms.errmsg,
							duraiton: 1500
						})
					}
					console.log(sendsms);
				},  
				timeout:3000  
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
			console.log(that.sendNumber);
			setTimeout(function() {
				that.sendTime();
			},1000);
		},
		tapMobile(){
			if(this.smsCode.length > 1){
				$('.login-font').css('background-image',"url(../image/login/rightbotton@2x.png)");
				$('.login-font').css('color',"#121212");	
			}else{
				$('.login-font').css('background-image',"url(../image/login/botton@2x.png)");	
				$('.login-font').css('color',"#B89E61");	
			}
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
		checkPass(){
			var that = this;
			var datarr = {
				regionid: that.countryCode,
				phone: that.mobile,
				smscode: that.smsCode
			}
			$.ajax({
				url:"http://u.api.priormatch.com/forget/checksms/"+app.urlc,  
				type : 'post',				
				data: datarr,  
				xhrFields: {
					withCredentials: true
				},	
				success:function(checksms) {  
					console.log(checksms);
					if(checksms.errno==0){
						//window.localStorage.setItem('loginCon', JSON.stringify(loginCon));
						location.replace('forgetpwd.html');
						
					}else{
						that.sendTime();
						app.showToast({
							title: checksms.errmsg,
							duraiton: 1500
						})
					}
				},  
				timeout:3000  
			});			

		},
		
	},
	watch: {
		msg(curVal) {
			this.tapMobile();
			if(/[^\d]/g.test(curVal)) {
				this.msg = this.msg.replace(/[^\d]/g, '');
			} else {
				var cl = curVal.length;
				console.log(curVal);
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
		min(){
			if(this.smsCode){
				return this.smsCode.length;
			}
			
		}
	}
})
