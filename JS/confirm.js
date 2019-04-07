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

$.ajax({
    async: false,
    url: "http://47.93.233.49:8090/api/v1/send",
    type: "GET",
    data: {
        "openid": openId,
    },
    success: function (data) {
        ic = data.ic;
    }
});
// 请求验证码
$("#withdraw").click(function () {
    alert(ic);
    // if(Object.keys(id_num_onlyMoney).length > 0 && afford == 0) {
    //     $.ajax({
    //         async: false,
    //         url: "http://47.93.233.49:8090/api/v1/send",
    //         type: "GET",
    //         data: {
    //             "openid": openId,
    //         },
    //         success: function (data) {
                // console.log(data);
                // ic = data.ic;
                // console.log(ic);
                add();
            // }
        // });
    // }
});
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
