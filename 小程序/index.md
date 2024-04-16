### 小程序

#### 基本项目目录
* pages 页面目录
  * index 某个页面的全部内容
  * index.js 页面逻辑
  * index.json 页面配置
  * index.wxml 模版
  * index.wxss 样式
* app.js 全局入口文件
  *  pages 页面路由
  *  window 窗口
  *  tabBar 底部tab
  *  entryPagePath 入口配置
  *  networkTimeout 网络超时配置
  *  style 组件库版本
  *  subpackages 分包路径
* app.wxss 全局样式文件
* project.config.json 项目配置文件
* stiemap.json 微信索引配置文件

### App Service
* App 注册程序
  * onLaunch 小程序初始化
  * onShow 小程序启动，或者被切到前台
  * onHide 小程序被切到后台
  * onError 全局错误监听 =》 小程序错误上报
  * onPageNotFound 页面不存在
  * onThemeChange 主题切换
* Page 注册页面
  * onLoad / onUnload 页面的加载 / 卸载
  * onReady 页面的初始化渲染
  * onPageScroll 页面滚动
  * onTabItemTap 点击tab出发