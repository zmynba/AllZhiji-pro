var iframe=document.createElement("iframe");
	var iframepage='<iframe src="http://wap.priormatch.com/page/loginModal.html" frameborder=0 name="login" id="loginPage" class="loginpage"></iframe>';
	$("body").append(iframepage);
//Vue开始
var rechargeNum = new Vue({
	el: '#rechargeNum',
	data: {
		interLang: interLang,				//国际化
		rechargeList: app.rechargeList,		//充值方式
		userInfo:[],
		rechrgeId: 0,
		money: 0,
		language: 'zh',
		priceList: [
			{
				id: '1',
				num: 100,
				price: '6',
				codeid: 'com.priormatch.gold.1'
			},
			{
				id: '2',
				num: 500,
				price: '30',
				codeid: 'com.priormatch.gold.5'
			},
			{
				id: '3',
				num: 1000,
				price: '60',
				codeid: 'com.priormatch.gold.10'
			},
			{
				id: '4',
				num: 3000,
				price: '180',
				codeid: 'com.priormatch.gold.30'
			},
			{
				id: '5',
				num: 9000,
				price: '540',
				codeid: 'com.priormatch.gold.90'
			}
		]
	},
	
	//钩子函数
	mounted(){
		if(localStorage.getItem('lang')){
			this.language = localStorage.getItem('lang')
		}
		var that = this;

		$.ajax({
			url:"http://pay.api.priormatch.com/index"+app.urlc+"&"+app.getToken,
			type : 'GET',				
			data: '', 
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
				console.log('查看', res);
				if(res.errno == 0) {
					for(var i= 0;i<res.data.gold.length;i++){
							res.data.gold[i].CNY = res.data.gold[i].CNY*0.01;
							res.data.gold[i].USD = res.data.gold[i].USD*0.01;
							console.log('美元', that.rechrgeId);
							res.data.gold[i].pay = "$"+res.data.gold[i].USD;
						
					}
					that.priceList = res.data.gold;
				}
											
			},  
		});
		if(localStorage.getItem('token')) {
			this.isToken = localStorage.getItem('token');
			var userArr = JSON.parse(localStorage.getItem('userArr'));
			userId = userArr.uid;
		}
		var darrinfo = {
			uid: that.userId,
		}
		$.ajax({
			url:"http://m.api.priormatch.com/ucenter/info"+app.urlc+"&"+app.getToken,
			type : 'get',				
			data: darrinfo, 
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
				console.log('查看别人主页', res);
				if(res.errno == 0) {
					that.userInfo = res.data.uinfo;
				}
											
			},  
		});
		$.ajax({
			url:"http://pay.api.priormatch.com/api/account/balance"+app.urlc+"&"+app.getToken,
			type : 'get',				
			data: '', 
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
				if(res.errno == 0) {
					that.money = res.data;
					console.log('余额', that.money);
				}
			},  
		});
	},
	
	//事件对象
	methods: {
		//切换账号
		SwitchAccount(){
			openlogin();
		},
		//充值
		rechargeSend(id){
			
			app.showLoading({
				title: interLang.releaselog
			})
			var that = this;
			var pay_channel = 'Doky_Pay';
			var openid = '';
		
			var darrs = {
				goods_id: id
			}
			$.ajax({
				url:"http://pay.api.priormatch.com/api/order/orderDoky"+app.urlc+"&"+app.getToken,
				type : 'POST',				
				data: darrs, 
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					console.log('支付', res);
					if(res.errno == 0) {
						window.location.href = res.data.approvalUrl;
				
					}else{
						app.hideLoading();
						openlogin();
					}
												
				},  
			});
			
		}
	},
	
	//计算属性
	computed: {
		//
	}
})