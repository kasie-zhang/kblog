---
title: C 存储类别、链接和内存管理
date: 2022-03-1
cover: https://api.zk123.top/link/repo1/img/cover/107.webp
sidebar: 'auto'
categories:
- 笔记
- C 语言
tags:
- C
publish: true
permalink: /article/107
---

> 第 107 篇文章
<!-- more -->

## Storage Class
C 提供了多种**存储类别**（storage class）在内存中存储数据。我们在编程示例中使用的数据都存储在内存中。从硬件层面看，被存储的每个值都占用一定的物理内存，
C 语言把这样的一块内存称为**对象**（object）。对象可以存储一个或多个值。

从软件层面看，程序需要一种方法访问对象。这可以通过**声明变量**来完成。

```c
int k = 17;     // 创建了一个名为 k 的标识符(identify)，可以用来指定(designate)特定对象的内容。
```

**对象**在内存中保留了多长时间，可以用**存储期**（storage duration）描述。

**标识符**用于访问对象，可以用**作用域**（scope）和**链接**（linkage）描述。

作用域和链接表明了程序的哪些部分可以使用它。不同的存储类别有不同的存储期、作用域和链接。

---

|存储类别   |存储期| 作用域 |链接   | 声明方式 |
|----------|-----------|------------| ------ |-----|
|自动         |自动   |  块 |无| 块内   |
|寄存器        |自动   | 块 |无| 块内，使用关键字 register|
|静态外部链接   |静态   |  文件  | 外部|所有函数外|
|静态内部链接   |静态    |  文件  | 内部|所有函数外，使用关键字 static|
|静态无链接     |静态     | 块 |无|块内，使用关键字 static|


举个例子：
```c
// parta.c  -- 不同的存储类别
// 与 partb.c 一起编译 
#include<stdio.h>

void report_count();
void accumulate(int k); 
int count = 0;					// 文件作用域，外部链接
 
int main(){
	int value; 					// 自动变量
	register int i;				// 寄存器变量
	
	printf("Enter a positive integer(0 to quit):\n");
	while(scanf("%d", &value) == 1 && value > 0){
		++count;				// 使用文件作用域
		for(i = value; i >= 0; i--)
			accumulate(i);
		printf("Enter a positive integer(0 to quit):\n");
	}
	report_count();
	
	return 0;
}

void report_count(){
	printf("Loop extuted %d times\n", count);
}
```

```c
// partb.c  -- 程序的其余部分 
// 与 parta.c 一起编译 
#include<stdio.h>

extern int count;					// 引用式声明，外部链接

static int total;					// 静态定义，内部链接
void accumulate(int k);				// 函数原型

void accumulate(int k){				// k 具有块作用域，无链接 
	static int subtotal = 0;		// 静态，无链接
	
	if(k <= 0){
		printf("loop cycle: %d\n", count);
		printf("subtotal: %d; total: %d\n", subtotal, total);
		subtotal = 0;
	}
	else{
		subtotal += k;
		total += k;
	}
}
```


## Scope
作用域（scope）：描述程序中可访问标识符的区域。

- **块作用域**（block scope）：块是用一对花括号括起来的代码区域。范围是：从定义处到包含该定义的块的末尾（函数的形参也属于函数体这个块）。

- **函数作用域**（function scope）：仅用于 goto 语句的标签。
- **函数原型作用域**（function prototype scope）：用于函数原型中的形参名。范围是：从形参定义处到原型声明结束。这意味着，编译器在处理形参时，只关心它的类型，而形参名通常无关紧要，且即使有形参名，也不必与函数定义中的形参名相匹配。只有在变长数组中，形参名才有用。
```c
void func(int m, int n, char arr[m][n]);
```

- **文件作用域**（file scope）：变量的定义在函数外面，也被称为**全局变量**（global variable）。范围是：定义处到该定义所在的文件的末尾。

:::tip 翻译单元（translation unit）
**翻译单元**是一个单独的 C/Cpp 源文件，以及通过预处理器 `#include` 机制包含的头文件或其他文件。

描述一个**文件作用域**的变量时，它的实际可见范围是整个翻译单元。
:::

## Linkage
链接描述了名称在整个程序或一个翻译单元中如何引用或不引用同一实体。

要了解链接，让我们深入研究编译过程。

在C和C ++，即由多个源代码文件中的程序被编译一次一个。在编译过程之前，可以通过变量的作用域来描述变量。只有在链接过程开始时，链接属性才起作用。因此，范围是由编译器处理的属性，而链接是由链接器处理的属性。

