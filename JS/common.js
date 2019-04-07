// 加载CSS、JS
function load_CSS(url){
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}
function load_JS(url) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = url;
    oHead.appendChild(oScript);
}

// 从地址中接触参数param的数据片段
function getUrlParam(param) {
    var current_index = window.location.href.indexOf(param);
    if(current_index == -1) {
        return null;
    }
    return window.location.href.match(/code=(\S*)&state=/)[1];
}

// 红包数量及具体信息
var RE_num = 0,
    RE_info,
    openId,
    cod_C = "";

// get_Code();

// 获取Code，调用url接口得到OpenId
function get_Code() {
    var APPID = 'wx13c787be64418985';
    var code = getUrlParam('code');
    var local = window.location.href;
    if(code == null || code === '') {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID +
            '&redirect_uri=' + encodeURIComponent(local) +
            '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
        // window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize" +
        //     "?appid=xxx&response_type=code" +
        //     "&scope=snsapi_userinfo&redirect_uri=xxx#wechat_redirect";
    } else {
        // alert(code);
        getOpenId(code);
    }
    return code;
}
function getOpenId(code) {
    cod_C = code;
    // 截取Code交给后台,得到openId
    $.ajax({
        async: false,
        url: "http://47.93.233.49:8090/api/v1/get_openid",
        type: "GET",
        data: { "code": code },
        success: function (data) {
            openId = data.openid;
        },
    });
}