const app = getApp()
Page({
    data: {
        result: {},
        score: 0,
        counts: [0, 0, 0],
        models: {},
        id: 0
    },
    onLoad: function (option) {
        console.log(option);
        app.request({
            url: '/miniapp/web_check/result?id=' + option.id,
            isLoading: true,
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
                    this.setData({
                        id: option.id,
                        score: res.data.data.score,
                        counts: res.data.data.counts,
                        result: res.data.data.task,
                        models: res.data.data.models,
                    })
                } else {
                    wx.redirectTo({
                        url: '/pages/loading/index?id=' + option.id,
                    })
                }
            }
        })
    },
    onShow: function () {},
    add: function () {
        wx.navigateTo({
            url: '/pages/list/index'
        })
    },
    // SEO规则诊断
    seoRule: function (e) {
        const index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/result_item/index?index=' + index + '&id=' + this.data.id
        })
    }
});