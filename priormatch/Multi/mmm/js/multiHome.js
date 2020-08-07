//Vue开始
var multiHome = new Vue({
	el: '#multiHome',
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
			$.ajax({
				url:"http://m.api.bothlive.com/anchor/alllist/",
				type : 'get',				
				data: '', 
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					console.log('直播间在线主播信息', res);
					that.multiList = res.data.items;
					
					
				},  
			});
			setTimeout(function(){
						that.chatList();
					}, 6000);
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
				}, that.multiList[i].uid);
			}
		}
		
	},
	
	//计算属性
	computed: {
		//
	}
})