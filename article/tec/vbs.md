---
title: 客户端开机自启动FRP服务（无CMD弹框）
date: 2020-11-13
cover: /img/cover/41.webp
sidebar: 'auto'
categories:
- 教程
tags:
- Bat
- Windows
publish: true
permalink: /41
---

> 第 41 篇文章
<!-- more -->

## frp.bat
编写 `frp.bat`

作用：自动启动frp服务

```bat
:执行批处理命令
@echo off
:需要执行的cmd命令
cd C:\frp
frpc.exe -c frpc.ini
:执行完命令后关闭cmd窗口
taskkill /f /im cmd.exe
exit
```
这样会有cmd的弹窗，体验不好！

## frp.vbs
用来调用`frp.bat`,

开机自启动`frp.vbs`，将开启frp服务，并且没有cmd弹框

```vbs
set ws=createobject("wscript.shell")

Dim Count:Count = 0 
For i = 0 To 0 '循环1次
  Count = Count + 1
  ws.run "C:\Users\frp.bat",0
Next
```

:rainbow::rainbow: