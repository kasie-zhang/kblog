---
title: 算法刷题
cover: /img/cover/10.webp
date: 2020-07-27
sidebar: 'auto'
categories:
- 笔记
tags:
- 刷题
- 数据结构
- 算法
publish: true
permalink: /10
---

> 第 10 篇文章
<!-- more -->

::: tip 目前正在进行的题库
LeetCode
:::


---
::: tip 已完成的题库：
Finished! :rainbow:
```md
#1 两数之和
#349 两个数组的交集
```

:::
## 0001 -- 渊子赛马 -- Online Judge

完成时间：
2020-10-13

题目描述：
>赛马是一古老的游戏，早在公元前四世纪的中国，处在诸侯割据的状态，历史上称为“战国时期”。在魏国作官的孙膑，因为受到同僚庞涓的迫害，被齐国使臣救出后，到达齐国国都。 赛马是当时最受齐国贵族欢迎的娱乐项目。上至国王，下到大臣，常常以赛马取乐，并以重金赌输赢。田忌多次与国王及其他大臣赌输赢，屡赌屡输。一天他赛马又输了，回家后闷闷不乐。孙膑安慰他说：“下次有机会带我到马场看看，也许我能帮你。” 孙膑仔细观察后发现，田忌的马和其他人的马相差并不远，只是策略运用不当，以致失败。 比赛前田忌按照孙膑的主意，用上等马鞍将下等马装饰起来，冒充上等马，与齐王的上等马比赛。第二场比赛，还是按照孙膑的安排，田忌用自己的上等马与国王的中等马比赛，在一片喝彩中，只见田忌的马竟然冲到齐王的马前面，赢了第二场。关键的第三场，田忌的中等马和国王的下等马比赛，田忌的马又一次冲到国王的马前面，结果二比一，田忌赢了国王。 就是这么简单，现在渊子也来赛一赛马。假设每匹马都有恒定的速度，所以速度大的马一定比速度小的马先到终点（没有意外！！）。不允许出现平局。最后谁赢的场数多于一半(不包括一半)，谁就是赢家(可能没有赢家)。渊子有N(1≤N≤1000)匹马参加比赛。对手的马的数量与渊子马的数量一样，并且知道所有的马的速度。聪明的你来预测一下这场世纪之战的结果，看看渊子能否赢得比赛。

输入：
>输入有多组测试数据。 每组测试数据包括3行： 第一行输入N(1≤N≤1000)。表示马的数量。 第二行有N个整型数字，即渊子的N匹马的速度。 第三行有N个整型数字，即对手的N匹马的速度。 当N为0时退出。

输出：
>若通过聪明的你精心安排，如果渊子能赢得比赛，那么输出“YES”。 否则输出“NO”。

样例输入：
```md
5
2 3 3 4 5
1 2 3 4 5
4
2 2 1 2
2 2 3 1
0
```
样例输出：
```md
YES
NO
```

解题思路：
```md
控制台读入两个长度相同的数据，分别存入数组a,b

分别将a,b从小到大进行排序

a数组元素值从大到小 分别去和b数组从大到小进行比较，若a数组中的元素比b数组中的某个元素大
则记作a胜利一次，并将b数组中对应元素置为无限大（防止多次计算）

若a胜利的次数超过数组长度的一半，即至少存在一种情况，a能够击败b，打印YES，否则打印NO
```
**源码**
```c
#define _CRT_SECURE_NO_WARNINGS
#include<stdio.h>

int comp(const void* a, const void* b)
{
	return *(int*)a - *(int*)b;
}

int main() {
	int i,j,a[1000], b[1000],tmp,c,len,win;
	while (1)
	{
		win = 0;
		scanf("%d", &len);
		if (len == 0)
			exit(0);
		for (i = 0; i < len; i++)
		{
			scanf("%d", &a[i]);
		}
		for (i = 0; i < len; i++)
		{
			scanf("%d", &b[i]);
		}
		// sort low to high
		qsort(a, len, sizeof(int), comp);
		qsort(b, len, sizeof(int), comp);
		for (int k = len - 1; k >= 0; k--)
		{
			for (int m = k; m>=0; m--)
			{
				if (a[k] > b[m])
				{
					win++;
					b[m] = 99999;
					break;
				}
			}
		}
		if (win > len / 2)
			printf("YES\n");
		else
			printf("NO\n");

	}
	return 0;
}
```

