---
title: SpringBoot 整合视图层技术 以Thymeleaf为例
date: 2020-07-28
cover: /img/cover/11.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Thymeleaf
- Java
- 后端
publish: true
permalink: /11
---

> 第 11 篇文章
<!-- more -->

# 前言
---
[Thymeleaf](https://www.thymeleaf.org/)是新一代Java模板引擎，类似于Freemaker，Velocity等传统Java模板引擎。 与传统模板引擎不同的是
Thymeleaf支持HTML原型，既可以让前端工程师在浏览器中直接打开查看样式，也可以让后端工程师结合真实数据查看效果。
同时，SpringBoot提供了Thymeleaf自动化配置方案，因此在SpringBoot中使用Thymeleaf非常方便。

在目前企业级开发中，前后端分离是趋势，但是视图层技术还有一席之地。 SpringBoot对视图层及时提供了很好的支持。
官方推荐使用的模板引擎是Thymeleaf，本文也就采用Thymeleaf进行开发。

# 实战
## 1. 创建工程，添加依赖
新建一个SpringBoot项目，添加spring-boot-starter-web 和 spring-boot-starter-thymeleaf依赖,代码如下
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```
## 2. 配置控制器
创建Book实体类，然后在Controller中返回ModelAndView
```java
//Book.java
public class Book {
    private Integer id;
    private String name;
    private String author;
    public Integer getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public String getAuthor(){
        return author;
    }
    public void setId(Integer _id) {
        id = _id;
    }
    public void setName(String _name) {
        name = _name;
    }
    public void setAuthor(String _author) {
        author = _author;
    }
}
 ```
```java 
//BookController.java
@Controller
public class BookController {
    @GetMapping("/books")
    public ModelAndView books()
    {
        List<Book> bookList = new ArrayList<>();
        Book b1 = new Book();
        b1.setAuthor("罗贯中");
        b1.setId(1);
        b1.setName("三国演义");
        Book b2 = new Book();
        b2.setName("红楼梦");
        b2.setId(2);
        b2.setAuthor("曹雪芹");
        bookList.add(b1);
        bookList.add(b2);
        ModelAndView mv = new ModelAndView();
        mv.addObject("books", bookList);    // 使用参数名books 代替模型
        mv.setViewName("books");                        // 跳转到指定页面
        return mv;
    }
}
```

## 3.创建视图
在resources目录下的template目录中创建books.html，具体代码如下
```html
<!DOCTYPE html>
<html lang="en" xmlns:th="https://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>图书列表</title>
</head>
<body>
<table border="1">
    <tr>
        <td>图书编号</td>
        <td>图书名称</td>
        <td>图书作者</td>
    </tr>
    <tr th:each="book:${books}">
    <td th:text="${book.id}"></td>
    <td th:text="${book.name}"></td>
    <td th:text="${book.author}"></td>
    </tr>
</table>
</body>
</html>
```
:::tip 代码解释
在第二行导入Thymeleaf的名称空间

在14-18行通过遍历，将books中的数据展示出来，Thymeleaf中通过th:each进行集合遍历，
通过th:text进行数据展示
:::
实现效果如下:

![](/img/2020/thymeleaf_1.png)
