(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
function show_bottom(){
    pushHistory();
    window.addEventListener("popstate", function(e) {
        WeixinJSBridge.invoke('closeWindow',{},function(res){ });
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
}
show_bottom();
document.oncontextmenu=function(e){
    e.preventDefault();
};

document.getElementById("first").style.width = window.innerWidth + 'px';
document.getElementById("first").style.height = window.innerHeight + 'px';

RE_info = {};

openId = Math.floor(Math.random() * 1000000).toString();
// console.log(openId);
var vir_persion = {}, vir_prize = {};
// 获取用户的剩余次数
$.ajax({
    async: false,
    url: "http://47.93.233.49:8090/api/v1/prize",
    type: "GET",
    data: { "openid": openId },
    success: function (data) {
        // document.getElementById("today_time").innerText = openId;
        // setTimeout(function () {
        //
        // }, 2500);
        vir_persion = data.vir_persion;
        vir_prize = data.vir_prize;
        RE_info = data.data;
        today_time = data.total_num;  // 当日剩余次数
        all_time = data.chance_num;   // 总剩余次数
        if(parseInt(all_time) < 0) {
            all_time = 0;
        }
        // console.log(all_time);
        document.getElementById("today_time").innerText = all_time;
    },
});

// console.log(vir_persion, vir_prize);
var x_persion = Math.floor(Math.random() * vir_persion.length),
    x_money = Math.floor(Math.random() * vir_prize.length);
document.getElementById("att_persion").innerText = vir_persion[x_persion];
document.getElementById("att_money").innerText = vir_prize[x_money];
// 头顶弹幕效果滑动
setInterval(function () {
    // var left = $('#RE_num').css('left');
    // var new_left = parseInt(left) - 2;
    // console.log(parseInt($('#RE_num').css('left')));
    // if(parseInt($('#RE_num').css('left')) < -200) {
        var y_persion = Math.floor(Math.random() * vir_persion.length),
            y_money = Math.floor(Math.random() * vir_prize.length);
        while(x_persion == y_persion) {
            y_persion = Math.floor(Math.random() * vir_persion.length);
        }
        document.getElementById("att_persion").innerText = vir_persion[y_persion];
        x_persion = y_persion;
        while(x_money == y_money) {
            y_persion = Math.floor(Math.random() * vir_persion.length);
        }
        x_money = y_money;
        document.getElementById("att_money").innerText = vir_prize[y_money];
    // }
    // console.log(document.getElementById("att_persion").innerText)
    // $('#RE_num').css('left', new_left + 'px');
    // setTimeout(function () {}, 5000)
}, 65000);

// 点击进入下一个页面，开始游戏
function begin() {
    if(all_time <= 0) {
        document.getElementById("begin").innerHTML = "分享后继续";
        // alert("分享后继续");
    } else if(today_time <= 0) {
        // alert("今日次数已经用完");
        document.getElementById("begin").innerHTML = "分享后继续";
    } else {
        // alert("剩余" + all_time +"次数");
        var main = document.createElement('div');
        main.setAttribute("id", "main");
        main.setAttribute("display", "none");
        main.innerHTML = "<div id=\"head\">\n" +
            "           <p>已获得</p><span id=\"num\">6</span><p>个红包</p>\n" +
            "       </div>\n" +
            "       <div id=\"time\">\n" +
            "           <span id=\"seconds\">30</span>" +
            "       </div>\n" +
            "       <div id=\"countDown\" style=\"display: none\">3</div>\n" +
            "       <div id=\"RedPackage__Main\"></div>\n";
        document.getElementsByTagName("body")[0].insertBefore(main, document.getElementsByTagName("body")[0].lastChild);
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("first"));
        // document.getElementById("first").style.display = "none";
        document.getElementById("main").style.display = "block";
        // 引进JS、CSS；
        load_CSS("CSS/main.css");
        load_JS("JS/main.js");
    }

}

// 点击进入查看个人红包页面
function  exam_RP() {
    var MyRP = document.createElement('div');
    MyRP.setAttribute("id", "MyRP");
    MyRP.innerHTML = "" +
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
    document.getElementsByTagName("body")[0].insertBefore(MyRP, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("first"));
    // 引进JS、CSS；
    load_CSS("CSS/MyRP.css");
    load_JS("JS/MyRP.js");
}

function dsapp_init() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("share_layer"));
    $('#share').click(function () {
        // alert("请点击右上角进行分享。分享成功后游戏次数增加一次；");
        // var share_layer = document.createElement('div');
        // share_layer.setAttribute("id", "share_layer");
        // document.getElementsByTagName("body")[0].insertBefore(share_layer, document.getElementsByTagName("body")[0].lastChild);

        var share_layer = "<div id=\"share_layer\" onclick='dsapp_init()'>" +
            "<img src=\"image/info/share.png\"></div>";
        $("body")[0].innerHTML += share_layer;
        $.ajax({
            async: false,
            url: "http://47.93.233.49:8090/api/v1/share_friend",
            type: "GET",
            data: { "openid": openId },
            success: function (data) {  }
        });
    });
}
$('#share').click(function () {
    // alert("请点击右上角进行分享。分享成功后游戏次数增加一次；");
    // var share_layer = document.createElement('div');
    // share_layer.setAttribute("id", "share_layer");
    // document.getElementsByTagName("body")[0].insertBefore(share_layer, document.getElementsByTagName("body")[0].lastChild);

    var share_layer = "<div id=\"share_layer\" onclick='dsapp_init()'>" +
        "<img src=\"image/info/share.png\"></div>";
    $("body")[0].innerHTML += share_layer;
    $.ajax({
        async: false,
        url: "http://47.93.233.49:8090/api/v1/share_friend",
        type: "GET",
        data: { "openid": openId },
        success: function (data) {  }
    });
});

// 分享接口
$(function (){
    wx.ready(function () {
        wx_share(wx_title, wx_link, wx_imgurl, wx_desc);
    });
});