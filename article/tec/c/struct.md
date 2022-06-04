---
title: C 结构和其他数据形式
date: 2022-03-09
cover: /img/cover/110.webp
sidebar: 'auto'
categories:
 - 笔记
 - C 语言
tags:
 - C
publish: true
permalink: /110
---

> 第 110 篇文章
<!-- more -->

程序设计时，最重要的步骤之一是选择表示数据的方法。在很多情况下，简单变量甚至是数组还不够。为此，C提供了**结构变量**（struct variable)
提高表示数据的能力，它能让你创建新的形式。

## 建立结构声明
结构声明（struct declaration），声明类似下面这样：

```c
struct book {
    char title[MAXTITL];
    char author[MAXAUTH];
    float value;
};

struct book library;      // 声明一个book结构类型的变量
```

## 定义结构变量
结构有两层含义。一层含义是“结构布局”，结构布局告诉编译器如何表示数据，但是它并未让编译器分配空间。另一层含义是创建一个**结构变量**。

`struct book library;`

编译器执行这行代码便创建了一个结构变量 library。编译器使用 book 模板为该变量分配空间，包含结构中的所有变量，这些存储空间都与一个名称 library 结合在一起。

在结构变量声明中，struct book 所起的作用相当于一般声明中的 int 或 float。例如，可以定义两个 struct book 类型的变量，甚至是可以指向struct book类型结构的指针：

`struct book doll, pin, *ptbook;`

结构变量 doll、pin 中都包含 title、author 和 value 部分。指针 ptbook 可以指向 doll、pin 或者任何其他 book 类型的结构变量。从本质上看，book 结构声明创建了一个名为 struct book 的新类型。

就计算机而言，下面的声明：

`struct book library;`

是以下声明的简化：

```c
struct book {
    char title[MAXTITL];
    char author[MAXAUTH];
    float value;
} library;   /* 声明的花括号右边跟变量名 */
```

换言之，**声明结构**的过程和**定义结构变量**的过程可以组合成一个步骤。

```c
struct {    /* 无结构标记 */
    char title[MAXTITL];
    char author[MAXAUTH];
    float value;
} library;
```

### 初始化结构
初始化变量和数组如下：
```c
int num = 10;
int arr[7] = {1,2,3,4,5,6,7};
```

结构变量也可以这样初始化，ANSI之前，不能用自动变量初始化结构；ANSI之后可以用任意存储类别。与初始化数组的语法类似：
```c
struct book library = {
        "book name",
        "book author",
        20.5
};
```

### 访问结构成员
使用结构成员运算符 —— 点(`.`)，例如 `library.value`，即访问 library 中的 value 部分。本质上，`.value` 的作用相当于 book 结构的下标。

获取结构变量中某个变量的地址需要使用 `&(library.value)` 因为 `.` 的优先级比 `&` 高。

### 结构的初始化器
C99 和 C11 为结构提供了指定初始化器(designated initializer)，其语法与数组的指定初始化器类似。例如，只初始化 book 结构的 value 成员，可以这样做：

`struct book suprice = { .value = 10.7 };`

可以按照任意顺序使用初始化器，且对特定成员的最后一次赋值才是它实际获得的值：

```c
struct book gift = {
    .value = 10.7,
    .title = "Bong",
    .author = "James",
    0.25                // Initializer overrides prior initialization of this subobject，value 被重写为 0.25
};
```

## 结构数组
:::tip 结构和内存
自动存储类别的对象，信息将被存储在栈(stack)中，当结构数组很大时，可能导致栈溢出，解决方法如下：

1. 使用编译器选项设置，设置栈大小为xxx，以容纳这个结构数组
2. 创建静态或外部数组（这样编译器就不会把数组放在栈中）
3. 减小结构数组大小
:::

### 声明结构数组
声明结构数组和声明其他类型的数组类似。下面是一个声明结构数组的例子:

`struct book library[MAXNUM];`

### 访问结构数组
```c
struct book library[10];
library;                    // 一个 book 结构的数组
library[2];                 // 一个数组元素，该元素是 book 结构
library[2].title;           // 一个 char 数组（library[2] 的 title 成员）
library[2].title[4];        // 数组 library[2] 元素的 title 成员的一个字符
```

## 嵌套结构
在一个结构中包含另一个结构。举个例子：

