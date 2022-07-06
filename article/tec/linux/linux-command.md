---
title: Linux文件删除之rm命令
date: 2022-02-23
cover: https://api.zk123.top/link/repo1/img/cover/103.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Ubuntu
- Linux
- 文件删除
publish: true
permalink: /article/103
---

> 第 103 篇文章
<!-- more -->

## rm - 文件删除指令

- **删除指定文件**
```shell
# 删除指定文件
rm file

# 删除整个文件夹和里面的文件
rm -r folder              # 每删除一个文件都需要键入 y 确认

rm -rf folder             # -r recursion 递归删除，用于删除文件夹； -f force 强制删除；不需要键入 y 确认
```

- **反向删除/排除指定文件（夹）**
```shell
# 删除当前文件夹下，除 file1 以外的所有文件
rm -rf !(file1)

# 删除当前文件夹下，除 file1, file2 以外的所有文件。 
rm -rf !(file1|file2)     # 警告：file1 与 | 之间， | 与 file2 之间不能有空格
```
