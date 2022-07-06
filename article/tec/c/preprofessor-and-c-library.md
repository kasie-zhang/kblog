---
title: C 预处理器和C库
date: 2022-04-4
cover: https://api.zk123.top/link/repo1/img/cover/114.webp
sidebar: 'auto'
categories:
- 笔记
- C 语言
tags:
- C
publish: true
permalink: /article/114
---

> 第 114 篇文章
<!-- more -->

C 预处理器在程序执行之前查看程序。根据程序中的预处理器指令，预处理器把符号缩写替换成其表示的内容。预处理器可以包含程序所需的其他文件，可以选择让编译器查看哪些代码。
预处理器并不知道 C。基本上它的工作是把一些文本转换成另外一些文本。


## 预处理之前
在预处理之前，编译器必须对该程序进行一些翻译处理。首席按，编译器把源码中出现的字符映射到源字符集。该过程处理**多字节字符**和**三字节字符**。字符扩展让C更加国际化。

第二，编译器定位每个反斜杠后面跟着换行符(通过按下Enter键在源码中换行所生成的字符，而不是表意的\n)的实例，并删除它们。即将下面的两个物理行转化为了逻辑行。
```c
// 物理行
printf("abcd\
        efg");
// 逻辑行
printf("abcdefg");
```

第三，编译器把文本划分成预处理记号序列、空白序列和注释序列（记号是由空格、制表符或换行符分隔的项）。编译器将用一个空格字符替换一条注释。
```md
int /* 注释 */ fpx;

被转化为

int fpx;
```
而且实现可以用一个空格替换所有的空白字符序列（不包括换行符），最后程序已经准备好进入预处理阶段。

预处理阶段
预处理器查找一行中以`#`开始的预处理指令。

## 符号常量：#define
我们大量使用 #define 指令来定义明示常量（manifest constant）也叫符号常量，

define 定义的规则：
```md 
#define 宏 替换体

1. object-like macro | 类对象宏
2. function-like macro | 类函数宏
```

宏名称中不允许存在空格，一旦预处理在程序中找到宏的实例后，就会用替换体替代该宏（也有例外）。从宏变成最终替换文本的过程称为**宏展开**(macro expansion)
可以在 #define 行中使用标准 C 注释，每条注释都会被一个空格替代。如下所示：

```c
#include <stdio.h>
#define a /*注释*/ "abcde"

int main() {
    printf(a);      // abcde
    return 0;
}
```

**何时使用符号常量？**
- 绝大部分数字常量
- 指定标准数组的大小和 const 变量的初始值

### 函数宏

形如 `#define FUNC(x,y) ((x)+(y))`，包括 #define、宏名、宏参数、替换体。宏调用和函数调用最重要的区别在于：函数调用在程序运行时把参数的值传递给函数。宏调用在编译之前把参数记号传递给程序。这两个过程发生在不同时期。

宏调用只是简单的字符替换，所以在定义函数宏时，要尽可能的考虑周全，多用圆括号来确保运算和结合的正确顺序。

不要在宏中使用递增或递减运算符。

C 允许在字符串中包含宏参数。若 x 是一个宏形参，那么 `#x` 就是转换为字符串 `"x"` 的形参名。这个过程称为字符串化（stringizing）。例子如下：
```c
#include <stdio.h>
#define PSQR(x) printf("The Square of " #x " is %d.\n", ((x)*(x)))

int main(){
    int y = 5;
    PSQR(y);
    PSQR(2+4);
    return 0;
}

/*
The Square of y is 25.
The Square of 2+4 is 36.
*/
```

### 预处理器粘合剂：`##运算符`

`##` 运算符把两个记号组成一个记号。例子如下：
```c
#include <stdio.h>
#define XNAME(n) x ## n
#define PRINT_XN(n) printf("x" #n " = %d\n", x ## n)

int main(){
    int XNAME(1) = 14;
    int XNAME(2) = 20;
    int x3 = 30;
    PRINT_XN(1);
    PRINT_XN(2);
    PRINT_XN(3);
    return 0;
}

/*
x1 = 14
x2 = 20
x3 = 30
*/
```

### 变参宏: `...` 和`__VA_ARGS__`

