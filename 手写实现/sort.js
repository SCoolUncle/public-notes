// 测试数据
const testArr = [1,2,3,5,4,6]

/**
 * 1. 快速排序
 * @param {Array} arr - 目标数组
 * @param {Boolean} type - 排序类型 默认正序(true)
 * @returns {Array} 排序后的数组
 */
function quickSort(arr, type = true) {
  if(arr.length <= 1) return arr
  const left = []
  const right = []
  const medIndex = Math.floor(arr.length / 2)
  const medValue = arr.splice(medIndex, 1)[0]

  for(let i = 0; i < arr.length; i++){
    if((arr[i] < medValue && type) || (arr[i] >= medValue && !type)){
      left.push(arr[i])
    }else {
      right.push(arr[i])
    }
  }

  return [...quickSort(left), medValue, ...quickSort(right)]
}
console.log(quickSort(testArr))

/**
 * 2. 冒泡排序
 * @param {Array} arr - 目标数组
 * @param {Boolean} type - 排序类型 true为升序 默认为true 
 * @returns {Array} 排序后的数组
 */
function bubbleSort(arr, type = true) {
  if(arr.length <= 1) return arr
  const copyArr = [...arr] // 防止改变原数组
  let flag // 如果是已经排序数组跳出循环
  for(let i = 0; i < copyArr.length - 1 ; i++){
    flag = false
    for(let j = 0; j < copyArr.length - i - 1; j++){
      if((copyArr[j] > copyArr[j+1] && type) || (copyArr[j] < copyArr[j+1] && !type)){
        const temp = copyArr[j+1]
        copyArr[j+1] = copyArr[j]
        copyArr[j] = temp
        flag = true
      }
    }
    
    if(!flag) break
  }

  return copyArr
}
console.log(bubbleSort(testArr))

/**
 * 3. 手机号校验正则
 * 简单校验, 验证第二位
 */
const checkPhoneNumRegex = /^[1][3-9]\d{9}$/
const checkPhoneNumRegexWeak =  /^[1]\d{10}$/

/**
 * 4. js字符串替换
 */
function replaceStr(target, searchValue, replaceValue) {
  return target.replace(new RegExp(searchValue, "g"), replaceValue)
  // 如果不考虑兼容性,可以使用 replaceAll 方法
}

/**
 * 5. js实现一个页面展示所有任务链接，并且可以新建任务
 */

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    html{
      height: 100%;
    }
    body{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #taskList{
      list-style: none;
      display: flex;
      flex-direction: column;
    }
  </style>
</head>
<body>
  <div class="content">
    <h1>Task List</h1>
    <input id="taskInput" type="text" placeholder="Enter a task">
    <button onclick="addTask()">Add Task</button>
    <div id="taskList"></div>
  </div>
  <script>
    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value;

      const itemBox = document.createElement('div');

      const listItem = document.createElement("a");
      listItem.setAttribute("href", "#");
      listItem.textContent = taskText;
      taskInput.value = "";

      const button = document.createElement('button')
      button.textContent = '删除'
      button.addEventListener('click', () => {
        taskList.removeChild(itemBox)
      })

      itemBox.appendChild(listItem);
      itemBox.appendChild(button)

      const taskList = document.getElementById("taskList");
      taskList.appendChild(itemBox);

    }
  </script>
</body>
</html>



