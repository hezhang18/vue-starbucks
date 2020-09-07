# vue-starbucks

## 1 简介

项目介绍：

这个项目是基于 Vue.js + Node.js + MongoDB 构建的前后端分离的单页面应用。网站采用响应式布局方案，适配 PC 端和移动端，包含商品展示、定位附近门店、登录注册、获取当前用户会员信息与消费记录等功能，较为完整的展现了星巴克官方网站的全貌。项目部署于[个人网站](https://www.hezhang18.cn)，欢迎访问。

项目文件介绍：

UploadFile 文件夹存放的是线上部署时需要上传的文件，包括：前端静态资源、HTTPS 服务端接口文件以及 Nginx 配置文件。

MongoData 文件夹存放的是网站数据（JSON 格式），建立好 MongoDB 数据库后，可直接将其中的文件导入数据库使用。

server 文件夹存放的是后端接口源码，用于在本地运行。

其他文件则是网站的前端源码。

## 2 技术栈

Vue + VueX + Vue-Router + Webpack + ES6 + Axios + Node(Express) + MongoDB

## 3 本地运行

为使项目能够在本地正常运行需提前安装 Node、npm (cnpm) 和 MongoDB。以下操作是基于 MacOS 进行的。

在本地创建一个文件夹（以 starbucks 为例）用于存放当前项目，然后将项目文件克隆至该文件夹内。打开终端进入到 starbucks 文件夹并输入如下命令：

```bash
# git clone https://github.com/hezhang18/vue-starbucks
```

### 3.1 启动前端项目

进入项目文件夹 vue-starbucks，安装依赖，启动前端项目。

```bash
# cd vue-starbucks
# npm install
# npm run dev
```

此时在浏览器输入：localhost:8080 即可访问到项目。

### 3.2 启动后端接口

启动后端接口前需要对后端代码做一个简单的修改。打开 /server/routes/linkedDB.js 文件，修改相应的数据库用户名与用户密码以及服务器的 IP 地址，本地 IP 为 127.0.0.1。

```
mongoose.connect('mongodb://DB_UserName:DB_PassWord@IP_Address:27017/vSbux', {useNewUrlParser: true});
```

打开终端进入存放后端接口源码的文件夹 server，安装依赖，启动后端接口。

```bash
# cd server
# npm install
# node bin/www
```

此时在浏览器输入：localhost:3000，页面是一个有 Express 字样的欢迎页面，此时表明后端接口启动成功。

### 3.3 MongoDB 配置

#### 3.3.1 为数据库创建用户及密码

- 打开终端，首先以非授权模式进入数据库：

```bash
# mongo
```

- 创建 admin 数据库:

```bash
# use admin
```

> 操作结果：
>
> switched to db admin

- 设置用户名及密码

```bash
# db.createUser({user:"UserName",pwd:"PassWord",roles:["root"]})
```

> 操作结果：
>
> Successfully added user: { "user" : "UserName", "roles" : [ "root" ] }

- 授权模式（此时需输入用户名密码）进入数据库，返回 1 表示进入成功。

```bash
# db.auth("UserName","PassWord")
```

> 操作结果：
>
> 1

- 如果以上操作都进展顺利，此时可以按照上述方法继续创建当前项目需要用到的数据库。

```bash
# use vSbux
```

> 操作结果：
>
> switched to db vSbux

```bash
# db.createUser({user:"UserName",pwd:"PassWord",roles:[{role:'dbOwner',db:'vSbux'}]})
```

> 操作结果：
>
> Successfully added user: {"user" : "UserName","roles" : [{"role" : "dbOwner","db" : "vSbux"}]}

- 使用授权模式重新开启数据库

```bash
# sudo mongod --auth
```

进行到这里，通过 MongoDB 可视化工具（推荐一款 Studio 3T）连接到数据库，此时可以看到已经创建好的 vSbux 数据库，在这个数据库下继续创建 8 个我们需要用到的集合：selection、beverages、coffee、food、merchandise、city、stores、users。集合创建完毕，将 MongoData 文件夹中的 JSON 数据导入到对应的集合中。

至此，整个项目前后端及数据库的本地搭建工作均已完成，如果一切进展顺利，那么整个项目已经可以在本地正常地运行了。

## 4 线上部署

这一部分将介绍如何将整个网站项目进行线上部署，并配置 HTTPS。以下操作是在阿里云服务器 ubuntu 18.04 操作环境下进行的。部署前需提前安装好 Node、npm (cnpm)、pm2、MongoDB 以及 Nginx。此外还需要通过命令 npm run build 将前端代码打包为生产版本备用。

### 4.1 MongoDB 配置

MongoDB 的安装可参考 [MongoDB 官方文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)，创建用户和数据库的操作方法与《 3.3 MongoDB 配置 》相同，不再赘述。

- ubuntu 18.04 下 MongoDB 常用操作命令：

```bash
# sudo service mongod start
# sudo service mongod stop
# sudo service mongod restart
# sudo service mongod status
```

### 4.2 Nginx 安装与 HTTPS 配置

- 使用 apt 安装：

```bash
# sudo apt install nginx
```

- 安装后的位置：

> /usr/sbin/nginx：主程序
>
> /etc/nginx：存放配置文件
>
> /var/www/html：存放静态文件
>
> /var/log/nginx：存放日志

- ubuntu 18.04 下 Nginx 常用操作命令：

```bash
# sudo systemctl start nginx
# sudo systemctl stop nginx
# sudo systemctl restart nginx
# sudo systemctl reload nginx
# sudo systemctl status nginx
```

- 上传 SSL 证书

最近阿里云网站不支持申请免费 SSL 证书，可在[腾讯云申请 SSL 证书](https://console.cloud.tencent.com/ssl)，申请完成将证书下载并保存至 cert 文件夹中。

```bash
# scp -r cert root@Server_IP:/usr/share/nginx
```

- 找到 Nginx 配置文件，修改相应配置

```bash
# vi /etc/nginx/sites-available/default
```

> Nginx 配置文件内容如下：

```
# Default server configuration
#
server {
        # SSL configuration
        #
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;
        ssl on;
        ssl_certificate /usr/share/nginx/cert/www.hezhang18.cn.pem;
        ssl_certificate_key /usr/share/nginx/cert/www.hezhang18.cn.key;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name hezhang18.cn;

        location / {
                try_files $uri $uri/ /index.html;
        }

        location /selection {
            proxy_pass https://127.0.0.1:3001/selection/;
        }

        location /beverages {
            proxy_pass https://127.0.0.1:3001/beverages/;
        }

        location /food {
            proxy_pass https://127.0.0.1:3001/food/;
        }

        location /coffee {
            proxy_pass https://127.0.0.1:3001/coffee/;
        }

        location /merchandise {
            proxy_pass https://127.0.0.1:3001/merchandise/;
        }

        location /storelocation {
            proxy_pass https://127.0.0.1:3001/storelocation/;
        }

        location /cityinfo {
            proxy_pass https://127.0.0.1:3001/cityinfo/;
        }

        location /users {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_pass https://127.0.0.1:3001/users/;
        }

        location /menu/users {
            proxy_pass https://127.0.0.1:3001/users/;
        }

        location /account/users {
            proxy_pass https://127.0.0.1:3001/users/;
        }

        location /account/profile/users {
            proxy_pass https://127.0.0.1:3001/users/;
        }
}

server {
        listen 80;
        server_name www.hezhang18.cn;
        rewrite ^(.*) https://$server_name$1 permanent;
}
```

> [附：HTTP 请求头中的 X-Forwarded-For](https://imququ.com/post/x-forwarded-for-header-in-http.html)

### 4.3 后端项目部署

- 连接远程服务器，在服务器根目录下创建 /workspace/sbux 文件夹用于存放当前项目的 HTTPS Server。

```bash
# cd /
# mkdir workspace
# cd workspace
# mkdir sbux
```

> 由于最终是要以 HTTPS 的方式访问，所以首先将证书保存一份至 httpsServer/cert 文件夹中。此外，在上传至服务器前还需要对后端接口的代码做一些相应的修改。

- 修改 httpsServer/bin/sbux-https-server 文件：

```
/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('server:server');
var https = require('https')
var fs = require('fs')

/**
 * Get credentials
 */

var privateKey  = fs.readFileSync('../cert/www.hezhang18.cn.key', 'utf8');
var certificate = fs.readFileSync('../cert/www.hezhang18.cn.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

/**
 * Get port from environment and store in Express.
 */

var sslport = normalizePort(process.env.PORT || '3000');
app.set('sslport', sslport);

/**
 * Create HTTPS server.
 */

var httpsServer = https.createServer(credentials, app);

/**
 * Listen on provided port, on all network interfaces.
 */

httpsServer.listen(sslport);
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpsServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

```

> 此外还需要检查 /utils/checkTools.js 文件中的 AllowDomain 配置是否正确，否则会因跨域请求受限导致接口无法访问。

- 上传至服务器

```bash
# cd sbux
# scp -r httpsServer root@Server_IP:/workspace/sbux
# cd httpsServer
# npm install
```

- 使用 pm2 启动后端接口

```bash
# cd /workspace/sbux/httpsServer
# pm2 start sbux-https-server
```

> pm2 常用命令：

```bash
# pm2 start fileName
# pm2 start all
# pm2 stop fileName
# pm2 stop all
# pm2 list
# pm2 log
```

### 4.4 前端项目部署

将打包好的文件上传至 Nginx 存放静态文件的文件夹中。终端进入打包生成的 dist 文件夹，输入如下命令：

```bash
# scp index.html root@Server_IP:/var/www/html
# scp -r static root@Server_IP:/var/www/html
```

备注：阿里云安全组

> 以上部署完毕，还需要在阿里云控制台配置安全组才能正常访问后端接口。
