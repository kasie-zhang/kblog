---
title: 安装Java 并配置环境变量
date: 2020-10-28
cover: https://api.zk123.top/link/repo1/img/cover/35.webp
sidebar: 'auto'
categories:
- 教程
tags:
- java
- 配置
publish: true
permalink: /article/35
---

> 第 35 篇文章
<!-- more -->

## 下载Java
[Oracle官网下载地址](https://www.oracle.com/cn/java/technologies/javase/javase-jdk8-downloads.html)


[KDrive下载地址](https://drive.zk123.top/api/v3/file/source/107/jdk-8u271-windows-x64.exe?sign=5vHUztX5TgEbNv-5f-0TtQn0IOqE07K_kzvN2d56JiM%3D%3A0)




## 安装
安装过程非常简单，故省略...

## 设置环境变量

1. 在系统变量中新建 `JAVA_HOME`

变量名 `JAVA_HOME`，变量值 电脑上JDK的安装路径如 `C:\Program Files\Java\jdk1.8.0_251`

<img src="https://api.zk123.top/link/repo1/img/2020/java_install_1.png"/>


2. 在系统变量中新建 `CLASSPATH`, 变量值为 `.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`

![](https://api.zk123.top/link/repo1/img/2020/java_install_2.png)

3. 在系统变量的Path中添加两条记录： `%JAVA_HOME%\bin;` 和 `%JAVA_HOME%\jre\bin;`
![](https://api.zk123.top/link/repo1/img/2020/java_install_3.png)

## 测试java是否安装成功
打开 cmd 

输入 `javac`,若提示不是内部或外部命令，则java安装失败，需要重新安装。

![](https://api.zk123.top/link/repo1/img/2020/java_install_4.png)

输入 `java -version` 若安装成功则显示：

![](https://api.zk123.top/link/repo1/img/2020/java_install_5.png)

输入 `java` 若安装成功则显示：

![](https://api.zk123.top/link/repo1/img/2020/java_install_6.png)