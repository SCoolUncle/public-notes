/**
 * 并发请求, 返回一个promise, 结果数组
 * @param {Array} requests - 要处理的球球数组
 * @param {number} maxNum - 最大并发数量
 */
function handleConcurrentRequests(requests, maxNum) {
  // 判断是否传入的请求数组长度是否大于等于 maxNum
  if (requests.length <= maxNum) return Promise.all(requests);

  // 存储结果
  const result = new Array(requests.length);
  let count = 0; // 当前已完成的请求数
  let currentIndex = 0; // 当前要发起请求的索引

  return new Promise((resolve, reject) => {
    // 定义一个请求函数，用于发起请求
    async function request() {
      if (currentIndex >= requests.length) return

      const index = currentIndex; // 保存当前索引
      currentIndex++; // 增加当前索引

      try {
        const data = await requests[index];
        result[index] = data;
      } catch (error) {
        result[index] = null;
      } finally {
        count++;

        // 判断是否全部执行完成
        if (count === requests.length) {
          resolve(result);
        } else {
          // 继续发起下一个请求
          request();
        }
      }
    }

    // 初始并发请求的次数
    for (let i = 0; i < maxNum; i++) {
      request();
    }
  });
}


// 测试
function createFn(num){
  const arr = []
  while(num--){
    arr.push(
      function () { 
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('haaahha')
            resolve(num)
          }, num * 10)
        })
      }
    )
  }
  return arr
}

createFn(5)