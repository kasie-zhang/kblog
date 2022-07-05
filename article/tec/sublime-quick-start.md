---
title: Windows下通过cmd 启动Sublime Text 3
cover: /img/cover/37.webp
date: 2020-10-29
sidebar: 'auto'
categories:
- 教程
tags:
- Sublime Text
- Windows
- IDE
publish: true
permalink: /article/37
---

> 第 37 篇文章
<!-- more -->

## 配置
打开 `高级系统设置`

打开 `环境变量`

在 `系统变量 - Path` 中添加一条新的记录 —— Subline Text 3 的安装路径

![](/img/2020/sublime_quick_start_1.png)


path环境变量作用：当要求系统运行一个程序而没有告诉系统，该程序所在的完整路径时，系统会在当前目录下和path中指定的路径去找该程序。用户通过设置环境变量，帮助系统找到程序。

## 使用
```bash
subl .
```

:rainbow: :rainbow: