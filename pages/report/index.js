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
        list: [],
        check: [],
        checkSet: [],
        isModalVisible: false
    },

    onShow() {
        this.getWebCheckList()
    },

    handleTap(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: index
        });

        if (index == 0) {
            // this.getWebCheckList()
            this.setData({
                list: this.data.check
            })
        }

        if (index == 1) {
            // this.getWebCheckList()
            this.setData({
                list: this.data.checkSet
            })
        }
    },

    // 网站诊断
    getWebCheckList() {
        app.request({
            url: '/miniapp/web_check_list',
            isLogin: true,
            isLoading: true,
            success: (res) => {
                console.log(res.data.data);
                let check = res.data.data.check
                let checkSet = res.data.data.checkSet
                this.setData({
                    list: check,
                    check: check,
                    checkSet: checkSet
                })
            }
        })
    },

    // 分享案例
    getWebShareList() {

    },

    // 分享显示
    showShareModal() {
        this.setData({
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

    },

    onShareAppMessage() {
        console.log(22);
    }
})