variadic（可变）。记住，省略号只能代替最后的宏参数。例子如下：
```c
#include <stdio.h>
#include <math.h>

#define PR(x, ...) printf("Message " #x ": " __VA_ARGS__)

int main() {
    double x = 48;
    double y;
    y = sqrt(x);
    PR(1, "x = %g\n", x);
    PR(2, "x = %.2f, y = %.4f\n", x, y);
    return 0;
}

/*
Message 1: x = 48
Message 2: x = 48.00, y = 6.9282
*/
```

**宏和函数的选择**

使用宏函数比使用普通函数复杂一些，稍有不慎会产生奇怪的副作用。一些编译器规定宏只能定义成一行。不过，即使编译器没有这个限制，也应该这样做。

宏和函数的选择实际上是时间和空间的权衡，宏产生内敛代码，即在程序中生成语句。而函数的则要先跳转至函数内，随后再返回主调程序，这显然比内联代码花费更多的时间。

如果打算使用宏来加速程序的运行速度，那么首先需要确定使用宏和使用函数是否会导致较大差异。在程序中只使用一次的宏无法明显减少程序的运行时间。在嵌套循环中使用宏更有助于提高效率。

可以将宏函数定义在头文件中，使用 #include 指令调用。


## 文件包含：#include
`#include` 的两种形式如下：

```c
#include <stdio.h>          // 查找系统目录
#include "hot.h"            // 先查找当前工作目录，未找到再查找系统目录
#include "/usr/bin/p.h"     // 查找 /usr/bin 目录
```

**头文件包含的基本信息**

- **符号常量**——例如：stdio.h 中定义的 EOF、NULL等
- **宏函数**——例如：getchar() 通常用 getc(stdin) 定义，而 getc() 经常用于定义较复杂的宏
- **函数声明**——例如：string.h 头文件包含字符串函数系列的函数声明
- **结构模板定义**——标准 I/O 函数使用 FILE 结构，该结构中包含了文件与文件缓冲区相关的信息
- **类型定义**——通常，stdio.h 用 #define 或 typedef 把 FILE 定义为指向结构的指针

## `#undef 指令`
`#undef` 用于取消已定义的 `#define` 指令。

```c
#define LIMIT 40        //定义 LIMIT

#undef LIMIT            //移除关于 LIMIT 的定义。即使原来没有定义LIMIT，取消 LIMIT 的定义仍然有效
```

如果想使用一个名称，又不确定之前是否已经用过，为安全起见，可以用 `#undef` 指令取消该名字的定义。

```c
#define LIMIT 100       // LIMIT 对象红
#define GOOD    
```
`#define` 能够重复定义宏（对象宏、空宏、类函数宏），后者替代前者，编译器给出警告，能够编译成功。

函数能够重复声明，但不能重复定义。编译器会提示重复定义，无法编译成功。

## 条件编译
conditional compilation。可以告诉编译器根据编译时的条件执行或忽略信息（或代码）块。

`#ifdef、#else、#endif`，举个例子
```c
#ifdef K                // 如果定义了K，则执行下面的指令
#define STABLES 5
#else                   // 如果没有定义K，则执行下面的指令
#define STABLES 15
#endif
```

可以用上述指令来标记 C 语句块。

`#ifndef`

和 `#ifdef` 指令的用法类似，也可以和 `#else、#endif`一起使用，它们的逻辑刚好相反。

C 标准库中使用 `#ifndef` 技巧避免重复包含。
```c
/* name.h */
#ifndef F       // 使用了 #ifndef 即使两次包含 name.h 也不会出错
#define F
#endif
```

`#if 和 #elif`

`#if` 后面跟整型常量表达式，如果表达式为非零，则表达式为真。可以在指令中使用 C 的关系运算符和逻辑运算符。
```c
#if K == 1
#include "a.c"
#elif K == 2
#include "b.c"
#else
#include "c.c"
#endif
```

较新的编译器提供另一种方法测试名称是否已定义，即用`#if defined()`代替`#ifdef`。 这里 defined 是一个预处理运算符，如果它的参数时用 #defined 定义过，则返回 1，否则返回 0。

这种方式的优点是，它可以和 #elif 一起使用。
```c
#if defined(K)
#include "k.h"
#elif defined(B)
#include "b.h"
#else
#include "stdio.h"
#endif
```

借助条件编译，可以让程序更容易移植。改变文件开头部分的几个关键的定义，即可根据不同的系统设置不同的值和包含不同的文件。

