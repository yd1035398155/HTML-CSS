window.addEventListener("load", function () {
    // alert("OK");
    // 1.获取元素
    var ar_l = document.querySelector(".arrow-l");
    var ar_r = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");
    var ol = document.querySelector(".circle");
    // focus的宽度
    var focusWidth = focus.offsetWidth;
    // num控制图片滚动
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;
    // 2.鼠标经过，显示按钮
    focus.addEventListener("mouseenter", function () {
        ar_l.style.display = "block";
        ar_r.style.display = "block";
    })
    focus.addEventListener("mouseleave", function () {
        ar_l.style.display = "none";
        ar_r.style.display = "none";
    })
    // 3.动态生成小圆圈，几张图片生成几张
    var ul = focus.querySelector("ul");
    for (var i = 0; i < ul.children.length; i++) {
        // creat li
        var li = document.createElement("li");
        // 设置li的索引值
        li.setAttribute("index", i);
        // insert li
        ol.appendChild(li);
        // 4.小圆圈排他思想，生成小圆圈的同时为它添加事件
        li.addEventListener("click", function () {
            // 将其他小圆圈的类型清空
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            // 将类名赋予现在的对象
            this.className = "current";

            // 5.点击小圆圈，移动图片，当然移动的是ul
            // ul的移动距离 小圆圈索引值 乘以 图片宽度  注意是负值   
            // 点击li，就获取li的索引值 
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute("index");
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })

    }
    ol.children[0].className = "current";
    // // 6.点击左右按钮，切换图片
    // *********Author :Yang Dong 2021/4/27/ 21.49***************
    // ar_l.addEventListener("click", function () {
    //     // 让小圆点更新
    //     for (var i = 0; i < ol.children.length; i++) {
    //         ol.children[i].className = "";
    //     }
    //     // 获取当前ul的偏移值
    //     var offset = ul.offsetLeft;
    //     var focusWidth = focus.offsetWidth;
    //     // 点下向左，减去宽度
    //     if (offset == 0) {
    //         // 在ul在最左侧点击左键时，返回最右侧ul
    //         animate(ul, -(ul.children.length - 1) * focusWidth);
    //         ol.children[ol.children.length - 1].className = "current";
    //     } else {
    //         //小圆点更新
    //         animate(ul, offset + focusWidth);
    //         ol.children[(-offset / focusWidth) - 1].className = "current";
    //     }

    // })
    // ar_r.addEventListener("click", function () {
    //     for (var i = 0; i < ol.children.length; i++) {
    //         ol.children[i].className = "";
    //     }
    //     // 获取当前ul的偏移值
    //     var offset = ul.offsetLeft;
    //     var focusWidth = focus.offsetWidth;
    //     // 点下向左，减去宽度
    //     if (offset == -(ul.children.length - 1) * focusWidth) {
    //         animate(ul, 0);
    //         ol.children[0].className = "current";
    //     } else {
    //         animate(ul, offset - focusWidth);
    //         ol.children[(-offset / focusWidth) + 1].className = "current";
    //     }

    // })

    // 6.克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮，图片滚动一张
    ar_r.addEventListener("click", function () {
        // 如果走到了复制的最后一张图片，此时我们的ul要快速的恢复left为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth);
        //如果走到最后的图片，则归零 
        circle = ++circle % ol.children.length;
        // 调用函数
        circleChange();

    })
    // 8.点击左侧按钮，图片滚动一张
    ar_l.addEventListener("click", function () {
        // 如果走到了复制的最后一张图片，此时我们的ul要快速的恢复left为0
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + "px";

        }
        num--;
        animate(ul, -num * focusWidth);
        //如果走到最后的图片，则归零 
        circle--;
        // if (circle < 0) {
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        // 调用函数
        circleChange();

    })

    function circleChange() {
        // 先清除所有小圆圈
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        // 在更新当前小圆圈
        ol.children[circle].className = "current";
    }
    var timer = setInterval(function () {
        ar_r.click();
    }, 2000);

})