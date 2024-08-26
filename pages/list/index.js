// index.js
const app = getApp()
Page({
    data: {
        list: []
    },
    onShow() {
        app.request({
            url: '/miniapp/web_check_list',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                this.setData({
                    list: res.data.data.check
                })
            }
        })
    },
    create() {
        wx.redirectTo({
            url: '/pages/create/index',
        })
    },
    goToResult(e) {
        let id = e.currentTarget.dataset.id;
        let status = e.currentTarget.dataset.status;
        if(status == 1) {
            wx.navigateTo({
                url: '/pages/result/index?id=' + id,
            })
        } else {
            wx.navigateTo({
                url: '/pages/loading/index?id=' + id,
            })
        }

    }
})