链接器在编译过程的链接阶段将资源链接在一起。链接器是一个程序，它将多个机器代码文件作为输入，并生成可执行目标代码。它解析符号（即，获取符号的定义，例如"+"），并将对象排列在地址空间中。

链接是一个属性，它描链接器应该如何链接变量。变量应该提供给另一个文件使用吗？应该只在声明的文件中使用变量吗？两者都是由链接决定的。

因此链接使你可以将每个文件的名称耦合在一起，范围决定了这些名称的可见性。

- **外部链接**：外部链接变量可以在**多个文件程序**中使用（外部链接的文件作用域）。
- **内部链接**：内部链接变量只能在**一个翻译单元**中使用（内部链接的文件作用域），由`static`修饰。
- **无链接**：具有`块作用域`、`函数作用域`、`函数原型作用域`的变量（这些变量属于定义它们的块、函数或原型私有）。


## Storage Time
存储期，描述了通过这些标识符访问的对象的生存期。

- **静态存储期**：在程序执行期间一直存在。（例如：文件作用域，包括内部链接的文件作用域和外部链接的文件作用域）
- **线程存储期**：从被声明到线程结束一直存在。（以 _Thread_local 声明一个对象时，每个线程都获得该变量的私有备份）
- **自动存储期**：当程序进入定义这些变量的块时，为这些变量分配内存。当退出这个块时，释放刚才被变量分配的内存。（例如：块作用域的变量）
- **动态分配存储期**：从声明处到块的末尾。（例如：变长数组）

:::tip 块作用域的变量也能具有静态存储期
把变量声明在块中，且在声明前加上关键字 static。
:::

## auto
自动变量。属于自动存储类别的变量具有**自动存储期**、**块作用域**且**无链接**。默认情况下，声明在块或函数头中的任何变量都属于自动存储类别。

auto关键字在 C++ 中的用法完全不同，如果编写 C/C++ 兼容程序，最好不要使用 auto 作为存储类别说明符。

## register
寄存器变量存储在 CPU 的寄存器中。与普通变量相比，访问和处理这些变量的速度更快。由于寄存器变量存储在寄存器而非内存中，所以无法获取寄存器变量的地址。

寄存器变量也属于**块作用域**、**无链接**、**自动存储期**。

声明变量位 register 类别与直接命令相比更像是一种请求。编译器必须根据寄存器或最快可用内存的数量衡量你的请求，或直接忽略你的请求。

## static variable
静态变量，该变量在内存中原地不动，具有静态存储期，只在编译时被初始化一次。

不能在函数的形参中使用静态变量。

## external variable
外部变量，具有**文件作用域**、**外部链接**和**静态存储期**，只能初始化一次，且必须在定义该变量时进行。

> C99 和 C11 标准都要求编译器识别局部标识符的前 63 个字符和外部标识的前 31 个字符。

把变量的定义性声明放在了所有函数的外面便创建了外部变量。为了指出函数使用了外部变量，可以在函数中用关键字 `extern` 再次声明。

如果一个源代码文件使用的外部变量定义在另一个源代码文件中，则必须用 `extern` 在该文件中声明该变量。

一个变量只能有一个定义式声明，但是可以有多个引用式声明（extern）。

```c
#include <stdio.h>

void func();

int num = 10;                           // 定义式声明
int ch = 2;

int main(int argc, char *argv[]) {
	printf("%2d %-20p\n", num , &num);
	printf("%2d %-20p\n", ch, &ch);
	
	func();
	return 0;
}

void func(){
	int ch;                             // 这个 ch，和上面的 ch 不同。
	extern int num;                     // 引用式声明（可选的声明），这个 num，就是上面的 num，内存地址相同
	printf("%2d %-20p\n", num, &num);
	printf("%2d %-20p\n", ch, &ch);
}

/*
10 0000000000404010
 2 0000000000404014
10 0000000000404010
 0 000000000063FDEC
*/
```

## static variable with internal linkage
内部链接的静态变量，具有**静态存储期**、**文件作用域**和**内部链接**。仅可用于同一文件中的函数。

```c
static int ka = 17;
int main(void){

}
```

## Multiple File
只有当程序由多个翻译单元组成时，才能体现区别内部链接和外部链接的重要性。

复杂的 C 程序通常由多个单独的源代码组成。有时，这些文件可能要共享一个外部变量。C 通过在一个文件中进行定义式声明，然后在其他文件中进行引用式声明来实现共享。

