// pages/hot/hot.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotfilm:[]
  },
  getdetail: function (e) {
    console.log(e.target)
    var mydetailid = e.target.dataset.mid
    console.log(mydetailid)
    wx.navigateTo({
      url: '../detail/detail?movieid=' + mydetailid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'hotfilm',
      data: {
      }
    }).then(res => {
      console.log(res);
      var obj = JSON.parse(res.result)
      this.setData({
        hotfilm: obj.subjects
      })
      console.log(this.data.hotfilm[0])
      console.log(app.openid)
    })
      .catch(err => { console.log(err) })
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