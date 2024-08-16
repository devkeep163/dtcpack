// index.js
const app = getApp()
Page({
    data: {
        navs: ['网站诊断', '分享案例'],
        navIcons: [
            '/static/icons/report-selected.png',
            '/static/icons/share-selected.png'
        ],
        navUnIcons: [
            '/static/icons/report-unselected.png',
            '/static/icons/share-unselected.png'
        ],
        currentIndex: 0,
    },

    handleTap(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });
    }
})