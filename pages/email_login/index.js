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
    },
    getPhoneNumberAndUserInfo(e) {
        if (e.detail.code) {
            app.getPhone(e.detail.code).then(() => {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            })
        }
    }
});