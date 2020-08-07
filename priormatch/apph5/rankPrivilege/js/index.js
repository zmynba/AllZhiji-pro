var searchurl = location.search;
if(!searchurl || searchurl == null) {
    searchurl = '';
}
//alert(searchurl);
var Index = new Vue({
    el: '#index',
    data: {
		lang: lang,
		interLang: interLang,		//国际化
		progress: 0,				//进度条
		tabId: 1,					//顶部TAB的ID
		anchorAnimate: true,		//主播特权加载时是否显示动画
		gradeExtra: {},				//用户等级特权数据
		gradeLists: [
			{ id: 1, imgUrl: 'img/i_01.png', imgUrlActive: 'img/ia_01.png', title: interLang.userGradeTxt1, lock: interLang.userGradeLock1, lockGrade: 1 },
			{ id: 2, imgUrl: 'img/i_02.png', imgUrlActive: 'img/ia_02.png', title: interLang.userGradeTxt2, lock: interLang.userGradeLock2, lockGrade: 15 },
			{ id: 3, imgUrl: 'img/i_03.png', imgUrlActive: 'img/ia_03.png', title: interLang.userGradeTxt3, lock: interLang.userGradeLock3, lockGrade: 20 },
			{ id: 4, imgUrl: 'img/i_04.png', imgUrlActive: 'img/ia_04.png', title: interLang.userGradeTxt4, lock: interLang.userGradeLock4, lockGrade: 30 },
			{ id: 5, imgUrl: 'img/i_05.png', imgUrlActive: 'img/ia_05.png', title: interLang.userGradeTxt5, lock: interLang.userGradeLock5, lockGrade: 50 }
		],				//等级特权列表
		anchorExtra: {},				//用户主播特权数据
		anchorLists: [
			{ id: 1, imgUrl: 'img/a_01.png', imgUrlActive: 'img/as_01.png', title: interLang.hostGradeTxt1, lock: interLang.hostGradeLock1, lockGrade: 5 },
			{ id: 2, imgUrl: 'img/a_02.png', imgUrlActive: 'img/as_02.png', title: interLang.hostGradeTxt2, lock: interLang.hostGradeLock2, lockGrade: 30 },
			{ id: 3, imgUrl: 'img/a_03.png', imgUrlActive: 'img/as_03.png', title: interLang.hostGradeTxt3, lock: interLang.hostGradeLock3, lockGrade: 40 }
		],			//主播特权列表
		userInfo: {},
		bodyH: window.screen.height,
		hostExpCurrent: 0,
		hostExpMax: 0
    },
    mounted() {
		var that = this;
		document.title = this.interLang.indexTitle;
		//alert('语言是'+GetRequest('__lg'));

		//用户信息
		$.ajax({
			// url:"http://m.api.priormatch.com/user/myinfo/?extra=number" + searchurl,
			url:"http://m.api.priormatch.com/user/myinfo/?extra=number&" + searchurl,
			type : 'GET',
			data: {},
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
                //console.log('查看数据', res);
				if(res.errno == 0) {
                   that.gradeExtra = res.data.number.userexp;
                   that.anchorExtra = res.data.number.hostexp;
				   that.userInfo = res.data.uinfo;
				   that.hostExpCurrent = res.data.number.hostexp.current;
				   that.hostExpMax = res.data.number.hostexp.max;
				   
				    that.$nextTick(function(){
						//Swiper组件
						/*that.mySwiper = new Swiper('.swiper-container', {
							slidesPerView: 1,
							spaceBetween: 0,
							autoHeight: true,
							observer:true,
							observeParents:true,
							onTransitionStart: function(swiper) {
								//console.log('触发了吗',swiper);
								that.tabId = swiper.activeIndex + 1;
								
								//加载主播特权动画一次
								if(that.anchorAnimate){
									$('.grade_progress2').animate({ width: ((res.data.number.hostexp.current / res.data.number.hostexp.max) * 100) + '%' }, 1000);
									$('.grade_lump2').animate({ left: ((res.data.number.hostexp.current / res.data.number.hostexp.max) * 100) + '%' }, 1000);
									that.anchorAnimate = false;
								}
							}
						})*/
						
						//加载等级特权动画
						$('.grade_progress').animate({ width: ((res.data.number.userexp.current / res.data.number.userexp.max) * 100) + '%' },1000);
						$('.grade_lump').animate({ left: ((res.data.number.userexp.current / res.data.number.userexp.max) * 100) + '%' },1000);
					})
		        } else {
					app.showToast({
						title: res.errmsg,
						duration: 1500
					})
					/*that.mySwiper = new Swiper('.swiper-container', {
						slidesPerView: 1,
						spaceBetween: 0,
						autoHeight: true,
						observer:true,
						observeParents:true,
						onTransitionStart: function(swiper) {
							//console.log('触发了吗',swiper);
							that.tabId = swiper.activeIndex + 1;
						}
					})*/
				}
			}
        });
		
        if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
			var divEl = document.getElementById("index");
			iosTrouchFn(divEl);
        }
    },
    methods: {
		//TAB切换
		tapTabs(k){
			this.tabId = k;
			if(k == 2 && this.anchorAnimate) {
				$('.grade_progress2').animate({ width: ((this.hostExpCurrent / this.hostExpMax) * 100) + '%' }, 1000);
				$('.grade_lump2').animate({ left: ((this.hostExpCurrent / this.hostExpMax) * 100) + '%' }, 1000);
				this.anchorAnimate = false;
			}
		},

		//提升等级
		tapGradeAdd() {
			window.location.href = 'upgradeLevel.html' + searchurl;
		},

		//返回上一页
		tapBack() {
			if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
				goToBack(false);
			}else{
				window.history.back();
			}
			
			
		}
    }
})
function hideNavigationBar(hide) {
	var params = {hide};
	window.BothLive.hideNavigationBar(null, null, params);
}
var hideLover =function(){
	if(navigator.userAgent.match(/Android/i)){
		BothliveClient.Toolbar(0);
		//BothliveClient.hideToolbar();
	}
	if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
		hideNavigationBar(true);		
	}
}
var showLover = function(){
	if(navigator.userAgent.match(/Android/i)){
		BothliveClient.Toolbar(1);
	}
	if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
		hideNavigationBar(false);
	}
}
if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {

	function navBackClicked () {
		goToBack(true);
	}
	function goToBack(toBack) {
		//alert(41);
		window.BothLive.goToBackHistory(null, null, {"gotoBack": toBack});
	}
	function enableBackHistory(enable) {
		//alert(31);
		window.BothLive.enableBackHistory(null, null, {"enable": enable});
	}
	function deviceready() {

		//navBackClicked();
		enableBackHistory(true);
	}
	document.addEventListener('deviceready', deviceready, false);
	
}
hideLover();