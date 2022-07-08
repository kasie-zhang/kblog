---
title: Navicat 远程连接 MySQL
date: 2021-05-24
cover: https://api.zk123.top/link/repo1/img/cover/88.webp
sidebar: 'auto'
categories:
- 教程
tags:
- MySQL
- 后端
- Navicat
- 数据库
publish: true
permalink: /article/88
---

> 第 88 篇文章
<!-- more -->

## 写在最前面
Navicat 远程连接 MySql，这一场景大多使用在：本机远程访问服务器的数据库，所以一定要确保服务器的防火墙允许 `3306` 端口通信。

我的 MySql 版本：8.0.17

远程连接大致分为三步：
- 1. 创建一个用于访问（服务器）数据库的用户，并配置能够访问的IP，用户名，密码
- 2. 授予用户权限：配置其能够访问的库表
- 3. 在MySql数据库中写入：以该用户名远程登录时所需的密码


## 配置
![](https://api.zk123.top/link/repo1/img/2021/navicat_remote_connect_mysql_1.png)

![](https://api.zk123.top/link/repo1/img/2021/navicat_remote_connect_mysql_2.png)
打开Navicat，选中本地数据库后，点击新建查询，将下面的代码粘贴进去，点击执行。

```mysql
CREATE USER '【用户名】'@'%' IDENTIFIED BY '【密码1】'; 
GRANT ALL ON `chain`.* TO '【用户名】'@'%'; 
ALTER USER '【用户名】'@'%' IDENTIFIED WITH mysql_native_password BY '【密码2】';
```

> 第一行中的 `'【用户名】'@'%'`

`【用户名】` 表示新创建的用户名

`%` 表示所有IP都能够远程访问。如果需要限制特定 IP 访问，可以修改这个值为具体 IP

`密码1` 表示新创建用户对应的密码

> 第二行
```md
第二行中的 `chain`.*

`chain` 表示库名称

.* 表示允许访问该库下的所有表
```

> 第三行

`【密码2】` 表示远程访问时输入的密码，可以与 `【密码1】`不同。


## 刨根问底
先来看看上面几行代码的作用。
首先，在 `mysql` 的 `user` 表里新建了一个用户。

然后将访问 `chain` 表的所有权限都赋予给这个用户。

`mysql_native_password` 这是MySql 8.0 新启用的加密插件，用于远程访问。

## 远程访问
- 连接名：随便起
- 主机：服务器的IP地址
- 用户名：之前设置的用户名
- 密码：【密码2】

![](https://api.zk123.top/link/repo1/img/2021/navicat_remote_connect_mysql_3.png)

![](https://api.zk123.top/link/repo1/img/2021/navicat_remote_connect_mysql_4.png)

完结，撒花! :cherry_blossom::cherry_blossom::cherry_blossom: