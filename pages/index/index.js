// index.js
const app = getApp()
Page({
    data: {
        src: '',
    },
    onShow() {
        console.log('show');
        const username = wx.getStorageSync('username') || null
        if(username) {
            console.log(username);
            this.setData({
                src: app.globalData.host + '/wechat/miniapp/login?email=' + username
            })
        }
        else
        {
            this.setData({
                src: app.globalData.host
            })
        }
    }
})