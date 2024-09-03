const app = getApp()
Page({
    data: {
        result: {},
        errors: [],
        model_score: [],
        score: 0,
        counts: [0, 0, 0],
        models: {},
        id: 0
    },
    onLoad: function (option) {
        console.log(option);
        // 显示分享
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })

        // 记录浏览历史
        app.checkSession().then(() => {
            app.request({
                url: '/miniapp/browse/history/create?id=' + option.id,
                success: (res) => {
                    console.log(res.data);
                }
            })
        })

        // 获取报告结果
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
                        errors: res.data.data.errors,
                        model_score: res.data.data.model_score,
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: res.data.msg,
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
    },

    // 分享
    onShareAppMessage() {
        console.log('微信好友', this.data.result);
        return {
            path: '/pages/result/index?id=' + this.data.result.id,
            title: this.data.result.url + '的诊断',
            imageUrl: '/static/icons/exc.png',
            query: 'id=' + this.data.result.id
        }
    },
    onShareTimeline() {
        console.log('朋友圈', this.data.result);
        return {
            path: '/pages/result/index?id=' + this.data.result.id,
            title: this.data.result.url + '的诊断',
            imageUrl: '/static/icons/exc.png',
            query: 'id=' + this.data.result.id
        }
    }
});