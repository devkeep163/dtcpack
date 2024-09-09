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
        if(!this.data.email || !this.data.code) {
            app.toast('邮箱或验证码不能为空')
            return;
        }
        app.request({
            url: '/miniapp/email/login',
            method: 'POST',
            isLoading: true,
            data: {
                email: this.data.email,
                code: this.data.code
            },
            success: (res) => {
                console.log(res.data);
                if(res.data.code == 0)
                {
                    wx.setStorageSync('username', res.data.data.username)
                    wx.setStorageSync('role', res.data.data.role)
                    wx.setStorageSync('isLogin', 1)
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
                else
                {
                    app.toast(res.data.msg)
                }
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