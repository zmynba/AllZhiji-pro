var interLang = '';
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
// lang = GetRequest('lang');

if(lang == 'ru') {
    interLang = {
        indexTitle: 'Привилегия уровня',
        hostPrivilege: 'Привилегия ведущих',
        empiricalValue: 'Эмпирическая ценность',
        distanceGrade: 'До следующего уровня:',
        userGradeTxt1: 'Осветить лейбл уровня',
        userGradeTxt2: 'Подвеска аватара',
        userGradeTxt3: 'Личная визитка',
        userGradeTxt4: 'Войти в комнату со спецэффектами',
        userGradeTxt5: 'Эксклюзивные подарки',
        comingSoon: 'Наступает скоро',
        userGradeLock1: 'LV1 разблокировка',
        userGradeLock2: 'LV15 разблокировка',
        userGradeLock3: 'LV20 разблокировка',
        userGradeLock4: 'LV30 разблокировка',
        userGradeLock5: 'LV50 разблокировка',
        hostGradeTxt1: 'Наклейки привилегий',
        hostGradeTxt2: 'Привилегия на кляп',
        hostGradeTxt3: 'Подать заявку, чтобы быть в списке Топ',
        hostGradeLock1: 'BLV5 разблокировка',
        hostGradeLock2: 'BLV30 разблокировка',
        hostGradeLock3: 'BLV40 разблокировка',
        userGrade: 'Уровень пользователя',
        hostGrade: 'Уровень ведущей',
        upgradeLevel: 'Повышать уровень',
        wealth: 'Богатство',
        charm: 'Очарование',
        dailyAddPoints: 'Ежедневный бонус',
        addPoints: 'Бонусные пункты',
        wealthTxt1: 'Ежедневный вход',
        wealthTxt2: '(Дневная шапка +10)',
        wealthTxt3: 'Потребление подарков',
        wealthTxt4: '(Без верхнего предела)',
        wealthTxt5: '30 минут онлайн ежедневно',
        wealthTxt6: '(Дневная шапка +10)',
        wealthTxt7: 'Поделиться',
        wealthTxt8: '(Дневная шапка +60)',
        wealthTxt9: 'Речи в комнате трансляции',
        wealthTxt10: '(Дневная шапка +20)',
        wealthTxt11: 'Ежедневно опубликовать моменты',
        wealthTxt12: '(Дневная шапка +20)',
        vipSpeed: 'VIP-ускорение',
        vipLook: 'Посмотреть привилегию VIP',
        goSpeed: 'Перейти на ускорение',
        extraNum: 'Дополнение+20%',
        gold: 'Монеты',
        charmTxt1: 'Каждый 10 минут трансляции',
        charmTxt3: 'Получить подарки',
        charmTxt5: 'Завершать матч при каждой встрече',
        charmTxt7: 'За комментарий, полученный на Моменты',
        charmTxt2: '(Дневная шапка +30)',
        diamonds: 'бриллиант'
    };
} else if(lang == 'vi') {
    interLang = {
        indexTitle: 'Đặc quyền cấp bậc',
        hostPrivilege: 'Đặc quyền idol',
        empiricalValue: 'Điểm kinh nghiệm',
        distanceGrade: 'Còn cách nâng cấp:',
        userGradeTxt1: 'Nhãn dán cấp độ lung linh',
        userGradeTxt2: 'Biểu tượng trên ảnh đại diện',
        userGradeTxt3: 'Danh thiếp cá tính',
        userGradeTxt4: 'Hiệu ứng đặc biệt khi vào phòng',
        userGradeTxt5: 'Quà tặng độc quyền',
        comingSoon: 'Xin hãy theo dõi',
        userGradeLock1: 'Mở khóa LV1',
        userGradeLock2: 'Mở khóa LV15',
        userGradeLock3: 'Mở khóa LV20',
        userGradeLock4: 'Mở khóa LV30',
        userGradeLock5: 'Mở khóa LV50',
        hostGradeTxt1: 'Nhãn dán độc quyền',
        hostGradeTxt2: 'Quyền cấm bình luận',
        hostGradeTxt3: 'Xin được lên mục Hot',
        hostGradeLock1: 'Mở khóa BLV5',
        hostGradeLock2: 'Mở khóa BLV30',
        hostGradeLock3: 'Mở khóa BLV40',
        userGrade: 'Cấp người dùng',
        hostGrade: 'Cấp bậc idol',
        upgradeLevel: 'Cấp độ nâng cấp',
        wealth: 'Tài phú',
        charm: 'Quyến ru',
        dailyAddPoints: 'Điểm cộng hàng ngày',
        addPoints: 'Mục cộng điểm',
        wealthTxt1: 'Đăng nhập mỗi ngày',
        wealthTxt2: '(Giới hạn mỗi ngày+10)',
        wealthTxt3: 'Mua quà tặng',
        wealthTxt4: '(Không giới hạn trên)',
        wealthTxt5: 'Mỗi ngày online tổng cộng 30 phút',
        wealthTxt6: '(Giới hạn mỗi ngày+20)',
        wealthTxt7: 'Chia se',
        wealthTxt8: '(Giới hạn mỗi ngày+60)',
        wealthTxt9: 'Bình luận trong phòng livestream',
        wealthTxt10: '(Giới hạn mỗi ngày+20)',
        wealthTxt11: 'Đăng tải trạng thái mỗi ngày',
        wealthTxt12: '(Giới hạn mỗi ngày+20)',
        vipSpeed: 'Nâng cấp tăng tốc VIP',
        vipLook: 'Xem đặc quyền dành cho VIP',
        goSpeed: 'Đi tăng tốc',
        extraNum: 'Extra+20%',
        gold: 'Gold',
        charmTxt1: 'Mỗi khi livestream 10 phút',
        charmTxt3: 'Quà đã nhận',
        charmTxt5: 'Hoàn thành một lần ghép đôi tình cơ',
        charmTxt7: 'Mỗi khi trạng thái nhận được một bình luận',
        charmTxt2: '(Giới hạn mỗi ngày+30)',
        diamonds: 'Diamond'
    };
} /*else if(lang == 'zh') {
    interLang = {
        indexTitle: '等级特权',
        hostPrivilege: '主播特权',
        empiricalValue: '经验值',
        distanceGrade: '距离升级：',
        userGradeTxt1: '点亮等级标签',
        userGradeTxt2: '头像挂件',
        userGradeTxt3: '个性名片',
        userGradeTxt4: '特效进场',
        userGradeTxt5: '专属礼物',
        comingSoon: '敬请期待',
        userGradeLock1: 'LV1解锁',
        userGradeLock2: 'LV15解锁',
        userGradeLock3: 'LV20解锁',
        userGradeLock4: 'LV30解锁',
        userGradeLock5: 'LV50解锁',
        hostGradeTxt1: '特权贴纸',
        hostGradeTxt2: '禁言特权',
        hostGradeTxt3: '申请上热门',
        hostGradeLock1: 'BLV5解锁',
        hostGradeLock2: 'BLV30解锁',
        hostGradeLock3: 'BLV40解锁',
        userGrade: '用户等级',
        hostGrade: '主播等级',
        upgradeLevel: '提升等级',
        wealth: '财富',
        charm: '魅力',
        dailyAddPoints: '每日加分',
        addPoints: '加分项',
        wealthTxt1: '每日登陆',
        wealthTxt2: '(每日上限+10)',
        wealthTxt3: '礼物消费',
        wealthTxt4: '(无上限)',
        wealthTxt5: '每日累积在线30分钟',
        wealthTxt6: '(每日上限+10)',
        wealthTxt7: '分享',
        wealthTxt8: '(每日上限+60)',
        wealthTxt9: '直播间发言',
        wealthTxt10: '(每日上限+20)',
        wealthTxt11: '每日发动态',
        wealthTxt12: '(每日上限+20)',
        vipSpeed: 'VIP加速升级',
        vipLook: '查看VIP特权',
        goSpeed: '去加速',
        extraNum: '额外+20%',
        gold: '金币',
        charmTxt1: '每开播10分钟',
        charmTxt3: '收到礼物',
        charmTxt5: '在邂逅中每完成一次匹配',
        charmTxt7: '动态每获得一个人的评论',
        charmTxt2: '(每日上限+30)',
        diamonds: '钻石'
    };
}*/ else if(lang == 'zhtw') {
    interLang = {
        indexTitle: '等級特權',
        hostPrivilege: '主播特權',
        empiricalValue: '經驗值',
        distanceGrade: '距離升級：',
        userGradeTxt1: '點亮等級標籤',
        userGradeTxt2: '頭像挂件',
        userGradeTxt3: '個性名片',
        userGradeTxt4: '特效進場',
        userGradeTxt5: '專屬禮物',
        comingSoon: '敬請期待',
        userGradeLock1: 'LV1 解鎖',
        userGradeLock2: 'LV15 解鎖',
        userGradeLock3: 'LV20 解鎖',
        userGradeLock4: 'LV30 解鎖',
        userGradeLock5: 'LV50 解鎖',
        hostGradeTxt1: '特權貼紙',
        hostGradeTxt2: '禁言特權',
        hostGradeTxt3: '申請上熱門',
        hostGradeLock1: 'BLV5 解鎖',
        hostGradeLock2: 'BLV30 解鎖',
        hostGradeLock3: 'BLV40 解鎖',
        userGrade: '用戶等級',
        hostGrade: '主播等級',
        upgradeLevel: '提升等級',
        wealth: '財富',
        charm: '魅力',
        dailyAddPoints: '每日加分',
        addPoints: '加分項',
        wealthTxt1: '每日登陸',
        wealthTxt2: '( 每日上限+10)',
        wealthTxt3: '禮物消費',
        wealthTxt4: '( 無上限)',
        wealthTxt5: '每日累計在線30 分鐘',
        wealthTxt6: '( 每日上限+10)',
        wealthTxt7: '分享',
        wealthTxt8: '( 每日上限+60)',
        wealthTxt9: '直播間發言',
        wealthTxt10: '( 每日上限+20)',
        wealthTxt11: '每日發動態',
        wealthTxt12: '( 每日上限+20)',
        vipSpeed: 'VIP 加速升級',
        vipLook: '查看VIP 特權',
        goSpeed: '去加速',
        extraNum: '額外+20%',
        gold: '金幣',
        charmTxt1: '每開播10 分鐘',
        charmTxt3: '收到禮物',
        charmTxt5: '在邂逅中每完成一次匹配',
        charmTxt7: '動態每獲得一個人的評論',
        charmTxt2: '( 每日上限+30)',
        diamonds: '鑽石'
    };
} else if(lang == 'ko') {
    interLang = {
        indexTitle: '등급 특권',
        hostPrivilege: 'bj특권',
        empiricalValue: '경험치',
        distanceGrade: '업그레이드까지:',
        userGradeTxt1: '등급 태그 클릭',
        userGradeTxt2: '플로필 아이템',
        userGradeTxt3: '개성 있는 명함',
        userGradeTxt4: '필터 들어옵니다',
        userGradeTxt5: '당신만의 선물',
        comingSoon: '기대하십시오',
        userGradeLock1: 'LV1잠금 해제',
        userGradeLock2: 'LV15장금 해제',
        userGradeLock3: 'LV20장금 해제',
        userGradeLock4: 'LV30 장금 해제',
        userGradeLock5: 'LV50 장금 해제',
        hostGradeTxt1: '특권 스티커',
        hostGradeTxt2: '특권 금지',
        hostGradeTxt3: '핫이슈신청',
        hostGradeLock1: 'BLV5장금 해제',
        hostGradeLock2: 'BLV30잠금 해제',
        hostGradeLock3: 'BLV40 해제',
        userGrade: '사용자 등급',
        hostGrade: 'BJ 등급',
        upgradeLevel: '등급 높임',
        wealth: '재부',
        charm: '매력',
        dailyAddPoints: '매일 점수를 추가하기',
        addPoints: '가산점 항목',
        wealthTxt1: '매일 로그인',
        wealthTxt2: '(매일 한도+10)',
        wealthTxt3: '선물 소비',
        wealthTxt4: '(무 제한)',
        wealthTxt5: '매일  로그인 시간 30분',
        wealthTxt6: '(매일 한도 +10)',
        wealthTxt7: '공유하기',
        wealthTxt8: '(매일 한도 +60)',
        wealthTxt9: '라이브 룸에 채팅',
        wealthTxt10: '(매일 한도 +20)',
        wealthTxt11: '매일 상태를 올리기',
        wealthTxt12: '(매일 한도 +20)',
        vipSpeed: 'VIP 가속 업레이드',
        vipLook: 'VIP특권을 조화하기',
        goSpeed: '가속 갑니다',
        extraNum: '서비스+20%',
        gold: '코인',
        charmTxt1: '매일 라이브 시간 10분',
        charmTxt3: '선물 받았습니다',
        charmTxt5: '만남에서 한번 매칭을 완성하며',
        charmTxt7: '모멘트에서는 대글을 하나 받으며',
        charmTxt2: '(매일 한도 +30)',
        diamonds: '다이아몬드'
    };
} else {
    interLang = {
        indexTitle: 'Level privileges',
        hostPrivilege: 'Anchor privileges',
        empiricalValue: 'Experience Point',
        distanceGrade: 'To next level:',
        userGradeTxt1: 'Light level label',
        userGradeTxt2: 'Icon pendant',
        userGradeTxt3: 'Personalized name card',
        userGradeTxt4: 'Enter Live room with special effects',
        userGradeTxt5: 'Exclusive gifts',
        comingSoon: 'Coming soon',
        userGradeLock1: 'LV1 Unlock',
        userGradeLock2: 'LV15 Unlock',
        userGradeLock3: 'LV20 Unlock',
        userGradeLock4: 'LV30 Unlock',
        userGradeLock5: 'LV50 Unlock',
        hostGradeTxt1: 'Privilege Stickers',
        hostGradeTxt2: 'Privilege to mute users',
        hostGradeTxt3: 'Apply to be listed in \'Most popular\'',
        hostGradeLock1: 'BLV5 Unlock',
        hostGradeLock2: 'BLV30 Unlock',
        hostGradeLock3: 'BLV40 Unlock',
        userGrade: 'User level',
        hostGrade: 'Anchor level',
        upgradeLevel: 'Upgrade level',
        wealth: 'Wealth',
        charm: 'Charm',
        dailyAddPoints: 'Daily bonus point',
        addPoints: 'Items',
        wealthTxt1: 'Daily login',
        wealthTxt2: '(Daily limit+10)',
        wealthTxt3: 'Gifts consumption',
        wealthTxt4: '(No upper limit)',
        wealthTxt5: 'Daily cumulative online duration 30 minutes',
        wealthTxt6: '(Daily limit+10)',
        wealthTxt7: 'Share',
        wealthTxt8: '(Daily limit+60)',
        wealthTxt9: 'Chat in Live room',
        wealthTxt10: '(Daily limit+20)',
        wealthTxt11: 'Daily posting Moments',
        wealthTxt12: '(Daily limit+20)',
        vipSpeed: 'VIP accelerated upgrade',
        vipLook: 'View VIP privileges',
        goSpeed: 'Go to accelerate',
        extraNum: 'Extra+20%',
        gold: 'Gold coins',
        charmTxt1: 'Per 10 mins Live',
        charmTxt3: 'Received gifts',
        charmTxt5: 'Per completed matching in Encounter',
        charmTxt7: 'Per comment received on Moments',
        charmTxt2: '(Daily limit+30)',
        diamonds: 'Diamond'
    };
}