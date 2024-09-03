// index.js
const app = getApp()
Page({
    data: {
        list: [],
        index: 0,
        isModalVisible: false
    },
    onShow() {
        app.request({
            url: '/miniapp/web_check/list',
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
        if (status == 1) {
            wx.navigateTo({
                url: '/pages/result/index?id=' + id,
            })
        } else {
            wx.navigateTo({
                url: '/pages/loading/index?id=' + id,
            })
        }
    },

    // 分享显示
    showShareModal(e) {
        this.setData({
            index: e.currentTarget.dataset.index,
            isModalVisible: true
        });
    },

    // 隐藏
    hideModal() {
        this.setData({
            isModalVisible: false
        });
    },

    // 复制链接
    copyLink() {
        let data = this.data.list[this.data.index]
        console.log(data.base64_id, data.base64_user_id);
        wx.setClipboardData({
            data: 'http://ranktool.winndoo.cn/user_form/' + data.base64_id + '/' + data.base64_user_id,
            success: function (res) {
                wx.showToast({
                    title: '链接已复制',
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    },

    onShareAppMessage() {
        let data = this.data.list[this.data.index]
        console.log(data);
        if (data.status == 1) {
            return {
                path: '/pages/result/index?id=' + data.id,
                title: data.url + '的诊断',
                imageUrl: '/static/icons/exc.png',
                query: 'id=' + data.id
            }
        }
        if (data.status == 0) {
            return {
                path: '/pages/loading/index?id=' + data.id + '&title=诊断正在进行中',
                title: data.url + '的诊断',
                imageUrl: '/static/icons/exc.png',
                query: 'id=' + data.id
            }
        }
        if (data.status == 2) {
            return {
                path: '/pages/loading/index?id=' + data.id + '&title=很遗憾，您的网站存在限制或访问异常，无法进行诊断',
                title: data.url + '的诊断',
                imageUrl: '/static/icons/exc.png',
                query: 'id=' + data.id
            }
        }
    }
})