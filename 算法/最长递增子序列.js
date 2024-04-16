// arr = [7, 13, 18, 15, 8, 10, 11 ,12]

/**
 * 当遍历的数据大于最后一个时，直接添加
 * 当遍历的值小于最后一个值时， 从数组中找出第一个大于该值的下标，替换该值
 */

function handleQueue(arr) {
  const res = [arr[0]]
  for(let i = 0; i < arr.length; i++){
    if( arr[i] > res[res.length - 1]){
      res.push(arr[i])
    }else{
      splitValue(res, arr[i])
    }
  }

  function splitValue(nums, target){
    const index = nums.findIndex(item => item > target)
    if(index > 0){
      nums[index] = target
    }
  }

  return res
}

const arr = [7, 13, 18, 15, 8, 10, 11 ,12]

handleQueue(arr)