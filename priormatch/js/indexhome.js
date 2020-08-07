//Vue开始
var code = GetRequest('code');
if(code){
	code = code.replace(/\s*/g,"");
}

localStorage.setItem('code', JSON.stringify(code));
var indexHome = new Vue({
	el: '#indexHome',
	data: {
		ScreenW:'',
		interLang: interLang, //国际化配置
		ScreenH:'',
		loginFont: "使用Facebook登录",
		loginCountry: "使用手机号登录",
		pactSelect: 1,
		pactImg: 'image/login/yes@2x.png',
		language: 'zh',
		accessToken: '',
		
	},
	mounted() {
		
		if(app.clientW > app.clientH){
			this.ScreenW = app.clientW/2;
			this.ScreenH = app.clientH;
			$(".index-botton").css({
				'left': '50%',
				'top': '34%'
			});
		}else{
			this.ScreenW = app.clientW;
			this.ScreenH = app.clientH;
		}
		
		if(localStorage.getItem('lang')){
			this.language = localStorage.getItem('lang')
		}
		
		var that = this;
		console.log('language:', this.language);
		if(this.language!=='zh'){
			$(".index-content-b span").css({
				'line-height': '15px',
				'font-size': '13px'
			});

			//2020/2/28
			$(".index-content-p").css({
				"padding-left":"20px",
				"padding-right":"20px",
			})

			$(".index-content-p .botton-font").css({
				"width":"210px",
				"margin-left":"10px",
				"line-height":"inherit"
			})
		}
		
		if(app.optionFun().errno==0){ //errno
			var hasphone = app.optionFun().hasphone;
			var needfill = app.optionFun().needfill;
			var user_id = app.optionFun().user_id;
			var Triptype = 'vk';
			if(hasphone == 0){
				window.location.href = 'triplogin.html';
			}else if(needfill == 1){
				window.location.href = 'editinformation.html?type=trip';
			}else{
				window.location.href = 'page/index.html';
			}
			
		}
	  
	},
	methods: {
		pactOpen(){
			var that = this;
			if(that.pactSelect == 1){
				that.pactSelect = 2;
				that.pactImg = 'image/login/yes@2x.png';
				$(".index-content-b").css("opacity","0.6");
			}else{
				that.pactSelect = 1;
				that.pactImg = 'image/login/no@2x.png';
				$(".index-content-b").css("opacity","1");
			}
			
		},
		phonea(){
			if(this.pactSelect == 1){
				window.location.href = 'n_login.html';
			}
		},

		//第三方登录VK
		openVK(){
			window.location.href = 'https://u.api.priormatch.com/other/jump/?type=vk&__plat=h5';
		},
		//第三方登录WX
		openWX(){
			window.location.href = 'WX/index.php';
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
