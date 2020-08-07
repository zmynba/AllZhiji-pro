//Vue开始
var login = new Vue({
	el: '#login',
	data: {
		loginFont: "手机号登录/注册",
		loginCountry: "国家地区",
		Country: "中国",
		countryCode: '86',
		countryCodeEn: 'CN',
		mobile: '',
		inputMob: 100,
		loginBotton: "下一步",
		interLang: interLang,	//国际化
		ScreenH: 0,
	},
	mounted() {
		this.ScreenH = app.clientH;
		var that = this;
		that.inputMob = app.clientW-110;
		
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));
		if(loginCon){
			that.Country = loginCon.Country;
			that.countryCode = loginCon.countryCode;
			loginCon.countryCodeEn = that.countryCodeEn;
			that.mobile = loginCon.mobile;	
		}else{
			var loginCon = {};
			loginCon.Country = that.Country;
			loginCon.countryCode = that.countryCode;
			loginCon.countryCodeEn = that.countryCodeEn;
			loginCon.mobile = that.mobile;	
		}
			
		window.localStorage.setItem('loginCon', JSON.stringify(loginCon));	
	  
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
			this.mobile = '';
			this.tapMobile();
			$('.login_mobile').focus();
		},
		//测试
		checkMobile(){
			var that = this;
			var data = {
				regionid: that.countryCode,
				phone: that.mobile
			}
			$.ajax({  
				url:"http://u.api.priormatch.com/common/checkphone/?__plat=h5&__version=1.0&channel=h5",  
				type : 'post',				
				data: data,  
				xhrFields: {
					withCredentials: true
				},
				success:function(cmObj) {  
					console.log(cmObj);
					if(cmObj.errno==0){
						var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));			
						loginCon.mobile = that.mobile;
						console.log(loginCon);
						window.localStorage.setItem('loginCon', JSON.stringify(loginCon));
						if(cmObj.data == 1){						
							window.location.href = 'passlogin.html';
						}else{
							window.location.href = 'register.html';
						}
				}else{
					app.showToast({
						title: cmObj.errmsg,
						duraiton: 1500
					})
				}
					
				},  
				timeout:3000  
			});			
		},
		
	},

	computed: {
		min(){
			if(this.mobile){
				return this.mobile.length;
			}
			
		}
	}
})
