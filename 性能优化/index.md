## 页面性能指标

FCP 页面首次渲染时长

```js
// 等待页面加载完成后执行
window.addEventListener('load', function () {
  const timing = performance.timing;

  const pageLoadTime = timing.loadEventStart - timing.navigationStart;
  const domContentLoadedTime = timing.domContentLoadedEventStart - timing.navigationStart;

  console.log('页面加载时间：', pageLoadTime, '毫秒');
  console.log('DOMContentLoaded 时间：', domContentLoadedTime, '毫秒');
});

```

PLT 页面加载时长


TRB 首屏请求大小： 页面加载完成过程中网络请求体积的大小

js/css 覆盖率： 用户加载了太多没必要的代码



## 页面性能分析

通过 Lighthouse + performance

包分析工具 rollup-plugin-visualizer / webpack-bundle-analyzer

jscpd 检测代码重复率

圈复杂度

## 优化

1. 减小包体积， 降低页面完全加载时长
- 按需引入
  - 采用es 版本包  lodash -> lodash-es
  - 使用patch-package 打补丁
  - 使用 vite-plugin-imp 插件
- 避免重复打包
  - 代码分割： webpack中使用optimization.splitChunks 实现代码分割，
  - 动态导入： 可以在需要的时候在加载模块，可减少初始加载问价的大小，提高页面加载性能
  - 懒加载： 异步加载组件，优化初始加载时间
  - 文件名称hash化， 缓存策略： 可以根据内容生成唯一的哈希值
  - CDN化： 将不常变动的库使用CDN引入
  - tree shaking

## 面试题， 前端性能优化？

 1. 加载性能优化
     1. 尽可能的减小资源的大小
        1. webpck 打包优化： 图片压缩， js/css 代码压缩， 
        2. 雪碧图， 
        3. treeShake, 
        4. 首屏资源动态加载import
     2. 尽量的利用缓存
        1. 减少请求数量
        2. http协议缓存
        3. H5/APP 本地离线包
        4. localStorage
 2. 运行时性能优化
    1. 图片懒加载
    2. 动画优化
    3. 长列表大数据渲染

#### navigation timing API
1. unloadEventStart / end
   前一个页面的unload时间戳
   => 五前置页面时？ => 0
   => 前置页面域不同 => 0

2. redirectStart / end
   第一个http重定向发生的时间 /  最后一个http重定向完成的时间
   => 有跳转而且是同域名 => 否则值为0

3. fetchStart 
   浏览器准备好使用http请求获取页面数据

4. domainLookupStart / end
   开始/重新建立连接时间
   => 只是建立
   => 如果是长连接 => 值等于fetchStart

5. connectStart / end
   TCP建立握手的开始 / 完成

6. secure connectionStart (https)
   HTTPS 连接建立开始时间

7. requestStart / end
   请求发起时间

8. responseStart / end
   响应返回时间

9. domLoading
   开始解析渲染dom树 => readystatechange 事件 loading

10. domInteractive
    完成dom树的解析 => readystatechange => interactive
    => 这个时候并没有开始加载网页资源

11. domContentLoadedEventStart / end
    dom解析完成后， 开始 / 结束加载网页资源的时间

12. domComplete
    整体dom树解析完成

13. loadEventStart / end
    load 事件发送给文档 / 回调执行完成的时间

```js
   <script>
      javascript: (() => {
         const perfData = window.performance.timing
         const pageLoadTime = perfData.loadEventEnd = perfData.navigationStart
      })()
   </script>
```

#### 核心指标 Core Web Vitals
* Google提出 => 可衡量的、 能够反应真实体验的： 加载、 交互、视觉稳定性

#### FCP 首页加载时间 衡量首次加载时的性能



##### LCP - Largest Contentful Paint  衡量页面的装载性能
* 前2.5s内进行最大内容的渲染

a.最大内容包含了哪些？
- <img>元素
- <svg>
- <video>
- 通过url() 函数加载背景图片的元素
- 包含文本整体节点的块级元素

b.LCP值底下的原因
- 服务器响应慢
- 阻断渲染的js和css
- 资源加载慢
- 客户端渲染机器影响
  
c. 针对性能改造
- 服务器优化
  缓存HTML离线页面， 缓存页面资源， 减少浏览器对于资源的请求
  => 强缓存、 协商缓存

  尽量减少资源组端渲染： css 和 js做级联、内联、 合并
  
  对图片进行优化 jpg webp => 降低资源大小 => 加快请求速度

  使用cdn 加快请求速度

  利用项工程化 => HTML进行重写优化、 压缩空格、 去除注释、 去除打印、 调整格式
  提升首屏优化 => 懒加载、资源按需加载treeShake、 service worker、 服务端渲染

##### FID - First Input Delay  衡量交互性
* 页面首次输入的延迟应该小于100mx
  
  a. 减少js执行时间
  - 压缩js文件
  - 延迟执行不需要的js
  - 减少未使用的polyfill

  b. 分解耗时的任务
  - 任何阻塞主线程超过50ms => 长任务 树的操作， 转换成map结构， 对特定支点进行操作，不需要重新处理整棵树
  - 长任务拆分成较小的一部任务

  c. worker
   - web worker / service worker
   ```js
   const myWorker = new Worker('worker.js')
   ```
 ##### CLS -  cumulative layout shift 衡量视觉稳定性
 * 布局的移动可能发生在可见元素从一帧到下一帧改变的位置

   a. 不使用无尺寸的元素
   => srcset & sizes

   ```js
      <img srcset='yy-320w.jpg 320w, yy-480.jpg, yy-800w.jpg'  sizes="(max-width: 320px) 280px"/>
   ```
   b. 减少内容的插入 => 影响整体的布局
   c. 动态字体控制

 ##### CWV core web vitals annotations

 ##### bigpipe -- 页面分解成若干的pagelet
 1. 服务端接收来自苦厄局端HTTP请求
 2. 存储层



性能优化可以从两个角度
1. 基于指标优化的角度
   基于google提出的几个性能标准进行优化，这个需要借助performance工具进行测量

   1. FCP首页加载速度较慢： 
      网络
         缓存的使用
         减少请求数量
         使用CDN加速来解决
         使用懒加载动态加载， 仅有使用的时候才进行加载
      包体积
         减小包的加载体积 -> 代码压缩， 去除无用元素， css代码压缩
   2. FID first input delay  测试交互性， 输入延时

2. 状态
   1. 加载
      
   2. 运行