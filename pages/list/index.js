// index.js
const app = getApp()
Page({
    data: {
        list: []
    },
    onShow() {
        app.request({
            url: '/miniapp/web_check_list',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                this.setData({
                    list: res.data.data.check
                })
            }
        })
    },
    create: function () {
        wx.redirectTo({
            url: '/pages/create/index',
        })
    }
})