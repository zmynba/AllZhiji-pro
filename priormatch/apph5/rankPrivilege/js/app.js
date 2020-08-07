//app对象为封装的公共函数
var app = {
	globalDataUrl: "", //公共域名
	clientW: document.documentElement.clientWidth, //屏幕宽度
	clientH: document.documentElement.clientHeight, //屏幕高度
	urlc: '?__plat=h5&__version=1.0&channel=h5',
	language: localStorage.getItem('lang') || 'zh', //获取本地存储语言
	dotList: {},
	getToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
	
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
				obj.leftIcon == undefined && (obj.leftIcon = '/img/icon_back.png');
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

	//时间格式转换
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

	//获取页面间传递的参数
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

	//获取页面间传递的参数2
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
	
	//时间格式时1位数字时在前面添加0
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
	}
}

//跳转页面函数(可携带一个参数，参数名为id)
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

//var Authorization = localStorage.getItem('Authorization');

//按下背景变化
var keyDown = function(ele, className) {
	if(className.indexOf('.') == -1) {
		$(ele).addClass(className);
	} else {
		$(ele).attr('src', className);
	}
}

//松开背景变化
var keyUp = function(ele, className) {
	if(className.indexOf('.') == -1) {
		$(ele).removeClass(className);
	} else {
		$(ele).attr('src', className);
	}
}

//获取传参
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

function iosTrouchFn(el) {
    //el需要滑动的元素
    el.addEventListener('touchmove',function(e){
        e.isSCROLL = true;
    })
    document.body.addEventListener('touchmove',function(e){
        if(!e.isSCROLL){
            e.preventDefault(); //阻止默认事件(上下滑动)
        }else{
            //需要滑动的区域
            var top = el.scrollTop; //对象最顶端和窗口最顶端之间的距离 
            var scrollH = el.scrollHeight; //含滚动内容的元素大小
            var offsetH = el.offsetHeight; //网页可见区域高
            var cScroll = top + offsetH; //当前滚动的距离
 
            //被滑动到最上方和最下方的时候
            if(top == 0){
                top = 1; //0～1之间的小数会被当成0
            }else if(cScroll === scrollH){
                  el.scrollTop = top - 0.1;
            }
        }
    }, {passive: false}) //passive防止阻止默认事件不生效
}