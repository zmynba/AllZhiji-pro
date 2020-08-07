 var iframe=document.createElement("iframe");
 	var iframepage='<iframe src="http://wap.priormatch.com/page/loginModal.html" frameborder=0 name="login" id="loginPage" class="loginpage"></iframe>';
 	$("body").append(iframepage);
 var vm=new Vue({
        el:"#paypage",
        data:{
			interLang: interLang,				//国际化
			rechargeList: app.rechargeList,		//充值方式
			userInfo:[],
			userId: '',
			userLogin:false,
            rightindex:3,
            showmore:false,
            typeindex:1,
            numindex:1,
            monthindex:1,
			priceList:[],
			vipList:[],
			svipList:[],
			money:0,
			vipfreedList: interLang.freedLists[0].list,
			svipfreedList: interLang.freedLists[1].list,
        },
        created:function(){
			var that = this;
			app.urlc='?__plat=h5&__version=1.0&channel=h5';
			if(localStorage.getItem('userArr')) {
				that.userLogin= true;
				var userArr = JSON.parse(localStorage.getItem('userArr'));
				that.userId = userArr.uid;
				console.log('查看userId', that.userId);
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
					console.log('查看别人主页', res.data.uinfo);
					if(res.errno == 0) {
						that.userInfo = res.data.uinfo;
					}else{
						that.userLogin= false;
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
			$.ajax({
				url:"http://pay.api.priormatch.com/index"+app.urlc+"&"+app.getToken,
				type : 'GET',				
				data: '', 
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					console.log('查看1:', res);
					if(res.errno == 0) {
						for(var i= 0;i<res.data.gold.length;i++){
								res.data.gold[i].CNY = "￥"+res.data.gold[i].CNY*0.01;
								res.data.gold[i].USD = "$"+res.data.gold[i].USD*0.01;
						}
						for(var i= 0;i<res.data.vip.length;i++){		
								res.data.vip[i].CNY = "￥"+res.data.vip[i].CNY/100;
								res.data.vip[i].USD = "$"+res.data.vip[i].USD/100;
						}
						for(var i= 0;i<res.data.svip.length;i++){				
								res.data.svip[i].CNY = "￥"+res.data.svip[i].CNY/100;
								res.data.svip[i].USD = "$"+res.data.svip[i].USD/100;
							
						}
						that.priceList = res.data.gold;
						that.vipList = res.data.vip;
						that.svipList = res.data.svip;
						console.log('美元', res.data.gold);
					}
												
				},  
			});
        },
		mounted(){
			var that = this;
			
		},
        methods:{
            selecttab(n){
                this.rightindex=n;
				if(n==1){
					this.showmore = true;
				}
				if(n==3){
					this.showmore = false;
				}
            },
            settype(n){
                this.typeindex=n;
            },
            rechargeSend(n){
                this.numindex=n;
            },
			rechargevip(n){
				 this.monthindex=n;
			},
			Send(){
				var that = this;
				if(that.userLogin){
					app.showLoading({
						title: interLang.releaselog
					})
					var pay_channel = '';
					var openid = '';
					if(that.typeindex == 1){
						pay_channel = 'wx_mweb';
					}else if(that.typeindex == 2){
						pay_channel = 'alipay_web';
						// "http://pay.api.bothlive.com/api/order/wxwap"+app.urlc+"&"+app.getToken+"&goods_id="+id+"&pay_channel="+pay_channel;
						//window.open(res.data.mweb_url);
					}else if(that.typeindex == 3){
						pay_channel = 'paypal';
					}else if(that.typeindex == 4){
						pay_channel = 'vtc_web';
					}else if(that.typeindex == 5){
						pay_channel = 'Doky_Pay';
					}else{
						pay_channel = 'paypal';
					}
					var darr = {
						goods_id:  that.numindex,
						pay_channel: pay_channel,
						wx_open_id: openid
					}
					if(that.typeindex == 4 ){
						$.ajax({
							url:"http://pay.api.priormatch.com/api/order/ordervtc"+app.urlc+"&"+app.getToken,
							type : 'POST',				
							data: darr,
							xhrFields: {
								withCredentials: true
							},
							success:function(res) {
								console.log('支付', res);
								if(res.errno == 0) {
									//that.priceList = res.data.gold;
									if(that.typeindex == 4){
										//pay_channel = 'wx_mweb';
										window.location.href = res.data.approvalUrl;
										//window.open(res.data.mweb_url);
									}
									app.hideLoading();
								}
															
							},  
						});
					}else if(that.typeindex == 5){
						var darrs = {
							goods_id:  this.numindex
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
									app.hideLoading();
								}							
							},  
						});
					}else{
						$.ajax({
							url:"http://pay.api.priormatch.com/api/order/orderawp"+app.urlc+"&"+app.getToken,
							type : 'POST',				
							data: darr, 
							xhrFields: {
								withCredentials: true
							},
							success:function(res) {
								console.log('支付', res);
								if(res.errno == 0) {
									//that.priceList = res.data.gold;
									if(that.typeindex == 1){
										//pay_channel = 'wx_mweb';
										if(ua.match(/MicroMessenger/i) == 'micromessenger') {
											WeixinJSBridge.invoke(
												'getBrandWCPayRequest',
												JSON.parse(res.data),
												function(res){
													WeixinJSBridge.log(res.err_msg);
													alert(res.err_code+res.err_desc+res.err_msg);
												}
											);
										}else{
											window.location.href = res.data.mweb_url;
										}
										
										
										//window.open(res.data.mweb_url);
									}else if(that.typeindex == 2){
										window.location.href = res.data.sign;
										//window.open(res.data.sign);
									}else{
										window.location.href = res.data.approvalUrl;
										//window.open(res.data.approvalUrl);
									}
									app.hideLoading();
								}
															
							},  
						});
					}
				}else{
					openlogin();
				}
			},
			vipSend(){
				var that = this;
				if(that.userLogin){
					if(that.typeindex == 1){
						pay_channel = 'wx_mweb';
					}else if(that.typeindex == 2){
						pay_channel = 'alipay_web';
						// "http://pay.api.bothlive.com/api/order/wxwap"+app.urlc+"&"+app.getToken+"&goods_id="+id+"&pay_channel="+pay_channel;
						//window.open(res.data.mweb_url);
					}else if(that.typeindex == 3){
						pay_channel = 'paypal';
					}else if(that.typeindex == 4){
						pay_channel = 'vtc_web';
					}else if(that.typeindex == 5){
						pay_channel = 'Doky_Pay';
					}else{
						pay_channel = 'paypal';
					}
					var darr = {
						goods_id: that.monthindex,
						pay_channel: pay_channel,
						
					}
					if(that.typeindex == 4 ){
						$.ajax({
							url:"http://pay.api.priormatch.com/api/order/ordervtc"+app.urlc+"&"+app.getToken,
							type : 'POST',				
							data: darr,
							xhrFields: {
								withCredentials: true
							},
							success:function(res) {
								console.log('支付', res);
								if(res.errno == 0) {
									//that.priceList = res.data.gold;
									if(that.typeindex == 4){
										//pay_channel = 'wx_mweb';
										window.location.href = res.data.approvalUrl;
										//window.open(res.data.mweb_url);
									}
									app.hideLoading();
								}
															
							},  
						});
					}else if(that.typeindex == 5){
						var darrs = {
							goods_id:  this.numindex
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
									app.hideLoading();
								}							
							},  
						});
					}else{
						$.ajax({
							url:"http://pay.api.priormatch.com/api/order/orderawp"+app.urlc+"&"+app.getToken,
							type : 'POST',				
							data: darr, 
							xhrFields: {
								withCredentials: true
							},
							success:function(res) {
								console.log('支付', res);
								if(res.errno == 0) {
									//that.priceList = res.data.gold;
									if(that.typeindex == 1){
										//pay_channel = 'wx_mweb';
										if(ua.match(/MicroMessenger/i) == 'micromessenger') {
											WeixinJSBridge.invoke(
												'getBrandWCPayRequest',
												JSON.parse(res.data),
												function(res){
													WeixinJSBridge.log(res.err_msg);
													alert(res.err_code+res.err_desc+res.err_msg);
												}
											);
										}else{
											window.location.href = res.data.mweb_url;
										}
										
										
										//window.open(res.data.mweb_url);
									}else if(that.typeindex == 2){
										window.location.href = res.data.sign;
										//window.open(res.data.sign);
									}else{
										window.location.href = res.data.approvalUrl;
										//window.open(res.data.approvalUrl);
									}
									app.hideLoading();
								}
															
							},  
						});
					}
				}else{
					openlogin();
				}
			},
			//切换账号
			SwitchAccount(){
				openlogin();
			},
			SwitchRegister(){
				window.location.href = 'pcRegister.html';
			}
        }
    })
