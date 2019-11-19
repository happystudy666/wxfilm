// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require("request-promise")
// 云函数入口函数
exports.main = async () => {
  return rp(`https://douban.uieee.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a`).then(res => {
    console.log(res);
    return res
  }).catch((err) => {
    console.log(err)
  })
}