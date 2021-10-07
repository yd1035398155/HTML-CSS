// window.addEventListener("load", () => {
//   console.log(this)
// })
window.onload = () => {
  // 1.获取对象
  var arrow_l = document.querySelector(".arrow-l")
  var arrow_r = document.querySelector(".arrow-r")
  var focus = document.querySelector(".focus")
  var focusWidth = focus.offsetWidth
  // 控制左右箭头
  var num = 0
  // 控制小圆点
  var circle = 0
  // 2.鼠标进入则显示左右箭头
  focus.addEventListener("mouseenter", () => {
    arrow_l.style.display = "block"
    arrow_r.style.display = "block"
    clearInterval(timer)
    timer = null
  })
  // 3.鼠标离开则隐藏鼠标箭头
  focus.addEventListener("mouseleave", () => {
    arrow_l.style.display = "none"
    arrow_r.style.display = "none"
    timer = setInterval(() => {
      arrow_r.click()
    }, 2000)
  })
  // 4.动态创建小圆点
  var OL = focus.querySelector(".circle")
  var UL = focus.querySelector("ul")
  for (let i = 0; i < UL.children.length; i++) {
    var li = document.createElement("li")
    li.setAttribute("index", i)
    OL.appendChild(li)
    // 5.小圆圈排他思想,干掉其他人,留下我自己
    li.addEventListener("click", function () {
      for (let i = 0; i < OL.children.length; i++) {
        OL.children[i].className = ""
      }
      this.className = "current"
      var index = this.getAttribute("index")
      // 更新视图
      num = index
      // 更新小圆圈
      circle = index
      var target = index * focusWidth
      animate(UL, -target)
    })
  }
  // 6.克隆第一张图片
  var first = UL.children[0].cloneNode(true)
  UL.appendChild(first)
  // 7.初始化第一个小圆圈
  OL.children[0].className = "current"
  //8.点击左右箭头进行切换
  arrow_l.addEventListener("click", function () {
    if (num == 0) {
      UL.style.left = -focusWidth * (UL.children.length - 1) + "px"
      num = UL.children.length - 1
    }
    num--
    animate(UL, -num * focusWidth)
    circle--
    if (circle == -1) {
      circle = OL.children.length - 1
    }
    for (let i = 0; i < OL.children.length; i++) {
      OL.children[i].className = ""
    }
    OL.children[circle].className = "current"
  })
  arrow_r.addEventListener("click", function () {
    if (num == UL.children.length - 1) {
      UL.style.left = 0
      num = 0
    }
    num++
    animate(UL, -num * focusWidth)
    circle++
    if (circle == OL.children.length) circle = 0
    for (let i = 0; i < OL.children.length; i++) {
      OL.children[i].className = ""
    }
    OL.children[circle].className = "current"
  })
  var timer = setInterval(() => {
    arrow_r.click()
  }, 2000)
}
