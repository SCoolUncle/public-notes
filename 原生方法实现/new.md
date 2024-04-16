## new 原理

**示例**

```javascript
function Person(name, age){
  this.name = name
  this.age = age
  this.work = 'play'
  return {
    otherArg: '返回值'
  }
}

Person.prototype.gender = '男'

Person.prototype.sayHi = function(){
  console.log(`hi, 我是${this.name}`)
}

const xm = new Person('xm', 32)

console.log(xm instanceof Person) // true

console.log(xm.name, xm.age, xm.work) // xm 32 play

xm.sayHi() // hi,我是xm


```

## 分析

  1. new 创建实例会返回一个新的对象
  2. 这个示例的this指向构造函数
  3. 实例的 __proto__ 指向构造函数的prototype
  4. 如果构造函数有返回值并且是个对象 实例 == 返回对象
   


## 实现

new 是一个关键字， 这里使用方法的形式来进行模拟
likeNew (构造函数， 参数)

```javascript
function likeNew(){
  // 取构造函数
  Constructor = arguments[0]
  const obj = new Object()
  obj.__proto__ = Constructor.prototype
  const res = Constructor.apply(obj,[].slice.call(arguments, 1))
  return typeof res === 'object' ? res : obj
}
```

## 验证

```javascript
function Person(name, age){
  this.name = name
  this.age = age
  this.work = 'play'
  return {
    otherArg: '返回值'
  }
}

Person.prototype.gender = '男'

Person.prototype.sayHi = function(){
  console.log(`hi, 我是${this.name}`)
}

function likeNew(){
  // 取构造函数
  Constructor = arguments[0]
  const obj = new Object()
  obj.__proto__ = Constructor.prototype
  const res = Constructor.apply(obj,[].slice.call(arguments, 1))
  return typeof res === 'object' ? res : obj
}

const xm = likeNew(Person,'xm', 32)

console.log(xm instanceof Person) // true

console.log(xm.name, xm.age, xm.work) // xm 32 play

console.log(xm.otherArg) // 返回值

xm.sayHi() // hi,我是xm
```