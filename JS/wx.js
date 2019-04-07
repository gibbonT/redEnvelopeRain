var timestamp = "",
    noncestr = "",
    sign = "";
$.ajax({
    async: false,
    url: "http://47.93.233.49:8090/api/v1/get_sign",
    type: "GET",
    data: {
        "url": window.location.href
    },
    success: function (data) {
        timestamp = data.timestamp;
        noncestr = data.noncestr;
        sign = data.sign;
    },
});

wx.config({
    debug: false,
    appId: "wx13c787be64418985",
    timestamp: timestamp,
    nonceStr: noncestr,
    signature: sign,
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
});

var wx_title = "红包雨小游戏",                           // 分享标题
    wx_link = "http://hb.chafanbao.com/red",         // 分享地址
    wx_imgurl = "http://hb.chafanbao.com/red/image/main/main.png/",                              // 分享图标
    wx_desc = "拼手速，抢现金，不来错过一个亿！";                                // 分享描述

var today_time = -1, all_time = -1;
function wx_share(title, link, imgurl, desc) {
    //朋友圈
    wx.onMenuShareTimeline( {
        title: title,           // 分享标题
        link: link,             // 分享链接
        imgUrl: imgurl,         // 分享图标
        // trigger: function () {
        //     alert('用户点击分享到朋友圈');
        // },
        success: function() {
            // 用户确认分享后执行的回调函数
            $.ajax({
                async: false,
                url: "http://47.93.233.49:8090/api/v1/share_friend",
                type: "GET",
                data: {
                    "openid": openId
                },
                success: function (data) {
                    // alert('已分享' + data);
                }
            });
            if(all_time == 0) {
                all_time = 1;
            }
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    //微信好友
    wx.onMenuShareAppMessage({
        title: title,           // 分享标题
        desc: desc,             // 分享描述
        link: link,             // 分享链接
        imgUrl: imgurl,         // 分享图标
        type: 'link',           // 分享类型,music、video或link，不填默认为link
        dataUrl: '',            // 如果type是music或video，则要提供数据链接，默认为空
        // trigger: function () {
        //     alert('用户点击分享到朋友圈');
        // },
        success: function() {
            // 用户确认分享后执行的回调函数
            $.ajax({
                async: false,
                url: "http://47.93.233.49:8090/api/v1/share_friend",
                type: "GET",
                data: {
                    "openid": openId
                },
                success: function () {
                }
            });
            if(all_time == 0) {
                all_time = 1;
            }
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert('已取消');
        }
    });
}

// wx.error(function (res) {
//     alert(res.errMsg);
// });