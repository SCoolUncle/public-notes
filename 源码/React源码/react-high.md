# React 高级用法

## HOC

定义： 入参出参都是函数

## Hooks

### 1.useState

```js
const [data, setData] = useState({name: 'lcj'})
// 修改data
setData({...data, name: 'hello'})
// 函数形式更新
setData((preData) => preData + 'hello' )
```

### 2.useEffect

**执行时机**
组件挂载完成/更新完成  -> 限执行DOM渲染 -> 执行useEffect
不会阻塞页面渲染的副作用

useEffect 接收两个参数， 第一参数是回调函数， 用来执行的内容；
第二个参数是一个数组，依赖数组
**第二个参数为空数组：**
如果为空的话相当于 componentDidMount， 只有在组件初始化的时候执行一次
**如果第二个参数有值：**
组件的首次渲染：当组件首次渲染时，useEffect 会执行副作用函数。
依赖项发生变化：当依赖数组中的任意一个依赖项发生变化时，useEffect 会再次执行副作用函数。

```js
const [number, setNumber]  = useState(0)
useEffect(() => {
  console.log('hello')
  return function(){
    // 用于清除副作用
  }
}, [number])
```

**指定return 卸载组件时调用的方法**

### 3.useLayoutEffect

**执行时机**
组件挂载/更新完成 -> 执行useLayoutEffect -> DOM渲染
可能会阻塞页面的渲染

### 4.useRef

1. 用来获取dom
2. 保存状态

```js
const tag = useRef(0)
tag.current = 1 // 此时不会触发视图重新渲染

// 注意： 修改ref值之后 ，如果组件重新渲染则ref定义的值也会渲染到页面当中, useRef声明的变量不会重新初始化

```

### 5.useMemo => computed

只有依赖数组里的数据发生变化的时候， 内容才会进行更新

返回callBack的结果

```js
  useMemo(() => (
    <div>
      {selectList.map(item, index) => (
        <span>{item.name}</span>
      )}
    </div>
  ),[selectList])
```

### 6.useCallBack

接收两个参数：useCallback(() => {}, [])

同useMemo,同useMemo， 区别是缓存函数，返回callBack 的函数

### 7.useContext

用来获取 createContext 传递的数据, 替代 <TextContext.Consumer></TextContext.Consumer>

const contextValue = useContext(TextContext)

### useReducer

可以实现组件的强制刷新， const [, forceUpdate] = useReducer(x => x + 1, 0);

```js
  const initState = {
    value: 0
  }

  const reducer = (action, state) => {
    switch(action.type){
      case 'ADD':
        return {
          value: state.value + 1
        }
      case 'DELE':
        return {
          value: state.value -1
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initState, initFunc?)
```

## react 18 高级特性

### Suspence +  React.lazy

动态加载结合懒加载

```jsx
const DynamicLoadComp = () => import('./index.js')

const LazyDynamicLoadComp = React.lazy(DynamicLoadComp)

render() {
  return <Suspence fallback={<div>loading</div>}>
  <LazyDynamicLoadComp></LazyDynamicLoadComp>
  </Suspence>
}
```

### ssr 流式渲染

// node 之前的渲染
1 服务器获取数据
2 生成html 字符串 // renderToString
3 返回到浏览器 // res.body

// node
1 先分步数据服务器拿到数据 考虑reactLazy
2 分步输出 node renderToPipableStream
3 通过流式传入给浏览器

### transition

// 是否有延迟更新
const [isPending, startTransition] = useTransiton()

startTransition (() => {标注一个低优先级的东西})

### immutable

// 建议用use-immer
