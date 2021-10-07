// 1 引入expre
const { json } = require("body-parser")
const { response } = require("express")
const express = require("express")
// 2 创建应用对象
const app = express()
// 3 创建路由规则
//  request是对请求报文的封装
//  response是对响应报文的封装
app.get("/server", (request, response) => {
  // 设置响应头，设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*")
  // 设置响应
  response.send("Hello Express!")
})
// all 代表接受所有的响应 get post ....
app.all("/json-server", (request, response) => {
  // 设置响应头，设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*")
  // 响应头
  response.setHeader("Access-Control-Allow-Headers", "*")
  // 响应一个数据
  var data = {
    name: "Yang-Dong",
  }
  var str = JSON.stringify(data)
  // 设置响应
  response.send(str)
})
// 针对IE缓存
app.get("/ie", (request, response) => {
  // 设置响应头，设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*")
  // 设置响应
  response.send("Hello IE-6!")
})
//
app.get("/delay", (request, response) => {
  // 设置响应头，设置允许跨域
  response.setHeader("Access-Control-Allow-Origin", "*")
  // 设置响应
  setTimeout(() => {
    response.send("延时设置")
  }, 3000)
})
app.all("/jsonp", (require, response) => {
  var data = {
    name: "YangDong========",
  }
  var str = JSON.stringify(data)
  response.end(`handle(${str})`)
})
app.all("/username", (require, response) => {
  var data = {
    exist: 1,
    msg: "用户名已存在",
  }
  var str = JSON.stringify(data)
  response.end(`handle(${str})`)
})
app.all("/cors", (require, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.send("CORS Success!")
})

// 4 监听端口启动服务
// app.listen(2000, 3000, () => {
//     console.log("服务已启动，2000端口监听中...");
// })
app.listen(3000, () => {
  console.log("服务已启动，3000端口监听中...")
})
