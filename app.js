// app.js
App({
    globalData: {
        userInfo: null,
        host: 'https://www.dtcpack.cn'
    },
    onLaunch() {
        // 获取当前小程序的版本环境
        const accountInfo = wx.getAccountInfoSync();
        const env = accountInfo.miniProgram.envVersion;

        // 根据环境设置不同的域名
        let host = 'https://www.dtcpack.cn';
        if (env === 'develop') {
            host = 'http://ranktool.888.com'; // 开发环境域名
        } else if (env === 'trial') {
            host = 'http://ranktool.winndoo.cn'; // 测试环境域名
        } else if (env === 'release') {
            host = 'https://www.dtcpack.cn'; // 生产环境域名
        }

        // 将 host 存储到 globalData 中
        this.globalData = {
            host: host
        };

        console.log('当前环境: ', env);
        console.log('当前使用的域名: ', this.globalData.host);
    },
    onShow() {},

    // 会话校验
    checkSession() {
        return new Promise((resolve, reject) => {
            const isLogin = wx.getStorageSync('isLogin') || 0
            if (isLogin) {
                const username = wx.getStorageSync('username')
                const role = wx.getStorageSync('role')
                console.log(role);
                resolve({
                    username: username,
                    role: role
                })
            } else {
                wx.navigateTo({
                    url: '/pages/login/index'
                })
            }
        })
    },

    // 统一请求
    request(params) {
        const originalSuccess = params.success;
        params.url = this.globalData.host + params.url
        const username = wx.getStorageSync('username') || null
        if (username) {
            params.header = {
                username: username
            };
        }

        if (params.isLoading) {
            wx.showLoading({
                title: '请稍后...',
            })
            params.complete = function () {
                wx.hideLoading();
            }
        }
        params.success = function(res) {
            if(200 == res.statusCode) {
                originalSuccess(res)
            }
            else
            {
                wx.showToast({
                    duration: 2000,
                    icon: 'none',
                    title: res.data.msg
                })
                wx.clearStorage()
            }
        }
        params.fail = function(err) {
            console.log(err);
            wx.showToast({
                duration: 2500,
                icon: 'none',
                title: '请求异常',
            })
        }
        wx.request(params);
    },

    // 获取用户手机号
    getPhone(code) {
        console.log(code)
        return new Promise((resolve, reject) => {
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
                        wx.setStorageSync('username', res.data.data.username)
                        wx.setStorageSync('role', res.data.data.role)
                        wx.setStorageSync('isLogin', 1)

                        // 跳转到首页
                        wx.switchTab({
                            url: '/pages/index/index',
                        })

                        // 跳转到绑定邮箱
                        // if (res.data.data.email) {
                        //     resolve(res.data)
                        // } else {
                        //     wx.redirectTo({
                        //         url: '/pages/bind_email/index'
                        //     })
                        // }
                    } else {
                        wx.showToast({
                            icon: 'none',
                            duration: 2000,
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
        })
    },
    // 发送邮箱验证码
    sendEmailCode(email) {
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

    // base64_encode
    base64Encode() {
        return btoa(unescape(encodeURIComponent(str)));
    },

    // 提示框
    toast(msg) {
        wx.showToast({
            duration: 2000,
            icon: 'none',
            title: msg
        })
    }
})