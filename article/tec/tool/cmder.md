---
title: cmder 安装与配置
date: 2021-05-26
cover: https://api.zk123.top/link/repo1/img/cover/89.webp
sidebar: 'auto'
categories:
- Tool
tags:
- Cmder
publish: true
permalink: /article/89
---

> 第 89 篇文章
<!-- more -->

## what is cmder?
[cmder on GitHub](https://github.com/cmderdev/cmder)

这是 cmder 在GitHub上的描述。

> Cmder is a software package created out of pure frustration over absence of usable console emulator on Windows. It is based on ConEmu with major config overhaul, comes with a Monokai color scheme, amazing clink (further enhanced by clink-completions) and a custom prompt layout.

可见其作者也是对于 Windows 上的控制台模拟器非常失望，所以写了这个软件。

cmder 非常轻量，可以在[官网地址](https://cmder.net/)下载免费 zip 包，安免装，解压完成即可使用。

### 配置
### 1. Win + R + `cmder` 调用
将 cmder 文件的路径放在系统 path 中，即可通过 Win + R ，输入 `cmder` 实现调用。

### 2. 右键调用
这还不是最方便的，可以在 cmd 中输入 `cmder.exe /REGISTER ALL` 命令来将程序放到右键菜单中。原理与修改注册表添加右键菜单一样。

### 3. 修改命令行光标
命令行的光标是以“λ”开始的，我们可以修改为常用的$，找到cmder目录下的vendor文件夹中的clink.lua文件，修改local lambda值即可。

### 4. 其他设置
其他设置可以右键底端条幅，选择 `setting`

- 设置语言为中文
- 颜色方案：`<solarized>`

其他设置都可以通过 setting 实现。

[GD 链接](https://drive.google.com/file/d/1sGDB6wv0xLPeZOYpZandsm0MO27DbiLN/view?usp=sharing)

[KDrive 链接](https://drive.zk123.top/api/v3/file/source/1027/cmder.zip?sign=uB51MCu9TixZXkCI8ZiNNO9xs7MRZn7AWUXnG_B5gl8%3D%3A0)
