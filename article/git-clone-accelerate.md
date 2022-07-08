---
title: 解决 git clone 下载太慢
date: 2020-09-04
cover: https://api.zk123.top/link/repo1/img/cover/21.webp
sidebar: 'auto'
categories:
- 教程
tags:
- git
publish: true
permalink: /article/21
---

> 第 21 篇文章
<!-- more -->

## 问题描述

在clone GitHub上的项目时速度非常慢，只有10 KiB，如何才能提高下载速度，节省宝贵的时间呢？

![md_052](https://api.zk123.top/link/repo1/img/2020/git_1.png)

## 解决方案

### 方法1

将GitHub上的项目强制同步到码云上，然后从码云上clone项目，能够大幅提升下载速度。

但是仍然存在一个问题，强制同步依旧会耗费比较长的时间。

### 方法2

借助[GitClone](https://gitclone.com/)网站

这是我需要clone的项目地址：https://github.com/probberechts/hexo-theme-cactus.git

**使用方法：**

在项目地址中间加上 gitclone.com

```shell
git clone https://gitclone.com/github.com/probberechts/hexo-theme-cactus.git
```

借助GitClone网站，能够大幅提升下载速度

![md_053](https://api.zk123.top/link/repo1/img/2020/git_2.png)

### 方法3
借助 [fastgit镜像网站](https://hub.fastgit.org/)

使用方法:
```shell
# 原始 git clone 命令
git clone https://github.com/[user]/[project].git

# 使用 fastgit 镜像
git clone https://hub.fastgit.org/[user]/[project].git
```
下载速度提升显著。
![](https://api.zk123.top/link/repo1/img/2020/git_3.png)

完美解决，撒花！:rainbow: :cherry_blossom:



