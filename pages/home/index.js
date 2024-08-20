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
        console.log(wx.getStorageSync('role'));
        this.setData({
            role: wx.getStorageSync('role')
        })
        app.request({
            url: '/miniapp/auth/info',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data.data);
                this.setData({
                    user: res.data.data.user,
                    statistics: res.data.data.statistics
                })
            }
        })
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
                    wx.switchTab({
                        url: '/pages/one/index',
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
        wx.navigateTo({
            url: '/pages/report/index',
        })
    },

    // 推广列表
    spread() {
        wx.navigateTo({
            url: '/pages/spread/index',
        })
    },

    // 我的需求
    need() {
        wx.navigateTo({
            url: '/pages/need/index',
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