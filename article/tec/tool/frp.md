---
title: frp 内网穿透
date: 2020-12-05
cover: /img/cover/51.webp
sidebar: 'auto'
categories:
- Tool
tags:
- Frp
- 内网穿透
publish: true
permalink: /article/51
---

> 第 51 篇文章 
<!-- more -->

:::tip
简洁 frp 教程，远程无压力!
:::

<!-- more -->

## 使用前提
有一台云主机

## 实现效果
使用**远程桌面**访问内网中的机器.

## 使用教程

### 资源
[软件下载地址](https://github.com/fatedier/frp/releases/tag/v0.34.3)

[软件官方教程](https://gofrp.org/docs/)

### 服务器配置

拷贝文件`frps.exe`和`frps.ini`到服务器

配置`frps.ini`:

```ini
[common]
bind_port = 7000
```

在CMD中执行 `frp.exe` 以启动 frp 服务.

:::tip 提示
不要关闭CMD窗口,否则frp服务就停止了!
:::

启动成功如下图:

![](/img/2020/frp_1.png)
### 自己Windows配置
删除服务器所需的文件,仅保留如下文件

![](/img/2020/frp_2.png)

**配置`frpc.ini`**:

```ini
[common]
# 服务器公网地址
server_addr = xxx.xxx.xxx.xxx
# 端口
server_port = 7000

[ssh]
# 类型
type = tcp
# 本地地址
local_ip = 127.0.0.1
# 本地端口
local_port = 3389
# 线上对外暴露端口
remote_port = 6000
```

## 设置开机自启
首先下载 `winsw` ，它是一个单个的可执行文件。 下载完成后，可以改名为简短的 `winsw.exe`。

[winsw Release GitHub地址](https://github.com/winsw/winsw/releases)

[winsw.exe 下载地址](https://zk123.top/tool/winsw.exe)

[sleep.exe 下载地址](https://zk123.top/tool/sleep.exe)

将 `winsw.exe` 和 `frpc.exe` 放在同级目录下。

编写 `winsw.xml` 文件:
```xml
<service>

    <id>frp</id>

    <name>frp</name>

    <description>用frp发布本地电脑网站到外网</description>

    <executable>frpc</executable>

    <arguments>-c frpc.ini</arguments>

    <logmode>reset</logmode>

</service>
```

使用 `winsw install` 注册服务

使用 `winsw start` 启动服务

编写 `deploy.bat` 文件，并放在开机自启目录下。

```bat
:: 不显示后续命令行及当前命令
@echo off

:: 声明采用 utf-8 编码
chcp 65001
CLS

:: 输出当前系统时间 2021-05-28 11:57:36
echo %date:~3,10% %time:~0,2%:%time:~3,2%:%time:~6,2%	frpc starting . . .

cd C:\frp
winsw start

:: 暂停显示两秒
sleep 2000
exit
```


### 使用远程桌面
1. 计算机一栏填写 `云主机地址:6000`   6000 是`frpc.ini`中所配置的 remote_port 的属性值

2. 用户名: Windows登录用户的名称(在账户中查看)

3. 密码: PIN码 (解锁计算机的密码)

![](/img/2020/frp_3.png)

完结撒花:cherry_blossom::cherry_blossom: