// index.js
const app = getApp()
Page({
    data: {
        navs: ['SEO规则诊断', '引擎规范诊断', 'SEO元素诊断', '内容诊断', '社媒诊断'],
        currentIndex: 0,
        models: {},
        toView: ''
    },
    onLoad(params) {
        this.setData({
            currentIndex: params.index
        })

        // 延迟1秒后滚动到第二部分
        setTimeout(() => {
            this.setData({
                toView: 'section' + params.index
            });
        }, 1000);
    },
    onShow: function () {
        app.request({
            url: '/miniapp/web_check_result',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data);
                if (res.data.code == 0) {
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
    handleTap(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
    },
    scrollToView(e) {
        const target = e.currentTarget.dataset.target;
        const index = e.currentTarget.dataset.index;
        console.log(target, index);
        this.setData({
            toView: target,
            currentIndex: index
        });
    },
    detail() {
        wx.navigateTo({
            url: '/pages/result_item_detail/index',
        })
    }
})