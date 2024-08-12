// app.js
App({
    globalData: {
        userInfo: null,
        host: 'http://ranktool.888.com'
    },
    onLaunch() {},
    onShow() {
        this.checkSession();
    },

    // 会话校验
    checkSession() {
        const username = wx.getStorageSync('username') || null
        if (!username) {
            console.log(username);
            wx.navigateTo({
                url: '/pages/one/one'
            })
        }
    },

    // 获取用户手机号
    getPhone(code) {
        console.log(code);
        wx.showLoading({
            title: '请稍后...',
        })
        wx.request({
            url: this.globalData.host + '/miniapp/get_phone_number',
            method: 'GET',
            data: {
                code: code
            },
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
                    wx.redirectTo({
                        url: '/pages/bind_email/index?phone=' + res.data.data.phone
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                    })
                }
            },
            fail: (err) => {
                console.error('获取手机号失败', err);
            },
            complete: () => {
                wx.hideLoading()
            }
        });
    },
})