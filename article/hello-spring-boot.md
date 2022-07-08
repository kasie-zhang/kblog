---
title: Hello SpringBoot
date: 2020-07-25
cover: https://api.zk123.top/link/repo1/img/cover/9.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- 后端
publish: true
permalink: /article/9
---

> 第 9 篇文章
<!-- more -->

# 使用IntelliJ IDEA创建SpringBoot项目

## 1.Setting 

选择创建项目

## 2.选择Spring Initializr

## 3.输入项目基本信息
:::tip 提示
注意Java版本最高只能选择8
:::

## 4.选择依赖
你可以根据项目的需要，适当勾选相关依赖，之后IDEA会自动将选中的依赖加入到项目的pom.xml文件中

## 5.选择项目创建路径
:::tip
经过上面的步骤，一个可运行的项目就创建成功了
:::

## 6.创建SpringBoot的第一个页面
根据图片指示，在com.zk.chapter02目录下创建Controller文件夹，并创建helloController.java文件
![](https://api.zk123.top/link/repo1/img/2020/hello_spring_boot_1.png)

文件中写入:
```java
package com.zk.chapter02.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {
    @GetMapping("/hello")
    public String hello() {
        return "hello SpringBoot!";
    }
}
```
保存并执行项目！ 至此，HelloSpring项目搭建完成。

**项目预览：**

![](https://api.zk123.top/link/repo1/img/2020/hello_spring_boot_2.png)
