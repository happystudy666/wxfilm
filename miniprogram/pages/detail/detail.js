// pages/detail/detail.js
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmdetail: {},
    isclose: false,
    closetext: "展开",
    a: 0,
    like: false,
    likenum: 0,
    movieid: 0,
    cloudid: 0,
    content: '',
    score: 10,
    title:"",
  },
  onChangeScore: function(e) {
    this.setData({
      score: (e.detail) * 2
    })
    console.log(this.data.score)
  },
  onContentChange: function(e) {
    console.log(e.detail);
    this.setData({
      content: e.detail
    })
  },
  bingGetUserInfo: function(e) {
    var that = this
    console.log(e)
    if (e.detail.errMsg != "getUserInfo:ok") {
      wx.showToast({
        title: '您未授权',
        image: '../../images/error.png',
        mask: "true",
        duration: 1000
      })
      return
    } else {
      console.log(e.detail)
      wx.cloud.callFunction({
        name: 'login',
        data: {}
      }).then(res => {
        console.log(res)
        app.openid = res.result.openid
        db.collection("moviecollect").where({
          _openid: app.openid,
          movieid: this.data.movieid
        }).get().then(res => {
          console.log(res)
          if (res.data.length == 0) {
            db.collection("moviecollect").add({
              data: {
                movieid: that.data.movieid,
                like: !that.data.like,
                title:that.data.title
              }
            }).then(res => {
              console.log(res);
              wx.showToast({
                title: "加入想看成功",
                duration: 1000,
                icon: "sucess",
                mask: true
              })
            }).catch(err => {
              console.log(err);
            })
          } else {
            console.log(res.data[0]._id)
            that.setData({
              cloudid: res.data[0]._id,
              like: !res.data[0].like
            })
            console.log(that.data.like,that.data.cloudid, '设置了')
            console.log(that.data.like, that.data.likenum)
            wx.showToast({
              title: that.data.like ? "想看" : "不想看了",
              duration: 1000,
              icon: "sucess",
              mask: true
            })
            console.log(that.cloudid)
    db.collection("moviecollect").doc(that.data.cloudid).update({
              data: {
                like: that.data.like,
              }
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  closebtn: function() {
    this.data.a++
      if (this.data.a % 2 != 0) {
        this.setData({
          isclose: true,
          closetext: '收起'
        })
      } else {
        this.setData({
          isclose: false,
          closetext: '展开'
        })
      }
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.like)
    console.log(options.movieid)
    this.setData({
      movieid: options.movieid
    })
    wx.cloud.callFunction({
      name: 'getDetails',
      data: {
        movieid: options.movieid
      }
    }).then(res => {
      var obj = JSON.parse(res.result)
      this.setData({
        filmdetail: obj,
        title:obj.title
      })
      wx.hideLoading()
      console.log(this.data.filmdetail)
      this.data.ishidden = false;
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})