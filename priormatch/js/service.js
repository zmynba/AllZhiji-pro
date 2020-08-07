//Vue开始
var service = new Vue({
	el: '#service',
	data: {
		fansList: [],
		interLang: interLang.servicetxt,	//国际化
	},
	
	//钩子函数
	mounted(){
		var that = this;
		document.title = interLang.servicetxt.title;
		//头部函数
		app.publicHead({
			left: true,
			content: interLang.servicetxt.title,
			borderBottom: true
		});
		var type = GetRequest('type');
		if(type == 'app'){
			document.getElementById("header").style.display="none";
		}
		
	},
	
	//事件对象
	methods: {
	},
	
	//计算属性
	computed: {
		//
	}
})