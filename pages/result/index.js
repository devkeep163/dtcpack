const app = getApp()
Page({
    data: {
        result: {},
        score: 0,
        counts: [0,0,0],
        models: {}
    },
    onLoad: function () {
        // 页面加载时的逻辑
    },
    onShow: function() {
        app.request({
            url: '/miniapp/web_check_result',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data);
                if(res.data.code == 0)
                {
                    this.setData({
                        score: res.data.data.score,
                        counts: res.data.data.counts,
                        result: res.data.data.task,
                        models: res.data.data.models,
                    })
                }
            }
        })
    },
    add: function () {
        wx.navigateTo({
            url: '/pages/list/index'
        })
    },
    // SEO规则诊断
    seoRule: function(e) {
        const index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/result_item/index?index=' + index
        })
    }
});