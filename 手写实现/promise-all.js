/**
 * 实现一个promiseall
 */
function myPromise(promises){
  return new Promise((resolve, reject) => {
    // 判断是不是数组
    if(Array.isArray(promises)){
      return reject(new Error('should be array'))
    }

    const result = []
    const count = 0

    // 如果长度为0 直接resolve
    if(promises.length === 0){
      resolve(result)
    }

    for(let i = 0; i < promises.length; i++){
      // 处理非promise对象的情况， 如果是promise 直接返回当前promise,不是返回一个新的promise对象值作为fulfilled的值
      Promise.resolve(promises[i]).then(res => {
        result[i] = res
        count++
        if(count === promises.length){
          resolve(result)
        }
      }).catch(error => {
        reject(error)
      })
    }
  })
  
}