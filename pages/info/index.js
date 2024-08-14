// index.js
const app = getApp()
Page({
    data: {
        showPopup: false,
        title: '',
        itemName: '',
        itemValue: '',
        company: '腾讯科技有限公司',
        category: 'IT技术支持',
        surname: '李',
        name: '大狗',
        address: '广东省深圳市吴江区通天大道15号2幢1002室',
        city: '深圳',
        state: '中国',
    },
    onShow() {

    },

    // 我的报告
    repot: function () {
        wx.redirectTo({
            url: '/pages/report/index',
        })
    },


    // 打开弹窗
    openPopup: function (e) {
        const title = e.currentTarget.dataset.title;
        const name = e.currentTarget.dataset.name;
        this.setData({
            title: title,
            itemName: name,
            itemValue: this.data[name],
            showPopup: true
        })
        console.log(this.data.title, this.data.itemName);
    },
    // 关闭弹窗
    closePopup: function () {
        this.setData({
            showPopup: false
        })
    },
    // 确定
    confirm: function () {
        this.setData({
            [this.data.itemName]: this.data.itemValue,
            showPopup: false
        })
    }
})