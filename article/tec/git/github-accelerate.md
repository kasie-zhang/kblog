---
title: 实现 GitHub 的正常访问
date: 2022-06-04
cover: /img/cover/120.webp
sidebar: 'auto'
categories:
- 教程
tags:
- git
publish: true
permalink: /120
---

> 第 120 篇文章
<!-- more -->

GitHub 本该是正经讨论技术的地方，但总有SB在上面搞政治，导致本就不好的技术生态更加学上加霜，希望大家能多搞技术，别搞奇怪的东西。

很久之前,写过一篇[解决 git clone 下载太慢](./git-clone-accelerate.md)的文章, 两年过去了国内访问 GitHub 越来越难，主要是由于国内对 GitHub CDN 的污染，用站长工具[检测一下](https://ping.chinaz.com/github.com)，裸连基本是不可能访问的。

要想要正常访问，有一下几种方法：
- 修改 Hosts
- 借助代理网站
- 借助代理工具

## 1.修改 Hosts
国内对GitHub的限制主要通过`DNS污染`、`中间人攻击`等手段实现。DNS解析使用UDP协议进行通信，你在获取GitHub的真实地址时实际上拿到的是伪装的IP地址，
自然也就无法流畅的访问GitHub了。

通过本机设定 GitHub 的IP地址，能够有效解决 DNS 污染的问题。

[GitHub Hosts](https://gitlab.com/ineo6/hosts/-/raw/master/next-hosts)

上面这个网址是一个公益项目，每天都会分享最新、最优的 GitHub IP 地址，将这些地址复制到本机 Host 文件中，然后运行以下命令，刷新 DNS 缓存。

```shell
ipconfig /flushdns
```

## 2.借助代理网站
[FastGit](https://fastgit.org/) 是一个针对 GitHub 的镜像加速网站，公益性质，且用且珍惜。

使用方法:
```shell
git clone https://github.com/author/repo   # github

git clone https://hub.fastgit.xyz/author/repo   # fastgit
```

为了下载的方便，可以直接在 .gitconfig 中设置 GitHub 网址自动替换。
```shell
git config --global url."https://hub.fastgit.xyz/".insteadOf "https://github.com/"
```
但这样做会导致在 push 远程仓库时，无法完成身份验证，所以如果只进行 clone 操作，推荐设置网址自动替换，若需要进行 push、pull 操作，
推荐不设置自动替换。

## 3.借助代理工具
若本机使用了 VPN 工具，可以为 git 设置 socks5 代理，命令如下：
```shell
git config --global http.https://github.com.proxy socks5://127.0.0.1:1090
```
`1090`为本机 socks5 的监听端口，注意替换。命令执行后，会在 `~/.gitconfig`文件中新增以下条目。
```markdown
[http "https://github.com"]
	proxy = socks5://127.0.0.1:1090
```