## 0002 --- 蟠桃记 -- Online Judge
**DES:**
>孙悟空在大闹蟠桃园的时候，第一天吃掉了所有桃子总数一半多一个，第二天又将剩下的桃子吃掉一半多一个，以后每天吃掉前一天剩下的一半多一个，到第n天准备吃的时候只剩下一个桃子。这下可把神仙们心疼坏了，请帮忙计算一下，第一天开始吃的时候桃子一共有多少个桃子。

**Input:**
>输入数据有多组，每组占一行，包含一个正整数n（1≤n≤30），表示只剩下一个桃子的时候是在第n天发生的。 输入以0结束。

**Output:**
>对于每组输入数据，输出第一天开始吃的时候桃子的总数，每个测试实例占一行。

**Example:**
In:
```md
2
4
0
```
Out:
```md
4
22
```

**源码:**
```C
#include<stdio.h>
#include<stdlib.h>
int main() {
	int n, eat;
	while (1)
	{
		eat = 1;
		scanf("%d", &n);
		if (n == 0)
			exit(0);
		for (int i = 1; i < n; i++)
			eat = 2 * (eat + 1);
		printf("%d\n", eat);
	}
	return 0;
}
```

## 0003 --- C语言考试练习题_保留字母 -- Online Judge
**DES:**
>编一个程序，输入一个字符串，将组成字符串的所有非英文字母的字符删除后输出。

**Input:**
>一个字符串，长度不超过80个字符。

**Output:**
>删掉非英文字母后的字符串。

**Example:**
In:
```md
abc123+xyz.5
```
Out:
```md
abcxyz
```

**源码:**
```C
#include<stdio.h>

int main() {
	char c;
	while ((c = getchar())!=EOF)
	{
		if (c>=65 && c<=90 || c>=97&&c<=122)
		{
			printf("%c", c);
		}
		else
		{
			printf("");
		}
	}
	return 0;
}
```

## 0004 --- 二进制数判断（数据类型）-- Online Judge
**DES:**
>从键盘输入一个整数，求此数转化为二进制数后第2位（从低位到高位，最低位为第0位）。

**Input:**
>一个整数

**Output:**
>1 or 0

**Example:**
In:
```md
8
```
Out:
```md
0
```

**源码:**
```C
#include<stdio.h>

int main() {
	int n, i=0, a[100];
	scanf("%d", &n);
	while (n > 0)
	{
		a[i++] = n % 2;
		n /= 2;
	}
	if (a[2] == 1)
	{
		printf("1");
	}
	else
	{
		printf("0");
	}
}
```

## 0005 --- 数字加密（数据类型）[易] -- Online Judge
**DES:**
>输入1个四位数，将其加密后输出。方法是将该数每一位上的数字加9，然后除以10取余，做为该位上的新数字，最后将第1位和第3位上的数字互换，第2位和第4位上的数字互换，组成加密后的新数。

**Input:**
>1257

**Output:**
>4601

**Example:**
In:
```md
1257
```
Out:
```md
4601
```

**源码:**
```C
#include<stdio.h>

int main() {
	int a[4],n;
	scanf("%d", &n);
	for (int i = 3; i >= 0; i--)
	{
		a[i] = n % 10;
		a[i] += 9;
		a[i] %= 10;
		n /= 10;
	}
	printf("%d", 1000 * a[2] + 100 * a[3] + 10 * a[0] + a[1]);
	return 0;
}
```

## 0006 --- 四位数的每位数字之和-数据类型和表达式[中] -- Online Judge
**DES:**
>接收一个四位数。编写一个程序，将该数的每一位数字相加并显示结果。

**Input:**
>输入一个四位数。

**Output:**
>输出该四位数中每一位数字之和。

**Example:**
In:
```md
1234
```
Out:
```md
10
```

**源码:**
```C
#include<stdio.h>

int main() {
	int n, sum = 0;
	scanf("%d", &n);
	for (int i = 0; i < 4; i++)
	{
		sum += n % 10;
		n /= 10;
	}
	printf("%d", sum);
	return 0;
}
```

## 0007 --- 打印杨辉三角 -- Online Judge
**DES:**
>葱头今天上课听老师讲了杨辉三角很开心，于是回家就动手写杨辉三角但是没写几行就出错了。于是他想写一个程序来生成杨辉三角，可是他太笨了写不来。聪明的你可以帮帮他吗？