## 预定义宏
| 宏       | 含义 |
| -------- | ---- |
| `__DATE__` | 预处理的日期（Mmm dd yyyy 形式的字符串字面量，如 Nov 23 2022） |
| `__FILE__` | 当前源代码文件名的字符串字面量 |
| `__LINE__` | 当前源代码文件中行号的整型常量 |
| `__STDC__` | 设置为1时，表明实现遵循C标准 |
| `__STDC_HOSTED__` | 本机环境设置为1，否则设置为0 |
| `__STDC_VERSION__` | 支持C99标准，设置为199901L; 支持C11标准，设置为201112L |
| `__TIME__` | 翻译代码的时间，格式为"hh:mm:ss" |

C99 标准提供一个名为 `__func__` 的预定义标识符，它展开为一个代表函数名的字符串。

举个例子：
```c
#include <stdio.h>

void func();

int main() {
    printf("The file is %s.\n", __FILE__);
    printf("The date is %s.\n", __DATE__);
    printf("The time is %s.\n", __TIME__);
    printf("The version is %ld.\n", __STDC_VERSION__);
    printf("This is line %d.\n", __LINE__);
    printf("This function is %s.\n", __func__);
    func();
    return 0;
}

void func() {
    printf("This function is %s\n", __func__);
    printf("This is line %d.\n", __LINE__);
}

/*
The file is C:\Users\ke\workspace\C\main.c.
The date is Apr  6 2022.
The time is 15:36:48.
The version is 199901.
This is line 10.
This function is main.
This function is func
This is line 18.
*/
```

## `#line 和 #error`
`#line` 指令重置 `__LINE__` 和 `__FILE__`宏报告的行号和文件名。

```c
#line 100               // 把当前行号重置为 100
#line 10 "cool.c"       // 把行号重置为10，把文件名重置为 cool.c 
```

`#error` 指令让预处理器发出一条错误消息，该消息包含指令中的文本，如果可能，编译过程应该中断。
```c
#if __STDC_VERSION__ != 201112L         // 如果不适用C11标准进行编译则编译失败
#error Not C11
#endif
```

## `pragma`
编译指示。 `#pragma` 把编译器指令放入源码中。C99 还提供 `_Pragma` 预处理器运算符，该字符把字符串转换成普通的编译指示。

```c
_Pragma("nonstantardtreatmenttypeB on")
// 等价于下面的指令
#pragma nonstantardtreatmenttypeB on
```

## 泛型选择（C11）
在程序设计中，泛型编程（generic programming）指那些没有特定类型，但是一旦指定一种类型，就可以转换成指定类型的代码。
例如，C++在模板中可以创建泛型算法，然后编译器根据指定的类型自动使用实例化代码。C没有这种功能，然而，C11新增了一种表达式，
叫做泛型选择表达式（generic selection expression），可以根据表达式的类型选择一个值。泛型表达式不是一个预处理指令，但在一些泛型编程中它常用作 **#define宏定义** 的一部分。

`Generic(x, int:0, float:1, double:2, default:3)`

第一项是表达式，后面的每个项都由一个类型、一个冒号和一个值组成。

宏必须定义为一条逻辑行，所以多行之间需要用 `\` 来分隔。

```c
#include <stdio.h>

#define MYTYPE(X) _Generic((X), \
int: "int",                     \
float: "float",                 \
double: "double",               \
default:"other")

#define PRT(X) printf("%s\n", MYTYPE(X))


int main() {
    int d = 5;

    PRT(d);                 // d 是 int 类型
    PRT(2.0 * d);           // 2.0 * d 是 double 类型
    PRT(3L);                // 3L 是 long 类型
    PRT(&d);                // &d 的类型是 int *
    return 0;
}

