// index.js
const app = getApp()
Page({
    data: {
        showPopup: false
    },
    // 打开弹窗
    openPopup: function () {
        this.setData({
            showPopup: true
        })
    },
    // 关闭弹窗
    closePopup: function () {
        this.setData({
            showPopup: false
        })
    },
})