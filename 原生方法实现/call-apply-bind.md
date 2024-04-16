# call、apply、 bind 实现

## call

**示例**

```javascript
const obj = {
   attr: 'hello'
}
function foo(param1, param2) {
  console.log(this, param1, param2)
  return {param:param1}
}

foo.call(obj, 'param1','param2') // {attr: 'hello'} param1 param2 {param: 'hello'}
foo.call(null) // Window undefined {param: 'hello'}
foo.call(undefined) // Window undefined {param: 'hello'}
```

**分析**

* 定义一个对象 obj, 向该对象中添加一个foo方法，该方法的参数是字符串param1和字符串param2。在对象obj上调用foo方法
* 当this指向为null 或者undefined 的时候 this 指向 window 对象
* 如果函数中有返回值， 执行调用call后同样会返回函数中返回值

等同于

```javascript
// 添加一个foo方法到obj对象
obj.foo = function(){
  console.log(this, param1, param2)
}
// 执行该方法
obj.foo('param1','param2')
// 删除该属性
delete foo
```

**实现**

```javascript

Function.prototype.myCall = function(context,...args){
  if(context ===  null || typeof context === undefined){
    context = window
  }
  let symbol =  Symbol() // 使用唯一的标识，防止覆盖原有属性
  context[symbol] = this
  let res = context[symbol](...args)
  delete context[symbol]
  return res
}
```

## apply

apply 与 call 类似，区别是参数传递方式不同， 多个参数情况下，它接收一个数组作为参数。

**示例1**

```javascript
const obj = {
   attr: 'hello'
}
function foo(param1, param2) {
  return {param:param1}
}

foo.apply(obj, ['param1', 'param2']) // {attr: 'hello'} param1 param2 {param: 'hello'}
foo.apply(null) // Window undefined {param: 'hello'}
foo.apply(undefined) // Window undefined {param: 'hello'}
```

**实现**

```javascript
Function.prototype.myApply = function(context,args){
  if(context ===  null || typeof context === undefined){
    context = window
  }
  let symbol =  Symbol() // 使用唯一的标识，防止覆盖原有属性
  context[symbol] = this
  let res = context[symbol](...args)
  delete context[symbol]
  return res
}
```

## bind

bind 会创建一个新函数， 当函数被调用时， bind()的的第一个参数作为运行时的this,后续的参数作为参数

1. 返回一个函数
2. 也可以传入参数
3. 如果使用new 的方式调用这个bind 返回的函数， this 指向原函数调用bind 的 this

示例

```javascript
const obj = {
   attr: 'hello'
}
function foo(param1, param2) {
  console.log(this)
  console.log(param1)
  console.log(param2)
  return {param:param1}
}

foo.bind(1)

foo.bind(obj, 'param1')() // {attr: 'hello'} param1 undefined  {param: 'param1'}

foo.bind(obj, 'param1', 'param2')()

foo.bind(obj, 'param1')('param2') // {attr: 'hello'} param1 param2  {param: 'param1'}

foo.bind(obj )('param1', 'param2') // // {attr: 'hello'} param1 param2  {param: 'param1'}

foo.bind(null)() // Window undefined {param: 'hello'}
foo.bind(undefined)() // Window undefined {param: 'hello'}
// 返回的结果可以作为构造函数使用
let returnValue = foo.bind(obj)
let instance = new returnValue() // instance instanceof returnValue == true
instance instanceof returnValue // false this指向返回值
```

根据以上示例, bind 参数会有两种方式， bind(obj, ...) bind(obj)(...)
bind 的第一个参数应该是函数的实例对象或this，后续参数应该是参数列表，

**实现**

```javascript
Function.prototype.myBind = function (context) {
  // 获取this, 此处的this谁调用就是谁
  let self = this 
  // 处理内部参数， arguments 需要转化为数组，或者使用 Array.prototype.slice.call(arguments, 1)，这里使用Array.from处理
  let args = Array.from(arguments).slice(1)

  let ƒ = function () {}
  // 此处直接使用myCall
  let fBound =  function () {
    // 如果返回的结果作为构造函数来使用
    // 这里的 arguments 指的是当前返回函数的参数
    return self.myApply(this instanceof fBound ? this : context, args.concat(Array.from(arguments) ))
  }
  // 通过 f 函数中转prototype ,防止影响到调用this 的 prototype 
  f.prototype = this.prototype
  fBound.prototype = new f()
  return fBound
}

// 写法二
Function.prototype.myBind = function (context) {
  let self = this
  let args = Array.prototype.slice.call(arguments, 1)
  return function F() {
    let args2 = Array.prototype.slice.call(arguments)
    let arrArgs = args.concat(args2)
    // 如果使用 new 方式进行调用
    if(this instanceof F ){
      return new self(...arrArgs)
    }else{
     return self.apply(context,arrArgs)
    }
  }
}
```
