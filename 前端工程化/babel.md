#### 一、babel

**功能**

Babel 是一个用于 JavaScript 编译器，它的主要作用是将新版本的 JavaScript 代码转换为向后兼容的旧版本，以便在当前的浏览器环境中运行。

1. 语法转换： Babel 可以将使用新版本 JavaScript 的代码转换为向后兼容的旧版本代码。例如，将 ES6/ES2015 的代码转换为 ES5 的代码，以便在旧版浏览器中运行。

2. API 转换： Babel 可以转换不同 JavaScript API 的使用方式，以保证代码在各种环境中的兼容性。例如，将使用了新的 API 的代码转换为使用旧的 API，以确保在不支持新 API 的环境中正常运行。

3. 模块转换： Babel 可以将使用模块化语法的代码转换为不同的模块系统，以适应不同的环境和打包工具。例如，将使用 ES6 模块化语法的代码转换为使用 CommonJS 或 AMD 规范的代码。

4. 装饰器支持： Babel 支持转换和处理 JavaScript 装饰器（Decorator）的语法。装饰器是一种扩展 JavaScript 类、方法和属性的语法，Babel 可以将装饰器语法转换为兼容的代码。

5. 扩展功能： Babel 还支持许多插件和预设（Presets），可以根据项目需求进行配置和定制，以实现更多的转换和功能扩展。
   
**原理**

三个步骤

1. 解析（Parsing）： 词法分期、语法分析， Babel 首先将输入的 JavaScript 代码进行解析，将其转换为抽象语法树（AST）。AST 是一种以对象形式表示代码结构的数据结构，它能够准确地描述代码的语法和结构。

1. 转换（Transformation）： Babel 使用插件对 AST 进行遍历和转换，将新版本的 JavaScript 代码转换为向后兼容的旧版本代码。每个插件负责特定的转换任务，例如将 ES6/ES2015 的语法转换为 ES5 的语法，或者将新的 API 转换为旧的 API。

3. 生成（Generation）： 转换完成后，Babel 将转换后的 AST 重新生成为 JavaScript 代码。生成的代码可以是原始的 JavaScript 代码，或者是经过压缩和优化的代码，具体取决于配置和插件的设置。

#### 二、compiler 编译器原理

**1. 词法分析 lexical analysis**

将代码分割一个个token

- 正则
- 自动机

```js
(add 2 (subtract 4 2))
// token 类似于下面
[
  {type: 'paren', value: '('},
  {type: 'name', value: 'add'},
  ...
]
```

**2. 语法分析 syntactic analysis**

[AST转换示例](https://astexplorer.net/)

AST 抽象语法树可能类似于下面这样

```js
(add 2 (subtract 4 2))
// AST 抽象语法树
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [{
      type:'NumberLiteral',
      value: '2'
    }]
    ...
  }]
}

```
例如babel流程

ES6 -> Babylon.parse -> AST -> babel traverse -> 心得AST -> ES5

**3. 代码转换 transformation**

跟宿主环境无关

**4. code generation 代码生成**