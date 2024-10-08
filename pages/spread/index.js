// index.js
const app = getApp()
Page({
    data: {
        showPopup: false,
        data: [],
        selectedData: {},
        count: 0
    },
    onShow() {
        app.request({
            url: '/miniapp/share/list',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data.data);
                this.setData({
                    data: res.data.data,
                    count: res.data.data.length,
                })
            }
        })
    },
    // 打开弹窗
    openPopup: function (e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            selectedData: this.data.data[index],
            showPopup: true
        })
    },
    // 关闭弹窗
    closePopup: function () {
        this.setData({
            showPopup: false
        })
    },
})