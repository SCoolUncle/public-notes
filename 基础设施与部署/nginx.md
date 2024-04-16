# Nginx

介绍

## 安装

### 操作环境说明

- 操作系统：阿里云云服务器ECS CentOS 
- 远程连接工具：finalShell
- 阿里云的安全组规则要添加你要使用的ip地址段

### 开始

- finalSheel 链接远端服务器

- 执行命令`yum info nginx` 查看资源库中可以安装的nginx软件包信息
- 执行命令`yum install nginx -y` 安装nginx
- 执行命令`nginx -v`查看nginx安装版本确认安装成功
- 执行命令`whereis nginx`查找出nginx相关目录

> **/etc**：这个目录用来存放所有的系统管理所需要的配置文件和子目录
>
> **/etc/nginx**：这里有nginx.conf配置文件
>
> **/usr**：这个目录用来存放用户很多应用程序和文件
>
> **/usr/share/nginx**：这里有html和modules

## nginx命令

查看帮助 `nginx -h` 

> -v:	显示版本并退出
>
> -V:	显示版本和配置选项，然后退出
>
> -t:	测试配置和退出
>
> -T:	测试配置，转储并退出
>
> -q:	在配置测试期间禁止显示非错误消息
>
> -s 信号：向主进程发送信号：停止、退出、重新打开、重新加载
>
> -p prefix：设置前缀路径（默认值为：usr/share/nginx/）
>
> -c 文件名：设置配置文件（默认为/etc/nginx/nginx.conf）
>
> -g 指令：从配置文件中设置全局指令

## 启动 

执行命令`nginx`

> linux 命令成功后无提示

停止 `nginx -s top`

查看状态 `systemctl status nginx`

## 测试 

http://ip:80 ,可以看到（nginx配置文件中默认80端口）,nginx默认端口是80

## 服务端代理

丢在服务端的代理都是反向代理

```conf
vi /etc/nginx/nginx.conf  回车

i  修改    esc 退出修改模式

:wq  保存退出
:q  退出不保存

http {
    server {
        listen       nginx端口 default_server;
        listen       [::]:nginx端口 default_server;
	    	
	    	# 前端静态工程文件位置
	    	root 	     /usr/local/react;
	    	
				# 处理代理转发到服务端1
        location ~ /api/ {
          proxy_pass  http://转发ip:9001;
        }
				
				# 处理代理2
        location ~ /mock/ {
        	proxy_pass  http://转发域名:3333;
        }
				
				# 处理 历史记录模式路由404后返回主页面
        location / {
          try_files $uri $uri/ /index.html;
        }

    }
}
```

## 配置详解

配置文件中的内容（全局块，events，http）

### 全局块

从配置文件开始到 events 块之间的内容，主要会设置一些**影响 nginx 服务器整体运行的配置指令**，主要包括配置运行 Nginx 服务器的用户（组）、允许生成的 worker process 数，进程 PID 存放路径、日志存放路径和类型以及配置文件的引入等

```conf
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;
```

> worker_processes 值越大，可以支持的并发处理量也越多，但是
>
> 会受到硬件、软件等设备的制约

### events 块

events 块涉及的指令主要**影响 Nginx 服务器与用户的网络连接**，常用的设置包括是否开启对多 work process下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 wordprocess 可以同时支持的最大连接数等

```conf
events {
    worker_connections 1024;
}
```

> 配置对 Nginx 的性能影响较大，在实际中应该灵活配置

### http 块

代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里。需要注意的是：http 块也可以包括 http 全局块、server 块

#### http 全局块

http 全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等

```conf
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    include /etc/nginx/conf.d/*.conf;
}
```

#### server 块

这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。而每个 server 块也分为全局 server 块，以及可以同时包含多个 locaton 块

