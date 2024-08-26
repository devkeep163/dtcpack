const app = getApp()
Page({
    data: {
        title: '诊断正在进行中'
    },
    onLoad: function (options) {
        console.log(options);
        if (options.id) {
            app.request({
                url: '/miniapp/web_check_result?id=' + options.id,
                success: (res) => {
                    console.log(res.data);
                    if (res.data.code == 0) {
                        wx.redirectTo({
                            url: '/pages/result/index' + options.id
                        })
                    } else {
                        this.setData({
                            title: res.data.msg
                        })
                    }
                }
            })
        }
    },
    onShow() {
        
    }
});