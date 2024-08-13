// index.js
const app = getApp()
Page({
    data: {
        one: '/static/icons/report-selected.png',
        two: '/static/icons/share-unselected.png',
        oneIsActive: true,
        twoIsActive: false
    },

    one: function(e) {
        this.setData({
            one: '/static/icons/report-selected.png',
            two: '/static/icons/share-unselected.png',
            oneIsActive: true,
            twoIsActive: false
        })
    },
    two: function() {
        this.setData({
            one: '/static/icons/report-unselected.png',
            two: '/static/icons/share-selected.png',
            oneIsActive: false,
            twoIsActive: true
        })
    }
})