/**
 * 深度copy
 * 考虑各种类型
 */
// 获取值类型
function getType(target) {
  return Object.prototype.toString.call(target).replace(new RegExp(/\[|\]|object /g), "")
}
// 常规， Object, Array, Function 直接返回原函数： 这个需要保留上下文环境
// 特殊值类型, 批量处理，这些类型重新创建就ok了
const reference = ['Map', 'WeakMap', 'Set', 'WeakSet', 'Date', 'RegExp', 'Error']
function copyDeep(target, hash = new WeakMap()){

  //拷贝对象或者数组需要解决循环引用的问题
  if(hash.has(target)) hash.get(target)
  
  const type = getType(target)

  const result = null

  if(type === 'Object'){
    // 考虑循环引用
    result = {}
    hash.set(target, result)
    for(key in Object.keys(target)){
      if(Object.hasOwnProperty.call(target, key)){
        result[key] = copyDeep(target[key])
      }
    }
  }else if(type === 'Array'){
    result = []
    hash.set(target, result)
    for(value of target){
      result.push(copyDeep(value))
    }
  }else if(reference.includes(type)){
    result = new target.constructor(target)
  }else{
    return target
  }
  return result
}