```conf
// 定义在http里面

server {
    listen       9006 default_server;
    listen       [::]:9006 default_server;
    server_name  _;
    # root         /usr/share/nginx/html;
  	root 	     /usr/local/react;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location ~ /api/ {
       proxy_pass  http://39.104.114.140:9001;
    }

    location ~ /mock/ {
       proxy_pass  http://39.104.114.140:3333;
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

##### 全局 server 块

最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或 IP 配置。

#### location 块

一个 server 块可以配置多个 location 块。这块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称（也可以是 IP 别名）之外的字符串（例如 前面的 /uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行



## **负载均衡**

把同一地址的多次请求，分发到不同的服务器，准备多个服务器

### upstream

```conf
#gzip on;
upstream myserver{
	server xxx.xxx.xx.xxx:8081 weight=4;
	server xxx.xxx.xx.xxx:8082 weight=2;
}
server {
	...
	location / {
		proxy_pass http://myserver;
	}
}
```

### **分配服务器策略**

#### **第一种 轮询（默认）**

每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器 down 掉，能自动剔除。

#### **第二种 weight**

weight 代表权重默认为 1,权重越高被分配的客户端越多

 ```conf
upstream myserver{
	server xxx.xxx.xx.xxx:8081 weight=4;
	server xxx.xxx.xx.xxx:8082 weight=2;
}
 ```

#### **第三种 ip_hash**

每个请求按访问 ip 的 hash 结果分配，这样每个访客固定访问一个后端服务器

 ```conf
upstream myserver{
	ip_hash;
	server xxx.xxx.xx.xxx:8081;
	server xxx.xxx.xx.xxx:8082;
}
 ```

#### **第四种 fair（第三方）**

按后端服务器的响应时间来分配请求，响应时间短的优先分配。

 ```conf
upstream myserver{
	server xxx.xxx.xx.xxx:8081;
	server xxx.xxx.xx.xxx:8082;
	fair;
}
 ```

## **动静分离**

![](https://img2018.cnblogs.com/blog/1455597/201910/1455597-20191029103503613-506507153.png)

动态请求跟静态请求分开,使用 Nginx处理静态页面，服务端处理动态页面，通过 location 指定不同的后缀名实现不同的请求转发。通过 expires 参数设置，可以使浏览器缓存过期时间，减少与服务器之前的请求和流量。也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。此种方法非常适合不经常变动的资源。

**方案1**

纯粹把静态文件独立成单独的域名，放在独立的服务器上，也是目前主流推崇的方案

**方案2**

动态跟静态文件混合在一起发布，通过 nginx 来分开

**配置**

```conf
server{
  location /www/ {
  	root /data/;
  	index index.html index.htm
  }
  location /image/ {
  	root /data/;
  }
}
```

**测试**

测试动静分离是否成功，之需要删除后端 服务器上的某个静态文件，查看是否能访问，如果可以访问说明静态资源 nginx 直接返回了，不走后端服务器

## **nginx原理**

### mater 和 worker

 ![img](https://img2018.cnblogs.com/blog/1455597/201910/1455597-20191029103710873-640599395.png)

 

 ![img](https://img2018.cnblogs.com/blog/1455597/201910/1455597-20191029103717881-58535625.png)

### worker 如何进行工作的

![img](https://img2018.cnblogs.com/blog/1455597/201910/1455597-20191029103730680-1429030716.png)

### 一个 master 和多个 woker

（1）可以使用 nginx –s reload 热部署，利用 nginx 进行热部署操作

（2）每个 woker 是独立的进程，如果有其中的一个 woker 出现问题，其他 woker 独立的，

继续进行争抢，实现请求过程，不会造成服务中断

### 设置多少个 woker 合适

worker 数和服务器的 cpu 数相等是最为适宜的

### 连接数

第一个：发送请求，占用了 woker 的几个连接数？

答案：2 或者 4 个

 ![img](https://img2018.cnblogs.com/blog/1455597/201910/1455597-20191029103745507-149451607.png)

第二个：nginx 有一个 master，有四个 woker，每个 woker 支持最大的连接数 1024，支持的

最大并发数是多少？

l 普通的静态访问最大并发数是： worker_connections * worker_processes /2，

l 而如果是 HTTP 作 为反向代理来说，最大并发数量应该是 worker_connections *

worker_processes/4。