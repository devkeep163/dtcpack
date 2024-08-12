// index.js
const app = getApp()
Page({
    data: {
        web_src: ''
    },
    onShow() {
        app.checkSession();
        console.log(app.globalData.host + '/user/edit?a=' + Math.random());
        this.setData({
            web_src: app.globalData.host + '/user/edit?a=' + Math.random()
        })
        console.log(222);
    },
})