除了定义式声明之外，其他声明都要使用 `extern` 关键字。且只有定义式声明才能初始化变量。

如果外部变量定义在一个文件中，那么其他文件在使用该变量之前必须先用 `extern` 关键字声明它。


## 函数存储类别
**外部函数**（默认）、**静态函数**、**内联函数**（C99新增）。

外部函数可以被其他文件的函数访问。
```c
double gamma(double);           // 该函数默认是外部函数
```

静态函数只能用于其定义所在的文件。
```c
static void func();             // 静态函数，由定义该函数的文件私有        
```

```c
extern double func2(double);    // 用 extern 关键字声明定义在其他文件中的函数。
```

## 内存管理
### malloc()和free()
使用 malloc() 和 free() 动态分配内存。

```c
int max = 100;
double * pt = (double *)malloc(max * sizeof(double));
free(pt);

// 声明二维数组
int n = 5;
int m = 10;
int (*pt2)[m];
pt2 = (int (*)[m])malloc(n * m * sizeof(int));      // n * m 数组（要求支持变长数组）
```

使用 malloc() 分配内存后，一定要使用 free() 释放内存，否则动态分配的内存将越来越大，直到消耗掉所有内存。这类问题称为内存泄露（memory leak）。

### calloc()
```c
double * pt = (double *)calloc(100, sizeof(double));
```

函数 `void *malloc(size_t size)` 和 `void *calloc(size_t numElements, size_t sizeOfElement)` 都能用来动态分配，若调用成功都将返回所分配的内存空间的首地址。
主要区别在与 malloc() 不能初始化所分配的内存空间，而 calloc() 则将分配空间中的每一位都初始化为 0（注意，在某些硬件系统中，不是把所有位都设置为 0 来标识浮点值 0）。

:::tip 存储类别和动态内存分配
静态数据（包括字符串字面量）占用一个区域；自动数据占用另一个区域（栈）；动态分配的数据占用另一个区域（堆）；
:::

## 限定符
我们通常用类型和存储类别来描述一个变量。 C90 新增了两个属性：**恒常性**（constancy）**和易变性**（volatility）。这两个属性可以分别用关键字 `const` 和 `voatile`来声明。

以这两个关键字创建的类型是限定类型（qualified type）。C99 新增了第三个限定符：`restrict`，用于提高编译器优化。C11 新增了第四个限定符：`_Atomic`，C11 提供一个可选库，由 `stdatomic.h` 管理，以支持并发程序设计。

C99 为类型限定符增加了一个新属性：**幂等性**（idempotent），即可以在一条声明中多次使用同一个限定符。
```c
const const const char a = 'a';     // 与 const char a = 'a'; 是等价的
```

有了幂等性，可以编写类似下面的代码：

```c
typedef const int zip;

const zip q = 17;
```

### const
以 const 关键字声明的对象，在初始化后，就不能改变它的值。

```c
const int num;
num = 10;                       // 不允许

const int day = 10;             // 没问题
const int year[3] = {2,3,4};    // 没问题
```

**在指针中使用 const。** 重点区分限制指针本身为 const 还是限定指针指向的值为 const。

```c
// const 离谁比较近，谁就被cosnt修饰
const float *pt;            // pt 指向一个float类型的const值；(*pt)是只读的，无法改变；但pt可以改变。
float * const pt;           // pt 是一个const指针；pt 是只读的，无法改变；但(*pt)可以改变。
``` 

**在形参中使用 const。** 若数据只读则使用const修饰，否则不使用。
```c
void func(const int * pt, int n);           // 表明不更改pt指向的数据。
```

**在文件间共享 const 数据的两种策略：**
- 1.在一个文件中使用定义式声明，在其他文件中使用引用式声明（extern）。
  - 优点：所有外部变量访问同一份数据，空间占用小。
  - 缺点：所有需要使用外部变量的文件，都要编写引用式声明，代码编写麻烦。
```c
//file1.c ---- 定义一些外部 const 变量
const double PI = 3.141592;
const char * arr[3] = {"aaa","bbb","ccc"};

//file2.c ---- 使用定义在别处的外部 const 变量
extern const double PI;
extern const char * arr[];
```

- 2.把 const 变量放在一个头文件中，在其他文件中包含该头文件。
  - 优点：方便偷懒，所有文件都只需包含同一个头文件。
  - 缺点：数据冗余严重。这种方案相当于给每个文件提供了一个单独的副本数据，数据是重复的。
