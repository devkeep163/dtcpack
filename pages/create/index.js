// index.js
const app = getApp()
Page({
    data: {
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

    // 开始诊断
    startDiagnosis: function () {
        console.log(this.data.url);
        app.request({
            url: '/miniapp/web_check/create',
            isLogin: true,
            isLoading: true,
            data: {
                my_url: this.data.url,
                country: this.data.countries[this.data.countryIndex],
                language: this.data.languages[this.data.languageIndex]
            },
            success: (res) => {
                if (res.data.code == 0) {
                    wx.redirectTo({
                        url: '/pages/loading/index'
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: res.data.msg,
                    })
                }
            }
        })
    }
})