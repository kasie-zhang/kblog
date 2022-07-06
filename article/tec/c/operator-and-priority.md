---
title: C 运算符和优先级
date: 2022-04-13
cover: https://api.zk123.top/link/repo1/img/cover/115.webp
sidebar: 'auto'
categories:
- 笔记
- C 语言
tags:
- C
publish: true
permalink: /article/115
---

> 第 115 篇文章
<!-- more -->

运算符优先级是 C 语言语法基础的重要内容，优先级表如下：

| <div style="width: 300pt">运算符（优先级从高到低）</div>| <div style="width: 250pt">结合律</div>|
| :------------------------------ | :--------: |
| `( )`                          |从左往右|
| `-  + (一元)  ++  --  sizeof ` | 从右往左 |
| `*  /  %`                      | 从左往右 |
| `+  - (二元)`                  | 从左往右 |
| `<  >  <=  >=`                 | 从左往右 |
| `==  !=`                       | 从左往右 |
| `=`                            | 从右往左 |