const app = getApp()
Page({
    data: {
        isAgreed: true,
        title: '诊断正在进行中',
        id: 0
    },
    onLoad: function (options) {
        if (options.id) {
            this.setData({
                id: options.id
            })
        }
    },
    onShow() {
        let path = ''
        if (this.data.id) {
            path = '/miniapp/web_check_result?id=' + this.data.id
        } else {
            path = '/miniapp/web_check_result'
        }
        app.request({
            url: path,
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
                    wx.redirectTo({
                        url: '/pages/result/index'
                    })
                } else {
                    this.setData({
                        title: res.data.msg
                    })
                }
            }
        })
    }
});