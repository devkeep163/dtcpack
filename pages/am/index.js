// index.js
const app = getApp()
Page({
    data: {
        user: {},
        showPopup: false,
        phoneNumber: ''
    },
    onShow() {
        app.request({
            url: '/miniapp/auth/info',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data.data);
                this.setData({
                    user: res.data.data.user
                })
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

    // 我的需求
    need() {
        wx.navigateTo({
            url: '/pages/need/index',
        })
    },

    // 推广列表
    spread() {
        wx.navigateTo({
            url: '/pages/spread/index',
        })
    },

    // 用户协议
    agreement() {
        wx.navigateTo({
            url: '/pages/agreement/index',
        })
    },


    // 打开修改手机号弹窗
    openPopup: function () {
        this.setData({
            showPopup: true
        })
    },
    // 关闭修改手机号弹窗
    closePopup: function () {
        this.setData({
            showPopup: false
        })
    },
    // 修改手机号
    savePhoneNumber: function () {
        console.log(this.data.phoneNumber);
    }
})