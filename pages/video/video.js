import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoGroupList:[], //导航标签数据
        navId:'' ,//导航标识
        videoList:[], //视频列表数据
        videoId:'', //视频id标识
        isTriggered: false ,//标识下拉刷新是否被触发
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取导航数据
        this.getVideoGroupListData();
    },

 // 获取导航标签数据
 async getVideoGroupListData(){
    let videoGroupListData = await request ('/video/group/list');
    this.setData({
        videoGroupList:videoGroupListData.data.slice(0,14),
        navId:videoGroupListData.data[0].id
    })
    // 获取视频列表数据
    this.getVideoList(this.data.navId)
},

// 获取视频列表数据
async getVideoList(navId){
    let videoListData= await request('/video/group',{id:navId})
    // 关闭正在加载
    wx.hideLoading()

    let index = 0;
    let videoList = videoListData.datas.map(item=>{
        item.id = index++;
        return item
    })
    

    this.setData({
        videoList,
        isTriggered: false// 关闭下拉刷新
    })
},


// 点击切换导航的回调
changeNav(event){
    let navId = event.currentTarget.id
    this.setData({
        navId: navId * 1,
        videoList:[]
    })
    // 显示正在加载
    wx.showLoading({
      title: '正在加载',
    })
    //动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId)
},

// 点击播放/继续播放的回调
play(event){
    let vid = event.currentTarget.id;
    this.setData({
        videoId:vid
    })
    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid)
    this.videoContext.play();
},

// 自定义下拉刷新的回调
handlerRefresh(){
    this.getVideoList(this.data.navId)
},

// 自定义上拉触底回调
handlerScrollLower(){
    // 数据分页
    console.log('发送请求 网易暂时没有提供api');
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