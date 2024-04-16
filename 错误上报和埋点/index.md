## 埋点处理

### 方式一 ajax 埋点上报

原理：

实现一个接口， 通过普通ajax请求的方式进行一个埋点上报

缺点：

跨域风险， 一般埋点域名不是当前域名，存在跨域风险

### 方式二 img 的买点方式 1px GIF 上报

原理：

创建img标签， 通过src利用img可跨域的特性进行埋点上报， 通过gif图（合法的gif只需要43b）的方式

```js
const track = () => new Promise((resolve, reject) => {
  const img = new Image()
  img.src = `http://xxx.com/xxx?${params}`
  img.onload = () => resolve()
  img.onerror = reject
})

```

**优点**

- 避免跨域
- 空白的图像， 1px gif 比较小
- 图片不占用ajax通道
- 不阻塞页面

**缺点**

- 无法直接支持post
- 不支持数据量比较大的埋点（比如请求的响应）

### 方式三 Navigator.sendBeacon 埋点上报

原理：

该方法接收两个参数，第一个是目标服务器的url,第二个是所要发送的数据， 该方法可以通过HTTP POST 将少量的数据异步传输到服务器

优点：

不收同域限制，不会影响前一个页面跳转到下一个页面的速度，异步发出请求，当前页面脱离关联作为浏览器的任务，可以保证把数据发送出去不拖延卸载流程

## 上报时机

### 实时上报

只要埋点就发送

### 延时上报

有个sdk ， 把卖点信息收集到一起一起上报

## 错误埋点捕获

1. vue 错误
  app.config.errorHandler

2. js异常静态资源加载异常
   window.addEventListener('error',(error) => {}, true)

3. promise异常捕获
  window.addEventListener('unhandledrejection')

### 不采用统一的埋点上报工具原因

1. 需要加入额外的上下文信心， 例如需要获取用户路由操作路径、 是否有过哪些点击行为， 接入sdk时候需要将该信息作为参数传递
2. 特定格式
3. 其他工具不好用，需要将错误信息和埋点上报对应到用户轨迹上

注：像这些个操作路径点击行为实际上在公共状态管理库去保存的， 在路由钩子中去存储

```js
/** 临时console */
/** promise */
function handlePromiseError(): void {
  window.addEventListener('unhandledrejection', (error) => {
    console.log(error);
    ordinaryError(filterPromiseError(error));
  });
}

/** 资源错误 */
function handleSourceError() {
  window.addEventListener('error', (error) => {
    ordinaryError(filterError(error));
  });
}

/** 常规和异步错误 */
function handleSyncError() {
  window.onerror = function (message, source, lineno, colno, error) {
    console.log('window.onerror-message', message);
    console.log('window.onerror-source', source);
    console.log('window.onerror-lineno', lineno);
    console.log('window.onerror-colno', colno);
    console.log('window.onerror', error);
    return true;

    // try {
    //   reportErrorMessage(message, source, lineno, colno, error);
    // } catch (error) {
    //   console.log(error);
    // }
  };
}

/** vue错误 */
function handleVueError(app) {
  app.config.errorHandler = function (error) {
    setTimeout(() => {
      throw error;
    });
  };
}

export const handleError = (app) => {
  handlePromiseError();
  handleSourceError();
  handleSyncError();
  handleVueError(app);
};
```
