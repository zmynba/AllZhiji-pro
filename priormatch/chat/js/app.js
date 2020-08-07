var guid = 'h5wapchat';
window.Base64={
	_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode:function(e){
		var t="";
		var n,r,i,s,o,u,a;
		var f=0;
		e=Base64._utf8_encode(e);
		while(f<e.length){
			n=e.charCodeAt(f++);
			r=e.charCodeAt(f++);
			i=e.charCodeAt(f++);
			s=n>>2;
			o=(n&3)<<4|r>>4;
			u=(r&15)<<2|i>>6;
			a=i&63;
			if(isNaN(r)){
				u=a=64
			}else if(
				isNaN(i)
			){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t
	},
	decode:function(e){
		var t="";
		var n,r,i;
		var s,o,u,a;
		var f=0;
		e=e.replace(/[^A-Za-z0-9+/=]/g,"");
		while(f<e.length){
			s=this._keyStr.indexOf(e.charAt(f++));
			o=this._keyStr.indexOf(e.charAt(f++));
			u=this._keyStr.indexOf(e.charAt(f++));
			a=this._keyStr.indexOf(e.charAt(f++));
			n=s<<2|o>>4;
			r=(o&15)<<4|u>>2;
			i=(u&3)<<6|a;
			t=t+String.fromCharCode(n);
			if(u!=64){t=t+String.fromCharCode(r)}
			if(a!=64){t=t+String.fromCharCode(i)}
		}
		t=Base64._utf8_decode(t);
		return t
	},
	_utf8_encode:function(e){
		e=e.replace(/rn/g,"n");
		var t="";
		for(var n=0;n<e.length;n++){
			var r=e.charCodeAt(n);
			if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){
				t+=String.fromCharCode(r>>6|192);
				t+=String.fromCharCode(r&63|128)
			}else{
				t+=String.fromCharCode(r>>12|224);
				t+=String.fromCharCode(r>>6&63|128);
				t+=String.fromCharCode(r&63|128)}
			}return t
	},
	_utf8_decode:function(e){
		var t="";
		var n=0;
		var r=c1=c2=0;
		while(n<e.length){
			r=e.charCodeAt(n);
			if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);
			t+=String.fromCharCode((r&31)<<6|c2&63);
			n+=2}else{c2=e.charCodeAt(n+1);
			c3=e.charCodeAt(n+2);
			t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}
			return t
	}
}
//app对象为封装的公共函数
var app = {	
	urlc: '?__plat=h5&__version=1.0&channel=h5',
	language: localStorage.getItem('lang') || 'zh', //获取本地存储语言
	getToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
	//获取页面间传递的参数   ?
	optionFun() {
		var options = location.search;
		var intPos = options.indexOf('?');
		if(intPos == -1) {
			return '';
		} else {
			var str = options.substr(intPos + 1);
			var listOne = str.split('&');
			var obj = {};
			for(var i = 0, listTwo = ''; i < listOne.length; i++) {
				listTwo = listOne[i].split('=');
				listTwo[1] = decodeURI(listTwo[1]);
				obj[listTwo[0]] = listTwo[1];
			}
			return obj;
		}
	},
//列表为空时(调用此函数，需进行追加操作)
	listEmpty(obj) {
		var title = obj.title || interLang.noData;
		var tPt = obj.tPt ? 'padding-top: ' + obj.tPt + ';' : '';
		var imgWidth = obj.imgWidth ? 'width: ' + obj.imgWidth + ';' : '';
		var imgUrl = obj.imgUrl ? '<img style="' + imgWidth + '" src="' + obj.imgUrl + '" />' : '';
		var str = '<div class="main-box main-tac list_none">' + imgUrl + '<p style="' + tPt + '">~' + title + '~</p></div>';
		return str;
	},
	//提示弹框
	showToast(obj) {
		obj.duration == undefined ? (obj.duration = 1000) : obj.duration;
		obj.icon == undefined ? (obj.icon = '') : (obj.icon = '<img src="' + obj.icon + '" />');
		$('body').append('<div class="main-box toast"><div class="main-box">' + obj.icon + '<p>' + obj.title + '</p></div></div>');
		setTimeout(function() {
			$('.toast').remove();
		}, obj.duration);
	},
//判断多长时间
	floorTime(str) {
		var timestamp = 0;
		var pass = 0;
		timestamp = Math.round(new Date().getTime()/1000).toString();
		console.log('长时', timestamp);
		pass = (timestamp - str);
		console.log('长时', timestamp);
		if(pass < 60) {
			return pass + "秒前";
		} else {
			if(pass < (60 * 60)) {
				pass = Math.floor(pass / 60);
				return pass + "分钟前";
			} else {
				if(pass < (60 * 60 * 72)) {
					pass = Math.floor(pass / 60 / 60);
					return pass + "小时前";
				} else {
					if(pass >= (60 * 60 * 72)) {
						pass = Math.floor(pass / 60 / 60 / 24);
						return pass + "天前";
					}
				}
			}
		}
	},
	//加载中弹框(显示)
	/*
	 * 方法说明：
	 * title：String(必选参数)，为加载中提示文字
	 * color：色值，为加载中动画主色调
	 */
	showLoading(obj) {
		obj.color == undefined ? (obj.color = '#FFFFFF') : obj.color;
		var suc = obj.success || function(data) {};
		$('body').append('<div class="main-box main-flex loading">' +
			'<div class="main-box loading_content">' +
			'<div class="main-box loading_icon" style="box-shadow: 0 2px 0 ' + obj.color + ' inset;"></div>' +
			'<p class="main-box loading_text">' + obj.title + '</p>' +
			'</div>' +
			'</div>');
		if(suc) {
			suc({
				msg: '请求成功'
			});
		}
	},

	//加载中弹框(隐藏)
	hideLoading() {
		$('.loading').remove();
	},

	//Loading动画特效
	loadDp(type, bgColor) {
		var loadDiv = document.createElement('div');
		var types = type == undefined ? 'circular' : type;
		var backgroundColor = bgColor == undefined ? '#999' : bgColor;
		//特效1
		if(types == 'circular') {
			var num = 6,
				loadRotate = 360 / num,
				loadTime = '0.13',
				totalTime = '1.04';
			$('body').append('<style>' +
				'.loading_dp{width: 16px;height: 16px;margin-right: 5px;}' +
				'.loading_dp>span{width: 100%;height: 100%;display: inline-block;position: absolute;-webkit-animation: load ' + totalTime + 's ease infinite;}' +
				'@keyframes load{0% {opacity: 1;}100% {opacity: 0.2;}}' +
				'.loading_dp>span:before{content: "";display: block;width: 4px;height: 4px;margin: 0 auto;border-radius: 100%;background: ' + backgroundColor + ';}' +
				'</style>');
			for(var i = 0, str = ''; i < num; i++) {
				str += '<span style="transform: rotate(' + loadRotate * i + 'deg);-webkit-animation-delay: ' + loadTime * (i + 1) + 's;"></span>';
			}
			loadDiv.className = 'main-relative loading_dp';
			loadDiv.innerHTML = str;
			//特效2
		} else if(types == 'rectangle') {
			for(var j = 0, str = ''; j < 12; j++) {
				str += '<p class="load_li" style="background: ' + backgroundColor + '"></p>';
			}
			loadDiv.className = 'main-tac main-relative load_dp';
			loadDiv.innerHTML = str;
		}
		return loadDiv;
	},

	//选择面板弹框
	/*
	 * 方法说明：
	 * content：String(必选参数)，为提示内容文字
	 * success：Function(必选参数)，点击按钮时的回调函数
	 * title：String(非必选参数)，为提示内容头部标题，默认为 '提示'
	 * cancelText：String(非必选参数)，为左侧按钮文字
	 * confirmText：String(非必选参数)，为右侧按钮文字
	 */
	showModal(obj) {
		obj.title == undefined ? (obj.title = interLang.tips) : obj.title;
		obj.cancelText == undefined ? (obj.cancelText = interLang.cancel) : obj.cancelText;
		obj.confirmText == undefined ? (obj.confirmText = interLang.confirm) : obj.confirmText;
		var suc = obj.success || function(data) {};
		$('body').append('<div class="main-box modals_mask">' +
			'<div class="main-box main-flex modals">' +
			'<div class="main-box main-hide modals_content">' +
			'<div class="main-box modals_up">' +
			'<p class="modals_title">' + obj.title + '</p>' +
			'<p class="modals_text">' + obj.content + '</p>' +
			'</div>' +
			'<div class="main-box modals_down">' +
			'<p class="main-box main-w5 main-lf main-tac modals_no">' + obj.cancelText + '</p>' +
			'<p class="main-box main-w5 main-lf main-tac modals_yes">' + obj.confirmText + '</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');
		$('.modals_content').fadeIn();

		//取消灰色背景下默认滑动问题
		$('.modals')[0].addEventListener('touchmove', app.noSlide, false);

		//取消
		$('.modals_no').click(function() {
			suc({
				confirm: false
			});
			$('.modals_content').fadeOut();
			setTimeout(function() {
				$('.modals_mask').remove();
			}, 300)
		})

		//确定
		$('.modals_yes').click(function() {
			suc({
				confirm: true
			});
			$('.modals_content').fadeOut();
			setTimeout(function() {
				$('.modals_mask').remove();
			}, 300)
		})
	},

	//底部弹框
	/*
	 * 方法说明：
	 * list：Array(非必选参数)，按钮列表
	 * title: String(非必选参数)，标题提示文字
	 * color：色值，按钮的颜色
	 * listIndex: Number(非必选)，如果有按钮需要特殊处理则可添加此参数，为数组中的哪一个
	 * listColor：色值，需要特殊处理的按钮的色值
	 * btnTitle：String(非必选参数)，下方按钮文字
	 * btnFont：字体大小(非必选参数)，下方按钮动态修改字体大小
	 * btnColor：色值(必选参数)，下方按钮动态修改字体颜色
	 * success：Function(必选参数)，按钮列表的回调函数，返回值为按钮下标
	 */
	showAction(obj) {
		var title = obj.title == undefined ? '' : '<li class="main-box action_li action_title">' + obj.title + '</li>';
		obj.title && (obj.listIndex = obj.listIndex + 1);
		var list = obj.list || ['按钮一', '按钮二'];
		var color = obj.color ? 'color: ' + obj.color : '';
		for(var i = 0, str = ''; i < list.length; i++) {
			str += '<li class="main-box action_li" style="' + color + '">' + list[i] + '</li>';
		}
		var btnTitle = obj.btnTitle || interLang.cancel;
		var btnFont = obj.btnFont || '17px';
		var btnColor = obj.btnColor || '#333333';
		var suc = obj.success || function(data) {};

		//追加页面
		$('body').append('<div class="main-box action">' +
			'<div class="main-box action_mask" onclick="hideAction()"></div>' +
			'<div class="main-box main-hide action_content">' +
			'<ul class="main-box main-tac action_ul">' +
			title +
			str +
			'</ul>' +
			'<p class="main-box main-tac action_btn" style="font-size: ' + btnFont + ';color: ' + btnColor + ';" onclick="hideAction()">' + btnTitle + '</p>' +
			'</div>' +
			'</div>');
		obj.listIndex && $('.action_li:nth-child(' + obj.listIndex + ')').css('color', obj.listColor);
		$('.action_content').slideDown();

		//取消灰色背景下默认滑动问题
		$('.action_mask')[0].addEventListener('touchmove', app.noSlide, false);
		$('.action_content')[0].addEventListener('touchmove', app.noSlide, false);

		//隐藏弹框
		hideAction = function() {
			$('.action_content').slideUp(300);
			setTimeout(function() {
				$('.action').remove();
			}, 300)
		}

		//点击列表
		$('.action_li').click(function() {
			if(obj.title) {
				var tapIndex = $(this).index();
				if(tapIndex != 0) {
					var tapText = $(this).text();
					suc({
						msg: 'ok',
						tapIndex: tapIndex,
						tapText: tapText
					})
					hideAction();
				}
			} else {
				var tapIndex = $(this).index() + 1;
				var tapText = $(this).text();
				suc({
					msg: 'ok',
					tapIndex: tapIndex,
					tapText: tapText
				})
				hideAction();
			}
		})
	},

	//Vue懒加载
	lazyLoad(urlImg){
		Vue.use(VueLazyload, {
			preLoad: 1.3,
			error: urlImg,
			loading: urlImg,
			attempt: 2
		})
	},

}