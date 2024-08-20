// index.js
const app = getApp()
Page({
    data: {
        showPopup: false,
        title: '',
        itemName: '',
        itemValue: '',

        company: '',
        department: '',
        last_name: '',
        first_name: '',
        address: '',
        city: '',
        code: '',
        country: '',
    },
    onShow() {
        app.request({
            url: '/miniapp/auth/info',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                if (res.data.data.info) {
                    this.setData({
                        company: res.data.data.info.company || '',
                        department: res.data.data.info.department || '',
                        last_name: res.data.data.info.last_name || '',
                        first_name: res.data.data.info.first_name || '',
                        address: res.data.data.info.address || '',
                        city: res.data.data.info.city || '',
                        code: res.data.data.info.code || '',
                        country: res.data.data.info.country || '',
                    })
                }
            }
        })
    },
    // 保存
    save() {
        app.request({
            url: '/miniapp/auth/save',
            method: 'POST',
            isLogin: true,
            isLoading: true,
            data: this.data,
            success: (res) => {
                wx.showToast({
                    title: res.data.msg
                })
            }
        })
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