```c
#include<stdio.h>
#define LEN 80

struct name {                // 第一个结构
    char first[LEN];
    char last[LEN];
};

struct guy {                 // 第二个结构
    struct name name;
    char favfood[LEN];
    char job[LEN];
    double income;
};

int main() {
    struct guy kasie = {   // 初始化一个结构变量
            {"kasie", "zhang"},
            "chicken",
            "student",
            0.0
    };
    return 0;
}
```

如何在结构声明中创建嵌套结构？和声明 int 类型变量一样，进行简单的声明：

`struct names name;`

如何访问嵌套结构的成员？使用两次点运算符：

`kasie.name.last;`

从左往右解释： (kasie.name).last。先找到 kasie，再找到 kasie 的 name 成员，再找到 name 的 last 成员。

## 指向结构的指针
为什么要使用指向结构的指针？
1. 指向结构的指针通常比结构本身更容易操纵。
2. 在一些早期 C 实现中，结构不能作为参数传递给函数，但是可以传递指向结构的指针。
3. 即使能传递一个结构，传递指针通常更有效率。
4. 一些用于表示数据的结构中包含指向其他结构的指针。

### 声明和初始化结构指针
声明结构指针很简单：

`struct guy *him;`

首先是关键字 struct，其次是结构标记 guy，然后是一个星号（*），其后跟着指针名。这个语法和其他指针声明一样。

和数组不同的是，**结构变量名并不是结构变量的地址**，因此要在结构变量名前面加上 `&` 运算符。

`him = &fellow[0];`

在某些系统中，一个结构的大小可能大于它各成员大小之和。这是因为系统对数据进行校准的过程中产生了一些“缝隙”。例如，有些系统必须把每个成员都放在偶数地址上，或4倍的地址上。在这些系统中，结构的内部就存在未使用的“缝隙”。

### 用指针访问成员
指针 him 指向结构变量 fellow[0]，如何通过 him 获得 fellow[0] 成员的值？

```c
struct name{
    char first[100];
    char last[100];
};

struct guy{
    struct name name;
    char favfood[100];
    char job[100];
    double income;
}

struct guy fellow[2] = {
    {
        {"a","b"},
        "xx",
        "xx",
        123.0
    },
    {
        {"c","d"},
        "cc",
        "cc",
        2123.0
    }
};
struct guy *him;
him = &fellow[0];

// him 是一个指针，him->imcome 是该指针所指向结构的一个成员
//him->income 等价于 fellow[0].income; 
him->income == fellow[0].income;

// 必须使用 (*him) 因为 . 运算符比 * 运算符的优先级高
fellow[0].income == (*him).imcome;
```

## 结构中的字符数组和字符指针
在结构中可以使用字符数组或字符指针来存储字符串。

```c
struct pname {
    char *first;
    char *last;
};
struct pname tears = {"a", "b"};
```

以上字符串存储在编译器存储常量的地方。结构本身只存储了两个地址，在系统中占用 16 字节。尤其是，struct pname 结构不用为字符串分配任何存储空间。
它使用的是存储在别处的字符串。（如，字符串常量或数组中的字符串）。简言之，在 pname 结构变量中的指针应该只用来在程序中管理哪些已分配和在别处分配的字符串。

因此，如果要用结构存储字符串，用字符数组作为成员比较简单。用指向 char 的指针也行（先 malloc 申请内存，再使用），但是误用会导致严重的问题。

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define LEN 80

void getInfo(struct pname *pst);
char *s_gets(char *str, int n);

struct pname {
    char *first;
    char *last;
};

int main(){
    return 0;
}

// 获取信息
void getInfo(struct pname *pst) {
    char temp[LEN];
    printf("Please enter your first name:\n");
    s_gets(temp, LEN);
    // 分配内存以存储名
    pst->first = (char *) malloc(strlen(temp) + 1);
    // 把名拷贝到动态分配的内存中
    strcpy(pst->first, temp);
    printf("Please enter your last name:\n");
    s_gets(temp, LEN);
    pst->last = (char *) malloc(strlen(temp) + 1);
    strcpy(pst->last, temp);
}

// 获取 cmd 输入
char *s_gets(char *str, int n) {
    char *ret_val;
    char *find;

    ret_val = fgets(str, n, stdin);
    if (ret_val) {
        find = strchr(str, '\n');        // 查找换行符
        if (find)
            *find = '\0';
        else
            while (getchar() != '\n')
                continue;
    }
}

