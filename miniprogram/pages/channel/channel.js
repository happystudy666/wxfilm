const app = getApp();
var QQMapWX = require('../../map/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    maskers: [],
    hasmaskers:false,
    distance:"",
    cinem: '',//当前点击的电影院
    cinemishiden:false,
    longstart:0,
    latstart:0
  },
  getlong:function(e){
    var that=this
    var lont,lat;
    console.log(e.markerId);
    for (var i = 0; i < that.data.maskers.length;i++){
      if (that.data.maskers[i].id==e.markerId){
        lat = that.data.maskers[i].latitude;
        lont = that.data.maskers[i].longitude;
        that.setData({
        cinem: that.data.maskers[i].title
         })
        }
    }
    qqmapsdk.calculateDistance({
     
      from:'', //默认当前地址
      to: `${lat},${lont}`, //终点坐标
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        that.setData({ //设置并更新distance数据
          distance: (res.elements[0].distance / 1000).toFixed(1),
          cinemishiden:true
        });
        console.log(that.data.distance)
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  clickcontrol: function (a) {
    var that=this
    console.log()
    that.setData({
      longitude: that.data.longstart,
      latitude: that.data.latstart
    })
   
    console.log(2)
    
  },
  onLoad: function() {
    qqmapsdk = new QQMapWX({
      key: 'XOCBZ-OYXWU-NYXV7-2ZB4M-CZX32-ZLBE2'
    });
  },
  onShow: function() {
    var that=this
    qqmapsdk.search({
      keyword: '电影院',
      success: function(res) {  
        var msk = [];
        for (var i = 0; i < res.data.length; i++) {
          msk.push({
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../images/map.png", //图标路径
            width: 30,
            height: 30,
            callout:{
              content: res.data[i].title,
              color: "#ff0000",
              fontSize: "10",
              borderRadius: "10",
              bgColor: "#ffffff",
              padding: "4",
              display: "ALWAYS",
              borderWidth: 1,
            }
          })
        }
       that.setData({ maskers: msk, hasmaskers:true})
      console.log(that.data.maskers)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        // console.log(res)

      }
    })
    let vm = this;
    vm.getUserLocation();
    console.log(that.data.maskers,1)
  },
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        // console.log(JSON.stringify(res));
        // console.log(res)
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude,
          latstart:latitude,
          longstart:longitude
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({cinemishiden: false})//离开页面附近的隐藏
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