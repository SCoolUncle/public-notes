## webpack 构建流程

#### 一、构建流程

1. **初始化阶段（Initialization Phase）：**
   - 加载配置文件：Webpack 首先会读取并解析项目中的配置文件（如 webpack.config.js），获取配置信息。
   - 创建 Compiler 对象：Webpack 根据配置文件创建 Compiler 对象，Compiler 是 Webpack 的核心对象，负责整个构建过程的控制和协调。
   - 加载插件：Webpack 加载配置文件中的插件（Plugins），并调用插件的 `apply` 方法，将插件应用到构建过程中。插件可以用于扩展 Webpack 的功能，例如优化代码、处理静态资源、生成 HTML 文件等。

2. **编译阶段（Compilation Phase）：**
   - 创建 Compilation 对象：Webpack 在每次构建过程中都会创建一个新的 Compilation 对象，表示一次构建任务。Compilation 对象包含了当前构建过程中的所有资源、模块和依赖关系。
   - 依赖解析：Webpack 根据入口文件的配置，从入口文件开始递归地解析模块的依赖关系。它会分析模块中的 `import`、`require` 等语句，找到每个模块所依赖的其他模块。
   - 加载模块：Webpack 使用不同的加载器（Loaders）来处理不同类型的模块。加载器将模块转换为可被浏览器理解的形式。加载器可以对模块进行转换、转译、压缩等操作。
   - 模块编译：Webpack 使用相应的编译器（Compilers）对模块进行编译。编译器会根据模块的类型和配置，将模块转换为可执行的 JavaScript 代码。
   - 依赖收集：Webpack 在模块编译过程中会收集模块之间的依赖关系，并建立一个依赖图。这个依赖图用于在后续步骤中决定模块的加载顺序和输出顺序。

3. **优化阶段（Optimization Phase）：**
   - 代码优化：Webpack 对编译后的模块和依赖图进行优化，包括去除未使用的代码、提取公共模块、压缩代码等。
   - 分离 Chunk：Webpack 根据配置文件中的设置，将模块组装成一个个 Chunk（代码块）。Chunk 是一个包含一个或多个模块的单独文件，可以按需加载。
   - 资源管理：Webpack 处理项目中的其他静态资源，例如图片、样式文件等。可以通过配置文件中的加载器和插件来处理这些资源。

4. **输出阶段（Output Phase）：**
   - 输出文件：Webpack 将打包生成的 Chunk 输出到指定的目录中。可以配置输出的文件名、路径、公共路径等。
   - 生成 HTML 文件：根据配置文件中的设置，Webpack 可以生成 HTML 文件，并自动将生成的 Chunk 插入到 HTML 文件中。

以上是一个完整的 Webpack 构建流程。Webpack 在每个阶段都会执行相应的任务，通过插件和加载器的配置，可以对构建过程进行定制和扩展，以满足项目的需求。

webpack 构建流程

首先是初始化阶段， 解析读取配置文件和shell命令当中的参数， 获取配置信息， 根据配置文件创建compiler对象， 加载配置文件中的插件调用插件的apply方法， 创建compilation对象， 根据入口配置获取解析入口文件， 从入口文件递归解析模块的依赖关系， 使用相应的loader对模块进行转义处理， 使用相应的编译器转换为可执行的JavaScript代码， 编译过程中会收集模块之间的依赖关系，生成依赖关系图， 然后对编译后的模块进行优化，去除无用的代码，提取公共模块，压缩代码等操作，
根据配置文件中 的配置将模块组装成一个个chunk文件， 最后将打包生成的chunk 输出到指定的目录中去

#### 二、babel

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

**常用**

1. @babel/preset-typescript   官方编译器tsc

#### 三、loader

在 Webpack 中，Loader 是用于对不同类型的文件进行处理和转换的工具。它们会在打包过程中被应用到特定的文件上，并且可以进行文件加载、转译、压缩、处理静态资源等操作。以下是一些常用的 Loader 示例和它们的作用：

1. babel-loader： 用于将 ES6/ES2015+ 的 JavaScript 代码转换为 ES5 的代码，以实现在旧版浏览器中的兼容性。它是与 Babel 集成的主要 Loader。

2. css-loader： 用于加载 CSS 文件，并解析其中的 CSS 代码。它支持处理 CSS 中的模块化、导入其他 CSS 文件、处理 URL 引用等功能。

3. style-loader： 用于将解析后的 CSS 代码以 <style> 标签的形式插入到 HTML 页面中，实现样式的动态加载。

4. file-loader： 用于处理文件的加载和输出，包括图片、字体等静态资源。它可以将这些文件复制到输出目录，并返回对应的文件路径。

5. url-loader： 类似于 file-loader，但它可以根据文件大小将文件转换为 Base64 格式的 Data URL，以减少 HTTP 请求。

6. sass-loader： 用于加载和解析 Sass/SCSS 文件，并将其转换为 CSS 代码。它可以与 css-loader 和 style-loader 配合使用，实现对 Sass 样式的加载和渲染。

7. postcss-loader： 用于对 CSS 代码进行后处理，例如自动添加浏览器前缀、压缩代码等。它可以与 Autoprefixer、cssnano 等 PostCSS 插件配合使用。
8. ts-loader: 内部TypeScript 的官方编译器， ts-loader 和 tsc是可以公用tsconfig.json

#### 四、compiler 编译器原理（详情查看babel章节）

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
