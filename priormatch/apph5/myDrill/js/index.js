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
		imyDrillLang: imyDrillLang,
		giftList: [],
		getList: [],				//收到礼物数组(模拟)
		drillNum: 0,
		GNum: 0,
		page: 1,
		num: 20,
		
	},
	
	mounted() {
		var that = this;
		document.title = this.imyDrillLang.indexTitle;
		//that.balancefun();
		$.ajax({
			//url:"data/giftlist.json",
			url:"http://m.api.priormatch.com/static/giftlist.json",
			type : 'get',				
			data: '', 
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
				
				that.giftList = res.data;
			},  
		});
		//收到的礼物 drillNum
		var darrreceivedList = {
			page: that.page,
			page_num: that.num,
			type: 'all',
			is_all: 0
		}
		setTimeout(function () {
			$.ajax({
				url:"http://pay.api.priormatch.com/api/bill/receivedList" + searchurl,
				type : 'get',				
				data: darrreceivedList, 
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					if(res.errno == 0) {
						for(var i=0;i<res.data.length;i++){
							
							for(var j=0;j<that.giftList.length;j++){
								if(that.giftList[j].id==res.data[i].gift_id){
									
									res.data[i].gift = that.giftList[j];
									var Gname = res.data[i].gift.lang;
									res.data[i].gift.name = Gname.name[lg];
									var price = parseInt(res.data[i].gift.price);
									that.GNum = that.GNum + price;
								}
							}
							res.data[i].time = timestampToTime(res.data[i].time);
						}
						that.getList = res.data;
						
					}
				},  
			});	
		}, 1000)
					

	},
	
	//事件对象
	methods: {
		balancefun(){
			var that = this;
			$.ajax({
				url:"http://pay.api.priormatch.com/api/account/balance" + searchurl,
				type : 'get',				
				data: '', 
				xhrFields: {
					withCredentials: true
				},
				success:function(res) {
					if(res.errno == 0) {
						that.drillNum = res.data;
						console.log('余额', that.drillNum);
					}else{
						//app.loginNo(res);
					}
				},  
			});
		},
			
	},
	
	//计算属性
	computed: {
		//输入框是否有文字

	}
});
function timestampToTime(timestamp) {
	var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';

	return Y + M + D;
}