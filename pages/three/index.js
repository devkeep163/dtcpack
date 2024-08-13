const app = getApp()
Page({
    data: {
        username: "",
        password: ""
    },
    onLoad: function () {
        // 页面加载时的逻辑
    },
    add: function () {
        wx.redirectTo({
            url: '/pages/bind_email/index'
        })
    }
});