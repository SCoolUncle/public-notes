/**
 * 实现一个reduce
 */
// 面试题, 转换成对象
let arr = [
  ['name','lichengjin'],
  ['age',12],
]

// 结果
function format(arr){
  return arr.reduce((accumulator,current) => {
    accumulator[current[0]] = current[1]
    return accumulator
  }, {})
}

// 用法
// accumulator 上次回调返回的值
// currentValue  当前处理的值
// reduce(callBack(accumulator, currentValue), initValue)

Array.prototype.reduce = function(cb,init) {
  // 是否有初始值, 不能直接使用init
  let hasInit  = arguments.length > 1
  let result = hasInit ? init: this[0]
  let startIndex = hasInit? 1:0

  for(let i = startIndex; i < this.length; i++){
    result = cb(result, this[i])
  }

  return result
}