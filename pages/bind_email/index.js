const app = getApp()
Page({
    data: {
        email: "",
        phone: "",
        code: ""
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            phone: options.phone
        })
    },
    sendEmailCode: function() {
        app.sendEmailCode(this.data.email)
    },
    // 发送邮件
    bind: function () {
        wx.showLoading({
            title: '请稍后...',
        })
        wx.request({
            url: app.globalData.host + '/miniapp/email/bind',
            method: 'POST',
            data: {
                email: this.data.email,
                phone: this.data.phone,
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
    }
});