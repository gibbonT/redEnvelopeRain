// 初始化宽高
document.getElementById("info").style.width = window.innerWidth + 'px';
document.getElementById("info").style.height = window.innerHeight + 'px';


$("#ticket").click(function () {
    window.location.href = "https://55883069.m.weimob.com/vshop/55883069/Goods/GoodsListNew1?ClassifyId=294176";
});

$("#recharge").click(function () {
    window.location.href = "http://wx.95504.net/Micro/Cardlist_Recharge.html?openId=" + openId;
});

// 点击返回上一页
$("#goback_MyRP").click(function () {
    var goback_MyRP = document.createElement('div');
    goback_MyRP.setAttribute("id", "MyRP");
    goback_MyRP.innerHTML = "" +
        "        <div id=\"container\">\n" +
        "            <div id=\"head\">\n" +
        "                <p>我的红包</p>\n" +
        "            </div>\n" +
        "            <div id=\"result_info\">\n" +
        "                <div id=\"RedP_list\"></div>\n" +
        "            </div>\n" +
        "            <div id=\"info_share\">\n" +
        "                <div id=\"shareInfo\">\n" +
        "                    <div id=\"redPack_info\">使用红包</div>\n" +
        "                    <div id=\"share\">点击分享</div>\n" +
        "                </div>\n" +
        "                <p id=\"share_info\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现金红包应立即提取，否则过期无效。每成功分享一次，获得额外游戏机会一次，单日上限10次</p>\n" +
        "            </div>\n" +
        "            <div id=\"goback_init\">返回上页</div>\n" +
        "        </div>";
    document.getElementsByTagName("body")[0].insertBefore(goback_MyRP, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("info"));
    // 引进JS、CSS；
    load_CSS("CSS/MyRP.css");
    load_JS("JS/MyRP.js");
});
// 返回首页
$("#goback_init").click(function () {
    RE_num = 0;
    var first = document.createElement('div');
    first.setAttribute("id", "first");
    first.innerHTML = "<div id=\"content\">\n" +
        "            <div id=\"begin\" onclick=\"begin();\">开始游戏</div>\n" +
        "            <div id=\"introd\">\n" +
        "                <p id=\"int_1\">——— <span>玩法说明</span> ———</p>\n" +
        "                <p class=\"int_2\">开始游戏后点击屏幕上的红包，</p>\n" +
        "                <p class=\"int_2\">30秒内随时有惊喜。奖励不等！</p>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div id=\"btn_p\">\n" +
        "            <img src=\"image/first/My.png\" alt=\"\" onclick=\"exam_RP()\">\n" +
        "            <p id=\"id_1\">点击查看</p>\n" +
        "            <p id=\"id_2\">我的红包</p>\n" +
        "        </div>\n" +
        "        <div id=\"times\">\n" +
        "            <!--<div id=\"share\">点击分享</div>-->\n" +
        "            <p>当前剩余<br>次数：<span id=\"today_time\"></span></p>\n" +
        "        </div>";
    document.getElementsByTagName("body")[0].insertBefore(first, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("info"));
    // 引进JS、CSS；
    load_CSS("CSS/init.css");
    load_JS("JS/init.js");
});

// 发送结果到接口，后台反馈获取红包详情
$.ajax({
    url: "http://47.93.233.49:8090/api/v1/person_prize",
    type: "GET",
    data: {
        "openid": openId,
        "type": 2
    },
    success: function (data) {
        var logo_meet = 0;
        data = unescape(data.data.replace(/\\u/g, '%u'));
        data = data.split("\"");

        var num = 1;
        for(var l = 1; l < data.length - 1; l += 2) {
            var li = "<p align=\"left\">" + num + "." + data[l] + "</p>";
            document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + li;
            num += 1;
            if(data[l].indexOf("茶卡羊肉大额优惠券") != -1) {
                logo_meet = 1;
            }
        }

        if(logo_meet == 1) {
            document.getElementById("container_2").style.visibility = "visible";
        }

    }
});