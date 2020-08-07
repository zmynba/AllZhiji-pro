var searchurl = location.search;
if(!searchurl || searchurl == null) {
    searchurl = '';
}
var Cancel = new Vue({
    el: '#upgradeLevel',
    data: {
        interLang: interLang,
        lang: lang,
        tabId: 1,
		wealthList: [
			{ id: '1', title: interLang.wealthTxt1, money: '10', remark: interLang.wealthTxt2 },
			{ id: '2', title: interLang.wealthTxt3, money: '1/100' + interLang.gold, remark: interLang.wealthTxt4 },
			{ id: '3', title: interLang.wealthTxt5, money: '10', remark: interLang.wealthTxt6 },
			{ id: '4', title: interLang.wealthTxt7, money: '10', remark: interLang.wealthTxt8 },
			{ id: '5', title: interLang.wealthTxt9, money: '1', remark: interLang.wealthTxt10 },
			{ id: '6', title: interLang.wealthTxt11, money: '20', remark: interLang.wealthTxt12 }
		],
		charmList: [
			{ id: '1', title: interLang.charmTxt1, money: '10', remark: interLang.charmTxt2 },
			{ id: '2', title: interLang.charmTxt3, money: '1/200' + interLang.diamonds, remark: interLang.wealthTxt4 },
			{ id: '3', title: interLang.charmTxt5, money: '10', remark: interLang.wealthTxt10 },
			{ id: '4', title: interLang.charmTxt7, money: '1', remark: interLang.wealthTxt10 }
		],
		swiperH: app.clientH - 93,		//Swiper组件最小高度
		userInfo: {},
		bodyH: window.screen.height
    },
    
    mounted() {
        var that = this;
        document.title = this.interLang.upgradeLevel;
        that.mySwiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			observer:true,
			observeParents:true,
			onTransitionStart: function(swiper) {
				//console.log('触发了吗',swiper);
				that.tabId = swiper.activeIndex + 1;
			}
		})
		
		//用户信息
		$.ajax({
			url:"http://m.api.priormatch.com/user/myinfo" + searchurl,
			type : 'GET',
			data: {},
			xhrFields: {
				withCredentials: true
			},
			success:function(res) {
                //console.log('查看数据', res);
				if(res.errno == 0) {
				   that.userInfo = res.data.uinfo;
		        } else {
					app.showToast({
						title: res.errmsg,
						duration: 1500
					})
				}
			}
        });
        
        if ((navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i))) {
			var divEl = document.getElementById("upgradeLevel");
			iosTrouchFn(divEl);
        }
    },

    methods: {
        //返回
        tapBack() {
            window.history.go(-1);
        },

        //TAB点击
		tapTabs(id){
			this.mySwiper.slideTo(id);
        },
        
        //查看VIP特权
        tapLookVipPrivilege() {
			var vip = this.userInfo.vip;
			var svip = this.userInfo.svip;
			if(vip == 0 && svip == 0) {
				window.location.href = "priormatch://openMyVip";
			} else {
				window.location.href = "priormatch://openMyVip?isSvip=1";
			}
        },

        //去加速
        tapGoSpeed() {
			var vip = this.userInfo.vip;
			var svip = this.userInfo.svip;
			if(vip == 0 && svip == 0) {
				window.location.href = "priormatch://openMyVip";
			} else {
				window.location.href = "priormatch://openMyVip?isSvip=1";
			}
        }
    }
})

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