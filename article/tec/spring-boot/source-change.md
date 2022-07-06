---
title: SpringBoot 使用阿里maven源
date: 2020-08-01
cover: https://api.zk123.top/link/repo1/img/cover/14.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- 配置
- Java
- 后端
publish: true
permalink: /article/14
---

> 第 14 篇文章
<!-- more -->

## 方法1
找到 C:\Program Files\Java\apache-maven-3.6.3\conf 目录中的 settings.xml

在 \<mirrors>\</mirrors> 标签内添加 mirror 子节点
```xml
<mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

## 方法2
在SpringBoot项目中的pom.xml文件下添加以下代码，可使用阿里代理仓库
```xml
<repositories>
    <repository>
        <id>aliyun</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>

<pluginRepositories>
    <pluginRepository>
        <id>aliyun-plugin</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </pluginRepository>
</pluginRepositories>
```