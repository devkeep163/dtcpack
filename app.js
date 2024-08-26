// app.js
App({
    globalData: {
        userInfo: null,
        host: 'http://ranktool.winndoo.cn'
    },
    onLaunch() {
    },
    onShow() {
    },

    // 会话校验
    checkSession() {
        return new Promise((resolve, reject) => {
            const isLogin = wx.getStorageSync('isLogin') || 0
            if (isLogin) {
                const username = wx.getStorageSync('username')
                const role = wx.getStorageSync('role')
                console.log(role);
                resolve({ username: username, role: role })
            } else {
                wx.navigateTo({
                    url: '/pages/login/index'
                })
            }
        })
    },

    // 统一请求
    request(params) {
        params.url = this.globalData.host + params.url
        const username = wx.getStorageSync('username') || null
        if (username) {
            params.header = {
                email: username
            };
        }

        // 是否显示加载动画
        if (params.isLoading) {
            wx.showLoading({
                title: '请稍后...',
            })
            params.complete = function () {
                wx.hideLoading();
            }
        }
        wx.request(params);
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
                    if (res.data.data.email) {
                        wx.setStorageSync('username', res.data.data.email)
                        wx.setStorageSync('role', res.data.data.role)
                        wx.setStorageSync('isLogin', 1)
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    } else {
                        wx.redirectTo({
                            url: '/pages/bind_email/index?phone=' + res.data.data.phone
                        })
                    }
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
    // 发送邮箱验证码
    sendEmailCode: function (email) {
        wx.showLoading({
            title: '发送中...',
        })
        wx.request({
            url: this.globalData.host + '/miniapp/email/send/verification',
            method: 'POST',
            data: {
                email: email
            },
            success: (res) => {
                console.log(res.data);
                wx.showToast({
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
})