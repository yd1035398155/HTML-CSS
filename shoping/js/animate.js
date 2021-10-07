// obj:目标对象   target:目标位置
function animate(obj, target, callback) {
  // 一个对象同时只能存在一个定时器，每次调用前先清除定时器
  clearInterval(obj.timer)
  obj.timer = setInterval(() => {
    // 步长值写在定时器里面
    var step = (target - obj.offsetLeft) / 10
    // 不要出现小数问题，大于0向上取整，小于0向下取整
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.offsetLeft == target) {
      // 停止动画，本质是停止计时器
      clearInterval(obj.timer)
      // 执行回调函数
      if (callback) {
        callback()
      }
    }
    // 每次变化对象的距离
    obj.style.left = obj.offsetLeft + step + "px"
  }, 5)
}
