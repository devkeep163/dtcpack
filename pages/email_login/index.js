const app = getApp()
Page({
    data: {
        isAgreed: true,
        email: ''
    },
    onLoad: function () {
        // 页面加载时的逻辑
    },
    // 发送邮件
    send: function () {
        wx.showLoading({
            title: '请稍后...',
        })
        wx.request({
            url: app.globalData.host + '/miniapp/email/login',
            method: 'POST',
            data: {
                email: this.data.email
            },
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
                    wx.setStorageSync('username', res.data.data.email)
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
                wx.showToast({
                    icon: 'none',
                    title: res.data.msg
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