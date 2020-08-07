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
						var mediaDataSource = {
		                    type: 'flv'
		                };
		                mediaDataSource.url = res.data.roominfo.pull_addr;
						that.flv_load_mds(mediaDataSource);
					}
				},  
			});
		},
		flv_load_mds(mediaDataSource) {
            var element = document.getElementsByName('videoElement')[0];
            console.log(mediaDataSource, element);
            if (typeof player !== "undefined") {
                if (player != null) {
                    player.unload();
                    player.detachMediaElement();
                    player.destroy();
                    player = null;
                }
            }
            player = flvjs.createPlayer(mediaDataSource, {
                enableWorker: false,
                lazyLoadMaxDuration: 3 * 60,
                seekType: 'range',
            });
            player.attachMediaElement(element);
            player.load();
        },
	},
	//计算属性
	computed: {
		//
	}
})
