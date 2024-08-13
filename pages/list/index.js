// index.js
const app = getApp()
Page({
    data: {
        countries: ['美国 (us)', '中国 (cn)', '日本 (jp)'],
        countryIndex: 0,
        languages: ['英语 (en)', '中文 (zh)', '日语 (ja)'],
        languageIndex: 0
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

    startDiagnosis: function () {
        // 实现诊断逻辑
        wx.showToast({
            title: '开始诊断',
            icon: 'success'
        })
    }
})