//app对象为封装的公共函数
var app = {
	globalDataUrl: "http://h5.worldare.com/", //公共域名
	interfaceUrl: "http://m.api.worldare.com/",
	searchurl: '', //获取url中"?"符后的字串
	clientW: document.documentElement.clientWidth, //屏幕宽度
	clientH: document.documentElement.clientHeight, //屏幕高度

	urlc: '?__plat=h5&__version=1.0&channel=h5',
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
				obj.leftIcon == undefined && (obj.leftIcon = 'http://' + urlhttp + '/img/icon_back.png');
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
}
//跳转页面函数(可携带一个参数，参数名为id)
function jumpTo(that, url) {
	var dynamicId = $(that).attr('data-id');
	dynamicId ? (dynamicId = '?id=' + dynamicId) : dynamicId = '';
	window.location.href = url + dynamicId;
}

function appVersoinSuccess(appVersion) {
	alert("appVersion: " + appVersion);
}

function appVersoinFailure(err) {
	alert(err);
}

function getAppVersion() {
	var appVersion = window.WorldAre.getAppVersion(appVersoinSuccess, appVersoinFailure);
}

function avatarSuccess(avatar) {
	alert(avatar);
}

function avatarFailure(err) {
	alert(err);
}

function uploadAvatar() {
	window.WorldAre.uploadAvatar(avatarSuccess, avatarFailure);
}

function authSuccess(auth) {
	alert(auth);
}

function authFailure(err) {
	alert(err);
}

function navBackClicked () {
	goToBack(true);
}

function goToBack(toBack) {
	window.WorldAre.goToBackHistory(null, null, {"gotoBack": toBack});
}

function enableBackHistory(enable) {
	window.WorldAre.enableBackHistory(null, null, {"enable": enable});
}

function deviceready() {
	enableBackHistory(true);
}

