/**
 * 二分算法优于线性查找， 不需要遍历所有元素，时间复杂度为O(log n)
 */
function binarySearch(arr, target) {
  let start = 0
  let end = arr.length - 1
  
  while(start <= end){
    // 找到中间值
    let mid = Math.floor((start + end) / 2)
    let midValue = arr[mid]
    if(midValue === target){
      return mid
    }else if(midValue > target){
      // 移动指针缩小范围
      end = mid - 1 // -1 再次缩小范围
    }else{
      start = mid + 1
    }
  }
  // 未找到返回 -1
  return -1
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15]
console.log(binarySearch(arr, 9)) // 4

/**
 * 给定数组 [3, 2, 8, 9, 5, 6, 7, 11, 15, 4]，返回该数组的最长递增子序列下标集合
 * res: [1,4,5,6,7,8]
 * 运用贪心算法 + 二分查找
 */

function longestIncreasingSubsequence(nums) {
  const piles = [];
  for (let num of nums) {
    let left = 0, right = piles.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (piles[mid] >= num) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    piles[left] = num;
  }

  return { sequence: piles, index: [...Array(piles.length).keys()] };
}

const nums = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];
const { sequence, index } = longestIncreasingSubsequence(nums);
console.log("最长递增子序列:", sequence);
console.log("最长递增子序列下标:", index);