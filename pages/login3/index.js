Page({
    data: {
        userInfo: null,
        phoneNumber: ''
    },

    onShow() {
        const session = wx.getStorageSync('session') || null

        if (!session) {
            wx.redirectTo({
                url: '/pages/login/index',
            })
        }
    },
    
    // 获取用户手机号
    getPhoneNumberAndUserInfo(e) {
        if (e.detail.code) {
            console.log(e.detail.code);
            wx.request({
                url: 'https://your-api-url.com/get-phone-number',
                method: 'POST',
                data: {
                    code: e.detail.code
                },
                success: (res) => {
                    if (res.data.phoneNumber) {
                        this.setData({
                            phoneNumber: res.data.phoneNumber
                        });
                        wx.showToast({
                            title: '登录成功',
                            icon: 'success'
                        });
                    }
                },
                fail: (err) => {
                    console.error('获取手机号失败', err);
                    wx.showToast({
                        title: '获取手机号失败',
                        icon: 'none'
                    });
                }
            });
        }
    },

    // 获取用户基本信息
    getUserProfile() {
        console.log(233);
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo
                });
            },
            fail: (err) => {
                console.error('获取用户信息失败', err);
            }
        });
    },
});