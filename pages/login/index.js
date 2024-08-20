const app = getApp()
Page({
    data: {
        isAgreed: true,
        username: "",
        password: ""
    },
    onLoad: function () {
        // 页面加载时的逻辑
    },

    onLogin: function () {
        wx.showLoading({
            title: '登录中',
        })
        wx.request({
            url: app.globalData.host + '/miniapp/login',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                email: this.data.username,
                password: this.data.password
            },
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
                    wx.setStorageSync('username', res.data.data.email)
                    wx.setStorageSync('role', res.data.data.role)
                    wx.switchTab({
                        url: '/pages/one/index'
                    })
                }
                wx.showToast({
                    icon: 'none',
                    title: res.data.msg
                })
            },
            complete() {
                wx.hideLoading()
            },
            fail(err) {
                console.log(err);
                wx.showToast({
                    title: '请求异常',
                })
            }
        })
    },

    getPhoneNumberAndUserInfo(e) {
        if (e.detail.code) {
            app.getPhone(e.detail.code)
        }
    }
});