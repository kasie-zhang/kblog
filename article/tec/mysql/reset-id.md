---
title: MySQL在不清除数据的情况下重置id自增长
date: 2020-08-01
cover: https://api.zk123.top/link/repo1/img/cover/15.webp   
sidebar: 'auto'
categories:
- 笔记
tags:
- MySQL
- 后端
- 数据库
publish: true
permalink: /article/15
---

> 第 15 篇文章 
<!-- more -->

## 使用方法
```sql
alter table book drop id;

alter table book add id bigint primary key not null auto_increment first;
```
:::tip 说明
其中的book是你当前数据库的表名

本质就是删除id字段，再加上id字段，不会影响原有数据。
:::

## 实现效果
当前数据库：

![](https://api.zk123.top/link/repo1/img/2020/mysql_reset_id_1.png)

重置后的数据库：

![](https://api.zk123.top/link/repo1/img/2020/mysql_reset_id_2.png)

大功告成！ :rainbow: :rainbow: