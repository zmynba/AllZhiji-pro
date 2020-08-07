var interLang = '';
var lang = '';
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
    interLang = {
		noData: '~Больше нет данных~',
		seen: 'Просмотренные',
		empty: 'Отчистить',
		isEmpty: 'Вы хотите очистить историю списка просмотра?',
    };
} else if(lang == 'vi') {
    interLang = {
		noData: '~Không còn dữ liệu mới~',
		seen: 'Tôi đã xem',
		empty: 'Xóa',
		isEmpty: 'Xóa danh sách?',
    };
} else if(lang == 'zh') {
    interLang = {
		seen: '我看过的',
		empty: '清空',
		isEmpty: '是否清空回看列表?',
		noData: '~暂无数据~',
    };
} else if(lang == 'zhtw') {
    interLang = {
		seen: '我看過的',
		empty: '清空',
		isEmpty: '是否清空回看列表?',
		noData: '~暫無數據~',
    };
} else if(lang == 'ko') {
    interLang = {
		noData: '~데이터 더 이상 없습니다~',
		seen: '視聴履歴',
		empty: 'クリアー',
		isEmpty: '是否清空回看列表?',
    };
} else {
    interLang = {
		noData: '~No more data~',
		seen: 'Watched Lives',
		empty: 'Clear',
		isEmpty: 'Do you want to empty the playback list?',
    };
}