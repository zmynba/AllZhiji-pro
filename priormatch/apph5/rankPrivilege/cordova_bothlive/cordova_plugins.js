window.cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-wkwebview-engine.ios-wkwebview-exec",
      "file": "plugins/cordova-plugin-wkwebview-engine/ios-wkwebview-exec.js",
      "pluginId": "cordova-plugin-wkwebview-engine",
      "clobbers": [
        "cordova.exec"
      ]
    },
    {
      "id": "cordova-plugin-wkwebview-engine.ios-wkwebview",
      "file": "plugins/cordova-plugin-wkwebview-engine/ios-wkwebview.js",
      "pluginId": "cordova-plugin-wkwebview-engine",
      "clobbers": [
        "window.WkWebView"
      ]
    },
    {
      "id": "cordova-plugin-bothlive.BothLive",
      "file": "plugins/cordova-plugin-bothlive/BothLive.js",
      "pluginId": "cordova-plugin-bothlive",
      "clobbers": [
        "BothLive"
      ]
    },
    {
      "id": "cordova-plugin-bothlive.BothLive.CarMarket",
      "file": "plugins/cordova-plugin-carmarket/CarMarket.js",
      "pluginId": "cordova-plugin-bothlive-carmarket",
      "clobbers": [
        "BothLive.CarMarket"
      ]
    },
  ];
  module.exports.metadata = {
    "cordova-plugin-bothlive": "1.0.0"
  };
});
