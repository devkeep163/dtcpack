const app = getApp()
Page({
    data: {
        url: ''
    },
    onLoad: function (option) {
        console.log(option);
        // const url = 'http://ranktool.winndoo.cn/miniapp/analysis/detail?id='
        const url = 'http://ranktool.winndoo.cn/user_form/analysis/'+option.id+'/'+option.user_id
        this.setData({
            url: url + option.id
        })
    },
    onShow() {
    }
});