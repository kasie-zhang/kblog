---
title: 使用割圆术计算PI
date: 2021-08-2
cover: /img/cover/93.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- 数学
publish: true
permalink: /article/93
---

> 第 93 篇文章
<!-- more -->

**圆周率**是一个数学常数，当前人类计算 兀 的值的主要目的是为打破记录、测试超级计算机的计算能力和高精度乘法算法，因为几乎所有的科学研究对 兀 的精度要求都不会超过几百位。

兀 广泛应用于 数学、科学、宇宙学、热力学、电磁学等领域中。

今天要探究的是三国时期数学家刘徽的**割圆术**。

参考 [Wiki](https://zh.wikipedia.org/wiki/%E5%89%B2%E5%9C%86%E6%9C%AF_(%E5%88%98%E5%BE%BD))

## 推导过程
- 证明 `正2N边形` 的面积 =  `正N边形的半周长` * R
- 证明 **圆周率 = 圆的面积 / 半径的平方**
- 求出 `正N边形`(n = 6,12,24...) 边长的递推公式

![](/img/2021/pi_1.jpg)

![](/img/2021/pi_2.jpg)

## 编程计算
```c 
#define _CRT_SECURE_NO_WARNINGS
#include<stdio.h>
#include<math.h>

double calLength(double d) {
	return sqrt(2 - sqrt(4 - pow(d, 2)));
}

double calPI(int n) {
	double pi = 0.0;
	int edge = 6;
	double len = 1.0;

	for (int i = 0; i <= n; i++) {
		pi = (edge / 2) * len;
		edge *= 2;
		len = calLength(len);
	}
	printf("计算的边数为 %d\n", edge / 2);
	return pi;
}


int main() {
	int n;
	scanf("%d", &n);
	printf("PI = %lf", calPI(n));
}
```

计算结果如下图:

![](/img/2021/pi_3.png)

完结 :cherry_blossom::cherry_blossom: