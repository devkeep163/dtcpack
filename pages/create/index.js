// index.js
const app = getApp()
Page({
    data: {
        countries: ['美国 (us)','中国 (cn)'],
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
        wx.redirectTo({
            url: '/pages/list/index',
        })
    }
})