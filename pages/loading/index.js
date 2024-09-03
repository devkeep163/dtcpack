const app = getApp()
Page({
    data: {
        title: '诊断正在进行中'
    },
    onLoad: function (option) {
        console.log(option);
        if(option.title) {
            this.setData({
                title: option.title
            })
            return;
        }
        // if (option.id) {
        //     app.request({
        //         url: '/miniapp/web_check/result?id=' + option.id,
        //         success: (res) => {
        //             console.log(res.data);
        //             if (res.data.code == 0) {
        //                 wx.redirectTo({
        //                     url: '/pages/result/index' + option.id
        //                 })
        //             } else {
        //                 this.setData({
        //                     title: res.data.msg
        //                 })
        //             }
        //         }
        //     })
        // }
    },
    onShow() {
        
    }
});