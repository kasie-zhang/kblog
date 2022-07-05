---
title: JavaScript var和let、const区别
date: 2020-11-25
cover: /img/cover/47.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- JavaScript
- 前端
publish: true
permalink: /article/47
---

> 第 47 篇文章
<!-- more -->

let 是ES6新增的，主要是弥补var的缺陷，可以把let看做是var的升级版。
## var 和 let
:::tip 不同点
1. var是全局作用域，let不是
     - var 和 let声明的变量在全局作用域中被定义时，两者十分相似。但是，被let声明的变量不会作为全局对象window的属性，而被var声明的变量可以
 ```js
let a = 'aaa';
var b = 'bbb';
console.log(window.a);      // undefined
console.log(window.b);      // 'bbb'
```

2. var 没有块级作用域，let有块级作用域

例子：
![](/img/2020/js_1.png)

:::