/*
int
double
other
other
*/
```

对一个泛型选择表达式求值时，程序不会先对第一个项求值，它只确定类型。只有匹配标签的类型后才会对表达式求值。

## 内联函数（C99）
通常，函数调用都有一定的开销，因为函数的调用过程包括建立调用、传递参数、跳转到函数代码并返回。使用宏使函数内联，可以避免这样的开销。
C99 还提供了另一种方法：内联函数（inline function）。

把函数编程内联函数，编译器可能会用内联代码替换函数调用，并（或）执行一些其他的优化，但是也可能不起作用。

内敛函数无法在调试器中显示，由于并未给内联函数预留单独的代码块，所以无法获得内联函数的地址（实际上可以获得地址，不过这样做之后，编译器会生成一个非内联函数）。

**内联函数应该比较短小**。把较长的函数变成内联并未节省多长时间，因为执行函数体的时间比调用函数的时间长的多。

内联函数定义与函数调用必须在同一个文件中。鉴于此，一般情况下内联函数都具有内部里按揭。最简单的做法是，把内联函数定义放在头文件，并在使用该内联函数的文件中包含该头文件即可。

```c
// func.h
#ifndef FUNC_H
#define FUNC_H
inline static void eatline(){       // 定义内联函数 eatline
    while(getchar() != '\n')
        continue;
}
#endif
```

## math.h
数学库中包含了诸多标准数学运算函数。

今天在研究 `floor(double x)` （返回不大于 x 的最大整数值）函数时，发现了`FLT_EVAL_METHOD`、`DBL_EPSILON`、`LDBL_EPSILON`宏的使用。 它们的头文件都是 <float.h>
```c
/* The difference between 1 and the least value greater than 1 that is
   representable in the given floating point type, b**1-p.  */
#undef FLT_EPSILON
#undef DBL_EPSILON
#undef LDBL_EPSILON
#define FLT_EPSILON	__FLT_EPSILON__
#define DBL_EPSILON	__DBL_EPSILON__
#define LDBL_EPSILON	__LDBL_EPSILON__
```
`FLT_EVAL_METHOD ` 指定除赋值和转换之外的所有浮点算术运算完成的精度。
```c
/**
  -1  indeterminate (实现行为未定义)
  
   0  evaluate all operations and constants just to the range and
  precision of the type (所有的操作和常量都以所用类型的范围和精度进行评估)
  
   1  evaluate operations and constants of type float and double
  to the range and precision of the double type, evaluate
  long double operations and constants to the range and
  precision of the long double type
  (float和double所有操作和常量都以double的范围和精度进行评估，
  long double所有操作和常量都以long double的范围和精度进行评估)
  
   2  evaluate all operations and constants to the range and
  precision of the long double type
  (所有操作和常量都在long double的范围和精度中进行评估)
*/
```

`DBL_EPSILON` 定义了 float 单精度浮点数的最小值。`LDBL_EPSILON` 定义了 double 双精度浮点数的最小值。这几个宏的具体值取决于处理器、编译器的版本和设置。

这几个宏一般用于两个浮点数的比较。
```c
#include <math.h>

double b = sin(M_PI / 6.0);
if(fabs(b - 0.5) < DBL_EPSILON)
    return 1;
```

## tgmath.h
tg -> Type-generic 类型泛型。

C99 标准提供的 tgmath.h 头文件中定义了泛型类型宏，如果在 math.h 中为一个函数定义了 3 种类型(float、double和long double)
的版本，那么 tgmath.h 文件就创建一个泛型类型宏，与原来 double 版本的函数名同名。例如，根据提供的参数类型，定义 sqrt() 宏展开为
sqrtf()、sqrt()或sqrtl()函数。

如果编译器支持复数运算，就会支持 complex.h 头文件，其中声明了与复数运算相关的函数。

如果包含了 tgmath.h，要调用 sqrt() 函数而不是 sqrt() 宏，可以用圆括号把被调用的函数名括起来。圆括号只会影响操作顺序，不会影响括起来的表达式，
所以这样做得到的仍然是函数调用的结果。
```c
#include <tgmath.h>

