// const {
//     response
// } = require("express");
var express = require("express")
var app = express()
app.get("/home", (request, response) => {
  response.sendFile(__dirname + "/index.html")
})
app.get("/data", (request, response) => {
  response.send("User Data")
})
app.listen(8000, () => {
  console.log("服务已启动，端口8000监听中...")
})
