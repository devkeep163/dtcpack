// index.js
const app = getApp()
Page({
    data: {
        showPopup: false,
        phoneNumber: ''
    },
    onShow() {

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