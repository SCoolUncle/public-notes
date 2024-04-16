### 初始化
```node
// 提交之前
npx husky add .husky/pre-commit 'npm run link'
// 提交之后
npx husky add .husk/post-commit 'npm run publish'
```
会在项目中生成.husky 文件夹， 并且生成post-commit pre-commit 两个文件

