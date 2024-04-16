## 为什么要构建 monorepo , monorepo 是什么

Monorepo 最早的出处是软件开发策略的一个分支， “mono" 表示单一”repo" 是 repository 的缩写，意为多个项目共用一个代码库来管理依赖关系，同一套配置文件，统一构建部署

### mono 做了什么？

1. 更好的代码复用， 可以让所有项目集中于单一仓库，易于抽离出公用的业务组件或者工具
2. 整体的构建、测试逻辑统一，方便协作
   
## 使用pnpm 构建 mono

### 主要步骤

1.添加yaml文件

```yml
packages:
  -"packages/**"
```

2.创建项目文件和第三方库文件夹

一般情况下
- apps: web 项目
- components: 组件库
- libs: 工具

```
// 共建软连接
pnpm add @proj/react-components --filter @proj/react-x
单向软连接
pnpm add --link 
pnpm add -W 全局
pnpm --filter  monorepo 环境中过滤出特定的包或项目进行操作
```


### 