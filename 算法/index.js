/**
 * 去两个数组的交集
 * 【1,2,3,4] [0,3,4,5]
 */

function getEq(arr, arr1){
  let res = new Set(arr)

  for(let i = 0; i < arr1.length; i++){
    if(!res.has(arr1[i])){
      arr.splice(i, 1)
    }
  }
  
  return arr
}

/**
 * 
 */