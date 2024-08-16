// index.js
const app = getApp()
Page({
    data: {
        navs: ['SEO规则诊断', '引擎规范诊断', 'SEO元素诊断', '内容诊断', '社媒诊断'],
        currentIndex: 0
    },
    onLoad() {

    },
    handleTap(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
    },
    detail() {
        wx.navigateTo({
            url: '/pages/result_item_detail/index',
        })
    }
})