**Input:**
>正整数N，0<N<=15。

**Output:**
>按照格式打印出杨辉三角的前N行。

**Example:**
In:
```md
6
```
Out:
```md
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1
```

**源码:**
```C
#include<stdio.h>

int main() {
	int a[20][20], n;
	scanf("%d", &n);
	// 构造
	for (int i = 1; i <=n ; i++)
	{
		a[i][1] = a[i][i] = 1;
	}
	for (int i = 3; i <= n; i++)
	{
		for (int j = 2; j <= i - 1; j++)
		{
			a[i][j] = a[i - 1][j - 1] + a[i - 1][j];
		}
	}
	// 打印
	for (int i = 1; i <= n; i++)
	{
		for (int j = 1; j <= i; j++)
			if (i!=j)
			{
				printf("%d ", a[i][j]);
			}
			else
			{
				printf("%d\n", a[i][j]);
			}
		
	}
	return 0;
}
```

## 0008 --- C语言考试练习题_时间间隔 -- Online Judge
**DES:**
>从键盘输入两个时间点(24小时制），输出两个时间点之间的时间间隔，时间间隔用“小时:分钟:秒”表示。
>注意：本题并没有说时间点1肯定先于时间点2。

**Input:**
>输入包括两行。第一行为时间点1。第二行为时间点2。

**Output:**
>以“小时:分钟:秒”的格式输出时间间隔。格式参看输入输出。

**Example:**
In:
```md
12:01:12
13:09:43
```
Out:
```md
1:08:31
```

**源码:**
```C
#include<stdio.h>

int main() {
	int h1,m1,s1,h2,m2,s2,time;
	scanf("%d:%d:%d", &h1, &m1, &s1);
	scanf("%d:%d:%d", &h2, &m2, &s2);
	time = h1 * 3600 + m1 * 60 + s1 - (h2 * 3600 + m2 * 60 + s2);
	if (time < 0)
		time = 0 - time;
	h1 = time / 3600;
	time %= 3600;
	m1 = time / 60;
	time %= 60;
	s1 = time;
	if (m1<10 && s1<10)
	{
		printf("%d:0%d:0%d", h1, m1, s1);
	}
	else if (m1>10 && s1<10)
	{
		printf("%d:%d:0%d", h1, m1, s1);
	}
	else if (m1<10 && s1>10)
	{
		printf("%d:0%d:%d", h1, m1, s1);
	}else
		printf("%d:%d:%d", h1, m1, s1);
	return 0;
}
```

## 0009 --- 3位整数数位和（分支）[中] -- Online Judge
**DES:**
>给定一个三位数，判断其每一位数字，若为偶数，则进行累加，如：124，其第1、2位为偶数，所以其偶数位之和为2+4=6。

**Input:**
>输入一个三位整数

**Output:**
>各位为偶数的数字之和

**Example:**
In:
```md
246
```
Out:
```md
12
```

**源码:**
```C
#include<stdio.h>

int main() {
	int n, sum=0, a[10];
	scanf("%d", &n);
	for (int i = 0; i < 3; i++)
	{
		a[i] = n % 10;
		n /= 10;
		if (a[i] % 2 == 0)
			sum += a[i];
	}
	printf("%d", sum);
	return 0;
}
```

## 0010 --- 闰年判断-分支结构[易] -- Online Judge
**DES:**
>输入年year，判断该年是否为闰年。判断闰年的条件是：能被4整除但不能被100整除，或者能被400整除。

**Input:**
>输入某年。

**Output:**
>输出是否为闰年的判断。

**Example:**
In:
```md
2004
```
Out:
```md
2004年是闰年
```

**源码:**
```C
#include<stdio.h>

int main() {
	int year;
	scanf("%d", &year);
	if (year%4==0 &&year%100!=0 || year%400 ==0)
		printf("%d年是闰年", year);
	else
		printf("%d年不是闰年", year);
	return 0;
}
```

## 0011 --- 成绩分段计数 -- Online Judge
**DES:**
>编写程序，输入一批学生的成绩，遇0或负数则输入结束，要求统计并输出优秀（大于等于85）、通过（60～84）和不及格（小于60）的学生人数。

**Input:**
>输入多个整数，以0或负整数表示结束。

**Output:**
>分段成绩的学生人数。

**Example:**
In:
```md
88 71 68 70 59 81 91 42 66 77 83 0
```
Out:
```md
>=85:2
60-84:7
<60:2
```

**源码:**
```C
#include<stdio.h>
#include<stdlib.h>

int main() {
	int n, a[10] = { 0 };
	while (1) {
		scanf("%d", &n);
		if (n <= 0)
			break;
		if (n >= 85)
		{
			a[0]++;
		}
		else if (n >= 60 && n < 84)
		{
			a[1]++;
		}
		else if (n < 60) {
			a[2]++;
		}
	}
	printf(">=85:%d\n60-84:%d\n<60:%d",a[0],a[1],a[2]);
	return 0;
}
```

## 0012 --- 计算a+aa+aaa+…之和－循环[易] -- Online Judge
**DES:**
>输入两个正整数a和n，输出a+aa+aaa+…+a…a（n个a）之和。例如，输入2和3，输出246（2+22+222）。

**Input:**
>2  3

**Output:**
>246

**Example:**
In:
```md
3  4
```
Out:
```md
3702
```

**源码:**
```C
#include<stdio.h>
#include<math.h>

int main() {
	int a, n, sum=0;
	scanf("%d%d", &a, &n);
	for (int i = 1; i <= n; i++)
		sum += a * pow(10, i - 1) * (n + 1 - i);
	printf("%d", sum);
	return 0;
}
```

## 0013 --- 两数之和[简单] -- LeetCode
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

```md
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

```c
// 方法1  暴力破解
int* twoSum(int* nums, int numsSize, int target, int* returnSize){

    int *res = (int *)malloc(sizeof(int)*2);
    
    for(int i = 0; i< numsSize -1; i++)
    {
        for(int k = i+1; k< numsSize; k++)
        {
            if( nums[i] + nums[k] == target)
            {
                res[0] = i;
                res[1] = k;
                *returnSize = 2;
                return res;
            }
        }
    }
    return res;
}

// 方法2
// 数组求解
#define MAX_SIZE 2048
int *twoSum(int *nums, int numsSize, int target, int *returnSize)
{
    int i, hash[MAX_SIZE], *res = (int *)malloc(sizeof(int) * 2);
    memset(hash, -1, sizeof(hash));
    for (i = 0; i < numsSize; i++)
    {
        if (hash[(target - nums[i] + MAX_SIZE) % MAX_SIZE] != -1)
        {
            //取模是防止负数
            res[0] = hash[(target - nums[i] + MAX_SIZE) % MAX_SIZE];
            res[1] = i;
            *returnSize = 2;
            return res;
        }
        hash[(nums[i] + MAX_SIZE) % MAX_SIZE] = i;  //防止负数下标越界，循环散列
    }
    free(hash);
    *returnSize = 0;
    return res;
}
```

## 0014 --- 两个数组的交集[简单] -- LeetCode
给定两个数组，编写一个函数来计算它们的交集。

```md
// 示例1
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]

