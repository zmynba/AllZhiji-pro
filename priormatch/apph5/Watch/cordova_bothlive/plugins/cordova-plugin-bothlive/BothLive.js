window.cordova.define("cordova-plugin-bothlive.BothLive", function(require, exports, module) {
    var argscheck = require('cordova/argscheck');
    var exec = require('cordova/exec');

    var BothLive = {};

    /* 关闭当前的页面 */
    BothLive.closeWindow = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FF', 'BothLive.closeWindow', arguments);

       exec(successCallback, errorCallback, 'BothLive', 'closeWindow');
    };

    /* 获取app的版本信息, 格式为:应用名称__应用版本号__手机model__系统版本__手机locale信息__语言, 例: BothLive__1.0.0.0001__iPhone__12.0__zh-Hans_US__zh */
    BothLive.getAppVersion = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FF', 'BothLive.getAppVersion', arguments);

       exec(successCallback, errorCallback, 'BothLive', 'getAppVersion');
    };
                      
    BothLive.hideNavRightIcon = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FF', 'BothLive.hideNavRightIcon', arguments);

       exec(successCallback, errorCallback, 'BothLive', 'hideNavRightIcon');
    };

    /* 打开分享窗口 */
    BothLive.share = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FFO', 'BothLive.share', arguments);

       options = options || {};

       var getValue = argscheck.getValue;

       var shareImgUrl = getValue(options.shareImgUrl, "");
       var shareContent = getValue(options.shareContent, "");
       var shareUrl = getValue(options.shareUrl, "");
       var shareTitle = getValue(options.shareTitle, "");

       var args = [shareImgUrl, shareContent, shareUrl, shareTitle];

       exec(successCallback, errorCallback, 'BothLive', 'share', args);
    };

    /* 显示分享图标, 导航栏右侧 */
    BothLive.showShareIcon = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FFO', 'BothLive.showShareIcon', arguments);

       options = options || {};

       var getValue = argscheck.getValue;

       var showShare = getValue(options.showShare, false);
       var shareImgUrl = getValue(options.shareImgUrl, "");
       var shareContent = getValue(options.shareContent, "");
       var shareUrl = getValue(options.shareUrl, "");
       var shareTitle = getValue(options.shareTitle, "");

       var args = [showShare, shareImgUrl, shareContent, shareUrl, shareTitle];

       exec(successCallback, errorCallback, 'BothLive', 'showShareIcon', args);
    };

    /* 启用/禁用, H5对导航栏返回按钮的拦截 */
    BothLive.enableBackHistory = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FFO', 'BothLive.enableBackHistory', arguments);

       options = options || {};

       var getValue = argscheck.getValue;

       var enable = getValue(options.enable, false);

       var args = [enable];

       exec(successCallback, errorCallback, 'BothLive', 'enableBackHistory', args);
    };

    /* 执行 webview back 回退 */
    BothLive.goToBackHistory = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FFO', 'BothLive.goToBackHistory', arguments);

       options = options || {};

       var getValue = argscheck.getValue;

       var gotoBack = getValue(options.gotoBack, false);

       var args = [gotoBack];
       
       exec(successCallback, errorCallback, 'BothLive', 'goToBackHistory', args);
    };

    /* 打开充值币的窗口 */
    BothLive.gotoBuyCoin = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FF', 'BothLive.gotoBuyCoin', arguments);

       exec(successCallback, errorCallback, 'BothLive', 'gotoBuyCoin');
    };
    
    /*
     options 以下json字符串数组
     {"CookieName":"",
     "CookieValue":"",
     "CookieDomain":"",
     "CookieOriginURL":"",
     "CookiePath":"",
     "CookieSecure":0,
     "CookieExpires":"",
     "CookieDiscard":0}
     
     CookieName CookieValue CookieDomain 这三个字段必须有, 且不能为空
     CookieSecure
     CookieExpires --> since 1970 时间戳
     CookieDiscard --> httpOnly
    */
    BothLive.syncCookies = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FFA', 'BothLive.syncCookies', arguments);

       options = options || [];

       exec(successCallback, errorCallback, 'BothLive', 'syncCookies', options);
    };

    /* 退出到登录界面 */
    BothLive.logout = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FF', 'BothLive.logout', arguments);

       exec(successCallback, errorCallback, 'BothLive', 'logout');
    };
                      
    BothLive.hideNavigationBar = function (successCallback, errorCallback, options) {
       argscheck.checkArgs('FFO', 'BothLive.hideNavigationBar', arguments);

       options = options || {};

       var getValue = argscheck.getValue;

       var hide = getValue(options.hide, false);

       var args = [hide];

       exec(successCallback, errorCallback, 'BothLive', 'hideNavigationBar', args);
    };
    
   module.exports = BothLive;
});
