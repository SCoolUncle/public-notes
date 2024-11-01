### 题目一

1. ts中的instanceof

- instanceof 用来判断是否是某个类和构造函数的实例

2. css的box-sizing

- 控制盒子模型，怪异盒模型，标准盒模型

3. Cookie和webStorage的区别

- 存储容量：
  - Cookie 一般限制在4kb左右
  - WebStorage: 提供更大的存储空间，通常至少是5MB
- 生命周期：
  - Cookies: 可以设置过期时间，到期后会自动删除，如果不设置时间属于绘画cookie,浏览器关闭时会删除
  - localStorage: 没有过期时间，数据会永久存储，直到被显示删除
  - sessionStorage: 会话中有效，关闭当前会话会被清除
- 作用域：
  - Cookies: 与特定的域绑定，可以配置为同域下所有的页面可见，或者限制特定的路径
  - WebStorage: 仅限于从创建它的页面域访问
- 服务器交互
  - Cookies：每次http请求时，Cookies会自动添加到请求中发送到服务器
  - Web Storage: 默认不会自动跟随请求发送
- 访问控制
  - Cookies: 可以通过httpOnly 标志限制JavaScript访问
  - WebStorage: 无限制

4. 浏览器跨域的时候会发生什么，和访问不跨域的地方有什么区别？怎样算做跨域？如何规避跨域问题

- 协议 域名 端口号 三部分组成， 三部分全部相同才是同源

- 浏览器跨域的时候根据请求类型和浏览器区分
  - 简单请求： 请求get post 请求类型，并且Content-Type 为 ’text/plain'，'multipart/form-data','application/x-www-form-urlencoded', 直接发送请求，响应头包含了Access-Control-Allow-Origin' 头部，允许跨域
- 非简单请求： 发送预检请求，询问服务器是否允许跨域请求
- 带凭证的请求： 默认情况下，跨域请求不会发送或接受认证信息（例如cookies和http认证信息）。如果需要发送带凭证的跨域请求需要再请求中设置'withCredentials’ 为true,服务器也必须在相应头中设置acac允许携带凭证

算法题：

1. 利用 reduce 给数组实现一个 myMap 方法，和 map 一样的效果

  ```js
  // 常规写法
  Array.prototype.myMap = function (cb){
    if(!this.length){
      return []
    }

    const result = []

    for(let i = 0 ; i < this.length; i++){
      result.push(cb(this[i], i, this))
    }

    return result
  }

  // 当前被处理的元素 处理元素的下标 arr map操作的数组，原数组
  arr.map((item,index, arr) => {
    return item
  })


  // 使用reduce
  Array.prototype.myMap = function(cb){
    if(!this.length) []

    this.reduce((a,b,index) => a.push(cb(b, index, this)), [])
  }
  ```

2. 通过await和setTimeout来设计一个函数使其完成延迟一秒的功能

```js

```

3. 数组扁平化

```js
// 有这样一个数组： [1, [2,3], 4,[5,6, [7,8]]]
const arr = [1, [2,3], 4,[5,6, [7,8]]]
arr.flat(Infinity)

// 手动实现
// 递归
const myFlat = (arr) => {

  const result = []
  let index = 0

  while(index < arr.length){
    if(Array.isArray(arr[index])){
      result.push(...myFlat(arr[index]))
    }else {
      result.push(arr[index])
    }
    index++
  }

  return result

}
```

4. 看代码说输出的题（事件循环、 连续两个setState）

```js
// 例如有这样一段代码， 我理解就是考察setState 异步和批量处理模式
const [state, setState] = useState('hello')
const handleChangeState = () => {
setState('你好')
console.log(state)
setTimeout(() => {
setState('延时器')
console.log(state)
})
setState('我们')
console.log(state)
}
useEffect(() => {
console.log(state)
},[state])
```

### 题目二

1. 让实现一个输入123456789返回123,456,789的函数

```js
// input: 123456789 output: 123, 456, 789
// 感觉是主要考察金额处理
const formatString = (str) => {
  // 使用replace 方法添加 ',' 实际情况中要考虑是否有小数点存在
  return str.replace(/\B(?=(\d{3})+\.)/g, ',')
}

// 循环处理
```

2. webpack怎么用，localstorage怎么用？

3. 还有跨域问题，怎么解决