// 示例2
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]

// 说明
输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。
```


```c
int cmp(void *lhsPtr, void *rhsPtr) {
    return (*(int*)lhsPtr > *(int*)rhsPtr) - 
           (*(int*)lhsPtr < *(int*)rhsPtr);
}

int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize){
    if (!nums1 || !nums2) {
        *returnSize = 0;
        return NULL;
    }
    int *ans = (int *) malloc(sizeof(int) * (nums1Size < nums2Size ? nums1Size : nums2Size));
    int count = 0;
    qsort(nums1, nums1Size, sizeof(int), cmp);
    qsort(nums2, nums2Size, sizeof(int), cmp);

    for (int i = 0, j = 0; i < nums1Size && j < nums2Size; ) {
        if (nums1[i] < nums2[j])
            ++i;
        else if (nums1[i] > nums2[j])
            ++j;
        else {
            ans[count++] = nums1[i];
            ++i;
            ++j;
            if (count > 1 && ans[count-1] == ans[count-2])
                --count;
        }
    }
    ans = (int *)realloc(ans, count * sizeof(int));
    *returnSize = count;
    return ans;
}
```

## 0015 --- 密码情书 -- Online Judge
完成时间：2020-12-14

小明很害羞，虽然很喜欢班上的女神，但怎么也不敢向她表白。纠结之下，他决定利用C语言课所学的知识写一篇英文密码情书(100个英文字符以内)。编码规则很简单：把英文字符ASCII码的7个有效bit位逆序，比如’B’的ASCII码为66 (1000010)，逆序后变为33(0100001)。经过这样的编码，好好的一封情书活生生变成了天书！*&……#@&@# 请你帮帮可怜的女神翻译下，至少让她搞清楚写了点啥吧？

```md
// 示例1
输入: 73 2 27 123 55 83 2 79 123 87 66 0

