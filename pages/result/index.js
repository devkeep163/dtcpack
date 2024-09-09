const app = getApp()
Page({
    data: {
        isLogin: 0,
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

        // 如果登录，记录浏览历史
        const isLogin = wx.getStorageSync('isLogin') || 0
        if(isLogin) {
            app.request({
                url: '/miniapp/browse/history/create?id=' + option.id,
                success: (res) => {
                    console.log(res.data);
                }
            })

            // 记录并绑定分享人之间的关系(此处会包含自身分享，已过滤)
            app.request({
                url: '/miniapp/share/create?id=' + option.id,
                success: (res) => {
                    console.log(res.data);
                }
            })
        }
        else
        {
            // 未登录时，本地存储来自分享的诊断ID
            wx.setStorageSync('share_web_check_id', option.id)
        }

        // 是否显示登录
        this.setData({isLogin: isLogin})

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
            title: this.data.result.url + '的诊断报告',
            imageUrl: '/static/icons/exc.png',
            query: 'id=' + this.data.result.id
        }
    },
    onShareTimeline() {
        console.log('朋友圈', this.data.result);
        return {
            path: '/pages/result/index?id=' + this.data.result.id,
            title: this.data.result.url + '的诊断报告',
            imageUrl: '/static/icons/exc.png',
            query: 'id=' + this.data.result.id
        }
    }
});