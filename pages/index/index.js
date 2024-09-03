// index.js
const app = getApp()
Page({
    data: {
        isWebCheck: 0,
        webCheckId: 0,
        status: 0,
        isLogin: 1,
        url: '',
        countries: ['美国 (us)', '中国 (cn)'],
        countryIndex: 0,
        languages: ['英语 (en)', '中文 (zh)'],
        languageIndex: 0
    },
    onLoad() {
        wx.request({
            url: app.globalData.host + '/miniapp/languages',
            method: 'GET',
            success: (res) => {
                console.log(res.data);
                this.setData({
                    countries: res.data.data.countrys,
                    languages: res.data.data.languages
                });
            },
            fail(err) {
                console.log(err);
                wx.showToast({
                    title: '网络异常，请检查',
                })
            }
        })
    },
    onShow() {
        this.refreshData()
    },
    refreshData() {
        const isLogin = wx.getStorageSync('isLogin') || 0
        console.log(isLogin);
        if (isLogin) {
            app.request({
                url: '/miniapp/web_check/recent',
                success: (res) => {
                    if (res.data.code == 0) {
                        const exists = res.data.data.exists
                        this.setData({
                            isLogin: isLogin,
                            isWebCheck: exists ? 1 : 0,
                            WebCheckStatus: exists ? exists.status : 0,
                            webCheckId: exists ? exists.id : 0,
                        })
                    }
                }
            })
        } else {
            this.setData({
                isLogin: isLogin,
                isWebCheck: 0,
                webCheckId: 0
            })
        }
    },
    bindCountryChange: function (e) {
        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindLanguageChange: function (e) {
        this.setData({
            languageIndex: e.detail.value
        })
    },

    // 登录
    goToLogin(e) {
        if (e.detail.code) {
            app.getPhone(e.detail.code).then(() => {
                this.refreshData()
                wx.showToast({
                    icon: 'none',
                    title: '登录成功',
                })
            })
        }
    },

    // 开始诊断
    startDiagnosis() {
        app.checkSession().then(() => {
            app.request({
                url: '/miniapp/web_check/create',
                isLoading: true,
                data: {
                    my_url: this.data.url,
                    country: this.data.countries[this.data.countryIndex],
                    language: this.data.languages[this.data.languageIndex]
                },
                success: (res) => {
                    if (res.data.code == 0) {
                        wx.navigateTo({
                            url: '/pages/loading/index?id=' + res.data.data.id
                        })
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: res.data.msg,
                        })
                    }
                }
            })
        })
    },

    // 查看已有诊断
    readAlreadyDiagnosis() {
        console.log(this.data.WebCheckStatus);
        app.checkSession().then(() => {
            if (this.data.WebCheckStatus == 0) {
                wx.navigateTo({
                    url: '/pages/loading/index?id=' + this.data.webCheckId
                })
            }

            if (this.data.WebCheckStatus == 1) {
                wx.navigateTo({
                    url: '/pages/result/index?id=' + this.data.webCheckId
                })
            }
        })
    },

    // 查询最近诊断记录
    goToList() {
        app.checkSession().then(() => {
            wx.navigateTo({
                url: '/pages/list/index'
            })
        })
    }
})