// pages/person/person.js
var app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ishiden:false,
    likenumber:0,
    mvobj:[]
  },
  gotowant:function(){
    var mv=JSON.stringify(this.data.mvobj)
    wx.navigateTo({
      url: '../collection/collection?mv='+mv
    })
  },
  bingGetUserInfo:function(e){
    var that=this
    console.log(e.detail)
    if (e.detail.errMsg != "getUserInfo:ok"){
      wx.showToast({
        title: '您未授权无法登录',
      })
    }else{
      wx.cloud.callFunction({
        name: 'login',
        data: {}
      }).then(res => {
        app.openid = res.result.openid 

      }).catch(err=>{console.log(err)})
      that.setData({
        ishiden:false
      }) 
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // 获取登录信息
wx.getSetting({
  success:function(res){
    console.log(res)
    if (res.authSetting['scope.userInfo']){
        console.log("登录")
        
        that.setData({
          ishiden:false
        })
    }else{
      console.log("未登录")
      that.setData({
        ishiden:true
      })
    }
  }
})
    console.log(2)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
console.log(3)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    db.collection("moviecollect").where({
      _openid: app.openid,
    }).get().then(res => {
      that.setData({
        mvobj:res.data
      })
      console.log(res)
      var n=0;
      for (var i = 0; i < res.data.length;i++){
         if( res.data[i].like){
           n++
         }
      }
    that.setData({
      likenumber:n
    })
     }).catch(err => {
       console.log(err)
    })
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