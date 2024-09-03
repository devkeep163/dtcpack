// index.js
const app = getApp()
Page({
    data: {
        navs: ['网站诊断', '分享案例', '网站分析'],
        navIcons: [
            '/static/icons/report-selected.png',
            '/static/icons/share-selected.png',
            '/static/icons/analysis1.png',
        ],
        navUnIcons: [
            '/static/icons/report-unselected.png',
            '/static/icons/share-unselected.png',
            '/static/icons/analysis2.png',
        ],
        isWebAnalysis: false,
        currentIndex: 0, // 导航栏目索引
        list: [],
        index: 0, // 数据列表的索引
        check: [],
        checkSet: [],
        isModalVisible: false,
        buttonTitle: '+ 新建诊断'
    },
    onLoad() {
        const role = wx.getStorageSync('role')
        if('am' == role || 'channel' == role)
        {
            this.setData({isWebAnalysis: true})
        }
        this.getWebCheckList()
    },

    handleTap(e) {
        const currentIndex = e.currentTarget.dataset.index;
        if (currentIndex == 0) {
            this.setData({
                currentIndex: currentIndex,
                buttonTitle: '+ 新建诊断'
            })
            this.getWebCheckList()
        }
        if (currentIndex == 1) {
            this.setData({
                currentIndex: currentIndex,
                list: this.data.checkSet
            })
            // this.getWebAnalysisList()
        }
        if (currentIndex == 2) {
            this.setData({
                currentIndex: currentIndex,
                buttonTitle: '+ 新建分析',
                list: this.data.checkSet
            })
            this.getWebAnalysisList()
        }
        console.log(currentIndex);
    },

    // 获取网站诊断数据
    getWebCheckList() {
        app.checkSession().then(() => {
            app.request({
                url: '/miniapp/web_check/list',
                isLoading: true,
                success: (res) => {
                    console.log(res.data.data);
                    let check = res.data.data.check
                    let checkSet = res.data.data.checkSet
                    this.setData({
                        currentIndex: 0,
                        list: check,
                        check: check,
                        checkSet: checkSet
                    })
                }
            })
        })
    },
    // 获取网站分析数据
    getWebAnalysisList() {
        app.checkSession().then(() => {
            app.request({
                url: '/miniapp/analysis/list',
                isLoading: true,
                success: (res) => {
                    console.log(res.data.data);
                    this.setData({
                        list: res.data.data
                    })
                }
            })
        })
    },

    // 查看列表详情
    goToResult(e) {
        let id = e.currentTarget.dataset.id;
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        // if (status == 1) {
        //     wx.navigateTo({
        //         url: '/pages/result/index?id=' + id,
        //     })
        // } else {
        //     wx.navigateTo({
        //         url: '/pages/loading/index?id=' + id,
        //     })
        // }

        if (this.data.currentIndex == 0 || this.data.currentIndex == 1) {
            if (status == 1) {
                wx.navigateTo({
                    url: '/pages/result/index?id=' + id,
                })
            } else {
                wx.navigateTo({
                    url: '/pages/loading/index?id=' + id,
                })
            }
        }

        if (this.data.currentIndex == 1) {
            if (status == 1) {
                console.log(this.data.list[index].base64_id, this.data.list[index].base64_user_id);
                wx.navigateTo({
                    url: '/pages/result_analysis/index?id=' + this.data.list[index].base64_id + '&user_id=' + this.data.list[index].base64_user_id,
                })
            } else {
                wx.navigateTo({
                    url: '/pages/loading/index?id=' + id,
                })
            }
        }
    },

    // 分享显示隐藏
    showShareModal(e) {
        const index = e.currentTarget.dataset.index
        this.setData({
            id: this.data.list[index].id,
            uid: this.data.list[index].user_id,
            index: index,
            isModalVisible: true
        });
    },
    hideModal() {
        this.setData({
            isModalVisible: false
        });
    },

    // 复制链接
    copyLink() {
        let data = this.data.list[this.data.index]
        let url = ''
        console.log(data.base64_id, data.base64_user_id);

        if (this.data.currentIndex == 0 || this.data.currentIndex == 1) {
            url = 'http://ranktool.winndoo.cn/user_form/check/' + data.base64_id + '/' + data.base64_user_id
        }
        if (this.data.currentIndex == 2) {
            url = 'http://ranktool.winndoo.cn/user_form/analysis/' + data.base64_id + '/' + data.base64_user_id
        }
        wx.setClipboardData({
            data: url,
            success: function (res) {
                wx.showToast({
                    title: '链接已复制',
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    },

    // 分享
    onShareAppMessage() {
        let data = this.data.list[this.data.index]
        console.log(data);

        // 网站诊断分享转发
        if (this.data.currentIndex == 0 || this.data.currentIndex == 1) {
            if (data.status == 1) {
                return {
                    path: '/pages/result/index?id=' + data.id + '&share=1',
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

        // 网站分析分享转发
        if (this.data.currentIndex == 2) {
            if (data.status == 1) {
                return {
                    path: '/pages/result_analysis/index?id=' + data.base64_id + '&user_id=' + data.base64_user_id,
                    title: data.my_url + '的分析',
                    imageUrl: '/static/icons/exc.png',
                    query: 'id=' + data.id
                }
            }
            if (data.status == 0) {
                return {
                    path: '/pages/loading/index?id=' + data.id + '&title=分析正在进行中',
                    title: data.my_url + '的分析',
                    imageUrl: '/static/icons/exc.png',
                    query: 'id=' + data.id
                }
            }
            if (data.status == 2) {
                return {
                    path: '/pages/loading/index?id=' + data.id + '&title=很遗憾，您的网站存在限制或访问异常，无法进行分析',
                    title: data.my_url + '的分析',
                    imageUrl: '/static/icons/exc.png',
                    query: 'id=' + data.id
                }
            }
        }
    },

    // 创建跳转
    create() {
        console.log(this.data.currentIndex);
        if (this.data.currentIndex == 0 || this.data.currentIndex == 1) {
            wx.redirectTo({
                url: '/pages/create/index',
            })
        }
        if (this.data.currentIndex == 2) {
            wx.redirectTo({
                url: '/pages/analysis/index',
            })
        }
    },
})