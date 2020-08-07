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
	globalDataUrl: "https://shop.mylove120.com", //公共域名
	myId: '100096935', //用户ID(此处仅供测试使用)
	publicH: '108', //头部和底部高度之和
	clientW: document.documentElement.clientWidth, //屏幕宽度
	clientH: document.documentElement.clientHeight, //屏幕高度
	newsNum: 0, //消息总数量(模拟数据，仅供测试使用)
	isShowClosure: false,	//帮助页面是否显示禁封按钮
	contentNum: 1,
	liveNum: 0,
	urlc: '?__plat=h5&__version=1.0&channel=h5',
	language: localStorage.getItem('lang') || 'zh', //获取本地存储语言
	newData: {},
	newsList: {},
	dotList: {},
	noticeNum: 0,
	getToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
	rechargeList: [
		{
			id: '1',
			name: interLang.wxPay,
			imgUrl: 'img/mine/r_08.png'
		},
		{
			id: '2',
			name: interLang.aliPay,
			imgUrl: 'img/mine/r_09.png'
		},
		{
			id: '3',
			name: interLang.paypal,
			imgUrl: 'img/mine/r_10.png'
		},
		{
			id: '4',
			name: interLang.vtcpay,
			imgUrl: 'img/mine/r_12.png'
		},
		{
			id: '5',
			name: interLang.IWpay,
			imgUrl: 'img/mine/IndianWallets.png'
		}
		
	], 
	
	//充值方式

	//头部公共函数
	/*
	 * 方法说明：
	 * 参数(必填)：
	 * left: true时，左侧为显示状态，left: false时，左侧为隐藏状态
	 * content: ''; 值为字符串，头部标题，可为空
	 * right： true时，右侧为显示状态，left: false时，右侧为隐藏状态
	 * 参数(选填):
	 * leftText：String 左侧为非图标时使用，leftIcon：(图片路径) 左侧为图标时使用
	 * lWeight，lSize，lColor，此三个为样式属性，仅在左侧为leftText时使用
	 * mWeight，mSize，mColor，mOpacity，此为中间标题部分动态添加修改样式
	 * rightText：String 右侧为非图标时使用，rightIcon：(图片路径) 右侧为图标时使用
	 * rWeight，rSize，rColor，此三个为样式属性，仅在右侧为rightText时使用
	 * isNeedHeight：true时导航外层高度为0，为false时外层高度为固定导航的高度
	 * backgroundColor：此属性为动态添加修改导航背景色
	 * success：此属性为右侧导航的回调函数，在点击右侧导航时才会调用
	 */
	publicHead(obj) {
		var suc = obj.success || function(data) {};
		var headParent = document.getElementById('header');

		//判断是否需要撑起header高度
		if(obj.isNeedHeight) {
			headParent.style.height = 0;
		} else {
			headParent.style.height = '50px';
		}

		var headKids = document.createElement('div');
		//是否需要下边框
		if(obj.borderBottom) {
			headKids.className = 'main-box main-flex main-aic main-bb head';
		} else {
			headKids.className = 'main-box main-flex main-aic head';
		}

		//动态添加头部背景色
		if(obj.backgroundColor) {
			headKids.style.background = obj.backgroundColor;
		} else {
			headKids.style.background = '#FFFFFF';
		}
		
		//Left(左侧返回按钮)
		var headLeft = document.createElement('div');
		headLeft.className = 'main-box head_lf';
		if(obj.left) {
			if(!obj.leftText) {
				var urlhttp = location.host;
				obj.leftIcon == undefined && (obj.leftIcon = 'http://' + urlhttp + '/page/img/public/icon_back.png');
				var leftImg = document.createElement('img');
				leftImg.src = obj.leftIcon;
				leftImg.className = 'head_back';
				headLeft.appendChild(leftImg);
				headLeft.onclick = function() {
					//window.location.replace(document.referrer);
					window.history.go(-1);
				}
			} else {
				obj.lWeight == undefined ? (obj.lWeight = 'normal') : obj.lWeight;
				obj.lSize == undefined ? (obj.lSize = '16px') : obj.lSize;
				obj.lColor == undefined ? (obj.lColor = '#333') : obj.lColor;
				headLeft.style.cssText = 'font-weight: ' + obj.lWeight + ';font-size: ' + obj.lSize + ';color: ' + obj.lColor;
				headLeft.innerHTML = obj.leftText;
			}
		}
		headKids.appendChild(headLeft);

		//Middle(中间导航标题)
		var headMiddle = document.createElement('div');
		headMiddle.className = 'main-box main-f1 main-tac main-ellipsis head_md';
		obj.mWeight == undefined ? (obj.mWeight = 'normal') : obj.mWeight;
		obj.mSize == undefined ? (obj.mSize = '16px') : obj.mSize;
		obj.mColor == undefined ? (obj.mColor = '#333') : obj.mColor;
		obj.mOpacity == undefined ? (obj.mOpacity = '1') : obj.mOpacity;
		headMiddle.style.cssText = 'font-weight: ' + obj.mWeight + ';font-size: ' + obj.mSize + ';color: ' + obj.mColor + ';opacity: ' + obj.mOpacity;
		headMiddle.innerHTML = obj.content;
		headKids.appendChild(headMiddle);

		//Right(右侧按钮)
		var headRight = document.createElement('div');
		headRight.className = 'main-box head_rt';
		if(obj.right) {
			if(!obj.rightText && !obj.rightIcon) {
				headRight.innerHTML = '';
			} else {
				if(!obj.rightText) {
					var rightImg = document.createElement('img');
					rightImg.src = obj.rightIcon;
					rightImg.className = 'head_back';
					headRight.appendChild(rightImg);
				} else {
					obj.rWeight == undefined ? (obj.rWeight = 'normal') : obj.rWeight;
					obj.rSize == undefined ? (obj.rSize = '15px') : obj.rSize;
					obj.rColor == undefined ? (obj.rColor = '#333333') : obj.rColor;
					headRight.style.cssText = 'font-weight: ' + obj.rWeight + ';font-size: ' + obj.rSize + ';color: ' + obj.rColor;
					headRight.innerHTML = obj.rightText;
				}
				headRight.onclick = function() {
					suc({
						msg: '执行回调'
					});
				}
			}
		}
		headKids.appendChild(headRight);
		
		//左侧和右侧是否需要自定义宽度(左右默认宽度是45像素)
		if(obj.sideWidth){
			headRight.style.width = headLeft.style.width = obj.sideWidth;
		}else{
			headRight.style.width = headLeft.style.width = '45px';
		}

		//追加到页面
		headParent.appendChild(headKids);
	},
	loginNo(msg){
		if(msg.errno == 200){
			this.showToast({
				title: msg.errmsg,
				duraiton: 1500
			})
			//setTimeout(function(){ location.replace('../index.html'); },1500);
		}else if(msg.errno == 801){
			this.showToast({
				title: msg.errmsg,
				duraiton: 1500
			})
			//setTimeout(function(){ location.replace('../index.html'); },1500);
		}
	},
	formatDate(date, fmt) {
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
		for(let k in o) {
			if(new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + ''
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
			}
		}
		return fmt
	},

	//尾部公共函数
	/*
	 * 方法说明：
	 * id：Number(必选)，1为邂逅，2为发现，3为直播，4为消息，5为个人中心
	 * num: Number(非必选)，此参数为有未读消息时，显示未读消息的数量
	 */
	publicFoot(obj) {
		var footKids = '<div class="main-box main-flex main-aic foot_content"></div>';
		$('#footer').append(footKids);
		if(localStorage.getItem('token') == null) {
			var navList = [
				{
					id: 3,
					title: '直播',
					urls: 'live.html',
					navIcon: 'img/public/f_03.png',
					navActiveIcon: 'img/public/f_active03.png'
				},
				{
					id: 4,
					title: '消息',
					urls: 'news.html',
					navIcon: 'img/public/f_04.png',
					navActiveIcon: 'img/public/f_active04.png'
				},
				{
					id: 5,
					title: '个人中心',
					urls: 'mine.html',
					navIcon: 'img/public/f_05.png',
					navActiveIcon: 'img/public/f_active05.png'
				}
			];
		} else {
			var navList = [{
					id: 1,
					title: '邂逅',
					urls: 'index.html',
					navIcon: 'img/public/f_01.png',
					navActiveIcon: 'img/public/f_active01.png'
				},
				{
					id: 2,
					title: '发现',
					urls: 'online.html',
					navIcon: 'img/public/f_02.png',
					navActiveIcon: 'img/public/f_active02.png'
				},
				{
					id: 3,
					title: '直播',
					urls: 'live.html',
					navIcon: 'img/public/f_03.png',
					navActiveIcon: 'img/public/f_active03.png'
				},
				{
					id: 4,
					title: '消息',
					urls: 'news.html',
					navIcon: 'img/public/f_04.png',
					navActiveIcon: 'img/public/f_active04.png'
				},
				{
					id: 5,
					title: '个人中心',
					urls: 'mine.html',
					navIcon: 'img/public/f_05.png',
					navActiveIcon: 'img/public/f_active05.png'
				}
			];
		}
		for(var i = 0, str = ''; i < navList.length; i++) {
			var imgUrl = '',
				numText = '',
				unread = '';
			if(obj.id == navList[i].id) {
				imgUrl = navList[i].navActiveIcon;
			} else {
				imgUrl = navList[i].navIcon;
			}

			//显示数量图标(此app.newsNum为消息总数量，为模拟数据，具体数据请求接口获取)
			if(navList[i].id == 4) {
				//console.log('红点0', app.newsNum);
				app.newsNum = app.newsNum > 99 ? '99+' : app.newsNum;
				//console.log('红点1', app.newsNum);
				if(app.newsNum == '99+' || app.newsNum > 0) {
					numText = '<b  id="interact_num" style="display:block;" class="foot_num">' + app.newsNum + '</b>';
				}else{
					numText = '<b  id="interact_num" style="display:none;" class="foot_num"></b>';
				}
			}

			//有新增内容时显示圆点
			//if(navList[i].id == 5) {
			//	unread = '<b class="unread foot_unread"></b>';
			//}

			//追加
			str += '<a class="main-box main-f1 main-tac" href="' + navList[i].urls + '">' +
				'<span class="foot_li">' +
				'<img class="main-w10 main-vat" src="' + imgUrl + '" />' +
				numText +
				unread +
				'</span>' +
				'</a>'
		}
		$('#footer>div').append(str);
	},

	alipay(sign){
		var str = sign;
		var listOne = str.split('&');
		console.log('listOne:', listOne);
		var obj = {};
		var formstr = "";
		for(var i = 0, listTwo = ''; i < listOne.length; i++) {
			listTwo = listOne[i].split('=');
			listTwo[1] = decodeURI(listTwo[1]);
			//obj[listTwo[0]] = decodeURIComponent(listTwo[1]);
			formstr +="<input type='hidden' name='"+ listTwo[0] +"' value='"+ decodeURIComponent(listTwo[1]) +"'/>";
		}
		var formdiv = "<form id='alipaysubmit' name='alipaysubmit' action='https://openapi.alipay.com/gateway.do?charset=UTF-8' method='POST'>" + formstr + "</form><script>document.forms['alipaysubmit'].submit();</script>";
		const div = document.createElement('div');
		div.innerHTML = formdiv;  //res.data是返回的表单
		document.body.appendChild(div);
		document.forms.alipaysubmit.submit();
	},

	//封装Ajax
	myRequest(urls, data, suc, fail, type, isAsync) {
		var types = type || 'GET';
		var isAsync = isAsync == true || isAsync == undefined ? true : false;
		$.ajax({
			type: types,
			url: urls,
			async: isAsync, //是否异步
			data: data,
			success: function(res) {
				/*var result = {};
				result.data = JSON.parse(res);
				result.errMsg = "request:ok";
				result.statusCode = 200;*/
				if(suc) {
					suc(JSON.parse(res));
				}
			},
			error: function(res) {
				if(fail) {
					fail(res);
				}
			}
		});
	},

	//原生Ajax封装
	doAjax(server, data, handler, isJson, isAsync) {
		var xmlhttp;
		var tdata = [];
		for(var o in data) {
			tdata.push(o + "=" + encodeURIComponent(data[o]));
		}
		if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				if(isJson) { //如果是json，封装一下
					try {
						result = eval("(" + result + ")");
					} catch(e) { //可能连接服务器失败.
						result = null;
					}
				} else {
					result = result.replace(/(^[\s]*)|([\s]*$)/g, "");
				}
				if(handler) {
					handler(result);
				} else {
					alert("没有handler");
				}
			}
		};
		xmlhttp.open("POST", server, true);
		xmlhttp.upload.addEventListener("progress", function(evt) {}, false);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf8");
		xmlhttp.send(tdata.join("&"));
	},

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
	GetRequest(id){
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

	},
	//取消弹框底部滑动行为
	noSlide(e) {
		e.preventDefault();
		return false;
	},

	//提示弹框
	/*
	 * 方法说明：
	 * title：String(必选参数)，为提示的文字
	 * icon：图片路径(非必选参数)，如果需要加提示图标 可选此参数
	 * duration：Number(非必选参数)，为提示的时间，默认为1000(毫秒)
	 */
	showToast(obj) {
		obj.duration == undefined ? (obj.duration = 1000) : obj.duration;
		obj.icon == undefined ? (obj.icon = '') : (obj.icon = '<img src="' + obj.icon + '" />');
		$('body').append('<div class="main-box toast"><div class="main-box">' + obj.icon + '<p>' + obj.title + '</p></div></div>');
		setTimeout(function() {
			$('.toast').remove();
		}, obj.duration);
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

	//分享封装
	/*
	 * 方法说明：
	 * success：Function(必选参数)，点击分享的回调函数
	 * title：String(非必选参数)，标题文字
	 * list：Array(非必选参数)，要分享的数组
	 */
	Share(data) {
		var that = this;
		var suc = data.success || function(res) {};
		data.title == undefined && (data.title = interLang.shareTo);
		if(data.list == undefined) {
			data.list = [{
					id: 1,
					name: interLang.wx,
					urls: 'wx',
					imgUrl: 'img/public/s_01.png'
				},
				{
					id: 2,
					name: 'QQ',
					urls: 'qq',
					imgUrl: 'img/public/s_02.png'
				},
				{
					id: 3,
					name: interLang.qqZone,
					urls: 'qqZone',
					imgUrl: 'img/public/s_03.png'
				},
				{
					id: 4,
					name: interLang.blog,
					urls: 'wb',
					imgUrl: 'img/public/s_04.png'
				}
			]
		}

		for(var i = 0, shareList = ''; i < data.list.length; i++) {
			shareList += '<a data-urls="' + data.list[i].urls + '" class="main-box main-lf share_li">' +
				'<img src="' + data.list[i].imgUrl + '"/>' +
				'<p>' + data.list[i].name + '</p>' +
				'</a>'
		}

		//追加操作
		$('body').append('<div class="main-box share">' +
			'<div class="main-box share_mask" onclick="cancelShare();"></div>' +
			'<div class="main-box main-hide share_content">' +
			'<p class="main-box share_title">' + data.title + '</p>' +
			'<div class="main-box main-over share_list">' +
			shareList +
			'</div>' +
			'</div>' +
			'</div>');
		$('.share_content').slideDown();

		//取消灰色背景下默认滑动问题
		$('.share_mask')[0].addEventListener('touchmove', app.noSlide, false);
		$('.share_content')[0].addEventListener('touchmove', app.noSlide, false);

		//取消分享
		cancelShare = function() {
			$('.share_content').slideUp();
			setTimeout(function() {
				$('.share').remove();
			}, 300);
		}

		//点击分享
		$('.share_li').click(function() {
			var urls = $(this).attr('data-urls');
			suc({
				msg: '分享操作',
				result: '分享至' + urls + '成功'
			});
			cancelShare();
		})
	},

	//语言设置弹框封装
	languageSetting(key, list, isSlide, success) {
		var suc = success || function(data) {};
		var langList = [{
				id: 1,
				name: '中文简体',
				abb: 'zh'
			},
			{
				id: 2,
				name: 'English',
				abb: 'en'
			},
			{
				id: 3,
				name: 'Vietnamese',
				abb: 'vi'
			},
			{
				id: 4,
				name: 'Russian',
				abb: 'ru'
			},
			{
				id: 5,
				name: 'Spanish',
				abb: 'es'
			}
		];

		//var lang = localStorage.getItem('lang');
		var lang = app.language;
		for(var i = 0, str = ''; i < langList.length; i++) {
			if(lang == langList[i].abb) {
				str += '<li class="main-box main-inline main-w5 main-ellipsis lang_li lang_active" data-abb="' + langList[i].abb + '">' + langList[i].name + '</li>';
			} else {
				str += '<li class="main-box main-inline main-w5 main-ellipsis lang_li" data-abb="' + langList[i].abb + '">' + langList[i].name + '</li>';
			}
		}

		//追加
		$('body').append('<div class="main-box lang_setting">' +
			'<div class="main-box main-flex main-aic main-jcc lang_container">' +
			'<p class="lang_mask" onclick="hideLanguageSetting()"></p>' +
			'<div class="main-box main-bg main-hide lang_content">' +
			'<p class="main-box main-tac lang_title">' + interLang.langSetting + '</p>' +
			'<ul class="main-box lang_list">' +
			str +
			'</ul>' +
			'</div>' +
			'</div>' +
			'</div>');
		$('.lang_content').fadeIn();

		//取消灰色背景下默认滑动问题
		$('.lang_mask')[0].addEventListener('touchmove', app.noSlide, false);
		$('.lang_content')[0].addEventListener('touchmove', app.noSlide, false);

		//点击切换语言
		$('.lang_li').click(function() {
			var abb = $(this).attr('data-abb'); //获取对应语言简称
			app.language = abb; //切换状态
			//localStorage.setItem('lang', abb);
			//location.reload();

			//需要回调时
			if(key == 'none') {
				suc({
					msg: 'ok',
					result: abb
				})
				//需要接口操作时
			} else {
				//模拟接口操作
				var text = '';
				if(abb == 'ru') {
					text = 'Это динамический компонент.Это динамический компонент.';
				} else if(abb == 'en') {
					text = 'This is the dynamic content part.This is the dynamic content part.';
				} else if(abb == 'vi') {
					text = 'Đây là nội dung phần năng độngĐây là nội dung phần năng động';
				} else if(abb == 'es') {
					text = 'Este es el componente dinámico.Este es el componente dinámico.';
				} else if(abb == 'zh') {
					text = '这里是动态内容部分这里是动态内容部分这里是动态内容部分这里是动态内容部分这里是动态内容部分';
				}

				app.showLoading({
					title: '翻译中'
				})

				setTimeout(function() {
					app.hideLoading();
					if(key == 'none') {
						list.translate = text;
					} else {
						list[key].translate = text;
					}
				}, 500)
			}

			//判断高度(只有需要滑动时才执行)
			isSlide && app.swiperHeightChange();
			hideLanguageSetting(); //隐藏弹框
		})

		//隐藏弹框
		hideLanguageSetting = function() {
			$('.lang_setting').remove();
		}
	},

	//解决Swiper组件滑动时高度问题
	swiperHeight(otherHeight, k) {
		var slideH = document.documentElement.clientHeight - otherHeight;
		var currentHeight = $('.swiper-slide:eq(' + k + ') .slide_height').height();
		currentHeight < slideH ? (currentHeight = slideH) : currentHeight;
		$('.swiper-wrapper').css('height', currentHeight + 'px');
	},

	//解决Swiper组件高度动态变化时问题(仅针对ID为increaseHeight时的TAB)
	swiperHeightChange() {
		setTimeout(function() {
			var currentHeight = $('.swiper-wrapper').height();
			var changeHeight = $('#increaseHeight').height();
			if(changeHeight > currentHeight) {
				$('.swiper-wrapper').css('height', changeHeight);
			}
		}, 1000);
	},

	//查看翻译(点击翻译时使用)
	lookTranslate(key, temps, isSlide) {
		app.showLoading({
			title: '翻译中'
		})

		//切换文字(按钮状态)
		setTimeout(function() {
			app.hideLoading();
			if(key == 'none') {
				temps.isTranslate = true;
			} else {
				temps[key].isTranslate = true;
			}
		}, 500)

		//判断高度(只有需要滑动时才执行)
		isSlide && app.swiperHeightChange();
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

	//图片预览
	previewImage(obj) {
		$('body').append('<div class="img_preview">' +
			'<div class="main-flex main-aic main-jcc img_big">' +
			'<img class="main-w10 main-vat fadfcv" src="' + obj.current + '"/>' +
			'</div>' +
			'</div>');

		//取消灰色背景下默认滑动问题
		$('.img_preview')[0].addEventListener('touchmove', app.noSlide, false);

		//点击消失
		$('.img_preview').click(function() {
			$('.img_preview').remove();
		})
	},

	//开关按钮封装
	/*
	 * 参数说明：
	 * topClass：(非必选)，为顶级父class,当为多个开关列表时必选此参数
	 * isOne: (非必选)，为单个开关时必须要有此参数
	 * success：(必选参数),为切换成功的回调函数
	 * openBg：(非必选)，为打开时的背景色
	 * closeBg：(非必选)，为关闭时的背景色
	 * data-checked属性为1时是打开状态，为0时是关闭状态
	 */
	switchDp(obj) {
		var suc = obj.success || function(data) {};
		var openBg = obj.openBg || '#4dd963';
		var closeBg = obj.closeBg || '#e8e8e8';

		//开关背景变化
		switchChange = function(n, isOne) {
			var currentLi = isOne ? $('.switch-dp') : $(obj.topClass).find('li:nth-child(' + (n + 1) + ') .switch-dp');
			var isChecked = currentLi.attr('data-checked');
			if(isChecked == 1) {
				currentLi.find('span').css('left', '18px');
				currentLi.css({
					background: openBg,
					boxShadow: '0 0 1px 1px ' + openBg
				});
			} else {
				currentLi.find('span').css('left', '0');
				currentLi.css({
					background: closeBg,
					boxShadow: '0 0 1px 1px ' + closeBg
				})
			}
			return isChecked;
		}

		//遍历所有的开关
		var child = document.getElementsByClassName('switch-dp');
		for(var i = 0; i < child.length; i++) {
			switchChange(i, obj.isOne);

			//点击开关
			child[i].index = i;
			child[i].onclick = function() {
				//console.log('点击的是哪个',this.index);
				var m = this.index;
				var switchStatus = switchChange(m, obj.isOne);
				if(switchStatus == 0) {
					this.setAttribute('data-checked', 1);
				} else {
					this.setAttribute('data-checked', 0);
				}
				var isChecked = switchChange(m, obj.isOne) == 1 ? true : false;
				suc({
					msg: 'ok',
					isChecked: isChecked
				})
			}
		}
	},

	//翻译特权弹框(无参数)
	privilegeDp(obj) {
		$('body').append('<div class="privilege-dp">' +
			'<div class="main-w10 main-hg privilege_mask">' +
			'<div class="main-hg main-flex main-aic main-jcc">' +
			'<div class="main-f1 privilege_content">' +
			'<div class="main-w10 main-hg">' +
			'<div class="privilege_detail">' +
			'<p class="main-tac privilege_title">' + interLang.getPrivileges + '</p>' +
			'<p class="privilege_text">' + interLang.noTranslation + '</p>' +
			'<div class="main-flex privilege_btns">' +
			'<div class="main-f1 main-relative privilege_lf">' +
			'<img class="main-w10 main-vat" ontouchstart="keyDown(this,\'img/public/ta_01.png\')" ontouchend="keyUp(this,\'img/public/t_01.png\')" src="img/public/t_01.png"/>' +
			'<p class="main-w10 main-hg main-tac privilege_no">' + interLang.noNeed + '</p>' +
			'</div>' +
			'<div class="main-f1 main-relative privilege_rt">' +
			'<img class="main-w10 main-vat" ontouchstart="keyDown(this,\'img/public/ta_02.png\')" ontouchend="keyUp(this,\'img/public/t_02.png\')" src="img/public/t_02.png"/>' +
			'<p class="main-w10 main-hg main-tac privilege_yes">' + interLang.openVip + '</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');

		//取消灰色背景下默认滑动问题
		$('.privilege_mask')[0].addEventListener('touchmove', app.noSlide, false);

		//取消弹框
		$('.privilege_lf').click(function() {
			$('.privilege-dp').remove();
		})

		//跳转VIP充值页面
		$('.privilege_rt').click(function() {
			window.location.href = 'vipCenter.html';
		})
	},

	//匹配弹框封装
	/*
	 * 参数说明：
	 * success：点击支付时的回调函数
	 */
	mateDp(obj) {
		var suc = obj.success || function(data) {};

		//滑动内容循环
		var swiperList = [{
				id: '1',
				title: '查看喜欢',
				content: '查看谁喜欢过我'
			},
			{
				id: '2',
				title: '查看访客',
				content: '查看谁访问过我'
			},
			{
				id: '3',
				title: '无限邂逅',
				content: '无限制匹配'
			},
			{
				id: '4',
				title: '翻译特权',
				content: '浏览更多动态'
			},
			{
				id: '5',
				title: '专属礼物',
				content: '直播间专属特权'
			}
		];
		for(var i = 0, swiperHtml = ''; i < swiperList.length; i++) {
			swiperHtml += '<div class="swiper-slide">' +
				'<p class="main-w7 main-ellipsis main-tac mate_t1">' + swiperList[i].title + '</p>' +
				'<p class="main-w7 main-ellipsis-2 main-tac mate_t2">' + swiperList[i].content + '</p>' +
				'</div>';
		};

		//价格内容循环
		var priceList = [{
				id: '1',
				month: '12',
				price: '119',
				isHot: 1
			},
			{
				id: '2',
				month: '3',
				price: '29.9',
				isHot: 0
			},
			{
				id: '3',
				month: '1',
				price: '10',
				isHot: 0
			}
		];
		for(var j = 0, priceHtml = ''; j < priceList.length; j++) {
			if(priceList[j].isHot) {
				priceHtml += '<div class="main-f1 main-tac main-hg main-relative mate_li mate_active" data-hot="' + priceList[j].isHot + '" data-id="' + priceList[j].id + '" data-price="' + priceList[j].price + '" data-month="' + priceList[j].month + '">' +
					'<div class="mate_pt">' +
					'<span class="mate_color">' + priceList[j].month + '</span>' +
					'<b class="mate_color">' + interLang.months + '</b>' +
					'</div>' +
					'<p class="mate_t3 mate_color">$' + priceList[j].price + ' /mo.</p>' +
					'<img class="mate_hot" src="img/public/m_hot.png"/>' +
					'</div>';
			} else {
				priceHtml += '<div class="main-f1 main-tac main-hg main-relative mate_li" data-hot="' + priceList[j].isHot + '" data-id="' + priceList[j].id + '" data-price="' + priceList[j].price + '" data-month="' + priceList[j].month + '">' +
					'<div class="mate_pt">' +
					'<span>' + priceList[j].month + '</span>' +
					'<b>个月</b>' +
					'</div>' +
					'<p class="mate_t3">$' + priceList[j].price + ' /mo.</p>' +
					'<img class="main-hide mate_hot" src="img/public/m_hot.png"/>' +
					'</div>';
			}
		}

		//默认选择价格数组内第一项
		var priceObj = {
			id: priceList[0].id,
			price: priceList[0].price,
			month: priceList[0].month
		};

		//页面追加
		$('body').append('<div class="mate-dp">' +
			'<div class="main-w10 main-hg mate_mask">' +
			'<div class="main-hg main-flex main-aic">' +
			'<div class="main-f1">' +
			'<div class="main-relative mate_bg">' +
			'<img class="main-w10 main-vat" src="img/public/m_01.png"/>' +
			'<div class="mate_del">' +
			'<img class="main-w10 main-vat" src="img/public/m_del.png"/>' +
			'</div>' +
			'<div class="main-w10 mate_slide">' +
			'<div class="swiper-container main-hg mate_swiper">' +
			'<div class="swiper-wrapper main-hg">' +
			swiperHtml +
			'</div>' +
			'<div class="swiper-pagination"></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="main-bg mate_container">' +
			'<div class="main-flex mate_content">' +
			priceHtml +
			'</div>' +
			'<div class="mate_btns">' +
			'<div class="main-relative">' +
			'<img class="main-w10 main-vat" ontouchstart="keyDown(this,\'img/public/ma_bg.png\')" ontouchend="keyUp(this,\'img/public/m_bg.png\')" src="img/public/m_bg.png"/>' +
			'<p class="main-w10 main-hg main-flex main-aic main-jcc main-pe mate_t4">' + interLang.upgradeSvip + '</p>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>');

		//取消灰色背景下默认滑动问题
		$('.mate_mask')[0].addEventListener('touchmove', app.noSlide, false);

		//Swiper组件初始化
		var mateSwiper = new Swiper('.mate_swiper', {
			initialSlide: 0, //当前显示哪一个
			slidesPerView: 1, //同时显示的个数
			spaceBetween: 0, //两个slide之间的距离
			loop: false, //是否循环
			pagination: '.swiper-pagination',
			onSlideChangeStart: function(swiper) {
				//console.log('子表情组件',swiper);
				$('.mate_bg').css('backgroundImage', 'url(img/public/m_0' + (swiper.activeIndex + 1) + '.png)');
			}
		})

		//隐藏弹框
		$('.mate_del').click(function() {
			$('.mate-dp').remove();
		})

		//切换价格
		$('.mate_li').click(function() {
			var isHot = $(this).attr('data-hot');
			var priceId = $(this).attr('data-id');
			var price = $(this).attr('data-price');
			var month = $(this).attr('data-month');
			$(this).siblings('div').find('img').addClass('main-hide');
			if(isHot == 1) {
				$(this).find('img').removeClass('main-hide');
			}

			$(this).addClass('mate_active').siblings('div').removeClass('mate_active');
			$(this).find('span').addClass('mate_color');
			$(this).siblings('div').find('span').removeClass('mate_color');
			$(this).find('b').addClass('mate_color');
			$(this).siblings('div').find('b').removeClass('mate_color');
			$(this).find('p').addClass('mate_color');
			$(this).siblings('div').find('p').removeClass('mate_color');

			//保存选择内容
			priceObj.id = priceId;
			priceObj.price = price;
			priceObj.month = month;
		})

		//确定按钮
		$(".mate_btns").click(function() {
			suc({
				msg: 'ok',
				result: priceObj
			})
			$('.mate-dp').remove();
		})
	},

	//滑动删除封装
	/*
	 * 参数说明：
	 * slideClass(必选)：要滑动的当前的class；
	 * success(必选)：点击删除时的回调函数
	 */
	slideRemove(obj) {
		var suc = obj.success || function(data) {};
		var moveStart = 0,
			moveX = 0,
			id = '';

		//追加删除按钮
		$(obj.slideClass).parent().append('<p class="main-flex main-aic main-jcc seen_del">' + interLang.delete + '</p>');

		//开始滑动
		$(obj.slideClass).on('touchstart', function(e) {
			//阻止页面默认行为
			//e.preventDefault();
			//开始滑动的位置
			moveStart = e.touches[0].clientX;
			//滑动时先把滑动删除隐藏
			$(obj.slideClass).css('left', '0');
			//获取当前滑动的ID
			id = $(this).attr('data-id');
		})

		//滑动中
		$(obj.slideClass).on('touchmove', function(e) {
			//阻止页面默认行为
			//e.preventDefault();
			//滑动的距离
			moveX = moveStart - e.touches[0].clientX;
			if(moveX > 0 && moveX < 75) {
				$(this).css('left', '-' + moveX + 'px');
			} else if(moveX > 75) {
				$(this).css('left', '-75px');
			}
		})

		//滑动结束
		$(obj.slideClass).on('touchend', function(e) {
			//阻止页面默认行为
			//e.preventDefault();
			if(moveX >= 38) {
				$(this).css('left', '-75px');
			} else {
				$(this).css('left', '0');
			}
		})

		//点击删除按钮
		$('.seen_del').click(function() {
			suc({
				msg: 'ok',
				result: id
			});
		})
	},

	//判断是否微信登陆 
	isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		console.log(ua); //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1 
		if(ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
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
	
	add0(m) {
		return m < 10 ? '0' + m : m
	},
	
	//时间戳转换
	formatDate(shijianchuo) {
		var time = new Date(shijianchuo);
		console.log('时间戳转换', time);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
	},
	
	//时间格式转换
	timeChange(dateString, formdate) {
		if(dateString == null || dateString == '') {
			return '';
		}
		// new Date('');传入毫秒数,也可以得到普通的时间,再对date处理
		var date = new Date(parseInt(dateString));
		//获取年份,月份,天数,小时数,分钟数,小于10的显示01-09
		var year = date.getFullYear();
		var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
		var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
		var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		if(formdate == null || formdate == "yyyy-mm-dd HH:mm") {
			return year + "-" + month + "-" + currentDate + " " + hours + ":" + minutes;
		} else if(formdate == "yyyy-mm-dd") {
			return year + "-" + month + "-" + currentDate;
		} else if(formdate == "yyyy-mm") {
			return year + month;
		} else if(formdate == "mm-dd") {
			return month + "-" + currentDate;
		} else if(formdate == "HH:mm") {
			return hours + ":" + minutes;
		} else {
			return "";
		}
	},

	//顶部title文字
	topTitleText(txt) {
		$('title').html(txt);
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
	
	//关注和取消关注封装
	followFn(obj){
		var data = {
			followFrom: obj.userId,
			followTo: obj.visitorId,
			type: obj.type,
			lang: app.lang
		}
		var suc = obj.success || function(data) {};
		app.myRequest('php/focusUpdate.php', data, function(res){
			//console.log('关注操作',res);
			if(res.errcode == 0){
				var isFollow = '';
				if(obj.type == 1){
					isFollow = true;
				}else{
					isFollow = false;
				}
				suc({
					msg: 'ok',
					follow: isFollow
				})
			}else{
				app.showToast({
					title: res.msg,
					duration: 1500
				})
			}
		},function(){
			app.showToast({
				title: '加载失败',
				duraiton: 1500
			})
		}, 'POST', false);
	}
}
//跳转页面函数(可携带一个参数，参数名为id)
function jumpLoginTo(that, url) {
	var dynamicId = $(that).attr('data-id');
		dynamicId ? (dynamicId = '?id=' + dynamicId) : dynamicId = '';
		window.location.href = url + dynamicId;
}
function jumpTo(that, url) {
	var dynamicId = $(that).attr('data-id');
	if(localStorage.getItem('token') == null) {
		openlogin();
	} else {
		dynamicId ? (dynamicId = '?id=' + dynamicId) : dynamicId = '';
		window.location.href = url + dynamicId;
	}
}

//数据处理
var str2json = function(s) {
	try {
		s = eval("(" + s + ")");
	} catch(e) {
		self.print("str2json error:" + s);
	}
	return s;
};

//数据处理
var json2str = function(o) {
	var arr = [];
	for(var p in o) {
		var v = String(o[p]);
		v = v.replace(/(\W)/g, "\\$1");
		arr.push('"' + p + '":"' + v + '"');
	}
	return '{' + arr.join(',') + '}';
};

//浏览器判断
function sysJudge(){
	console.log('sysJudge');
	var url=location.href;
	var type=navigator.userAgent;
	if(type.indexOf('iPhone')>-1){
		if(url.indexOf('priormatch')>-1){
			return false;
		}else{
			window.location.href="http://wap.priormatch.com";
		}
	}else{
		if(url.indexOf('priormatch')>-1){
			window.location.href="http://wap.latemeet.com";
		}else{
			return false;
		}
	}
}
//sysJudge()
 