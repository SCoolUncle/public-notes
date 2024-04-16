## vue源码分析

视图和数据关联，其实是render渲染视图的函数和数据产生关联

```js
// 实际上是使用到的数据 和 fn 产生关联
// 什么是使用到的数据？ 实际上是对数据进行读取或者操作的数据
// 那么用到的就需要进行关联吗？=> 使用者控制， 什么样的数据需要关联， 什么样的不需要关联 于是就出现了， vue2(data) vue3（ref, reactive)
// 而不是所有的数据都要和fn进行关联

// 那么怎么进行关联？从数据读取和修改的时候进行关联 
// vue2 => defineProperty : 通过属性描述符监听已有属性的读取和赋值
// vue3 => Proxy 监听对象的操作方式读取删除存不粗在等， 缺点只能兼容支持es6的浏览器
// 以上两种方法都要求 目标是对象

function reactive(target){
  return new Proxy(target,{
    get(target, key){
      return Reflect.get()
    }, 
    set(target, key, value){
      // reflect 本身就返回Boolean
      return Reflect.set(target, key, value)
    }
  })
}
let data, data2, data3;

function fn(){
  // ...
  data;
}

Object.is()  // TODO: 如何比较的
```

## vue diff 算法

1. 首先对比节点本身是否为相同的节点，如果为不同的节点，则删除该节点创建新的节点
2. 如果为相同的节点，进行patchVnode, 对子节点进行处理，如果新的节点children没有节点则将旧的节点移除，如果都有子节点则进行updateChildren,判断如何对这些新老的子节点进行操作（diff核心）
3. 在diff中只对同级节点进行比较， 不跨级比较，这样讲复杂度从o(n^3)降低到o(n)，也就是说只有当新旧children都为多节点的时候才需要核心diff算法进行同层的比较

## template 模版编译原理

1. 解析：将template模版转化成AST语法树
2. 优化：这个阶段会对AST语法树进行优化，提取静态节点事件标记等
   1. 静态节点提升：在这个过程中如果发现某个节点的子节点都是静态的， 那么编译器会将这些个节点提取到父结点渲染函数之外，防止每次都重新创建静态节点
   2. 处理节点事件： 编译器会分析模版中事件的绑定， 将静态的事件处理器标注出来，防止重复绑定事件
   3. 条件表达式简化： 编译器会简化模版中的条件表达式，将其直接编译进渲染函数，避免在运行时进行计算
   4. 缓存处理器： 编译器会将模版中的指令和表达式生成对应的函数， 将这些函数进行缓存，避免每次渲染都重新创建
   5. 插槽优化： 分析插槽内容对静态插槽内容进行提升和优化
   6. 事件侦听器提取： 对于同一个事件的多个处理函数，编译器会将其放入一个数组中，提升事件的处理效率
   7. 静态属性提升： 对静态的属性进行提升，避免重复编译
   8. 编译时模版缓存： 缓存模版内容提升编译效率
3. 代码生成： 经过解析和优化之后将AST转换成渲染函数的字符串表示，render函数， 接收数据作为参数返回vnode节点
4. 渲染：Vue 实例初始化的过程中会将模版对应的render生成并保存到实例当中， 当下次节点发生变化的时候重新执行instance 的update方法 ，进行新旧节点的对比

> compiler-core
>> ast.ts  类型基础定义
>> codegen.ts ast-> render
>> compile.ts  统一处理编译模版的
>> parse.ts template-> ast
>> runtimeHelpers.ts  处理映射关系

> runtime-dom
>> vdom

方法路径

- baseCompile
  - baseParse // 转换成ast
    - createParserContext

## diff

1. 同级对比
   1. 类型不同，该节点的所有子节点都销毁
   2. 类型相同， key

### vue2 diff 双端比较

1. patch
   1. 老的为空新的不为空， 创建节点（首次渲染 ）
   2. 老的不为空，新的为空，卸载节点
   3. 老的不为空新的不为空， patchVnode ->
2. patchVnode (新老节点都存在)
   1. vnode === oldnode  return
   2. 比较属性， 属性是否有变化 进行更新
   3. 是否是静态节点，单一文本结构进行替换
   4. 有没有子节点， 新增删除， 都有则进行updateChildren ->
3. updateChildren (diff 核心)
   let oldStartIndex = 0, oldEndIndex = length - 1
   let newStartIndex = 0, newEndIndex = length - 1

   通过key比较
   1. while startIndex <= endIndex
      1. 头头比较 相等
         1. patch()
         2. index +1
      2. 尾尾比较 相等
         1. endIndex 向前移动
      3. 头尾比较 相等
         1. oldIndex 后移
      4. 尾头比较 相等
         1. 旧尾移动到最前
   2. 如果以上条件都不满足 第一次没匹配到
      1. 判断旧的是否有新头
         1. 有交换
         2. 没有 直接新增

**缺点**

重复 o(n^2) 复杂度

## vue3 最长递增子序列

优点： 静态标记 + 非全量diff

1. 预处理， 找出头尾相同的节点， 剩下的节点 新增、删除、递增子序列进行对比
