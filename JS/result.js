// 初始化宽高
document.getElementById("result").style.width = window.innerWidth + 'px';
document.getElementById("result").style.height = window.innerHeight + 'px';

// 渲染红包结果数量
document.getElementById("num").innerText = RE_num;

// 根据结果渲染页面，给出红包名称
// id —— name + number
var ids = Object.keys(id_num);
document.getElementById("RedP_list").innerHTML = "";
for(var l = 0, num = 0; l < ids.length; l ++) {
    var id_li = ids[l];
    // console.log($("#RedP_list")[0]);
    if(id_num[id_li] > 0) {
        num += 1;
        li = "<p align=\"left\">" + num + '.' + id_name[id_li] + "<span>" + id_num[id_li] + "个</span></p>";
        document.getElementById("RedP_list").innerHTML += li;
    }
}

// 使用红包页面
$("#redPack_info").click(function () {
    var info = document.createElement('div');
    info.setAttribute("id", "info");
    info.innerHTML = "<div id=\"container_1\">\n" +
        "            <div id=\"header\">使用详情</div>\n" +
        "            <div id=\"list\"></div>\n" +
        "            <div id=\"goback_init\">返回首页</div>\n" +
        "            <div id=\"recharge\">\n" +
        "                点击充值\n" +
        "            </div>\n" +
        "            </div>\n" +
        "            <div id=\"container_2\" style=\"visibility: hidden;\">\n" +
        "            <div class=\"ticket\">\n" +
        "                <img src=\"image/info/ticket.png\" alt=\"\" id=\"ticket\">\n" +
        "            </div>\n" +
        "            </div>\n" +
        "        </div>";
    document.getElementsByTagName("body")[0].insertBefore(info, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("result"));
    document.getElementById("info").style.display = "block";
    // 引进JS、CSS；
    load_CSS("CSS/info.css");
    load_JS("JS/info.js");
});

function dsapp_result() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("share_layer"));
    load_JS("JS/result.js");
}
$('#share').click(function () {
    // alert("请点击右上角进行分享。分享成功后游戏次数增加一次；")
    var share_layer = "<div id=\"share_layer\" onclick='dsapp_result()'>" +
        "<img src=\"image/info/share.png\"></div>";
    $("body")[0].innerHTML += share_layer;
});

// // 分享接口
// wx.ready(function () {
//     wx_share(wx_title, wx_link, wx_imgurl, wx_desc);
// });

// load_JS("JS/confirm.js");


var confirming = 0, afford = 0;
var ic, id_num_onlyMoney = {}, timer_5 = null;
$.each(id_num_a, function deal_idNum_money(id, num) {
    if(id >= 10 && id <= 13) {
        id_num_onlyMoney[id] = num;
    }
});

function add() {
    var ic_exam = document.createElement('div');
    ic_exam.setAttribute("id", "ic_exam");
    ic_exam.innerHTML = "<input id=\"inputCF\" type=\"text\" name=\"u\" placeholder=\"请输入验证码\"/>" +
        "<p id=\"tips_1\">" + "您的验证码是：" + ic + "</p>" +
        "<p id=\"tips_2\">请在<span id='confirm_time'>" + 30 + "</span>s内完成输入并点击确认</p>" +
        "<input type=\"button\" value=\"确认\" id=\"confirm\" style=\"height:20px;\" onclick='check_Mon()'>";

    document.getElementsByTagName("body")[0].insertBefore(ic_exam, document.getElementsByTagName("body")[0].lastChild);
    conf_time_countD();
}
function conf_time_countD() {
    timer_5 = setInterval(function () {
        var next_second = $("#confirm_time")[0].innerText;
        next_second = parseInt(next_second) - 1;
        if(next_second <= 9) {
            next_second = "0" + next_second;
        }
        $("#confirm_time")[0].innerText = next_second;

        if(parseInt(next_second) == 0) {
            clearInterval(timer_5);
            $("#ic_exam").remove();
        }
    }, 1000);
}

// 请求验证码
document.getElementById("withdraw"). onclick = function() {
    if(Object.keys(id_num_onlyMoney).length > 0 && afford == 0) {
        $.ajax({
            async: false,
            url: "http://47.93.233.49:8090/api/v1/send",
            type: "GET",
            data: {
                "openid": openId,
            },
            success: function (data) {
                ic = data.ic;
                add();
            }
        });
    }
};
// $("#withdraw").click(function () {
//     alert("ic：" + ic);
//     if(Object.keys(id_num_onlyMoney).length > 0 && afford == 0) {
//         $.ajax({
//             async: false,
//             url: "http://47.93.233.49:8090/api/v1/send",
//             type: "GET",
//             data: {
//                 "openid": openId,
//             },
//             success: function (data) {
//                 // console.log(data);
//                 ic = data.ic;
//                 // console.log(ic);
//                 add();
//             }
//         });
//     }
//     alert("ic：" + ic);
// });
// 输入验证码确认
function check_Mon() {
    // console.log($("input#inputCF").val());
    if($("input#inputCF").val() === ic) {
        $.ajax({
            url: "http://47.93.233.49:8090/api/v1/send",
            type: "POST",
            data: JSON.stringify({
                "openid": openId,
                "ic": ic,
                "result": id_num_onlyMoney
            }),
            success: function () {
                afford = 1;
                clearInterval(timer_5);
                $("#ic_exam").remove();
            }
        });
    }
};
