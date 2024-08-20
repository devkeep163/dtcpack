// index.js
const app = getApp()
Page({
    data: {
        list: [],
        company: '',
        url: '',
        name: '',
        phone: '',
        showPopup: false
    },
    onShow() {
        this.getNeedList()
    },

    // 我的需求
    getNeedList() {
        app.request({
            url: '/miniapp/need/list',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data);
                this.setData({
                    list: res.data.data
                })
            }
        })
    },
    // 创建需求
    create() {
        app.request({
            method: 'POST',
            url: '/miniapp/need/create',
            isLogin: true,
            isLoading: true,
            data: {
                name: this.data.name,
                company: this.data.company,
                url: this.data.url,
                phone: this.data.name
            },
            success: (res) => {
                this.getNeedList()
                wx.showToast({
                    title: res.data.msg,
                    success: () => {
                        this.setData({
                            showPopup: false
                        })
                    }
                })
            }
        })
    },

    // 打开弹窗
    openPopup() {
        this.setData({
            showPopup: true
        })
    },
    // 关闭弹窗
    closePopup() {
        this.setData({
            showPopup: false
        })
    },
})