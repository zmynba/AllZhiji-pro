window.cordova.define("cordova-plugin-bothlive.BothLive.CarMarket", function(require, exports, module) {
    var argscheck = require('cordova/argscheck');
    var exec = require('cordova/exec');
                      
    var CarMarket = {};

    /* 显示车的预览图标, 导航栏右侧 */
    CarMarket.showPreviewIcon = function (successCallback, errorCallback, options) {
        argscheck.checkArgs('FFO', 'BothLive.CarMarket.showPreviewIcon', arguments);

        options = options || {};

        var getValue = argscheck.getValue;

        var show = getValue(options.show, false);
        var carId = getValue(options.carId, "");

        var args = [show, carId];

        exec(successCallback, errorCallback, 'CarMarket', 'showPreviewIcon', args);
    };

    /* 显示车市的攻略图标, 导航栏右侧 */
    CarMarket.showQuestionIcon = function (successCallback, errorCallback, options) {
        argscheck.checkArgs('FFO', 'BothLive.CarMarket.showQuestionIcon', arguments);

        options = options || {};

        var getValue = argscheck.getValue;

        var show = getValue(options.show, false);

        var args = [show];

        exec(successCallback, errorCallback, 'CarMarket', 'showQuestionIcon', args);
    };

    module.exports = CarMarket;
});
