## 设计模式
[设计模式=>](https://refactoringguru.cn/design-patterns/catalog)

### 设计模式考量的主要因素
有利于代码的复用
有利于代码的稳定性和拓展
有利于代码的可读性

### 需要掌握的什么程度
1. 什么是设计模式 => 开发工作中使用设计模式的概念
2. 清楚概念本身 => 了解基本设计模式的分类、 常用设计模式的类型
3. 不同场景下关联到对应的模式 => 模式和需求的关系以及合理使用

#### 开闭原则
   
```js
// 开闭原则： OCP - 对拓展开放、对修改关闭
// 目标： 已有的场景下， 对于需要拓展的功能开放、拒绝直接的功能修改

// sprint1 - 母亲节活动， 吃鸡游戏高亮 + LOL 弹窗折扣
if(game === 'PUBG'){
  // 高亮
}else{

}

// event
if(game === 'LOL'){
  // 弹窗折扣
}else{
  
}

// sprint2 - 要对部分游戏进行置灰下架 + 付款页面停止发售

if(game === 'PUBG'){
  // 高亮
}else if(game === 'R') {
  // break + 停售
}else{

}
```

问题： 代码量会指数上涨， 没增加一个需求就需要增加一个判断条件

```js
class GameManage{
  setColor(){

  }
  setDialog(){

  }
}
```

#### 单一职责 SRP - 通过解耦让每个职责更加单一

目标： 一个功能只做一件事情

```js
// print3 弹窗的时候同时计算金额
class GameManage{
  setColor(){

  }
  setDialog(){
    // 修改金额
  }
}

// 修改金额实际上并不是GameManage 中专属的方法， 属于弹窗后的下游
// 为了方便单独管理， 可以将计算相关逻辑作为一个指令再gameManage中执行

// print3 弹窗的时候同时计算金额
class GameManage{
  constructor(exe){
    this.command = exe
  }
  setColor(){

  }
  setDialog(){
    // 修改金额
    this.command.setPrice()
  }
}


```

#### DIP 依赖倒置
目标： 面向抽象进行coding, 而不是面向实现进行代码书写

```js
class Store {
  static modules = new Map()
  inject(plm){
    this.modules.set(module.constructor.name, module)
  }

  constructor(){
    for(let module of Store.modules,values()){
      module.init(this)
    }
  }
}

class Share{
  init(rate){
    store.rate = this
  }
  star(stars){
    //
  }
}
// 创建share实例
const shareModule = new Share()
Store.inject(shareModule)
```

### 创建型

#### 1.工厂模式

大批量 - 同类型
隐藏创建过程、 暴露共同接口

```js
// 游戏商城下载初始化游戏

class Shop {
  create(name) {
    return new Game(name)
  }
}

class Game {
  constructor(name){
    this.name = name
  }
  init(){}
  run(){}
}
```

#### 2. 建造者模式


