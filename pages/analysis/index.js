// index.js
const app = getApp()
Page({
    data: {
        my_url: '',
        other_url: '',
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

    // 创建
    create: function () {
        console.log(this.data.url);
        app.request({
            url: '/miniapp/analysis/create',
            isLogin: true,
            isLoading: true,
            data: {
                country: this.data.countries[this.data.countryIndex],
                my_url: this.data.my_url,
                other_url: this.data.other_url
            },
            success: (res) => {
                if (res.data.code == 0) {
                    wx.redirectTo({
                        url: '/pages/loading/index?title=' + '分析正在进行中'
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