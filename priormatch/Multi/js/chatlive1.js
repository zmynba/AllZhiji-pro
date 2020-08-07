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

var multilive = new Vue({
	el: '#multilive',
	data: {
		multiList: {},
	},
	
	//钩子函数
	mounted(){
		var that = this;
		that.multiOPen();
		
	},
	//事件对象
	methods: {
		//直播间在线主播信息
		multiOPen(){
			var that = this;
			var hid = "hid"
			var hidn = GetRequest(hid);
			console.log('在线主播id', hidn);
			var urlc ='?__guid=md5&uid=-1&__plat=h5&__version=1.0&channel=h5';
			var darr = {
				hostid: hidn,
			}
			$.ajax({
				url:"http://m.api.bothlive.com/room/baseinfo"+urlc,
				type : 'get',				
				data: darr, 
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					console.log('进直播间获取房间信息', res);
					if(res.errno == 0) {
						SewisePlayer.setup({
							server: "vod",
							type: "flv",
							videourl: res.data.roominfo.pull_addr,
							poster: res.data.roominfo.photo,
							skin: "vodWhite",
							title: res.data.roominfo.title,
							lang: 'zh_CN',
							claritybutton: 'disable'
						}, "chatlive");
					}
				
					
				},  
			});
		},
		//直播间视频播放
		chatList(){
			var that = this
			for(var i = 0; i < that.multiList.length;i++){
				SewisePlayer.setup({
					server: "vod",
					type: "flv",
					videourl: that.multiList[i].pull_addr,
					poster: that.multiList[i].photo,
					skin: "vodWhite",
					title: that.multiList[i].title,
					lang: 'zh_CN',
					claritybutton: 'disable'
				}, "chatlive");
			}
		}
		
	},
	
	//计算属性
	computed: {
		//
	}
})
