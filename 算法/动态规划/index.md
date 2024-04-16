# 动态规划

青蛙跳台问题

台阶数量 n

这个问题其实可以分解为两种情况

f(n) = 最后跳 2 阶出现此时 + 最后跳 1 阶出现次数

f(n) = f(n -2) + f(n -1)

```javascript
function f(n) {
  if(n <= 0) {
    throw new Error('n must be a positive integer');
  }
  if(n <= 2) return n
  return f(n - 2) + f(n - 1)
}

// 循环方式
function f(n) {
  if(n <= 0) {
    throw new Error('n must be a positive integer');
  }
  if(n <= 2) return n
  let last1 = 2
  let last2 = 1
  // 从第三节台阶开始循环
  for(let i = 3; i <= n; i++){
    let temp = last1
    last1 = last1 + last2
    last2 = temp
  }
  return last1
}
```