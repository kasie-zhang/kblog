---
title: 解决Tomcat运行乱码
date: 2021-04-18
cover: /img/cover/74.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- 运维
- Tomcat
publish: true
permalink: /74
---

> 第 74 篇文章
<!-- more -->

## 解决方案
1. 定位到 tomcat 解压目录, 找到 `conf`文件夹下的 `logging.properties` 文件。

2. 使用编辑器打开该文件, 定位到 `java.util.logging.ConsoleHandler.encoding=` 该字段。

3. 将 `java.util.logging.ConsoleHandler.encoding = UTF-8` 的编码格式更改为 `GBK`。

4. 保存修改后，重启tomcat服务，乱码问题解决。