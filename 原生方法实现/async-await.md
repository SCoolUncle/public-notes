# async await

## generator 介绍

**示例**

```javascript

  function *gen(){
    yield 1
    yield 2
    yield 3
    return 4
  }

  let gg = gen()

  console.log(g)
  console.log(g.next()) // {value: 1, done: false}
  console.log(g.next()) // {value: 2, done: false}
  console.log(g.next()) // {value: 3, done: false}
  console.log(g.next()) // {value: 4, done: false}
  console.log(g.next()) // {undefined: 1, done: true}

```
**示例2**


```javascript

function *gen(){
  let res = yield 1
  console.log(res + 'hhh')
  let res2 = yield 2
  console.log(res + '1111')
  console.log(res2 + '222')
  let res3 = yield 3
  console.log(res3)
  return 4
}

let g = gen()

console.log(g)
console.log(g.next(111)) 
console.log(g.next(222)) 
console.log(g.next(333))
console.log(g.next(444))
console.log(g.next(555))

```

由以这个例子可以看出， 当第一次执行next() 方法之后， 会执行完第一个 yield 后暂停执行， 此时第一个res是没有赋值的， 所以此时res是undefined。 第二次执行next()并且传递一个参数， 会继续往下执行第二个yield， 此时第一个console.log() 会被执行，**此时调用 next() 方法时传递的参数会作为上一个 yield 表达式的返回值， 于是res 被赋值为 111**

**示例3**

```javascript

function fn(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num), 1000)
  })
}

function *gen(){
  yield fn(1)
  yield fn(2)
  yield fn(3)
}

let gg = gen()

console.log(g)  
console.log(g.next()) // {value: Promise, done: false}
console.log(g.next()) // {value: Promise, done: false}
console.log(g.next()) // {value: Promise, done: false}
console.log(g.next()) // {undefined: 1, done: true}

```

##async await 实现

实现方式： HOC -> 高阶函数的方式模拟（高阶函数指的是，参数为函数返回值也是函数的函数）


```js
function fn(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num), 1000)
  })
}
// 验证async await 作用， 该函数需要等待前两个执行完后，也就是3秒后返回3
async function action () {
  await fn(1)
  await fn(2)
  const res = await fn(3)
  console.log(res)
}

```
**使用generator 方式简单模拟

```js
function fn(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num), 1000)
  })
}

function *gen(param) {
  const res = yield fn(param) // 第一次传递首次执行的参数
  const res2 = yield fn(res) // res 是执行下一个next 传的参数
  const res3 = yield fn(res2)
}

function generatorAsync (callback){
  return function(){
    const genInst = callback(1) // 第一次参数为 1
    return new Promise((resolve, reject) => {
      const next1 =  genInst.next()
      next1.value.then(res => {
        const next2 = genInst.next(2) // 2 为第一个res,二个yield 执行的参数
        next2.value.then(res => {
          const next3 = genInst.next(3)
        })
      })
    })
  }
  
}

// 调用
const asyncFn = generatorAsync(gen)
asyncFn().then(res =>  console.log(res)) // 三秒后打印8

```

很明显这样使用没啥意义，套娃明显没起到任何作用， 同样存在回调地狱的问题

**改造**

```js

// 使用递归
function generatorAsync (callback){
  return function(){
    const genInst = callback.apply(this,arguments) // 第一次参数为 1
    return new Promise((resolve, reject) => {
      function go(key, arg){
        let res
        try{
          res = genInst[key](arg)
        }catch(err) {
          reject(err)
        }
        const {done, value} = res
        if(done) {
          return resolve(value)
        }else{
          return Promise.resolve(value).then(res => go('next', res), go('throw',err))
        }
      }
      go('next')
    })
  }
}

```