输出：I love you!
```
**源码**
```c
#include<stdio.h>
#include<math.h>
#define MAXNUM 100

int convert(int a) {
	int n[100] = { 0 }, pos = 0;
	while (a>0)
	{
		n[pos++] = a % 2;
		a /= 2;
	}
	int res = 0;
	for (int i = 6,j=0; i >= 0; i--) {
		res += n[i]*pow(2, j);
		j++;
	}
	return res;
}
int main() {
	int n[MAXNUM], len=0;
	// Input
	for (;;) {
		int tmp = 0;
		scanf("%d", &tmp);
		if (tmp == 0) {
			n[len++] = tmp;
			break;
		}
		else {
			n[len++] = tmp;
		}
	}

	// cal
	for (int i = 0; i < len-1; i++) {
		printf("%c", convert(n[i]));
	}
	printf("\n");
}
```

## 0016 --- 最长公共单词 -- Online Judge
完成时间：2020-12-14

编写函数void search(char *s1,char *s2,char *s3),从已知的两个字符串s1,s2中找出它们都包含的最长的单词放入字符串s3,约定字符串中只有小写字母和空格字符，单词用一个或一个以上空格分 隔。并写主函数输入s1,s2，调用该函数后输出s3。。

```md
// 示例1
输入：
Happy new year
This year is not a leap year

输出：year
```

**源码**
```c 
#include<stdio.h>
#include<string.h>

void search(char* s1, char* s2, char* s3) {
	int len = 0;
	char* end = s2 + strlen(s2);
	for (; s2<end;) {
		char tmp[100] = { 0 };
		int i = 0;
		while (*s2!= ' ' && s2 < end)
		{
			tmp[i++] = *s2;
			s2++;
		}
		if (strstr(s1, tmp) != NULL) {
			if (strlen(tmp) > len) {
				len = strlen(tmp);
				memcpy(s3, tmp, len);
				s3[len] = '\0';
			}
		}

		// next round
		while (*s2 == ' ')
		{
			s2++;
		}
	}
	printf("%s\n", s3);
}
int main() {
	char s1[100], s2[100], s3[100];
	gets_s(s1);
	gets_s(s2);
	search(s1, s2, s3);
}
```

## 0017 --- 围圈报数-指针[中] -- Online Judge
完成时间：2020-12-14

有n个人(n<=1000)，用1,2,...,n编号，顺序排列，并首尾相连围成一圈。从第一个人开始报数(从1到4)，凡报到4的人退出圈子，且后面的人继续报数（同样从1到4报数），问最后留下的是原来第几号的那一位(用指针实现)。

```md
// 示例1
输入：
53

输出：
7
```

**源码**
```c 
#include<stdio.h>
#define MAXNUM 1000

int main() {
	int a[MAXNUM] = { 0 }, n;
	int* pos = a;
	scanf("%d", &n);
	// initialization
	for (int i = 0; i < n; i++) {
		a[i] = i + 1;
	}
	// cal
	int i, j = 0, t = 0;
	for (i = 0; t < n - 1; i++)
	{
		if (a[i] != 0)
			j++;
		if (j == 4)
		{
			*(pos + i) = 0;
			j = 0;
			t++;
		}
		if (i >= n - 1)
			i = -1;
	}
	for (i = 0; i < n; i++)
	{
		if (a[i] != 0)
			printf("%d", a[i]);
	}
}
```

## 0018 --- 素数环 -- Online Judge
- **完成时间**: `2020-12-20`

- **说明**: 输入一个正整数n，将从1到n这n个整数围成一个圆环，如果其中任意2个相邻的数字相加结果均为素数，那么这个环就称为素数环。

- **Input**: 输入一个正整数n，n<=16

- **Output**: 输出长度为n的素数环序列（可能的解有多个），要求从整数1开始逆时针排列，同一个环恰好输出一次。

- **示例:**
```md
  输入: 
    6
  输出:
    1 4 3 2 5 6
    1 6 5 2 3 4
