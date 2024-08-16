// index.js
const app = getApp()
Page({
    data: {
        
    },
    create: function () {
        wx.redirectTo({
            url: '/pages/create/index',
        })
    }
})