
## XMLHttpRequest 

```javascript
const request = new XMLHttpRequest()

request.open('POST', '/api', true)

// post 方式需要设置请求头
request.setRequestHeader('Content-Type', 'application/x-www-urlencoded')

// 该方法需要再send之前， 防止拿不到其他状态 0: 请求未初始化 1：服务器建立连接 2：请求已经接收 3：处理中 4：已经收到响应
request.onreadystatechange = function() {
  if(request.readyState === 4 && request.status === 200){
    console.log( JSON.parse(request.responseText))
  }else{
    console.log('error')
  }
}

request.send('name=li&age=12')

```

```javascript


/**
 * 实现一个类似jQuery 中 $ajax 的方法， 可以指定请求类型
 */
function ajax(type, url, data, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      success(JSON.parse(xhr.responseText) );
  }
  // 只有readyState === 4 时 才会触发onload
  // xhr.onload = function() {
  //   if (this.status >= 200 && this.status < 400) {
  //     callback(JSON.parse(this.responseText));
  //   } else {
  //     console.log('Error'+ this.status);
  //   }
  };

  xhr.open(type, url);
  xhr.send(data);
}

 function ajax(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      callback(null, this.responseText);
    } else {
      callback('Error'+ this.status);
    }
  };

  xhr.open('get', url, true);
  xhr.send();
}
```