int main(){
    float x = 44.0;
    double y;
    y = sqrt(x);        // 调用宏，所以是 sqrtf(x)
    y = (sqrt)(x);      // 调用函数 sqrt()
    return 0;
}
```

不借助 C 标准以外的机制，C11 新增的 _Generic 表达式是实现 tgmath.h 最简单的方式。

## exit() 和 atexit()
在 main() 返回系统时将自动调用 exit() 函数。ANSI 标准还新增了一些不错的功能，其中最重要的时可以指定在执行 exit() 时调用特定函数。
atexit() 通过注册要在退出时调用的函数来提供这一特性。atexit() 函数接受一个函数指针作为参数。

ANSI 保证，atexit() 函数中至少可以存放 32 个函数。最后添加的函数最先执行。

atexit() 注册的函数应该不带任何参数且返回类型为 void。通常，这些函数会执行一些清理任务，例如更新监视程序的文件或重置环境变量。

exit() 执行完 atexit() 指定的函数后，会完成一些清理工作：刷新所有输出流、关闭所有打开的流和关闭由标准 I/O 函数 tmpfile() 创建的临时文件。
然后 exit() 把控制权返回主机环境。如果可能的话，向主机环境报告终止状态。 通常，UNIX 程序使用 0 表示成功终止，用非零值表示终止失败。
UNIX 返回的代码并不适用于所有的系统，所以ANSI C 为了可以执行的要求，定义了一个名为 EXIT_FAILURE 的宏表示终止失败。类似的，ANSI C还定义了
EXIT_SUCCESS 表示成功终止。不过，exit() 函数也接受 0 表示成功终止。

## assert.h
断言库是一个用于辅助调试程序的小型库。它由 assert() 宏组成，接受一个整型表达式作为参数。如果表达式求值为假（非零），assert() 宏就在
标准错误流(stderr) 中写入一条错误信息，并调用 abort() 函数终止程序（abort()函数的原型在 stdlib.h 头文件中）。

使用 assert() 有几个好处：它能够自动标识文件和出问题的行号。可以在 assert.h 的位置前面加入宏 `#define NDEBUG`，重新编译后，编译器
会禁用文件中所有 assert() 语句。如果程序又出现问题，可以移除这条 `#define NDEBUG` 指令，然后重新编译程序。

## _Static_assert(C11)
assert() 表达式是在运行时进行检查。 C11 新增了一个特性： _Static_assert 声明，可以在编译时检查 assert() 表达式。
因此，assert() 会导致正在运行的程序终止，而 _Static_assert() 会导致程序无法通过编译。

_Static_assert 接受两个参数，第1个参数是整型常量表达式，第二个参数是一个字符串。如果第一个表达式求值为 0（或_False），编译器会显示字符串
，而且不编译该程序。

根据语法，_Static_assert() 被视为声明。因此，它可以出现在函数中，或者在这种情况下出现在函数的外部。

## memcpy() 和 memmove()
不能直接把一个数组赋给另一个数组，所以要通过循环把数组中的每个元素赋值给另一个数组相应的元素。有一个例外的情况是：使用 strcpy() 和 strncpy() 函数来处理字符数组。

memcpy() 和 memmove() 函数提供类似的方法处理任意类型的数组。

`void *memcpy(void * restrict s1, const void * restrict s2, size_t n);`

`void *memmove(void *s1, const void *s2, size_t n);`

这两个函数都是从 s2 指向的位置拷贝 n 字节到 s1 指向的位置，而且都返回 s1 的值。不同的是，memcpy()的参数带关键字 restrict，
即 memcpy() 假设 s1, s2 两个内存区域之间没有重叠。

使用 memcpy() 若 s1, s2 区域出现重叠，其行为是未定义的。作为程序员，你有责任保证两个区域不重叠。

C 允许把任何类型的指针赋给 void * 类型的指针。如此宽容导致函数无法知道代拷贝数据的类型。因此这两个函数使用第三个参数指明代拷贝的字节数。注意：字节数不等于元素个数。

## 可变参数: stdarg.h
上文提到过 [变参宏](#变参宏-和-va-args)，该宏可以接受可变数量的参数。`stdarg.h` 头文件为函数提供了一个类似的功能，使用过程如下：

1. 提供一个使用省略号的函数原型，形如`void sum(int n, ...)`
2. 在函数定义中创建一个 `va_list` 类型的变量，并用宏将其初始化为一个参数列表
3. 用宏行问参数列表
4. 用宏完成清理工作

举个例子:
```c
#include <stdio.h>
#include <stdarg.h>

double sum(int, ...);

int main() {
    double s, t;
    s = sum(3, 1.2, 3.2, 4.2);
    t = sum(6, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6);
    printf("sum(3, 1.2, 3.2, 4.2) = %f\n", s);
    printf("sum(6, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6) = %f", t);
}

double sum(int n, ...) {
    va_list osp;         // 声明一个对象存储参数
    double total = 0;
    va_start(osp, n);    // 把 osp 初始化为参数列表
    for (int i = 0; i < n; i++)
        // va_arg(va_list param, TYPE); 给定存储参数和参数类型，访问参数列表中的每一项
        total += va_arg(osp, double);
    va_end(osp);         // 清理工作
    return total;
}

/*
sum(3, 1.2, 3.2, 4.2) = 8.600000
sum(6, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6) = 23.100000
*/
```
 