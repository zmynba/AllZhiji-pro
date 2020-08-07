//Vue开始
var Supervision = new Vue({
	el: '#Supervision',
	data: {
		fansList: [],
		interLang: interLang.Supervisiontxt,	//国际化
	},
	
	//钩子函数
	mounted(){
		var that = this;
		document.title = interLang.Supervisiontxt.title;
		//头部函数
		app.publicHead({
			left: true,
			content: interLang.Supervisiontxt.title,
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