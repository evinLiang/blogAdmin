# blogAdmin

> 一个`博客后台`项目,node框架：[express](http://www.expressjs.com.cn/)、UI：[bulma](https://bulma.io)

## Build Setup

``` bash
# 因为数据库信息不公开，所以要建一个数据库信息表，文件名为databaseConfig.js,放在modules文件夹下
module.exports = {
	connectionLimit : 50,//数据库链接超时时间
	host:'数据库地址',
	user:'数据库用户名',
	password:'数据库密码',
	database:'数据库',
	port:端口号
}

# 拉取代码
https://github.com/evinLiang/blogAdmin.git

# 进入项目文件夹
cd blogAdmin

# 安装依赖
npm install

# 运行
npm start => `http://localhost:3000`
```