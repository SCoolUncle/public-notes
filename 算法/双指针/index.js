// 题目：
// 有两个有序数组， 【1,2,3,5,7]  [2,3,4,8,9]
// 将两个数组按照当前顺序进行合并

// 思路： 有序数组， 按照最小长度的数组进行循环比对

function mergeSortedArrays(arr1, arr2) {
  let i = 0; // arr1的指针
  let j = 0; // arr2的指针
  const result = []; // 结果数组

  // 当两个数组都还有元素时
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  // 处理剩余元素
  // 如果arr1还有剩余，将其全部添加到结果数组
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  // 如果arr2还有剩余，将其全部添加到结果数组
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

const arr1 = [1,2,3,5,7];
const arr2 = [2,3,4,8,9];
const mergedArray = mergeSortedArrays(arr1, arr2);
console.log(mergedArray); // 输出：[1, 2, 2, 3, 3, 4, 5, 7, 8, 9]