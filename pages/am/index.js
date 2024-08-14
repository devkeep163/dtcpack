// index.js
const app = getApp()
Page({
    data: {
        showPopup: false,
        phoneNumber: ''
    },
    onShow() {

    },

    // 我的报告
    repot: function () {
        wx.redirectTo({
            url: '/pages/report/index',
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