/**
 * 要求输入： [1, 2, 3, 6, 8, 9, 12]
 * 输出： ["1-3", 6, "8-9", 12]
 */

function groupByContinue(arr){
  const result = []
  let start = arr[0]
  let end = arr[0]
  for(let i = 1 ; i < arr.length; i++ ){
    if(arr[i] - end === 1){
      end = arr[i]
    }else{
      result.push(getRangeString(start, end))
      start = arr[i]
      end = arr[i]
    }
  }
  // 处理最后一个
  result.push(getRangeString(start, end));
  return result
}

function getRangeString(start, end) {
 return end === start  ? start : `${start}-${end}`
}

const arr = [1, 2, 3, 6, 8, 9, 12]
console.log(groupByContinue(arr))

/**
 * input: 12567323.3345
 * output: 12,567,323.3345
 */
function formatFinancial(number){
  const strValue = number.toString()
  let regexp = strValue.includes('.') ? /(?=\B(\d{3})+\.)/g : /(?=\B(\d{3})+$)/g
  return strValue.replace(regexp, ',')
}
const number = 12567323.31342
const number2 = 1256732
console.log(formatFinancial(number))
console.log(formatFinancial(number2))

/**
 * 给定一个数组和一个目标值，找出数组中三个数的和等目标值相近，返回这三个数的和，
 * nums = [-1,2,1,-4], target = 1
 * 输出：2
 * 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。  
 */

function getData(nums, target){
  // 思路： 先排序 三个数  目标相近  固定一个值 
  // 判断条件： a b c
  //  变量： sumValue  diffValue = sumValue - a -b -c
  // 1,2,3,4,5,6  -> 8
  nums.sort((a,b) => a - b)
  let sumValue = nums[0] + nums[1] + nums[2]
  let minDiff = Math.abs(sumValue - target)
  for(let i = 0; i < nums.length - 2; i++){
    let left = i + 1
    let right = nums.length - 1
    while(left < right ){
      const sum = arr[i] + arr[left] + arr[right]
      const diff = Math.abs(sum - target)
      if(diff < minDiff) {
        minDiff = diff
        sumValue = sum
      }

      // 挪动指针
      if(sum < target) {
        left++ // 变大
      }else{
        right-- // 变小
      }
    }
  }
  return sumValue
}