//下拉刷新面向对象封装
(function($) {
	var win = $(window);
	$.fn.downRefreshDp = function(options) {
		return new DownRefresh(this, options);
	};

	var DownRefresh = function(element, options) {
		var _that = this;
		_that.obj = $(element); //转为jQuery对象
		_that.moveStart = 0;
		_that.moveX = 0;
		_that.scrollTop = 0;
		_that.isLock = false; //是否锁定整个操作
		_that.isMove = false; //是否移动滑块
		_that.isLockUp = false; //是否锁定上拉
		_that.isAppendDom = false; //下拉刷新追加Dom元素
		_that.isData = true; //上拉加载是否还有数据
		_that.init(options);
	}

	//初始化
	DownRefresh.prototype.init = function(options) {
		var _that = this;
		_that.opts = $.extend(true, {}, {
			slideArea: $(window),
			distance: 50,
			contentDown: {
				contentFirst: interLang.downRefresh,
				contentSecond: interLang.letRefresh,
				contentThird: interLang.refreshing
			},
			contentUp: {
				contentOne: interLang.upRefresh,
				contentTwo: interLang.loading,
				contentThree: interLang.inBottom,
			},
			downRefreshFn: '', //下拉刷新回调函数
			upRefreshFn: '', //上拉加载回调函数
		}, options);

		//开始滑动
		_that.obj.on('touchstart', function(e) {
			if(!_that.isLock) {
				fnTouches(e);
				fnTouchStart(e, _that);
			}
		})

		//滑动中
		_that.obj.on('touchmove', function(e) {
			if(!_that.isLock) {
				fnTouches(e);
				fnTouchMove(e, _that);
			}
		})

		//滑动结束
		_that.obj.on('touchend', function(e) {
			if(!_that.isLock) {
				fnTouchEnd(e, _that);
			}

			//执行上拉加载操作
			if(_that.isData) {
				//_that.upDom.html(_that.opts.contentUp.contentOne);2020-z
				if(_that.opts.upRefreshFn != '' && !_that.isLock && !_that.isLockUp && (getScrollTop() + getClientHeight()) >= (getScrollHeight() - 10)) {
					upRefresh(_that);
				}
			} else {
				_that.upDom.html(_that.opts.contentUp.contentThree);
			}
		})

		//进入页面加载底部Dom
		// if(_that.opts.upRefreshFn != '') {
		// 	_that.obj.append('<p class="main-tac index_pt refresh_up">' + _that.opts.contentUp.contentOne + '</p>');
		// 	_that.upDom = _that.obj.find('.refresh_up');
		// }2020-z

		//滚动部分
		_that.opts.slideArea.on('scroll', function(){
			if(_that.opts.upRefreshFn != '' && !_that.isLock && !_that.isLockUp && (getScrollTop() + getClientHeight()) >= (getScrollHeight() - 10)){
				upRefresh(_that);
			}
		})
		_that.opts.slideArea.on('scroll', function() {
			if(_that.isData) {
				if(_that.opts.upRefreshFn != '' && !_that.isLock && !_that.isLockUp && (getScrollTop() + getClientHeight()) >= (getScrollHeight() - 60)) {
					upRefresh(_that);
				}
			} else {
				_that.upDom.html(_that.opts.contentUp.contentThree);
			}
		})
	}

	//操作方法
	var fn = {
		//移动容器
		translateY: function(obj, moveY) {
			obj.css({
				"-webkit-transform": "translate(0," + moveY + "px)",
				"transform": "translate(0," + moveY + "px)"
			});
		},

		//动画时长
		setTransition: function(obj, time) {
			obj.css({
				"-webkit-transition": "all " + time + "s",
				"transition": "all " + time + "s"
			});
		},

		//文字信息
		setText: function(text) {
			$('.refresh_text').text(text);
		}
	}

	//jQuery低版本时
	function fnTouches(e) {
		if(!e.touches) {
			e.touches = e.originalEvent.touches;
		}
	}

	//开始滑动
	function fnTouchStart(e, _that) {
		_that.moveStart = e.touches[0].pageY;
		_that.startScroll = win.scrollTop();
	}

	//滑动中
	function fnTouchMove(e, _that) {
		var offsetY = 0;
		_that.moveX = e.touches[0].pageY - _that.moveStart;

		//判断方向
		if(_that.moveX > 0) {
			_that.direction = 'down';
		} else {
			_that.direction = 'up';

			//上拉加载文字
			if(_that.isData) {
				_that.upDom.html(_that.opts.contentUp.contentTwo);
			} else {
				_that.upDom.html(_that.opts.contentUp.contentThree);
			}
		}

		if(_that.opts.downRefreshFn != '' && _that.startScroll <= 0 && _that.moveX > 0 && !_that.isMove) {
			//DOM追加
			if(!_that.isAppendDom) {
				_that.obj.append('<div class="main-w10 main-tac main-flex main-aic main-jcc refresh_title">' +
					'<div class="refresh_load"></div>' +
					'<p class="refresh_text">' + _that.opts.contentDown.contentFirst + '</p>' +
					'</div>');
				_that.isAppendDom = true;
			}

			fn.setTransition(_that.obj, 0);

			if(_that.moveX <= _that.opts.distance) {
				offsetY = _that.moveX;
				fn.setText(_that.opts.contentDown.contentFirst);
				fn.translateY(_that.obj, offsetY);
			} else if(_that.moveX > _that.opts.distance && _that.moveX <= _that.opts.distance * 2) {
				offsetY = _that.opts.distance + (_that.moveX - _that.opts.distance) * 0.5;
				fn.setText(_that.opts.contentDown.contentSecond);
				fn.translateY(_that.obj, offsetY);
			} else {
				offsetY = _that.moveX;
			}
			//加载动画
			$('.refresh_load').html('<p class="refresh_rotate" style="transform:rotate(' + offsetY + 'deg);"></p>');
		}
	}

	//滑动结束
	function fnTouchEnd(e, _that) {
		if(_that.opts.downRefreshFn != '' && _that.startScroll <= 0 && _that.moveX > 0 && !_that.isMove) {
			if(_that.moveX >= 30) {
				fn.setTransition(_that.obj, 0.5);
				fn.translateY(_that.obj, 50);
				fn.setText(_that.opts.contentDown.contentThird);
				//Loading动画
				$('.refresh_load').html(app.loadDp());
				_that.isLock = true;
				_that.opts.downRefreshFn(_that);
			} else {
				fn.setTransition(_that.obj, 0.5);
				fn.translateY(_that.obj, 0);
				_that.isAppendDom = false;
				$('.refresh_title').remove();
			}
			//滑动完成移动距离置空
			_that.moveX = 0;
		}
	}

	//滚动条当前位置
	function getScrollTop() {
		var scrollTop = 0;
		if(document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if(document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}

	//当前可视范围的高度
	function getClientHeight() {
		var clientHeight = 0;
		if(document.documentElement && document.documentElement.clientHeight) {
			clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		} else {
			clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		}
		return clientHeight;
	}

	//获取文档完整的高度
	function getScrollHeight() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}

	//上拉加载操作
	function upRefresh(_that) {
		_that.direction = 'up';
		_that.upDom.html(_that.opts.contentUp.contentTwo);
		_that.isLock = true;
		_that.opts.upRefreshFn(_that);
	}

	//上拉加载没有数据时调用此函数(最后一页时)
	DownRefresh.prototype.noData = function(flag) {
		var _that = this;
		if(flag === undefined || flag == true) {
			_that.isData = false;
			setTimeout(function(){
				$('.refresh_up').hide();
			}, 1500);
			
		} else if(flag == false) {
			_that.isData = true;
			$('.refresh_up').show();
		}
	}

	//锁定滚动
	DownRefresh.prototype.lock = function() {
		var _that = this;
		if(_that.direction == 'up') {
			_that.isLockUp = true;
		}
	}

	//解锁
	DownRefresh.prototype.unlock = function() {
		var _that = this;
		_that.isLockUp = false;
		_that.isLock = false;
		//_that.direction = 'up';
	}

	//重置
	DownRefresh.prototype.resetLoad = function() {
		var _that = this;
		_that.isLock = false;

		//下拉
		if(_that.direction == 'down' && _that.isAppendDom) {
			_that.isAppendDom = false;
			$('.refresh_load').html('');
			fn.setText(interLang.refreshSuc);
			setTimeout(function() {
				fn.setTransition(_that.obj, 0.5);
				fn.translateY(_that.obj, 0);
				$('.refresh_title').remove();
			}, 1000);
		} else if(_that.direction == 'up') {
			if(_that.isData) {
				_that.upDom.html(_that.opts.contentUp.contentOne);
			} else {
				_that.upDom.html(_that.opts.contentUp.contentThree);
			}
		}
	}
})(jQuery);