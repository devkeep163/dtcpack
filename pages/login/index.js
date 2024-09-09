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
        if(!this.data.username || !this.data.password) {
            app.toast('帐户或密码不能为空')
            return;
        }

        app.request({
            url: '/miniapp/login',
            method: 'POST',
            isLoading: true,
            data: {
                username: this.data.username,
                password: this.data.password
            },
            success: (res) => {
                console.log(res);
                if (res.data.code == 0) {
                    wx.setStorageSync('username', res.data.data.username)
                    wx.setStorageSync('role', res.data.data.role)
                    wx.setStorageSync('isLogin', 1)
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                } else {
                    app.toast(res.data.msg)
                }
            }
        })
    },

    // 小程序登录
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