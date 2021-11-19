import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:'',
        password:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 表单项内容发生改变的回调
    handleInput(event){
        let type = event.currentTarget.id
         this.setData({
             [type]:event.detail.value
         })
    },

    // 登录的回调
    async login(){
        // 前端验证
        let {phone , password } = this.data
        if(!phone){
            // 提示用户
            wx.showToast({
              title: '请输入手机号',
              icon:'error'
            })
            return
        }
        //正则
        let phoneReg = /^1\d{10}$/
        if(!phoneReg.test(phone)){
            wx.showToast({
                title: '手机号不合法',
                icon:'error'
              })
              return
        }
        if(!password){
            // 提示用户
            wx.showToast({
              title: '密码不能为空',
              icon:'error'
            })
            return
        }

        // 后端验证
        let result = await request('/login/cellphone',{
            phone,
            password,
            isLogin:true
        })
        if(result.code ===200){         //登录成功
            // 将用户信息存储在本地
            wx.setStorageSync('userInfo', JSON.stringify(result.profile))
            wx.showToast({
                title: '登录成功',
              })
            // 跳转个人中心
            wx.reLaunch({
              url:'/pages/personal/personal'
            })
        }else if(result.code===501){    //账号错误
            wx.showToast({
                icon:'error',
                title: result.msg,
              })
        }else if(result.code===502){    //密码错误
            wx.showToast({
                icon:'error',
                title: result.msg,
              })
        }else{
            wx.showToast({
                icon:'error',
                title: '登录失败'
              })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})