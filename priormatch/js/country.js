//Vue开始
var login = new Vue({
	el: '#login',
	data: {
		countryFont: interLang.countryarea,
		code:'',
		list:[],
		pageurl:"", //哪个页面跳转过来的
		pagenum:"",
	},
	mounted() {
		//获取列表数据
		this.pagenum=location.search.split("=")[1];
		if(this.pagenum==1){
			this.pageurl="n_login.html";
		}else if(this.pagenum==2){
			this.pageurl="n_register.html";
		}else if(this.pagenum==3){
			this.pageurl="n_forget.html";
		}
		var that = this;
		console.log(window.localStorage.getItem('loginCon'));
		var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));
		
		that.code = loginCon.countryCode;
		$.ajax({
			url:"page/data/alibaba_country.json?vbfs",
			type : 'get',				
			data: '', 
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
				console.log('礼物：', res);
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
	methods: {
		tapChoose(code,country,country_code){
			var loginCon = JSON.parse(window.localStorage.getItem('loginCon'));
			
			loginCon.Country = country;
			loginCon.countryCode = code;
			loginCon.countryCodeEn = country_code;
			console.log(loginCon);
			window.localStorage.setItem('loginCon', JSON.stringify(loginCon));
			window.location.href=this.pageurl+"?page="+this.pagenum;
		}
	}
})
