---
title: Git 变更远程仓库
date: 2020-09-17
cover: /img/cover/29.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- git
publish: true
permalink: /29
---

> 第 29 篇文章
<!-- more -->

## Git 变更远程仓库

```shell
git remote 						# 查看所有远程仓库地址
git remote xxx 					# 查看指定远程仓库的地址

git remote set-url origin https://xxx.git	# 直接修改远程地址

git remote rm [remote name]    		# 删除远程仓库
git remote add [remote name] xxx		# 添加远程仓库
```

### 方法1
直接修改远程地址
```shell
git remote set-url origin xxx
```

### 方法2
先删除远程仓库，再设置远程仓库
```shell
git remote rm orgin 
git remote add orgin 
```