// 释放结构体中动态分配的字符数组内存
void cleanup(struct pname *pst){
    free(pst->first);
    free(pst->last);
}
```

## 复合字面量和结构
C99 的复合字面量特性可以用于结构和数组。如果需要一个临时结构值，复合字面量很好用。例如，可以使用复合字面量创建一个结构**作为函数的参数**或**赋给另一个结构**。语法如下：

`(struct name) {"first", "last"};`

程序示例：使用复合字面量为一个结构变量提供两个可替换的值。

```c
#include <stdio.h>

#define LEN 80

struct book {
    char title[LEN];
    char author[LEN];
    double price;
};

int main() {
    struct book read_first;
    int score;
    printf("Enter the score:\n");
    scanf("%d", &score);
    if (score >= 84)
        read_first = (struct book) {"Book A", "Author A", 10.0};
    else
        read_first = (struct book) {"Book B", "Author B", 11.0};
    return 0;
}
```

## 伸缩型数组成员( C99 )
C99 新增特性：伸缩型数组成员（flexible array member），利用这项特性声明的结构，其最后一个数组成员具有一些特性。

- 该数组不会立刻存在
- 使用这个伸缩型数组成员可以编写合适的代码，就好像它确实存在并具有所需数目的元素一样

声明一个伸缩性数组成员有如下规则：
- 伸缩性数组成员必须是结构的最后一个成员
- 结构中必须至少有一个成员
- 伸缩数组的声明类似与普通数组，只是它的方括号是中空的

```c
struct flex{
    int count;
    double average;
    double source[];        // 伸缩型数组成员
}
```

实际上，C99 希望你声明一个指向 struct flex 类型的指针，然后用 malloc() 分配足够的空间，以存储struct flex 类型结构的常规内容和伸缩性数组成员所需的额外空间。

```c
struct flex *pt;
// 请求为一个结构和一个数组分配存储空间
pt = malloc(sizeof(struct flex) + 5 * sizeof(double));
// 现在有足够的空间存储 count, average和一个内含5个double类型值的数组
pt->count = 5;
pt->score[2] = 1.1;
```

带伸缩型数组成员的结构的特殊处理要求：
- 不能用结构进行赋值或拷贝
- 不要以按值方式把这种结构传递给函数。（按值传递一个参数与赋值类似）要把结构的地址传递给函数
- 不要使用带伸缩型数组成员的结构作为数组成员或另一个结构的成员

## 匿名结构（C11）
匿名结构是一个没有名称的结构成员。

```c
struct person {
    int id;
    struct {char first[20]; char last[20];};        // 匿名结构
}

struct person kasie = {                             // 初始化
    123,{"kasie","zhang"}
};
puts(kasie.first);                                  // 访问匿名成员
```

## 把结构内容保存到文件中
或许存储记录最没有效率的方法是使用 fprintf()。对于多成员的结构，fprintf() 用起来不方便，在检索时还存在问题，因为一个程序要知道一个字段结束和另一个字段开始的位置。

更好的方案是使用 fread() 和 fwrite() 函数读写结构大小的单元。这两个函数一次读写整个记录，而不是一个字段。缺点是不同系统可能使用不同二进制表示法，可移植性差。

## 联合 - Union
**1.联合的基本特性——和 struct 的同与不同：**

union 在某种程度上类似结构体 struct 的一种数据结构，共用体(union)和结构体(struct)一样，可以包含很多种的数据类型和变量。
区别也很明显：
- struct 中内存分配是粗放的，不管用不用，**全分配**。
- union 中各变量**共用一块内存**，是互斥的，但内存使用更加节省。

**2. union 所占内存空间大小**

通常由 union 中占地儿最大的那个变量决定分配多少内存，以字节为最小单位。

```c
union var{
    char c[10];
    int i;
};

union var1{
    char c[12];
    int i;
};

union var2{
    char c[13];
    int i;
};

int main(){
    union var data;
    union var1 data1;
    union var2 data2;
    printf("%zd\n",sizeof(data));               // 12 位，3字节，以字节为最小单位
    printf("%zd\n",sizeof(data1));              // 12 位，3字节
    printf("%zd\n",sizeof(data2));              // 16 位，4字节
}
```

**3.union 和大小端（Big-Endian、Little-Endian）**

[详细了解大端模式和小端模式](../cs-base/big-endian-little-endian.md)


**4.union 多种访问内存方式共存**
举个例子

```c
#include<stdio.h>

union var {
    int a;
    long b;
    double c;
    char d[8];
};

