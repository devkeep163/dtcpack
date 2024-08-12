const app = getApp()
Page({
    data: {
        email: '',
        phone: ''
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            phone: options.phone
        })
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
                email: this.data.email,
                phone: this.data.phone
            },
            success: (res) => {
                console.log(res.data);
                wx.showToast({
                    icon: 'none',
                    title: res.data.msg,
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