---
title: Javadoc 初体验
date: 2020-11-23
cover: /img/cover/46.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Java
- JavaDoc
- 后端
publish: true
permalink: /article/46
---

> 第 46 篇文章
<!-- more -->

## 前言
过多的注释会使代码难以阅读，撰写准确并且合适的注释是保证高质量代码的关键。Sun MicroSystems
公司制定了一套 Javadoc规范。

Javadoc规范是一个官方注释生成系统，通过注释结构和Javadoc标识来自动生成Javadoc文档，帮助开发人员阅读代码。

Javadoc标识由“@”及其后所跟的标记类型和专用注释引用组成。

官方文档：
[地址](https://www.oracle.com/technical-resources/articles/java/javadoc-tool.html)

参考文章：

[文章1](https://blog.csdn.net/vbirdbest/article/details/80296136)
[文章2](https://blog.csdn.net/linton1/article/details/93733508)


## Javadoc注释规范
:::tip 注释以HTML编写
使用\<br>换行
:::


**谨慎使用标题标签**: 最好不要使用\<H1>和\<H2>之类的HTML标题标签，因为Javadoc工具会创建整个结构化文档，并且这些结构化标签可能会干扰标头格式。生成的文档。但是，可以在类和包注释中使用这些标题来提供您自己的结构。

:::tip 主要描述
在起始定界符/** 开始，一直持续到标签部分;

标签部分开始后，无法继续进行主要描。
:::

:::tip 标签部分
标签可以有任意数量 - 某些类型的标签可以重复，而其他类型则不能重复
:::

### 一.java文档
```md 
//          注释一行
/* */       注释多行
/**  */     注释若干行，中间写入Javadoc文档
```

### 二.文档格式
写在类上的文档一般分为三段：
- 第一段：概要，通常以一句简短的话描述该类的作用，要以英文点号结束，后跟空白，制表符或行终止符，或在第一个 block标记处。Javadoc工具将此第一句话复制到HTML页面顶部的成员摘要。
- 第二段：详细描述，通常用一段或多段话来详细描述该类的作用，一般每段话都已英文点号结束
- 第三段：文档标注，用于标注 Author、Version、Date、参阅类等信息


## Javadoc标签
标签大小写敏感

:::tip 块标签
只能放在主要描述部分后面的标签部分，块标签的格式为： @tag
:::

:::tip 内联标记
可以放在主要描述中的任何位置或块标签的注释中。内联标记使用花括号标记：{@tag}
:::


|  标签   |             说明             | 展示效果 |
| :----- | :--------------------------: | :--:|
| @author<br>(只出现在类和接口的文档中) | 描述开发该类模块的作者信息；<br>@author可以多次使用，以指明多个作者<br>生成的文档中每个作者之间使用逗号隔开 | |
| @version<br>(只出现在类和接口的文档中) | 描述该类模块的版本信息<br>@version可以多次使用，但只有第一次有效 |  |
| @since | 描述何时开始有这个API功能模块 | **从以下版本开始:**<br>1.0 |
| @see | 查看相关内容，如类、方法、变量等<br>@see com.zk.demo.Bean.Event | **另请参阅:**<br>[`Event`](../../../../../com/zk/demo/Bean/Event.html) |
| @param 参数名 描述<br>(只出现在方法或构造器的文档中) | 描述方法的参数 | **参数:**<br>`eventCode` - eventCode |
|{@code 文本}| 以代码字体渲染文本|  |
| @return<br>(只出现在方法中) | 描述方法的返回值 | **返回:**<br>返回值  -  返回值的描述 |
| @exception<br>(从java1.2之后也可以使用@throws替代)<br>@throws | 描述一个抛出的异常 | **抛出:**<br>`NoRecordsMatchException` - 不存在对应匹配项 |
| @deprecated | 描述一个已过时的方法 | |
| {@inheritDoc} | 继承父类的描述文档<br>这样，您就可以在继承树的上方编写更一般的注释，并在复制的文本周围进行书写。<br>继承父类的**主要描述**和 **@return**、**@param**、**@throw**标签 | |
| {@link 包.类#成员} | 链接到其他特定成员对应的文档中<br>{@link com.zk.demo.Bean.Event} | [`Event`](../../../../../com/zk/demo/Bean/Event.html) |
| {@Override} | 重载父类或接口的方法 | |
| {@value} | 表明静态域的返回值 | |
|  |  | |
| | 说明：<br>多个@author标记，应该按照时间顺序排列，即原作者应该排在第一个位置<br>多个@param标记，应该按照参数定义的顺序排列<br>多个@exception（或是@thrown）应该按照异常的字母顺序排列<br>多个@see标记，应该按照注释的逻辑顺序排列，即从最近的到最远的，从最具体的到最一般的<br>如果方法有参数，@param标记必须包含，而且每个对应一个参数<br>如果方法有返回值，@return标记必须包含 | |
|  | 自定义标签 | |
| @created | 类、接口、方法创建时间 | **创建时间**<br/>2020-11-23 23:23 |



## 配置
pom.xml中添加配置
```xml
<plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-javadoc-plugin</artifactId>
        <version>3.2.0</version>
        <configuration>
            <encoding>UTF-8</encoding>
            <charset>UTF-8</charset>
            <docencoding>UTF-8</docencoding>
            <tags>
                <tag>
                    <name>created</name>
                    <placement>a</placement>
                    <head>创建时间:</head>
                </tag>
            </tags>
            <reportOutputDirectory>./javadocs</reportOutputDirectory>
            <destDir>easy-delivery</destDir>
        </configuration>
</plugin>
```

### Maven环境下使用自定义标签
在pom.xml文件中新增配置:
```xml
<plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-javadoc-plugin</artifactId>
        <version>3.2.0</version>
        <configuration>
            <tags>
                <tag>
                    <name>created</name>
                    <placement>a</placement>
                    <head>创建时间:</head>
                </tag>
            </tags>
        </configuration>
</plugin>
```
---
新增`tag`标签；
:::tip
**name**:        标签标识符

**placement**:  标签适用的范围

**head**:       构建完成javadoc文档后，提示的文字
:::
---

#### tag
|属性|说明|
|:--:|:---:|
|name|标签名|
|placement|标签适用的位置|
|head|前置提示|
---
#### placement
|取值|说明|
|:--:|:--:|
|X|disable tag|
|a|all|
|o|overview|
|p|packages|
|t|types,that is classes and interfaces|
|c|constructors|
|m|methods|
|f|fields|
---



#### 生成文档
terminal中使用 `mvn javadoc:javadoc` 来生成javadoc文档

:::tip 例子
![](/img/2020/java_doc_1.png)

![](/img/2020/java_doc_2.png)
:::