```c
// constant.h ---- 定义了一些外部 const 变量
static const double PI = 3.1415926;                     // 必须用 static 声明全局 const 变量。
static const char * arr[3] = {"aaa","bbb","ccc"};       // 避免在每个文件中都有一个相同标识符定义声明。

// file1.c ---- 使用定义在别处的外部 const 变量
#include "constant.h"

// file2.c ---- 使用定义在别处的外部 const 变量
#include "constant.h"
```

### volatile
表示**限定的数据除了被当前程序修改外，还可以被其他进程修改**。目的是**警告编译器不要进行假定的优化**。

volatile 涉及编译器的优化，以下面代码为例，演示编译器的优化方案：
```c
int x = 10;
int a = x;
/* 一些不使用 x 的代码 */
int b = x;
```
智能的编译器注意到以上代码使用了两次 x，但并未改变它的值。于是编译器把 x 的值临时存储在寄存器中，然后在 b 需要使用 x 时，才从寄存器中（不是原始内存位置上）读取 x 的值，以节约时间。
这个过程被称为**高速缓存**（caching）。

在 ANSI 以前，为安全起见，编译器不会进行高速缓存。现在，如果声明中没有 `volatile` 关键字，编译器会假定变量的值在使用过程中不变，然后尝试优化代码。

可以同时用 `const` 和 `volatile` 限定一个值。表示限定的数据不能被当前程序修改，但可以被其他进程修改。
```c 
// 只能在声明中同时使用这两个限定符，它们的顺序不重要。
volatile const int data;
const volatile int * pt;
```

### restrict
restrict 限定符是也是为了方便编译器设置优化方案（对于数据的多次更改，能够优化成少次更改），**只能用于指针**。

**restrict 限定的指针是访问它所指向数据的唯一途径。**

如果未使用 `restrict` 关键字，编译器就必须假设最坏的情况（即，在两次使用指针之间，其他的标识符可能已经改变了数据）。

如果使用了 `restrict` 关键字，编译器就可以选择捷径优化。
```c
#include <stdio.h>

int main(){
    int ar[10];
    int * restrict restar = (int *)malloc(10 * sizeof(int));    // 声明 restar 是访问它所指向的数据块的唯一且初始方式
    int *par = ar;
    
    for (int n = 0; n<10; n++){
        par[5] += 5;
        restar[n] += 5;
        ar[n] *= 2;
        par[n] += 3;
        restar[n] += 3;                     // 编译器可以把涉及 restar 的两条语句替换成：restar[n] += 8;
                                            // 但无法将与 par 相关的两条语句替换成： par[n] += 8; 将导致替换错误
                                            // 因为在 par 两次访问相同的数据之间，用 ar 改变了该数据的值
    }
    return 0;
}
```

**restrict 关键字用于形参中的指针。** 编译器假定在函数体内其他标识符不会修改该指针指向的数据，且尝试对其优化。 

```c
void * memcpy(void * restrict s1, void * restrict s2, size_t n);
void * memmove(void * s1, const void * s2, size_t n);
```
这两个函数都从位置 s2 把 n 字节拷贝到位置 s1。 memcpy()函数要求两个位置不重叠。但 memmove()没有要求。

因为 memcpy() 声明了 s1、s2 都由 `restrict` 限定，所以这两个指针都是访问响应数据的唯一方式，所以它们不能访问相同块的数据。

**restrict 关键字的两个读者：**
- **编译器**。该关键字告知编译器可以自由假定一些优化方案。
- **程序员**。该关键字告知程序员要使用满足 restrict 要求的参数，编译器不会检查你是否遵循这一限制，但无视它将后果自负。

### _Atomic
并发程序设计把程序执行分成多个可以同时执行的多个线程。这给程序设计带来了新的挑战，包括如何管理访问相同数据的不同线程。 C11 通过可选的头文件 `stdatomic.h` 和 `thread.h`，提供了一些可选的管理方法。

通过各种宏函数来访问原子类型，当一个线程对一个原子类型的对象执行原子操作时，其他线程不能访问该对象。
```c
int hogs;                       // 普通声明
hogs = 12;                      // 普通赋值
// 可以替换成:
_Atomic int hogs;               // 原子类型的变量
atomic_store(&hogs, 12);        // stdatomic.h 中的宏，在hogs中存储12是一个原子过程，其他线程不能访问
```

