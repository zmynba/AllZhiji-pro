var imyDrillLang = '';
var lang = '';
var url = '';
var shareContext = '';
var shareH5Url = '';
var shareH5Title = '';
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
lang = GetRequest('__lg') ? GetRequest('__lg') : GetRequest('lang');
if(lang == 'ru') {
    imyDrillLang = {
		indexTitle: '我的优钻',
		MDrecording: 'история',
		noshowGift: 'Не получил подарок',
		MDAll: 'все',
		MDDrill:'U Diamond',
		from:'От',
    };
} else if(lang == 'vi') {
    imyDrillLang = {
		indexTitle: 'Udiamonds của tôi',
		MDrecording: 'Lịch sử',
		noshowGift: 'Không có quà tặng nào được nhận',
		MDAll: 'Tất cả',
		MDDrill: 'U Diamond',
		from:'Đến từ',
    };
}else if(lang == 'zh') {
    imyDrillLang = {
		indexTitle: '我的优钻',
		MDrecording: '记录',
		noshowGift: '还没有收到过礼物',
		MDAll: '全部',
		MDDrill: '优钻',
		from:'来自',
    };
}else if(lang == 'zhtw') {
    imyDrillLang = {
		indexTitle: '我的優鑽',
		MDrecording: '記錄',
		noshowGift: '還沒有收到過禮物',
		MDAll: '全部',
		MDDrill: '優鑽',
		from:'來自',
    };
}else if(lang == 'ko') {
    imyDrillLang = {
		indexTitle: '나의 Udiamonds',
		MDrecording: '기록',
		noshowGift : '선물을받지 못했습니다',
		MDAll: '전부',
		MDDrill:'U Diamond',
		from:'보내자 ',
    };
}else {
    imyDrillLang = {
		indexTitle: 'My Udiamonds',
		MDrecording:'Record',
		noshowGift: 'No gifts have been received',
		MDAll:'All',
		MDDrill:'U Diamond',
		from:'From ',
    };
}