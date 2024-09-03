// index.js
const app = getApp()
Page({
    data: {
        scrollLeft: 0,
        navs: ['SEO规则诊断', '引擎规范诊断', 'SEO元素诊断', '内容诊断', '社媒诊断'],
        currentIndex: 0,
        models: {},
        toView: '',
        currentItem: null
    },
    onLoad(option) {

        this.setData({
            currentIndex: option.index
        })

        app.request({
            url: '/miniapp/web_check/result?id=' + option.id,
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

        // 延迟1秒后滚动到第二部分
        setTimeout(() => {
            this.setData({
                toView: 'section' + option.index
            });
        }, 1000);
    },
    onShow: function () {},
    handleTap(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
    },
    scrollToView(e) {
        const target = e.currentTarget.dataset.target;
        const index = e.currentTarget.dataset.index;
        let scrollLeft = 0
        if(index < 2) {
            scrollLeft = 0
        } else {
            scrollLeft = 1000
        }
        this.setData({
            scrollLeft: scrollLeft,
            toView: target,
            currentIndex: index
        });
    },
    detail() {
        wx.navigateTo({
            url: '/pages/result_item_detail/index',
        })
    },

    // 触发滚动到指定位置
    // scrollToPosition(itemId) {
    //     this.setData({
    //         toView: itemId
    //     });
    // },

    // 监听滚动事件
    onScroll(event) {
        const query = this.createSelectorQuery();
        query.selectAll('.header-container').boundingClientRect((rects) => {
            // console.log(rects);
            for (let index = 0; index < rects.length; index++) {
                const element = rects[index];
                if(element.top > 0 && element.top < 100) {
                    console.log(element.id, this.data.toView);
                    let i = parseInt(element.id.replace("section", ""))

                    // 导航栏滚动条移动到指定位置
                    let scrollLeft = 0
                    if(i < 2) {
                        scrollLeft = 0
                    } else {
                        scrollLeft = 1000
                    }

                    // 导航栏选中标签
                    if(i != this.data.currentIndex)
                    {
                        this.setData({
                            // toView: element.id,
                            scrollLeft: scrollLeft,
                            currentIndex: parseInt(element.id.replace("section", ""))
                        });
                    }
                    break;
                }
            }
        }).exec();
    }
})