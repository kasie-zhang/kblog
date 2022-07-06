---
title: C 语言语法元素
date: 2020-09-23
cover: https://api.zk123.top/link/repo1/img/cover/32.webp
sidebar: 'auto'
categories:
- 笔记
- C 语言
tags:
- C
publish: true
permalink: /article/32
---

> 第 32 篇文章
<!-- more -->

## C语言语法元素

## 变量和表达式

C语言中包含一个或多个函数，它们是C程序的基本模块。

```c
#include<stdio.h>
```

上述代码称为**编译预处理指令**，告诉编译器在本程序内包含标准输入和输出库。



所有C语言程序中，必须且只能拥有一个 main 函数，所有 C 程序总是从 main 函数开始执行的，而不管 main 函数的位置。 int 指明了main 函数返回类型，是一个整型，返回给操作系统。

在 C 语言中，所有变量都必须先定义后使用。

## 分支语句

### if 语句

```c
#include<stdio.h>

int main()
{
	int x = 30;
	if (x < 60)
		printf("C");
	else if (x < 85)
		printf("B");
	else if (x <= 100)
		printf("A");
	return 0;
}
```

### switch 语句

```c
#include<stdio.h>

int main()
{
	int x = 30;
	int index = x < 60 ? 0 : 1 + (x - 60) / 10;
	switch (index)
	{
	case 0:
		printf("E");
		break;
	case 1:
		printf("D");
		break;
	case 2:
		printf("C");
		break;
	case 3:
		printf("B");
		break;
	case 4:
	case 5:
		printf("A");
		break;
	default:
		break;
	}
	return 0;
}
```

### while 语句

```c
#include<stdio.h>

int main() {
	while (true)
	{
		printf("I ❤ Y\n");
	}
	return 0;
}
```

## 符号常量

```c
#include<stdio.h>
#define PI 3.14

int main() {
	printf("%f",PI);
	return 0;
}
// #define 名字 替换文本
// 符号常量名通常采用大写字母
// define 也是一条编译预处理指令
```

## 输入输出



```c
#include<stdio.h>

int main() {
	float x = 0.0;
	scanf_s("%f", &x);		// 从控制台读入数据
	printf("%.2f", x);		// 打印数据到控制台
	return 0;
}
```

## 数组

数组下标总是从 0  开始。

## 函数

C 语言的程序由一个个函数构成，除了自有的 main 主函数以外，用户可以自己定义函数。此外 C 语言的编译系统提供了一些库函数。

函数为程序的封装提供了一种简便的方法，在其他地方使用函数时，不需要考虑函数是如何实现的。

```c
#include<stdio.h>

// 计算阶乘
int cal(int n)
{
	int sum = 1;
	if (n == 0)
		return sum;
	else if (n < 0)
	{
		printf("请输入正确的数!");
		return -1;
	}
	else
	{
		for (int i = 1; i <= n; i++)
			sum *= i;
		return sum;
	}
}
int main() {
	for (int i = 0; i < 10; i++)
	{
		printf("%5d\n", cal(i));
	}
	return 0;
}
```

## 流程图&&算法

![流程图](https://api.zk123.top/link/repo1/img/2020/c_flow_chart.png)