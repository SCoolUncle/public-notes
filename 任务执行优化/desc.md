## requestAnimationFrame 函数
#### 执行时机
requestAnimationFrame()方法告诉浏览器在下一次重绘之前调用指定的函数来更新动画。该方法将回调作为要在重绘之前调用的参数。

requestAnimationFrame(() => {})

浏览器会每秒刷新60次， 该函数执行时机就是在每次刷新之后下次刷新之前执行传入的回调