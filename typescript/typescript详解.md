## TypeScript 详解

### 一、基础概念

#### 什么是ts

* 是JavaScript的一个超集， 在JavaScript原有语法的基础上添加了可选类型和基于类的面向对象编程

**面向项目**

TS: 解决大型复杂项目，架构以及代码维护的复杂场景
JS: 脚本化语言， 用于简单场景

**自助检测**

TS: 编译期间主动发现错误并纠正错误
JS: 运行时报错

**类型检测**

TS: 弱类型， 支持对动态和静态类型的检测
JS: 弱类型， 无静态类型选项

**运行流程**

TS: 依赖编译，依赖工程化体系
JS: 直接在浏览器中运行

**复杂特性**

TS: 模块化、 泛型、接口

面试点

> 所有类型检测和语法检测会在什么时候进行检测： 编译时

#### 二、基础类型

**boolean、string、number、array、null、undefined**

```js
let isEnabled: boolean = true
let str: string = 'hello'
let num: number = 1
let und: undefined = void 1
let nu: null = null
let arr: string[] = ['12','34']
let arr: Array<string> = ['12','34']
```
**tuple 元组**

```js
let tup: [string, number] = ['12',2]
```

**enum - 枚举**


```js
// enum 默认常量值会从0开始 依次 递增赋值， 会从上一个值进行递增
enum enumType {
  Red,
  Green,
  Blue
}
let color: Color = Color.Red;
console.log(color); // 输出：0

enum otherEnum {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}

// 反向映射, 根据值可以反向找到键名
otherEnum['red'] // Red

// 异构
enum Enum {
  A, // 0
  B, // 1
  C = 'c', // c
  D = 9, // 9
  E // 10
}

```

面试题
> 手写将其转化为js实现
```js
// 通过哈希的方式实现, 正向逆向值描述

let Enum 
(function (Enum){
  // 正向
  Enum['A'] = 0;
  ...
  // 反向
  Enum[0] = 'A'
  ...
})(Enum || (Enum = {}))

```

**any unknown void**

any: 绕过所有类型检查 => 类型检测和编译筛查都失效

unknown : 绕过赋值检查 => 禁止更改和传递

```js

let name: unknown
name = 'name' // ok
name = 123 // ok

let desc: any =  name // ok any 可以赋值任何值
let text: unknown = name // ok 同属于unknown
let isDog: boolean = name // error 不能将unknown

```
void : 声明函数返回值

never: 函数永不返回

```js
// 抛出错误
function fn():never {
  throw new Error('hello')
}
```

object | {} 对象

```js
// 分为两种
interface ObjectConstructor{
  create(o: object | null): any
}

// 
interface Object{
  ...
}
```

#### 三、interface

```js
interface InfoType {
  readonly name: string; // 编译的时候就会判断， 不允许修改引用地址包括值
}

// 任意
interface InfoType {
  name: string;
  [propName: string]: any
}
```

#### 四、交叉类型

```ts
  // 合并
  interface Info {
    name: string;
    status: number
  }

  interface Person {
    info: Info;
    status: boolean
  }

  type PersonInfo = Info & Person 

  // Info  Person 使用 & 且关系 合并会导致 同名属性status : never
```

#### 五、 断言 类型声明、转换

编译状态产生作用

```ts

// 尖括号
let str: any = 'str'
let length: number = (<string>str).length

// as 方式
let str: any = 'str'
let length: number = (str as string).length

// 非空确认
type param = number
 
const fn = (param: param | undefined ) =>{
  let num =  param! // 不确定类型，非空确认, 保证num不是空
}

```

#### 六、 类型守卫 语法规定范围内，额外的确认

多态 - 多种状态判断

```ts
interface Info {
  name: 'lcj'
}

// in 守卫
function getName(info: Info){
  // 判断是否有name属性
  if('name' in info){
    console.log(info)
  }
}

// 还可以通过 typof | instanceof 方式进行判断
...
```

#### 七、TS进阶方案

**1.函数重载**

该特性允许创建多个具有不同实现的同名函数。 对重载函数的调用会运行其适用于调用上下文的具体实现，即允许一个函数调用根据上下文执行不同的任务


