/**
 * instanceof ： 作用是用来判断指定类型(构造函数)的原型是否出现在目标的原型链上
 */

const myInstanceof = (obj, type) => {
  // 获取目标的原型
  let leftProto = Object.getPrototypeOf(obj)
  // 获取指定类型的原型
  let rightPrototype = type.prototype

  let flag = leftProto === rightPrototype

  while(!flag && leftProto) {
    leftProto = Object.getPrototypeOf(leftProto)
    flag = leftProto === rightPrototype
  }

  return flag
}