---
title: SpringBoot Application.properties
date: 2020-11-20
cover: /img/cover/45.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- 配置
publish: true
permalink: /article/45
---

> 第 45 篇文章
<!-- more -->

自定义部分属性，并在项目中使用！

## Application.properties

``` md
server.port= 8081

# personal properties
book.name = "The World \u54c8"

book.author = "ZK"

# 使用随机数
# Random String
book.value = ${random.value}

# Random int under 1000
book.int = ${random.int(1000)}

# Random long
book.long = ${random.long}

# Random uuid
book.uuid = ${random.uuid}

# 自定义属性之间的引用
book.title = 书名是: ${book.name}
```


## TestController

```java
@RestController
public class TestController {

    @Value("${book.name}")
    public String bookName;

    @Value("${book.author}")
    public String bookAuthor;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test(){
        return "The Book Name is "+bookName+", The bookAuthor is "+ bookAuthor;
    }
}
```


## Result
访问网址: `http://localhost:8081/test`

得到:`The Book Name is "The World", The bookAuthor is "ZK"`

## 解决中文乱码

官方推荐做法是使用Unicode字符的方式来展示字符。

将相关的汉字替换成 Unicode 字符。 