---
title: C 位操作
date: 2022-03-27
cover: https://api.zk123.top/link/repo1/img/cover/113.webp
sidebar: 'auto'
categories:
- 笔记
- C 语言
tags:
- C
publish: true
permalink: /article/113
---

> 第 113 篇文章
<!-- more -->

在 C 语言中，可以单独操作变量中的位。高级语言一般不会处理这级别的细节，C 在提供高级语言便利的同时，还能在为汇编语言所保留的级别上工作，
这使其成为编写设备驱动程序和嵌入式代码的首选语言。

## 有符号整数
如何表示有符号整数取决于硬件，通常使用**二进制补码**（two's-complement）表示。

二进制补码用1字节中的后七位表示 0~127，高阶设置为0。

如果高阶为1，表示的值为负。负数的**位组合取反加一**是该负数的数值。

```md
00000000   ---> +0
00000001   ---> +1
01111111   ---> +127

1000000    ---> -128
1000001    ---> -127
11111111   ---> -1
```

有符号整数与二进制值的关系对照图如下:

![](https://api.zk123.top/link/repo1/img/2022/113_1.png)

## 二进制浮点数
浮点数分两部分存储：二进制小数和二进制指数。

如，`0.101` 表示为 `1/2 + 0/4 + 1/8`，二进制表示法只能精确地表示多个 1/2 的幂的和。

## 其他进制数
### 八进制
octal，基于8的幂。

### 十六进制
hexadecimal，基于16的幂。

## C 按位运算符
bitwise，按位运算，这些操作都是针对每一个位进行，不影响它左右两边的位。不要与常规的逻辑运算符（&&、||、！）混淆，常规的逻辑运算符操作的是整个值。

### 按位逻辑运算符
- 按位与 `&`
- 按位或 `|`
- 按位取反 `~`
所有 bit 位的 1 变成 0，0 变成 1。
```c
char a = 2;
printf("%d", ~a);       // ~a = -3
```

- 按位亦或 `^`

## 位操作的应用
### 掩码
按位与运算符常用于掩码（mask）。所谓掩码是指一些设置为开（1）或关（0）的位组合。`flags = flags & MASK;`

掩码中的 0 隐藏了 flag 中相应的位。

### 打开位（设置位）
有时，需要打开一个值中的特定位，同时需要保持其他位不变。这种情况可以使用**按位或**（`|`）运算符

`flag |= MASK;`

MASK 中为 1 的位，flags 与其对应的位也为 1。MASK 中为 0 的位，flags 与其对应的位不变。

### 关闭位（清空位）
有时，需要在不影响其他位的情况下关闭指定的位。

`flags & = ~MASK;`

MASK 中为 1 的位都被清空为 0。flags 中与 MASK 为 0 的位相应的位在结果中都未改变。

### 切换位
切换位指的是打开已关闭的位，或关闭已打开的位。可以使用按位亦或（^）切换位。

`flags ^= MASK;`

flags 中与 MASK 为 1 的位相对应的位都被切换了，MASK 为 0 的位相对应的位不变。

## 移位运算符
- 左移: `<<`

高位丢弃，低位补 0。

- 右移: `>>`

## 位字段
bit field，操纵位的第二种方法。

位字段是一个 signed int 或 unsigned int类型变量中的一组相邻的位。位字段通过一个结构声明来建立，该结构声明为每一个字段提供标签，并确定该字段的宽度。

```c
struct{
    unsigned int bit1 : 1;
    unsigned int bit2 : 1;
    unsigned int bit3 : 1;
    unsigned int bit4 : 1;
} prnt;
```
根据以上声明，prnt 包含4个1位的字段。现在，可以通过普通的结构成员运算符 `.` 单独给这些字段赋值。`prnt.bit1 = 0`。

带有位字段的结构提供了一种记录设置的方便途径。

有时，某些设置可以有多个选项，因此需要多个位来表示。字段不限制为 1 位大小。
```c
struct {
    unsigned int code1: 2;
    unsigned int code2: 2;
    unsigned int code3: 8;
} prcode;
```
以上代码创建了两个 2 位的字段和一个 8 位的字段。要确保所赋的值不能超出字段可容纳的范围。

若声明的总位数超过了 unsigned int 类型，编译器会自动移动跨界的字段，保持 unsigned int 的边界对齐。此时第一个 unsigned int 中会留下一个
未命名的“洞”。

可以用未命名字段宽度“填充”未命名的“洞“。**使用一个宽度为0的未命名字段迫使下一个字段与下一个整数对齐。**

## 对齐特性
C11 的对其特性比用位填充更自然，它们还代表了 C 在处理硬件相关问题上的能力。在这种上下文中，对齐指的是如何安排对象在内存中的位置。
例如，为了效率最大化，系统可能要把一个 double 类型的值存储在 4 字节的内存地址上，但却允许把 char 存储在任意地址。

对齐控制有益于把数据从一个硬件位置转移到另一个位置，或者调用指令同时操作多个数据项。

包含头文件 `stdalign.h` 后，可以把 `alignof` 和 `alignas` 分别作为 `_Alignof` 和 `_Alignas` 的别名。这样做可以与 C++ 关键字匹配。

- `alignof(变量\类型名)`: 给出一个类型的对齐要求。
- `alignas()`: 指定一个变量或类型的对齐值。

举个例子：
```c
#include <stdio.h>
#include <stdalign.h>

int main() {
    double dx;
    char ca;
    char cx;
    double dz;
    char cb;
    char alignas(double) cz;

    printf("char alignment: %zd\n", alignof(char));
    printf("double alignment: %zd\n", alignof(double));
    printf("&dx: %p\n", &dx);
    printf("&ca: %p\n", &ca);
    printf("&cx: %p\n", &cx);
    printf("&dz: %p\n", &dz);
    printf("&cb: %p\n", &cb);
    printf("&cz: %p\n", &cz);
    return 0;
}

/*
char alignment: 1
double alignment: 8
&dx: 000000000061FE18
&ca: 000000000061FE17
&cx: 000000000061FE16
&dz: 000000000061FE08
&cb: 000000000061FE07
&cz: 000000000061FE00
*/
```

在我的系统中，double 对齐值为 8，这意味着地址的类型对齐可以被 8 整除。这就是地址常用两个 double 类型的变量和 char 类型的变量 cz（该变量是double对齐值）。
因为 char 的对齐值是 1，对于普通的 char 类型变量，编译器可以使用任何地址。
