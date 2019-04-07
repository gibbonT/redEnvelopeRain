// 初始化宽高
document.getElementById("MyRP").style.width = window.innerWidth + 'px';
document.getElementById("MyRP").style.height = window.innerHeight + 'px';

// 渲染我的红包数据
var MyRP_list = $("#MyRP > #container > #result_info");
$.ajax({
    async: false,
    url: "http://47.93.233.49:8090/api/v1/person_prize",
    type: "GET",
    data: {
        "openid": openId,
        "type": 1
    },
    success: function (data) {
        data = unescape(data.data.replace(/\\u/g, '%u'));
        data = data.split("\"");
        // console.log(data)

        var num = 1;
        // console.log(data)
        document.getElementById("RedP_list").innerHTML = "";
        for(var l = 1; l <= data.length - 1; l += 2) {
            var number_2 = data[l + 1];
            if((num * 2) != data.length - 1) {
                number_1 = number_2.substr(1, number_2.length - 2);
            } else if((num * 2) == data.length - 1) {
                number_1 = number_2.substr(1, number_2.length - 1);
            }
            number = number_1.substr(0, number_1.length - 1);
            // console.log(number)
            var li = "<p align=\"left\">" + num + "." + data[l] + "<span>" + number + "个</span></p>";

            document.getElementById("RedP_list").innerHTML = document.getElementById("RedP_list").innerHTML + li;
            num += 1;
        }

    }
});

// 点击返回上一页
$("#goback_init").click(function () {
    var first_html = document.createElement('div');
    first_html.setAttribute("id", "first");
    first_html.innerHTML = "<div id=\"content\">\n" +
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
        "        </div>";
    document.getElementsByTagName("body")[0].insertBefore(first_html, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("MyRP"));
    // 引进JS、CSS；
    load_CSS("CSS/init.css");
    // 再次初始化宽高
    document.getElementById("first").style.width = window.innerWidth + 'px';
    document.getElementById("first").style.height = window.innerHeight + 'px';

});

// 使用红包页面
$("#redPack_info").click(function () {
    var info = document.createElement('div');
    info.setAttribute("id", "info");
    info.innerHTML = "<div id=\"container_1\">\n" +
        "            <div id=\"header\">使用详情</div>\n" +
        "            <div id=\"list\"></div>\n" +
        "            <div id=\"goback_MyRP\">返回上页</div>\n" +
        "            <div id=\"recharge\">\n" +
        "                点击充值\n" +
        "            </div>\n" +
        "            </div>\n" +
        "            <div id=\"container_2\">\n" +
        "            <div class=\"ticket\">\n" +
        "                <img src=\"image/info/ticket.png\" alt=\"\" id=\"ticket\">\n" +
        "            </div>\n" +
        "            </div>\n" +
        "        </div>";
    document.getElementsByTagName("body")[0].insertBefore(info, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("MyRP"));
    document.getElementById("info").style.display = "block";
    // 引进JS、CSS；
    load_CSS("CSS/info.css");
    load_JS("JS/info.js");
});

function dsapp_MyRP() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("share_layer"));
    load_JS("JS/MyRP.js");
}
$('#share').click(function () {
    // alert("请点击右上角进行分享。分享成功后游戏次数增加一次；");
    // var share_layer = document.createElement('div');
    // share_layer.setAttribute("id", "share_layer");
    // document.getElementsByTagName("body")[0].insertBefore(share_layer, document.getElementsByTagName("body")[0].lastChild);

    var share_layer = "<div id=\"share_layer\" onclick='dsapp_MyRP()'>" +
        "<img src=\"image/info/share.png\"></div>";
    $("body")[0].innerHTML += share_layer;
});

// // 分享接口
// wx.ready(function () {
//     wx_share(wx_title, wx_link, wx_imgurl, wx_desc);
// });