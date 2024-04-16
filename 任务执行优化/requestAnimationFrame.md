# requestAnimationFrame 和 requestIdleCallback 的应用

## requestIdleCallback  

事件循环空闲时调用的函数引用， 返回一个IdleDeadline对象，可以通过该对象获取当前帧剩余空闲时间


```javascript
/**
 * 获取事件循环空闲时间
 * 使用场景任务调度， 更高效的利用浏览器渲染时机
 */

const getFreeTime = () => {
  // requestIdleCallback 有一定的兼容性问题
  requestIdleCallback((idle) => {
    const {didTimeout, timeRemaining} = idle
    console.log(timeRemaining, '当前渲染帧剩余时间')
    return timeRemaining
  })

  // requestAnimationFrame 兼容性比较好, 每一帧渲染时间为 1s / 60 === 16.6 ms
  const startTime = Date.now()
  requestAnimationFrame(() => {
    const freeTime = 16.6 - (Date.now() - startTime)
    console.log(freeTime, '当前渲染帧剩余时间')
    return freeTime
  })
}
```

## requestAnimationFrame

浏览器在下次重新绘制前调用的函数

```javascript
/**
 * 示例： 点击页面按钮执行1000 次同步任务
 * 如何不阻塞页面的渲染
 * 异步方式返回一个Promise
 * 可行性分析： 
 * 微任务： 会导致渲染阻塞， 时间循环中要清空微任务队列才会执行其他
 * 宏任务（延时队列）： 不会阻塞渲染， 但不同浏览器对渲染时机处理方式不同， 会导致卡顿
 * 找到合适的时机执行任务： requestIdleCallBack | requestAnimationFrame
 */
const runTask = (task) => {
  const startTime = Date.now()
  requestAnimationFrame(() => {
    const freeTime = Date.now() - startTime
    if(freeTime < 16.6){
      task()
    }else{
      runTask(task)
    }
  })
}
```

