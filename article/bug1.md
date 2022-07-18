---
title: 踩坑之 —— C long double 打印输出 0.000000
date: 2022-02-26
cover: https://api.zk123.top/link/repo1/img/cover/106.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- 踩坑
- C
publish: true
permalink: /article/106
---

> 第 106 篇文章

<!-- more -->

## 开发环境

操作系统：Win11

编译器：[MinGW-w64](https://en.wikipedia.org/wiki/Mingw-w64)

IDE：[CLion](https://www.jetbrains.com/clion/)

GCC Version：8.1.0

## 问题描述

C 语言使用 `printf()` 输出 long double 的值，得到异常结果 0.000000。

```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    long double ld = strtold(a, &pt1);    // 12.3000000000000000002
    printf("%Lf\n", ld);
    printf("%s", pt1);
    return 0;
}
/*
0.000000
abc
*/
```

这段代码如果放在微软的 `Visual Studio` 里跑是可以正常显示结果的。但是放在 `MingGW-w64` 跑就会出现 0.000000 的异常结果。

## 问题解析

造成这个问题的原因就是 MinGW-w64 虽然不需要任何第三方库，但是需要微软的运行库，其中包括了 MSVCRT.DLL 以及其他的微软 C 语言库。
所以 GCC 编译后的程序还是运行在 MSVC 运行库上的程序。

同时又由于 32 位的 MSVC 不支持更高精度的 double 类型（`在 32 位的 MSVC 中 long double 与 double 的精度均为 8 字节，64 bit`）。

![](https://api.zk123.top/link/repo1/img/2022/106_1.png)

而 GCC 在 32 位的操作系统中 long double 是 12 字节，96 bit，在 64 位操作系统中 long double 是 16 字节，128 bit，所以就出现了不兼容的问题。

![](https://api.zk123.top/link/repo1/img/2022/106_2.png)

简单说来就是，如果你用 MSVC 跑代码，不管写 double 还是 long double，都只占用 64bit，而转换说明 `%Lf` 在这种情况下只读取 64bit 的数据，所以能够正常显示。

而 MinGW-w64 的 double 是 64 位，long double 是 128 位。但 MinGW 实际是依靠在 MSVC 上的，所以使用转换说明 `%Lf` 时，只读取了 128 bit 中的 64 bit。数据不兼容，打印出 0.000000。

## 解决方法

在头文件 `#include<stdio.h>` 上面加上 `#define printf __mingw_printf`，即**指定全局使用 MinGW-w64 标准的 printf() 进行输出**。

或者在使用 MinGW-w64 的时候不用 long double，改用 double。

```c
#define printf __mingw_printf
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    long double ld = strtold(a, &pt1);
    printf("%Lf\n", ld);
    printf("%s", pt1);
    return 0;
}

/*
12.300000
abc
*/
```