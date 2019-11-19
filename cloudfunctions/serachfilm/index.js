// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require("request-promise")
// 云函数入口函数
exports.main = async (event, context) => {
  return rp(`http://v.juhe.cn/movie/index?title=${event.bt}&smode=0&pagesize=5&offset=&dtype=&key=6225a24fd3fac991b8042f33e71a2c52`).then(res => {
    console.log(res);
    return res
  }).catch((err) => {
    console.log(err)
  })
}