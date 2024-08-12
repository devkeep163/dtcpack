const app = getApp()
Page({
    data: {
        isAgreed: true,
        email: "",
        code: ""
    },
    onLoad: function () {
        // 页面加载时的逻辑
    },
    sendEmailCode: function() {
        app.sendEmailCode(this.data.email)
    },
    // 登录
    login: function () {
        wx.showLoading({
            title: '请稍后...',
        })
        wx.request({
            url: app.globalData.host + '/miniapp/email/login',
            method: 'POST',
            data: {
                email: this.data.email,
                code: this.data.code
            },
            success: (res) => {
                console.log(res.data);
                wx.setStorageSync('username', res.data.data.email)
                wx.switchTab({
                    url: '/pages/index/index'
                })
            },
            fail: (err) => {
                console.log(err);
            },
            complete: () => {
                wx.hideLoading()
            }
        });
    },
    getPhoneNumberAndUserInfo(e) {
        if (e.detail.code) {
            app.getPhone(e.detail.code)
        }
    }
});