- 使用proxy本地代理转发
- 使用代理服务器nginx
- 后端设置CORS允许跨域请求
- JSONP

3. React常用的几个钩子

- useState 创建响应式变量
- useRef 创建一个不会变动的变量，或者获取DOM元素的引用
- useEffect 充当componentDidMount, componentUpdate, componentWillUnmount, 两个参数，依赖项为空时初次渲染时执行
- useContext 用来获取context 中共享的属性

4. Ts的泛型

- 什么是泛型？泛型就是可以不具体指定操作数据的类型，允许你在使用时指定这些类型， 具体可以定义泛型函数，泛型接口，泛型类等

5. React的组件通信

- props
- context
- redux
- eventBus
- emit

6. ReactRouter的跳转方式

- 两种：
- browserRouter 原理是采用的history 中的pushState 更改url ，监听popstate 事件切换页面
- hash 通过更改location.hash 更改url ， 通过监听 hashChange 事件切换不同的页面

- 跳转方式：
- useNative 跳转
- link 标签

7. Promise 的常用方法
   - promise.all // 返回一个新的promise, 只有当所有的promise成功hpromise， 一个失败返回失败的promies 以及错误原因
   - promise.race // 返回一个新的promise ， 由第一个失败或者成功的promise 的结果决定这个新的promise 的状态
8. Git的常用命令
   - git commit -m // 提交代码到本地
   - git pull // 拉取远程代码
   - git merge // 合并代码和所有的提交记录， 会创建一个新的合并提交， 合并master时候使用
   - git stash // 临时保留为提交的更改
   - git checkout -b // 切换创建分支
   - git reset --hard // 将代码回退到指定版本
   - git rebase // 将一个分支的更改到另一个分支， 在目标分支上重新应用这些提交，根据有线性，尽量在自己开发分支使用
9. 浏览器缓存
    - 强缓存：
      - Cache-Control: no-cache no-store max-age
      - Expires: 具体时间
    - 协商缓存：
      - Last-Modified: 返回资源最后的修改时间， 比较资源是否修改
      - ETag: 根据资源内容生成的唯一标识符
10. Eslint的配置
11. Import和require的区别
    - import 是es6模块导入语法，属于值的引用, javascript 官方模块系统
      - 在代码执行前被静态分析，提前执行，支持模块的静态导入
      - 导入的成员是只读的，
    - require 是commonjs导入语法， nodejs 传统模块系统
      - 在代码执行时才会加载模块， 支持动态导入
      - 可以修改其属性和方法
      -

### 题目三

1. Promise.all 的特点
   -

2. then 传递的参数有几个
   - 成功的回调， 失败的回调， 失败可以改用cache来进行处理
3. CSS 垂直居中
   - flex 弹性布局
   - line-height
   - margin auto 0
   - transform + 绝对定位
   - 表格布局
   - grid 布局
4. Cache 缓存 get set 方法
5. 常用的hooks
6. useEffect 可以作为几个生命周期
   - componentDidMount、componentUpdate、componentWillUnmount
7. react 事件 16 和 17 有什么区别
   1. react 16 中事件时委托到document 上进行处理的， 17 中将事件委托到了应用的根节点上，这样使的应用能有更好的浏览器默认行为的一致性和兼容性问题。
    - 如果一个复杂的页面包含着多个react 实例， 16 之前这些实例上的事件可能会相互影响， 导致一些预期之外的事件冒泡和捕获行为， 将事件委托到实例根节点上有利于相互隔离， 可预测
    - 更好的与浏览器特性兼容，如shawDom,当React事件处理器被委托到document时，这可能会与Shadow DOM的封装原则相冲突。将事件委托到根节点有助于React更好地兼容这类浏览器特性，因为它允许React应用内部的事件处理保持在其封装范围内。
    - 避免非react 元素的事件干扰， 在混合的应用中（即部分页面由React控制，部分页面由其他方式控制），如果非React元素触发了事件，且该事件冒泡到了document层级，那么React的全局事件监听器可能会捕获到这些事件，即使这些事件与React应用无关
    - 

### 用户未登录如何确定是哪个用户

1. uuid 方案
  简单不严格
3. 浏览器指纹 fingerprintjs.js 等
   user-agent/canvas 颜色信息/浏览器字体信息等
5. ip NAT