```ts
class Class {
  // 应用场景， 对接不同的接口， 类型不一样， 现将函数放进来然后根据类型去判断处理逻辑
  start(name: number):number;
  start(name: string):string;
  start(name: boolean):string;
  start(name: Comnbinable){
    if(typeof name === 'number'){
      // 处理
    }
  }
}
```

**2.泛型**

```ts
function getName<T, U>(name: U): T{
  return name as any as T
}
```

#### 八、装饰器

在 TypeScript 中，装饰器（Decorators）是一种特殊的语法，用于修改类、方法、属性等的行为或添加额外的元数据。装饰器可以在不修改原始类或对象定义的情况下，通过附加装饰器函数来扩展其功能。

装饰器使用 @ 符号紧跟在要修饰的目标前面，可以应用于类、方法、属性等。它们可以接收不同的参数，包括类构造函数、方法名、属性描述符等。

需要注意的是，装饰器目前处于实验性阶段，需要在 TypeScript 配置中启用 "experimentalDecorators" 选项。此外，装饰器的功能和语法可能会有所变化，因此请参考官方文档和相关资源以获得更详细的信息和最新的使用方式。

**类装饰器**

```ts
function GetName(target: Function): void{
  target.prototype.getName = function(): void{
    // 处理逻辑
    console.log('getName')
  }
}

// 此时 Person 会作为装饰器的target，person 的原型上回添加getName方法
@GetName
class Person {
  constructor(){
    // 业务逻辑
  }
}

let person = new Person()
person.getName() // getName
```

**方法装饰器**

```ts
function MyMethodDecorator(target: Object, propertyName: string, descriptor: PropertyDescriptor) {
  // 在方法定义上添加额外的逻辑
  // 可以修改方法的行为或添加元数据
}

class MyClass {
  @MyMethodDecorator
  myMethod() {
    // 方法定义
  }
}

```
**属性装饰器**

```ts
function MyPropertyDecorator(target: Object, propertyName: string) {
  // 在属性定义上添加额外的逻辑
  // 可以修改属性的行为或添加元数据
}

class MyClass {
  @MyPropertyDecorator
  myProperty: string;
}

```

**函数装饰器**

需要注意的是，函数装饰器的参数和类装饰器、方法装饰器的参数略有不同。函数装饰器的第一个参数是函数本身，而不是类的原型对象。因此，在函数装饰器中可以直接访问函数本身，而无需通过原型对象来访问。

```ts

function FunctionDecorator(target: any, methodName: string, descriptor: PropertyDescriptor) {
  // 在函数定义上添加额外的逻辑
  // 可以修改函数的行为或添加元数据
}

@FunctionDecorator
function myFunction() {
  // 函数定义
}
```

#### 九、interface 和 type 的区别

interface： 类型接口
type：类型别名

* interface 主要用来定义对象类型，可以用来描述对象的属性方法等，type 可以定义对象类型也可以定义联合类型、交叉类型原始类型、函数类型等
* 合并能力不同： 多次定义同名的interface接口时， 后者会覆盖掉前者定义的同名属性；type 不具备合并能力， 定义同名类型会导致冲突错误
* 继承和实现能力不同： interface 支持继承其他接口， 可以通过 implements 关键字进行实现；type 不支持继承，也不能使用 implement
* 可读性： interface 更加直观，更适合定义对象类型， type 更适合定义复杂类型，但可读性较差

> implements 关键字用于类实现接口， 表示类将实现某个接口的约定；
> extends 可以用来interface 接口类型继承， type 声明的类型不可以直接通过extends关键字进行继承；


#### 十、TS 原理流程

```ts
// 源码
var a = 1
// 2.scanner扫描器生成令牌流
[
  'var':'keyword',
  'a': 'identifier',
  '=':'assignment',
  '2':'imteger',
  ':': 'eos'
]
// 3.parser 解析器
{
  operation: '=',
  left: {
    keyword:'var',
    right: 'a'
  },
  right: '2'
}

// 4. binder绑定器
// AST 节点 node.symbol <=> 辅助校验器

// 5. 校验器 checker
// ts 节点语法检查 => 类型检索

// 5.2 发射器emitter
// 翻译完成每个node节点的内容
```



  


  