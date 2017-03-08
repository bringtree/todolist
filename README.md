VUE + KOA +mongoDB 实现 注册-登陆-留言评论-按时间排序-点赞-按赞排序 功能

方法使用

1 cd hmttask

2 cnpm install 

3 cd server

4 cnpm install

5 安装mongodb

6 MAC用户 先启动mongod ->再启动 mongo，其他用户不详

7 node app.js(在server目录下) 可能会缺一些模块自行按警告cnpm install（之前忘记-s了）

8 npm run dev (启动项目)

已知bug

1打包后 部分页面不能打开，故没有打开

2在todolist页面登录后如果刷新会导致评论名字消失（state中的数据消失了）

3可以无限赞👍

4各种不健全 容易发生各种不可预料的奇葩问题

第一次写 koa mongodb vue2，很多都是东补一块西补一块

感谢各路大佬的各种帮忙！
