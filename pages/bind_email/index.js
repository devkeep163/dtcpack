const app = getApp()
Page({
    data: {
        email: "",
        code: ""
    },
    sendEmailCode: function() {
        app.sendEmailCode(this.data.email)
    },
    // 发送邮件
    bind: function () {
        if(!this.data.email || !this.data.code) {
            app.toast('邮箱或验证码不能为空')
            return;
        }
        app.request({
            url: '/miniapp/email/bind',
            method: 'POST',
            isLoading: true,
            data: {
                email: this.data.email,
                code: this.data.code
            },
            success: (res) => {
                console.log(res.data);
                if(res.data.code == 0)
                {
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
                else
                {
                    app.toast(res.data.msg)
                }
            }
        });
    },
    // 暂不绑定
    skipBinding() {
        wx.switchTab({
            url: '/pages/index/index'
        })
    }
});