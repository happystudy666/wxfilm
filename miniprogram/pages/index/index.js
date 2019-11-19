// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serachcontent: [],
    comingfilm:[],
    autoplay:true,
    interval: 3000,
    duration: 1000,
    searchfilm:"",
    hotfilm:[],
    movieid:0,
    nodes: [{
      name: 'h4',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px;'
      },
      children: [{
        type: 'text',
        text: '本周口碑榜'
      }]
    }],
    more:[{
      name: 'h6',
      attrs: {
        style: 'line-height: 60px;color:green'
      },
      children: [{
        type: 'text',
        text: '查看更多 >'
      }]
    }]
  }, 
  learnhot:function(){
    wx.navigateTo({
      url: '../hot/hot',
    })
  },
  // // 搜索电影
 onSearchfilm:function(e){
     console.log(e.detail)
   wx.request({
     url: `http://v.juhe.cn/movie/index?title=${e.detail}&smode=0&pagesize=7&offset=&dtype=&key=6225a24fd3fac991b8042f33e71a2c52`,
     method: 'GET',
       header: {
     "Content-Type": "application/xml"
    },
      data: {
        
      },
       success: res => {
        console.log(res)
        this.setData({ serachcontent: res.data.result})
      },
       fail: () => { },
     });
},
  getnewfilm:function(e){
    console.log(e.target)
    var mydetailid = e.target.dataset.mid
    console.log(mydetailid)
    wx.navigateTo({
      url: '../detail/detail?movieid=' + mydetailid,
    })
  },
  getdetail:function(e){
    console.log(e.target)
    var  mydetailid=e.target.dataset.mid
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
  name:'newOFfilm',
  data:{
    start:0,
    count:5
  }
}).then(res => { 
var re =JSON.parse(res.result)
console.log(re.subjects)
this.setData({
  comingfilm:re.subjects
})
console.log(this.data.comingfilm[0].id)
})
.catch(err=>{console.log(err)})
    // wx.request({
    //   url: 'https://douban.uieee.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a',
    //   method: 'GET',
    //   header: {
    //     "Content-Type": "application/xml"
    //   },
    //   data: {
    //          },
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: () => { },
    //   complete: () => { }
    // });
    wx.cloud.callFunction({
      name:'hotfilm',
      data:{
      }
    }).then(res=>{
      console.log(res);
      var obj =JSON.parse(res.result)
      this.setData({
        hotfilm:obj.subjects.slice(0,6)
      })
      console.log(this.data.hotfilm[0])
    })
    .catch(err=>{console.log(err)})
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