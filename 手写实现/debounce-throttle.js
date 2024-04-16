/**
 * 函数防抖
 * 指定时间内执行一次回调，如果指定时间内再次触发则重新进行计时
 */
function debounce (fn, delay){
  let timer = null
  return function (...args){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 函数节流
 * 指定时间内只会执行一次回调
 */
function throttle(fn, delay){
  let timer = null
  return function (...args){
    if(timer) return
    timer = setTimeout(() => {
      fn.apply(this,args)
      timer = null
    },delay)
  }
}