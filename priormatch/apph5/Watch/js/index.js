//Vue开始
var GetRequest = function(id) {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			theRequest[i] = (strs[i].split("=")[1]);
		}
		if(id) {
			return theRequest[id];
		} else {
			return theRequest;
		}
	} else {
		return false;
	}

}
var lg = GetRequest('__lg');
var searchurl = location.search;
//Vue开始
var seen = new Vue({
	el: '#seen',
	data: {
		fansList: [],
		page: 1,
		size: 20,
		userId: '',
	},

	//钩子函数
	mounted() {
		var that = this;
		document.title = interLang.seen;
		that.userId = app.optionFun().uid;
		//头部函数
		app.publicHead({
			left: true,
			content: interLang.seen,
			borderBottom: true,
			right: true,
			rightText: interLang.empty,
			sideWidth: '70px',
			success: function() {
				//模拟清空列表操作
				if(that.fansList.length > 0) {
					app.showModal({
						content: interLang.isEmpty,
						success: function(res) {
							if(res.confirm) {
								var darrc = {
									hostid: that.userId,
								}
								$.ajax({
									url:"http://m.api.priormatch.com/user/historyclear" + searchurl,
									type : 'POST',				
									data: darrc, 
									xhrFields: {
										withCredentials: true
									},
									success:function(res) {
										console.log('清空列表:', res);
										if(res.errno == 0) {
											that.fansList = [];
											$('.seen').html(app.listEmpty({
												title: interLang.noData
											}));
										}else{
											app.loginNo(res);
										}
									}
								});
								
							}
						}
					})
				}
			}
		})
		
		
		//观看列表
		var darrf = {
			pageno: 1,
			pagenum: 30,
		}
		$.ajax({
			url:"http://m.api.priormatch.com/user/historylist" + searchurl,
			type : 'get',				
			data: darrf, 
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
				console.log('观看列表', res);
				if(res.errno == 0) {
					for(var i=0;i<res.data.items.length;i++){
						res.data.items[i].addtime = app.floorTime(res.data.items[i].addtime);
					}
					that.$nextTick(function() {
						//需要滑动删除时调用此函数
						app.slideRemove({
							slideClass: '.seen_li',
							success: function(res) {
								//删除操作
								app.showModal({
									content: '确定要删除ID为的记录？',
									success: function(res) {
										console.log(res);
									}
								})
							}
						});
					});
						
					//为空时
					if(res.data.items.length == 0){
						$('.fans').append(app.listEmpty({title: '~暂无~'}));
					}else{
						that.fansList = res.data.items;				
					}					
				}
			}
		});
		
	},

	//事件对象
	methods: {
		//
	},

	//计算属性
	computed: {
		//
	}
})
function hideNavigationBar(hide) {
	var params = {hide};
	window.BothLive.hideNavigationBar(null, null, params);
}
var hideLover =function(){
	if(navigator.userAgent.match(/Android/i)){
		BothliveClient.Toolbar(0);
	}
	if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
		hideNavigationBar(true);		
	}
}
var showLover = function(){
	if(navigator.userAgent.match(/Android/i)){
		BothliveClient.Toolbar(1);
	}
	if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
		hideNavigationBar(false);
	}
}
if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {

	function navBackClicked () {
		goToBack(true);
	}
	function goToBack(toBack) {
		//alert(41);
		window.BothLive.goToBackHistory(null, null, {"gotoBack": toBack});
	}
	function enableBackHistory(enable) {
		//alert(31);
		window.BothLive.enableBackHistory(null, null, {"enable": enable});
	}
	function deviceready() {

		//navBackClicked();
		enableBackHistory(true);
	}
	document.addEventListener('deviceready', deviceready, false);
	
}
hideLover();