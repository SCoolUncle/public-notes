## AST & 脚手架

- 构建工具
  - webpack plugin loader
  - babel
  - postcss
  - eslint
- 开发框架
  - React jsx语法解析
  - Vue 模版解析 compile

## 概念

抽象语法树

## AST 流程
编译 从一种高级语言 转换成另一种低级语言

高级语言：JS/ java / c / Golang

低级语言 汇编 机器语言

转化过程就是编译原理的过程

前端： 从比较高级的语言 -》 转换比较低级 应用层面

## 编译器基本思路

add(1+1)

- 语法分析 tokenizer input -> token
  
  @babel/parser
- 