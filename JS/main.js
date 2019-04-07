(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }
}());
// 初始化宽高
document.getElementById("main").style.width = window.innerWidth + 'px';
document.getElementById("main").style.height = window.innerHeight + 'px';
// 初始化红包数量
document.getElementById("num").innerText = RE_num;

// var timer_1 = null,    // 321倒计时
//     timer_2 = null,    // 30s倒计时
//     timer_3 = null,    // 红包随机产生倒计时
//     timer_4 = null,    // 下落函数
var id_num = {},        // 记录每个奖励红包的数量，下标为奖励的id
    P = [],
    P_id = {},          // 记录每个可能概率的id
    id_name = {},       // 存储每个id对应的name
    name_id = {};

for(var j = 0; j < RE_info.length; j ++) {
    id_num[RE_info[j].id] = 0;                       // 存储每个id对应红包个数
    id_name[RE_info[j].id] = RE_info[j].gift_name;   // 存储每个id对应的name
    name_id[RE_info[j].gift_name] = RE_info[j].id;
    var p = RE_info[j].gift_ratio;
    if(P_id[p] == undefined) {
        P_id[p] = [];
    }
    P_id[p].push(RE_info[j].id);                     // 存储每个概率对应id
    P = Object.keys(P_id).sort().reverse();          // 大概率放前
}
// console.log(RE_info);
// console.log(P, P_id);

// 开始游戏
function begin() {
    $("#RedPackage__Main").empty();
    i_S = 30;
    const start_cont = ["3", "2", "1", "开始游戏"];
    setTimeout(function() {}, 500);
    // 倒计时开始
    var i_S = 0,
        countD = document.getElementById("countDown");
    // 开始执行动画
    countD.style.display = "block";
    countD.innerText = start_cont[i_S];
    var before = new Date().getTime();
    var timer_1 = requestAnimationFrame(function () {
        if((new Date().getTime() - before) >= 1000) {
            before = new Date().getTime();
            // 321开始
            i_S ++;
            if(i_S < 4) {
                countD.innerText = start_cont[i_S];
                requestAnimationFrame(arguments.callee);
            } else if(i_S === 4) {
                cancelAnimationFrame(timer_1);
                countD.style.display = "none";
                // 30s游戏倒计时开始
                start_CountD();
                // 红包开始生成
                start_RedE();
                // 红包点击事件
                click_event();
            }
        } else if((new Date().getTime() - before) < 1000) {
            requestAnimationFrame(arguments.callee);
        }
    });
}


var i_SC = 30;
// 倒计时 时间减一
function start_CountD() {
    var times_second = document.getElementById("seconds");
    var before = new Date().getTime(),
        timer_2 = requestAnimationFrame(function () {
        if((new Date().getTime() - before) >= 1000) {
            before = new Date().getTime();
            if (parseInt(i_SC) <= 0) {
                cancelAnimationFrame(timer_2);
                result();
                res_beg = 1;
                return;
            }
            i_SC -= 1;
            console.log(i_SC);
            var cur_second = i_SC;
            if (i_SC <= 9) {
                cur_second = "0" + cur_second;
            }
            times_second.innerText = cur_second;
            requestAnimationFrame(arguments.callee);
        } else if((new Date().getTime() - before) < 1000) {
            requestAnimationFrame(arguments.callee);
        }
    });
}
var res_beg = 0;
(function() {
    var before = new Date().getTime(),
        timer_2 = requestAnimationFrame(function () {
            if((new Date().getTime() - before) >= 35500) {
                cancelAnimationFrame(timer_2);
                if(res_beg == 0) {
                    result();
                }
                return
            } else{
                requestAnimationFrame(arguments.callee);
            }
        });
} ());


var onlyOne = {}; // 记录红包是否被点击过
// 点击打开红包
function reveal(e) {
    var id = $(e)[0].getAttribute("id");
    if(parseInt(onlyOne[id]) === 0) {
        return false;
    }
    onlyOne[id] = 0;
    $(e)[0].childNodes[0].style.visibility = "visible";
    var $current = $("#" + $(e)[0].getAttribute("id"));
    // 更新已抢到的信息：id_num
    // console.log($(e)[0])
    var RP_name = $(e)[0].childNodes[0].innerText;
    var RP_id = name_id[RP_name];
    if(RP_id > 0) {
        id_num[RP_id] += 1;
        RE_num += 1;
    }
    document.getElementById("num").innerText = RE_num;
    // console.log($current[0]);
    if(parseInt($current.position().top) >= 450) {
        // $(".RedPack").remove("#" + $(e)[0].getAttribute("id"));
        $("#RedPackage__Main").children("#" + $(e)[0].getAttribute("id")).remove();
    } else {
        $current.fadeOut(150);
        setTimeout(function () {
            $("#RedPackage__Main").children("#" + $(e)[0].getAttribute("id")).remove();
        }, 150);
    }
}
// 事件委托
function click_event() {
    var RP_packert = document.querySelector("#RedPackage__Main");
    RP_packert.addEventListener("touchstart", function(e) {
        var l = e.target;
        // console.log(l.tagName);
        while(l.tagName !== "DIV") {
            l = l.parentNode;
        }
        // console.log(l.id);
        if(l && l.id !== "RedPackage__Main") {
            reveal(l);
        }
    });
}