int main() {
    union var data;

    data.a = 17;
    // 内存内容为 11 00 00 00   00 00 00 00
    printf("--------let data.a = 17--------\n");
    printf("data.a = %d\n", data.a);
    printf("data.b = %ld\n", data.b);
    printf("data.c = %f\n", data.c);
    printf("data.d = %s\n", data.d);

    data.b = 27L;
    // 内存内容为 1b 00 00 00   00 00 00 00
    printf("--------let data.b = 27L--------\n");
    printf("data.a = %d\n", data.a);
    printf("data.b = %ld\n", data.b);
    printf("data.c = %f\n", data.c);
    printf("data.d = %s\n", data.d);

    data.c = 17.123;
    // 内存内容为 73 68 91 ed   7c 1f 31 40
    printf("--------let data.c = 17.123--------\n");
    printf("data.a = %d\n", data.a);
    printf("data.b = %ld\n", data.b);
    printf("data.c = %f\n", data.c);
    printf("data.d = %s\n", data.d);

    data.d[0] = 'k';
    data.d[1] = 'a';
    data.d[2] = 's';
    data.d[3] = 'i';
    data.d[4] = 'e';
    data.d[5] = '\0';
    // 内存内容为 6b 61 73 69   65 00 31 40
    printf("--------let data.d = \"kasie\"--------\n");
    printf("data.a = %d\n", data.a);            // 打印 4 字节的数据，0x6973616b 就是十进制的 1769169259
    printf("data.b = %ld\n", data.b);
    printf("data.c = %f\n", data.c);
    printf("data.d = %s\n", data.d);
}
```

输出如下：
```c
/*
--------let data.a = 17--------
data.a = 17
data.b = 17
data.c = 0.000000
data.d = 
--------let data.b = 27L--------
data.a = 27
data.b = 27
data.c = 0.000000
data.d = 
--------let data.c = 17.123--------
data.a = -309237645
data.b = -309237645
data.c = 17.123000
data.d = sh��|1@
--------let data.d = "kasie"--------
data.a = 1769169259
data.b = 1769169259
data.c = 17.001547
data.d = kasie
*/
```

### 使用联合
联合的一种使用方法是，在结构中存储与其成员有从属关系的信息。

假设，用一个结构表示一辆汽车。如果汽车属于驾驶者，就要用一个结构成员来描述这个所有者。如果汽车被租赁，那么需要一个成员来描述其租赁公司。可以用下面的代码来完成。

```c
struct owner{
    char socsecutity[12];
};
struct leasecompany{
    char name[40];
    char headquarters[40];
};

union data{
    struct owner owncar;
    struct leasecompany leasecar;
};

struct car_data{
    char make[15];
    int status;     // 私有为 0，租赁为 1
    union data owninfo;
};
```

假设 flits 是 car_data 类型的结构变量，如果 `flits.status = 0`，程序将使用 `flits.ownerinfo.owncat.socsecurity`，
如果 `flits.status = 1` 程序将使用 `flits.ownerinfo.leasecar.name`。

### 匿名联合
匿名联合和匿名结构的工作原理相同，即匿名联合是一个结构或联合的无名联合成员。例如，重新定义上文中的 car_data 结构。

```c
struct owner {
    char socsecutity[12];
};
struct leasecompany {
    char name[40];
    char headquarters[40];
};

struct car_data {
    char make[15];
    int status;     // 私有为 0，租赁为 1
    union {
        struct owner owncar;
        struct leasecompany leasecar;
    };
};
```

现在，如果 flits 是 car_data 类型的结构变量，可以用 `flits.owncar,socsecurity` 代替 `flits.ownerinfo.owncat.socsecurity`。


## 枚举类型
可以用枚举类型（enumerated type）声明符号名称来表示整型（int）常量。

虽然枚举符是int类型，但是枚举变量可以是任意整数类型，前提是该整数类型可以存储枚举变量。

枚举类型的目的是为了提高程序的可读性和可维护性。

```c
enum spectrum {red, orange, yellow, green, blue, violate};
enum spectrum color;
color = blue;           // spectrum 的枚举符范围是 0~5，所以编译器可以用 unsigned char 来表示 color 变量
```

注意：C 枚举的一些特性并不适用于 C++。例如，C 允许枚举变量使用 `++` 运算符，但是 C++ 标准不允许。所以，如果编写的代码将来会并入 C++ 程序，
那么必须把上面例子中的 color 声明为 int 类型，才能 C 和 C++ 都兼容。

### enum 常量
默认情况下，枚举列表中的常量被赋予 0、1、2等。也可以为枚举常量指定整数值。

`enum level {a, b, c=100, d, e};`

a、b、c、d、e的值分别为 0、1、100、101、102。

## typedef
typedef 工具是一个高级数据特性，利用 typedef 可以为某一类型自定义名称。通常用**大写字母**表示被定义的名称。

例如：

`typedef unsigned char BYTE;`

该定义的作用域取决于 typedef 定义所在的位置。如果定义在函数中，就只有局部作用域，受限于定义所在的函数。如果定义在函数外，就具有文件作用域。


**typedef 与 #define 的区别：**
- typedef 创建的符号名只受限于类型，不能用于值。
- typedef 由编译器解释，不是预处理器
- 在其受限范围内，typedef 比 #define 更灵活

**typedef 比 #define 更加灵活。例子如下：**
```c
typedef char *STRING;
STRING name, sign;              // 等价于 char * name, * sign;

