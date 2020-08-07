//Vue开始
var sendNumber = 60;

var register = new Vue({
	el: '#register',
	data: {
		loginFont: "短信验证码登录",
		mobfont1: "验证码已发送至",
		mobfont2: "请在此输入",
		countryCode: '86',
		countryCodeEn: '',
		mobile: '',
		password: '',
		inputMob: 100,
		registerBotton: "下一步",
		loginVerification: '验证码快捷登录',
		loginforget: '忘记密码',
		loginSend: '重新发送',
		sendNumber: 60,
		smsCode: '',
		msg:'',
		msg1:'',
		msg2:'',
		msg3:'',
		msg4:'',
		msg5:'',
		msg6:'',
        msgLength:0,
		ScreenH: 0,
		interLang: interLang,	//国际化
	},
	mounted() {		
		
		this.ScreenH = app.clientH;
		this.inputMob = app.clientW-110;
		var that = this;
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));			
		that.mobile = loginCon.mobile;
		that.countryCode = loginCon.countryCode;
		that.countryCodeEn = loginCon.countryCodeEn;
		console.log(loginCon);
		this.sendCode();
	},
	methods: {
		
		tapMobile(){
			console.log( "ceshi1",this.smsCode.length );
			if(this.smsCode.length > 1){
				$('.login-font').css('background-image',"url(../page/img/loginShow.png)");				
			}else{
				$('.login-font').css('background-image',"url(../page/img/loginBottom.png)");				
			}
		},
		sendCode(){
			var that = this;
			var datarr = {
				regionid: that.countryCode,
				phone: that.mobile,
				type: 'reg'
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
		focus(){
			this.tapMobile();
			this.$refs.pwd.focus();
		},
		//输入框置空
		tapEmpty(){
			this.smsCode = '';
			//this.tapMobile();
			$('.reg_code').focus();
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
				url:"http://u.api.priormatch.com/user/checkregsms/"+app.urlc,  
				type : 'post',				
				data: datarr,
				xhrFields: {
					withCredentials: true
				},	
				success:function(regsms) {
					if(regsms.errno==0){
						var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));	
						loginCon.codes = that.smsCode;
						console.log(loginCon);
						window.localStorage.setItem('loginCon', JSON.stringify(loginCon));
						location.replace('setpassword.html');
					}else{
						app.showToast({
							title: regsms.errmsg,
							duraiton: 1500
						})
					}
					console.log(regsms);
				},  
			});
				
		},
		
	},
	watch:{
      msg(curVal){
		this.tapMobile();
        if(/[^\d]/g.test(curVal)){
          this.msg = this.msg.replace(/[^\d]/g,'');
        }else{
            var cl = curVal.length;
			//console.log(cl);
			if(cl==0){
				this.msg1 = '';
				this.msg2 = '';
				this.msg3 = '';
				this.msg4 = '';
				this.msg5 = '';
				this.msg6 = '';
			}else if(cl==1){
				this.msg1 = curVal.substr(curVal.length-1,1);
				this.msg2 = '';
				this.msg3 = '';
				this.msg4 = '';
				this.msg5 = '';
				this.msg6 = '';
			}else if(cl==2){
				this.msg2 = curVal.substr(curVal.length-1,1);
				this.msg3 = '';
				this.msg4 = '';
				this.msg5 = '';
				this.msg6 = '';
			}else if(cl==3){
				this.msg3 = curVal.substr(curVal.length-1,1);
				this.msg4 = '';
				this.msg5 = '';
				this.msg6 = '';
			}else if(cl==4){
				this.msg4 = curVal.substr(curVal.length-1,1);
				this.msg5 = '';
				this.msg6 = '';
			}else if(cl==5){
				this.msg5 = curVal.substr(curVal.length-1,1);
				this.msg6 = '';
			}else{
				this.msg6 = curVal.substr(curVal.length-1,1);
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
