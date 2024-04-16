### 请求头

**Content-Type 请求体类型**

application/json  

x-application/x-urlencode

multipart/form-data

构成：大类型/小类型

### 响应头

**Content-Type 响应体类型**

响应体类型， 直接决定了内容如何显示

浏览器是根据 Content-Type 中的类型来处理响应数据的

###文件上传分解

Content-Type: application/json  如果使用json格式上传文件，一般是要使用dataUrl 进行上传 , 改方法有个缺点，进行base64编码后的 dataUrl 会比原数据大 1/3 左右

Content-Type: multipart/form-data; boundary=aaa (分隔符， 自个约定)

http 请求

```http
POST /file/upload HTTP/1.1
Host: cooluncle.top:9527
Content-Type: multipart/form-data; boundary=hhh （分隔符， 可随便定义）

--hhh
Content-Disposition: form-data;name="avatar"; filename="person.jpg"
Content-Type: image/jpeg

二进制文件
--hhh--
```

上传文件中 Content-Type  Content-Disposition  这些个内容不需要手动进行设置， 可以使用const form = new FormData() 来生成 multipart/form-data 格式的请求体

使用 form.append( 文件名， 二进制数据，... ) 方法为请求提添加上传的文件

示例

```html
<input type="file" name="avatarcopy" onchange="loadFile" multiple>
```

```javascript
function loadFile(evt) {
      console.log(evt.target.files)
      const files = evt.target.files
      console.log(file.size) // b

      const formData = new FormData()


      files.forEach((item) => {
        formData.append(item.name, evt.target.result)

        const reader = new FileReader()

        reader.onload = function (evt) {
          console.log(evt.target.result) // 用于反显图片
        }

        reader.readAsDataURL(item)
      })
      
      fetch('/api', {
        method: 'POST',
        body: formData
      })
    }
```







