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
            url: '/pages/create/index'
        })
    },
    // SEO规则诊断
    seoRule: function() {
        wx.navigateTo({
            url: '/pages/result_item/index'
        })
    }
});