```
  
- **题解**
```c
#include<stdio.h>
#include<string.h>
int n;
int a[123], used[123];
int ok(int n)
{
	int i;
	for (i = 2; i < n; i++)
	{
		if (n % i == 0) return 0;
	}
	return 1;
}
void dfs(int x)
{
	int i;
	if (x == n)
	{
		int j;
		if (ok(1 + a[x - 1]))  //头尾和判断
		{
			printf("1");
			for (j = 1; j < n; j++)  printf(" %d", a[j]);  //构造够n个了 输出数组。
			printf("\n");
			return;
		}
	}
	for (i = 2; i <= n; i++)
	{
		if (used[i] == 0 && ok(i + a[x - 1]) == 1)  //加上判断和是不是素数
		{
			a[x] = i;
			used[i] = 1;  //标记使用了
			dfs(x + 1);   //对第x+1个进行构造
			used[i] = 0;  //标记复原
		}
	}
	return;
}
int main()
{
	while (scanf("%d", &n) != -1)
	{
		memset(used, 0, sizeof(used)); // 赋值都没被使用过。
		used[1] = 1;
		a[0] = 1;
		dfs(1);  //从第1个数开始构造，因为以1开始
	}
	return 0;
}
```



## 0019 --- 给定年月日,算星期几 -- Online Judge
- **完成时间**: `2020-12-21`

- **说明**: 输入多组测试数据，每组数据一行，包括三个整数：年（1个空格）月（1个空格）日。输入0（1个空格）0（1个空格）0表示结束。

- **Input**:
```md
2013 12 18
2010 2 1
1999 7 24
2008 1 13
0 0 0
```

- **Output**: 
```md
3
1
6
7
```

- **示例:**
```c
#include <stdio.h>
int main()
{
	int year, month, day;

	while (scanf("%d %d %d", &year, &month, &day) && year && month && day != 0)
	{
		if (month < 3) {
			month += 12;
			year--;
		}
		int week_day = (day+2*month+3*(month+1)/5+year+year/4-year/100+year/400) % 7;
		week_day++;
		printf("%d\n", week_day);
	}
}
```

## 0020 --- 小朋友顺逆报数 -- Online Judge

- **完成时间**: `2020-12-27`

- **说明**: 编号为1,2,…,n的n位小朋友依次排成一列，从1号开始1,2,…,m报数, 凡报到m者出列, 直至报数到队列尾部。此后, 又从队列尾部开始反向1,2,…,m报数, 凡报到m者同样出列。这样反复顺逆报数, 直至队列剩下m-1个小朋友为止。问：最后未出列的m-1位小朋友编号为多少？第p个出列的是哪位小朋友？

- **Input**:
```md
输入n,m,p (1<=m<=20, m<=n<=500, 1<=p<=n-m+1)
```

- **Output**: 
```md
输出未出列的m-1位小朋友的编号

输出第p位出列的小朋友编号
```

- **示例:**
```md
输入:
100,3,50

输出:
4 77 
25
```
- **题解**
```c
#include<stdio.h>
#define MAXNUM 501

int main() {
	int ln, x, t, s, i, n, m, p;

	static int a[MAXNUM];
	scanf("%d,%d,%d", &n, &m, &p);
	for (i = 1; i <= n; i++) a[i] = 1;
	ln = 0; x = 0; t = 0;

	while (1)
	{
		for (s = 0, i = 1; i <= n; i++) {
			s += a[i];
			if (s == m) {
				a[i] = 0; s = 0; ln++;
			}
			if (ln == p && x == 0) {
				x = i;
			}
			if (ln == (n - m + 1)) {
				t = 1; break;
			}
		}
		if (t == 1) {
			break;
		}

		for (s = 0, i = n; i >= 1; i--) {
			s += a[i];
			if (s == m) {
				a[i] = 0; s = 0; ln++;
			}
			if (ln == p && x == 0) {
				x = i;
			}
			if (ln == (n - m + 1)) {
				t = 1; break;
			}
		}
		if (t == 1) {
			break;
		}
	}

	for (i = 1; i <= n; i++) {
		if (a[i] != 0) {
			printf("%d ", i);
		}
	}
	printf("\n%d\n", x);
}
```