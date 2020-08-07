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
var income = new Vue({
	el: '#income',
	data: {
		blIncome: '收入',
		year: '2019',
		month: '10',
		incomeNum: 0,//总收入
		liveNum: 0,//直播收入
		chatNum: 0,//聊天
		homeNum: 0,//主页
		secretNum: 0,//密聊
		monthFont: '月收入',
		liveFont: '直播',
		chatFont: '聊天',
		homeFont: '主页',
		secretFont: '密聊',
	},
	
	mounted() {
		var that = this;
		if(lg == 'zh'){
			document.title = 'priormatch';
			that.blIncome = '收入';
			that.monthFont = '月收入';
			that.liveFont = '直播';
			that.chatFont = '聊天';
			that.homeFont = '主页';
			that.secretFont = '密聊';
			
		}else if(lg == 'ru'){
			document.title = 'priormatch';
			that.blIncome = 'доход';
			that.monthFont = 'месячный доход';
			that.liveFont = 'прямой эфир';
			that.chatFont = 'чат';
			that.homeFont = 'домашняя страница';
			that.secretFont = 'личный чат';
		}else if(lg == 'vi'){
			document.title = 'priormatch';
			that.blIncome = 'Thu nhập';
			that.monthFont = 'Thu nhập tháng';
			that.liveFont = 'Livestream';
			that.chatFont = 'Trò chuyện';
			that.homeFont = 'Trang chủ';
			that.secretFont = 'Trò chuyện riêng tư';
		}else if(lg == 'ko'){
			document.title = 'priormatch';
			that.blIncome = '수입';
			that.monthFont = '월 수입 ';
			that.liveFont = '라이브';
			that.chatFont = '채팅';
			that.homeFont = '홈페이지';
			that.secretFont = '비밀 채팅';
		}else if(lg == 'ja'){
			document.title = 'priormatch';
			that.blIncome = '所得';
			that.monthFont = '月収';
			that.liveFont = '放送';
			that.chatFont = 'チャット';
			that.homeFont = 'ホームページ';
			that.secretFont = 'プライベートチャット';
		}else{
			document.title = 'priormatch';
			that.blIncome = 'Income';
			that.monthFont = 'Monthly income';
			that.liveFont = 'Broadcast';
			that.chatFont = 'Chat';
			that.homeFont = 'Homepage';
			that.secretFont = 'Private chat';
		}
		
		 var now   = new Date();
		 that.month = now.getMonth() + 1;
		 that.year  = now.getFullYear();
		document.title = that.blIncome;
		$.ajax({
			url: "http://pay.api.priormatch.com/api/bill/income" + searchurl,
			type : 'GET',				
			data: '', 
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {

				if(res.errno == 0){
					that.liveNum = res.data.live_gift;
					that.chatNum = res.data.chat_gift;
					that.homeNum = res.data.home_gift;
					that.secretNum = parseInt(res.data.chat_voice) + parseInt(res.data.chat_video);
					that.incomeNum = parseInt(that.liveNum) + parseInt(that.chatNum) + parseInt(that.homeNum) + parseInt(that.secretNum);
					
				}
			}, 
		});

	},
	
	//事件对象
	methods: {

			
	},
	
	//计算属性
	computed: {
		//输入框是否有文字

	}
});
