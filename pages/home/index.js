// index.js
const app = getApp()
Page({
    data: {
        role: 'am',
        user: {},
        showPopup: false,
        phoneNumber: ''
    },
    onShow() {
        const isLogin = wx.getStorageSync('isLogin') || 0
        if (isLogin) {
            app.checkSession().then((options) => {
                console.log(options.role);
                app.request({
                    url: '/miniapp/auth/info',
                    isLoading: true,
                    success: (res) => {
                        console.log(res.data);
                        this.setData({
                            isLogin: isLogin,
                            role: options.role,
                            user: res.data.data.user,
                            statistics: res.data.data.statistics
                        })
                    }
                })
            })
        } else {
            this.setData({
                isLogin: isLogin
            })
        }
    },

    // 退出登录
    logout() {
        wx.showModal({
            title: '退出登录',
            content: '您确定要退出登录吗？',
            confirmText: '确认',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    wx.removeStorageSync('username')
                    wx.removeStorageSync('role')
                    wx.removeStorageSync('isLogin')

                    // 初始化参数
                    this.setData({
                        role: 'am'
                    })

                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    // 更新个人信息
    info() {
        wx.navigateTo({
            url: '/pages/info/index',
        })
    },

    // 我的报告
    repot() {
        app.checkSession().then(() => {
            wx.navigateTo({
                url: '/pages/report/index',
            })
        })
    },

    // 网站诊断
    chack() {
        app.checkSession().then(() => {
            wx.navigateTo({
                url: '/pages/list/index',
            })
        })
    },

    // 推广列表
    spread() {
        app.checkSession().then(() => {
            wx.navigateTo({
                url: '/pages/spread/index',
            })
        })
    },

    // 我的需求
    need() {
        app.checkSession().then(() => {
            wx.navigateTo({
                url: '/pages/need/index',
            })
        })
    },

    // 用户协议
    agreement() {
        wx.navigateTo({
            url: '/pages/agreement/index',
        })
    },


    // 打开修改手机号弹窗
    openPopup() {
        this.setData({
            showPopup: true
        })
    },
    // 关闭修改手机号弹窗
    closePopup() {
        this.setData({
            showPopup: false
        })
    },
    // 修改手机号
    savePhoneNumber() {
        console.log(this.data.phoneNumber);
    }
})