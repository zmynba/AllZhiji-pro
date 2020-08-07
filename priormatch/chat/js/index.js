
//Vue开始
var area = new Vue({
	el: '#indexT',
	data: {
		adminLang: adminLang,
		areaList:[],
		list:[],
		code:"86",
		phoneerror:"",
		passworderror:"",
		check:false,
		pnumber:"",
		password:"",
		aeskey:"",
		langName: adminLang.langName,
		popnumber: adminLang.popnumber,
		popass: adminLang.popass,

	},
	//钩子函数
	mounted(){
		var that=this;
		if(lang == 'zh'){
			that.langName = "中文简体";
		}else{
			that.langName = "English";
		}
		$.ajax({
		    url:"../page/data/alibaba_country.json?vbfs",
		    type : 'get',				
		    data: '', 
		    dataType: "json",
		    xhrFields: {
		        withCredentials: true
		    },
		    success:function(res) {
		        var countryList = res.countryList;
		        for(var i = 0; i < countryList.length; i++){
		            if(that.code == countryList[i].code){
		                countryList[i].show=1;
		            }else{
		                countryList[i].show=2;
		            }
		            
		        }
		        that.list = countryList;
		    },  
		});
	},
	
	//事件对象
	methods: {
		checkphone:function(){
		    var _this=this;
		    var reg=/^1[3456789]\d{9}$/;
		    if(this.pnumber==""){
		        this.phoneerror=adminLang.phoneerror;
				app.showToast({
					title: this.phoneerror,
					duraiton: 1500
				})
		        return false;
		    }
		    if(!(reg.test(this.pnumber))){
		        this.phoneerror=adminLang.phoneerror1;
				app.showToast({
					title: this.phoneerror,
					duraiton: 1500
				})
		    }else{
		        this.phoneerror="";
		    }
		},
		checkpassword:function(){
		    if(this.password==""){
		        this.passworderror=adminLang.passworderror;
				app.showToast({
					title: this.passworderror,
					duraiton: 1500
				})
		        return false;
		    }
		},
		selectbox:function(){
		    this.check=!this.check;
		},
		postlogin(){
			console.log("loginin")
			var that = this;
			var pwd = that.password;
			var k = that.aeskey;
			var c = '';
			
			for(var i=0;i<pwd.length;i++){
				var b = String.fromCharCode(pwd.charCodeAt(i)^k.charCodeAt(i));
				c =c + b;
			}
			pwd = Base64.encode(c);
			var decode = Base64.decode(pwd);
			var datarr = {
				regionid: that.code,
				phone: that.pnumber,
				pwd: pwd,
				aeskey: that.aeskey
			}
			$.ajax({
				url:"http://u.api.bothlive.com/user/login/"+app.urlc,  
				type : 'post',				
				data: datarr,  
				xhrFields: {
					withCredentials: true
				},	
				success:function(checkphone) { 
					if(checkphone.errno == 0){
						localStorage.setItem('userArr', JSON.stringify(checkphone.data));
						if(checkphone.data.gender == 0){
							//location.replace('http://wap.bothlive.com/editinformation.html');
							app.showToast({
								title: adminLang.Promoterinfo,
								duraiton: 1500
							})
						}else{
							$.ajax({  
								url:"http://u.api.bothlive.com/common/token/"+app.urlc,  
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
										//parent.location.reload();
										location.replace('page/index.html');
									}else{
										app.showToast({
											title: checkpassword.errmsg,
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
							duraiton: 150000
						})
							
					}
				},  
				timeout:3000  
			});			
			
		},
		tapEmpty(){//清空所有恢复默认
			this.pnumber="";
			this.password="";
			this.phoneerror="";
			this.passworderror="";
		},
		closepage(){
			window.parent.document.getElementById("loginPage").style.display="none";
		},
		gopage(n){
			var path="";
			if(n==1){
				path="index.html";
			}else if(n==2){
				path="pact/service.html";
			}else{
				path="pact/privacy.html";
			}
			parent.location.href="http://wap.bothlive.com/"+path;
		},
		register(){
			parent.location.href="http://wap.bothlive.com/index.html";
		},
		//点击登录
		loginin(){
			var that=this;
			$.ajax({  
				url:"http://u.api.bothlive.com/common/aeskey/"+app.urlc,  
				type : 'get',				
				data: '', 
				xhrFields: {
					withCredentials: true
				},	
				success:function(aeskey) {  
					if(aeskey.errno==0){
						that.aeskey = aeskey.data;
						console.log("get aeskey")
						that.postlogin();
					}else{
						app.showToast({
							title: aeskey.errmsg,
							duraiton: 1500
						})
					}
				},  
				timeout:3000  
			});//获取aeskey
		},
		langOpen(lg){			var that = this;			console.log('语言',lg);
			localStorage.setItem('adminlg', lg);
			location.reload();			if(lg == 'zh'){				that.langName = "中文简体";			}else{				that.langName = "English";			}		},
	},
	
	//计算属性
	computed: {
		//
	}
})