#define STRING_ char *;
STRING_ name_, sign_;           // 等价于 char * name_, sign; 导致只有 name 才是指针。
```

**使用 typedef 表示结构：**
```c
typedef struct complex {
    float imag;
    float real;
} COMPLEX;
```

**typedef 能够提高程序的可移植性。**

`size_t` 和 `time_t` 类型。

**使用 typedef 的原因：**
- 使用 typedef 可以为经常出现的类型创建一个方便、易识别的类型名。
- 用 typedef 来命名一个结构时，可以省略该结构的标签。

注意：typedef 并未创建任何新类型，它只是为某个已存在的类型增加了一个方便使用的标签。


## 其他复杂声明
- `*`：表示一个**指针**
- `()`：表示一个**函数**
- `[]`：表示一个**数组**

下面是一些较为复杂的声明示例：
```c
int board[8][8];               // 声明一个含 int 数组的数组
int ** ptr;                    // 声明一个指向指针的指针，被指向的指针指向 int
int * risk[10];                // 声明一个内含 10 个元素的数组，每个元素都是一个指向 int 的指针
int (* rusk)[10];              // 声明一个指向数组的指针，该数组内含 10 个 int 类型的值
int * oof[3][4];               // 声明一个 3*4 的二维数组，每个元素都是指向 int 的指针
int (* uuf)[3][4];             // 声明一个指向 3*4 二维数组的指针，该数组中内含 int 类型值
int (* uof[3])[4];             // 声明一个内含 3 个指针元素的数组，其中每个指针都指向一个内含 4 个 int 类型元素的数组
```

**要看懂以上声明，关键要理解 `*`、`()` 和 `[]` 的优先级。记住以下几条规则：**
- 数组名后面的`[]`和函数名后面的`()`具有相同优先级。它们的比`*`（解引用运算符）的优先级高。
- `[]`和`()`的优先级相同，从左往右结合。

## 函数指针
函数的机器语言实现由载入内存的代码组成，指向函数的指针中存储着**函数代码的起始处的地址**。

声明一个函数指针时，必须声明指针指向的函数类型（**函数返回类型**和**形参类型**）。

```c
void ToUpper(char *);
void ToLower(char *);
int round(double);
void (*pf)(char *);           // pf 是一个指向函数的指针

pf = ToUpper;                 // 有效，ToUpper 是该函数的地址
pf = ToLower;                 // 有效，ToLower 是该函数的地址
pf = round;                   // 无效，round 与指针类型不匹配
pf = ToLower();               // 无效，ToLower() 不是地址
```

注意，指针 pf 可以指向其他带`char *` 类型参数、返回类型是`void`的函数，不能指向其他类型的函数。

**用函数指针访问函数，有两种逻辑上不一致的语法：**
```c
void ToUpper(char *);
void ToLower(char *);
void (*pf)(char *);           // pf 是一个指向函数的指针
char mis[] = "Kasie";
pf = ToUpper;
(*pf)(mis);                   // 把 ToUpper 作用于 mis（语法1）

pf = ToLower;
pf(mis);                      // 把 ToLower 作用于 mis（语法2）
```
两种语法都具有合理性：
- 语法1

由于 pf 指向 ToUpper 函数，那么 `*pf` 就相当于 ToUpper 函数，所以 `(*pf)(mis)` 和 `ToUpper(mis)` 相同。

- 语法2

由于函数名是指针，那么指针和函数名可以互换使用，所以 `pf(mis)` 和