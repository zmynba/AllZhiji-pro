(function () {
    var $ = new common();
    function initLang() {
        var localeLang = "English";
        var localeCode = document.langCode;
        var headViewer = $.get("head_lang_viewer");
        var codeArr = ["zh", "zh-tw", "en"];//, "ja", "ko", "de", "es", "fr", "it", "nl", "pt", "ru"
        var langArr = ["中文简体", "中文-繁體", "English"];//, "日本語", "한국의", "Deutsch", "Español", "Français", "Italiano", "Nederlandse", "Português", "Русский"
        for (var i = 0; i < 3; i++) {
            var a = $.mk("a");
            a.cls("head_lang_item");
            a.code = codeArr[i];
            a.html(langArr[i]);
            a.onclick = function () {
                $.setCookie("lang", this.code, 300);
                top.location = "";
            };
            headViewer.append(a);
            if (localeCode.toLowerCase() == a.code) {
                localeLang = langArr[i];
                $.setCookie("lang", localeCode, 300);
            }
        }
        $.get("head_lang_txt").html(localeLang);
    }
    initLang();
})();