// 红包掉落
function moveDown() {
    var $ul = RedPackage__Main.childNodes;
    if($ul.length === 0) {
        return;
    }
    // console.log($ul.length);
    for(var l = 0; l < $ul.length; l ++) {
        $ul[l].style.top = (parseInt($ul[l].style.top) + speed[$ul[l].getAttribute("id")] * 3 / 2) + "px";
        if(parseInt($ul[l].style.top) >= 450) {
            var id = $ul[l].getAttribute("id");
            $("#" + id).fadeOut(100);
            $(this).unbind("click");
            setTimeout(function () {
                $("#RedPackage__Main").children("#" + id).remove();
            }, 500);
        }
    }
}
setTimeout(function () {
    var before = new Date().getTime(),
        timer_4 = requestAnimationFrame(function () {
        if((new Date().getTime() - before) >= 25) {
            before = new Date().getTime();
            if (parseInt(i_SC) <= 0) {
                $("#RedPackage__Main").empty();
                cancelAnimationFrame(timer_4);
                return;
            }
            moveDown();
            requestAnimationFrame(arguments.callee);
        } else {
            requestAnimationFrame(arguments.callee);
        }
    });
}, 3000);


var RedPackage__Main = document.getElementById("RedPackage__Main"),
    number = 0,     // 红包生成序号
    speed = {},
    courage = ["加油", "再接再厉"];
// 红包生成，随机设置参数
function start_RedE() {
    var timer_3 = setInterval(function() {
        if (parseInt(i_SC) == 0) {
            clearInterval(timer_3);
            return;
        }
        if(RedPackage__Main.childNodes.length <= 10) {
            // content：红包内容
            number += 1; // 以number即红包出现的序号作为ID
            onlyOne[number] = 1; // 置1表示未被点击
            speed[number] = Math.random() * 0.5 + 8; // 生成时随机确定下落速度
            // 随机红包内容
            var x = parseInt((Math.random() * 1000000)),      // 生成随机数
                current_ID = -1,                            // 表示此红包里的内容对应ID
                content;                                    // 红包内容
            // console.log(x);
            for(var k = 0; k < P.length; k ++) {
                // 比最大概率还大视为无红包
                if (x > (P[0] * 1000000)) {
                    break;
                }
                if (x < (P[k] * 1000000)) {
                    // console.log(x, (P[k] * 1000000));
                    if(P_id[P[k]].length >= 1) {
                        var choose_id = P_id[P[k]];
                        // console.log(choose_id);
                        if(choose_id.length == 1) {
                            current_ID = choose_id[0];
                        } else if(choose_id.length > 1) {
                            var index = Math.floor(Math.random() * choose_id.length);
                            current_ID = choose_id[index];
                        }
                    }
                }
            }
            // 该红包没有中奖
            if(parseInt(current_ID) <= -1) {
                var y = Math.floor(Math.random() * courage.length);
                content = courage[y];
            } else {
                content = id_name[current_ID];
                // console.log(content);
            }
            // console.log(x, content);
            const newRedPack = "<div class='RedPack' id='" + number + "' style='top: 0;'>" +
                "<span id=\"RedP_info\" style='visibility: hidden;display: block;'>" + content + "</span>\n" +
                "<img src=\"image/main/redE.png\" alt=\"\" class=\"redP\"></div>";
            // 添加红包
            RedPackage__Main.innerHTML = RedPackage__Main.innerHTML + newRedPack;
            // 旋转角度
            var random_rot = Math.random() * 60 - 30;
            RedPackage__Main.lastChild.lastChild.style.transform = "rotate(" + random_rot + "deg)";
            // 左侧偏移距离
            var w = (Math.random() * 220);
            RedPackage__Main.lastChild.style.left = w + "px";
            // $("#number").css({"transform": "rotate(" + random_rot + "deg)","left": w + "px"});
            // drop(number);
        }
    }, 250);
}
function drop(number) {
    var cur_RP = $("#" + number);
    console.log(cur_RP);
    cur_RP.animate({ top: "450px" }, 250);
    // $(this).animate({ top: "+=50px" }, 1000);
    cur_RP.fadeOut(300);
}
// 反馈结果
var id_num_a = {};
function result() {
    $.each(id_num, function deal_idNum(id, num){
        if(num > 0) {
            id_num_a[id] = num;
        }
    });
    // console.log(id_num, id_num_a);
    // id_num_a为删除次数为0的id号之后得到的结果
    // 数据发送到后台
    $.ajax({
        url: "http://47.93.233.49:8090/api/v1/keep_prize",
        type: "POST",
        data: JSON.stringify({
            "openid": openId,
            "result": id_num_a
        }),
        success: function (data) {
            // console.log(data);
            if(data.msg == "save ok") {
                new_page_result();
            }
        }
    });
}
function new_page_result() {
    // 载入新页面内容
    var result = document.createElement('div');
    result.setAttribute("id", "result");
    result.innerHTML = "" +
        "        <div id=\"container\">\n" +
        "            <div id=\"head\">\n" +
        "                <p>您共获得</p><span id=\"num\">6</span><p>个红包</p>\n" +
        "            </div>\n" +
        "            <div id=\"result_info\">\n" +
        "                <div id=\"RedP_list\"></div>\n" +
        "            </div>\n" +
        "            <div id=\"info_share\">\n" +
        "                <div id=\"shareInfo\">\n" +
        "                    <div id=\"withdraw\">点击提现</div>\n" +
        "                    <div id=\"redPack_info\">使用红包</div>\n" +
        "                    <div id=\"share\">点击分享</div>\n" +
        "                </div>\n" +
        "                <p id=\"share_info\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现金红包应立即提取，否则过期无效。每成功分享一次，获得额外游戏机会一次，单日上限10次</p>\n" +
        "            </div>\n" +
        "        </div>";
    document.getElementsByTagName("body")[0].insertBefore(result, document.getElementsByTagName("body")[0].lastChild);
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("main"));
    document.getElementById("result").style.display = "block";
    // 引进JS、CSS；
    load_CSS("CSS/result.css");
    load_JS("JS/result.js");
}

begin();