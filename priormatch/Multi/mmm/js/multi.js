Array.prototype.indexOf = function (val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};

Array.prototype.remove = function (val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
//Vue开始
var multiHome = new Vue({
	el: '#multiHome',
	data: {
		dubiousList:[],
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
			var dubList = JSON.parse(window.localStorage.getItem('dubiousList'));
			if(dubList){
				that.dubiousList = dubList
			}
		},
		returnClose(){
			window.location.href = 'index.html';
		},
		dubiousClose(id){
			var that = this
			that.dubiousList.remove(id);
			window.localStorage.setItem('dubiousList', JSON.stringify(that.dubiousList));
		},
		
	},
	
	//计算属性
	computed: {
		//
	}
})