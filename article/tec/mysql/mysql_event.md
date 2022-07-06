---
title: MySQL 事件
date: 2022-04-18
cover: https://api.zk123.top/link/repo1/img/cover/119.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- MySQL
- 定时任务
publish: true
permalink: /article/119
---

> 第 119 篇文章
<!-- more -->

通过 MySQL 事件机制，你能够实现定时任务。

**举个例子：**

定时删除某张表中的某一条数据。

配置如下：
```sql
DROP EVENT IF EXISTS `AutoDeletePhoneVerifyCode`;
delimiter ;;
CREATE EVENT `AutoDeletePhoneVerifyCode`
ON SCHEDULE
EVERY '10' SECOND STARTS '2020-10-13 10:07:17'
DO DELETE FROM phoneverify 
WHERE TIMESTAMPDIFF(SECOND,create_time,NOW()) > 300
;
;;
delimiter ;
```
