const app = getApp()
Page({
    data: {
        isAgreed: true,
    },
    onLoad: function () {
        // 页面加载时的逻辑
    },
    onShow() {
        app.request({
            url: '/miniapp/web_check_result',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
                    wx.redirectTo({
                        url: '/pages/result/index'
                    })
                }
            }
        })
    }
});