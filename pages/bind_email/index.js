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
                if(res.data.code == 0)
                {
                    wx.setStorageSync('username', res.data.data.email)
                    wx.setStorageSync('role', res.data.data.role)
                    wx.setStorageSync('isLogin', 1)
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
                else
                {
                    wx.showToast({
                        duration: 2000,
                        icon: 'error',
                        title: res.data.msg
                    })
                }
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