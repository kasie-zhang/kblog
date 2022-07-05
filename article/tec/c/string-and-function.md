---
title: C 字符串和字符串函数
date: 2022-02-23
cover: /img/cover/104.webp
sidebar: 'auto'
categories:
 - 笔记
 - C 语言
tags:
 - C
 - 函数
 - 字符串
publish: true
permalink: /article/104
---

> 第 104 篇文章
<!-- more -->

字符串是 C 语言中最有用、最重要的数据类型之一。虽然我们一直在使用字符串，但是要学的东西还很多。C 库提供大量的函数用于读写字符串、拷贝字符串、比较字符串、合并字符串、查找字符串等。

## String Initialize
定义字符串有多种方法，**字符串常量**、**char 类型数组**、**指向 char 的指针**。程序应该确保有足够的空间存储字符串。


### String Literal / String constant
用双引号括起来的内容称为**字符串字面量**（String Literal），也叫做**字符串常量**（String Constant）。双引号中的字符和编译器自动加入末尾的 '\0'，都作为字符串存储在内存中。
所以 "I LOVE CHINA"，"Kasie Zhang"，"I AM SO HANDSOME" 都是字符串字面量。

从 ANSI C 标准起，如果字符串字面量之间没有间隔，或者用空白字符串分隔，C 会将其视为**串联起来的字符串字面量**。例如：

```c
// arr 和 arr1 等价
char arr[100] = "Hello""I am" "Kasie Zhang"
                "!";
char arr1[100] = "Hello I am Kasie Zhang !";
```

:::tip Tip
如果要**在字符串中使用双引号**，必须在双引号前加上一个反斜杠(\)
:::

字符串常量属于**静态存储类别**(static storage class)，这说明如果在函数中使用字符串常量，该字符串只会被存储一次，所以**字符串字面量不允许被修改！** 
在整个程序的生命期内存在，即使函数被调用多次。 用双括号括起来的内容（字符串字面量）被视为指向该字符串存储位置的指针。

```c
// 把字符串看作指针
#include<stdio.h>
int main(){
	printf("%s %p %c\n","I", "LOVE", *"CHINA");	// I 0000000000405006 C
	// printf() 根据 %s 转换说明打印 I
	// 根据 %p 转换说明打印一个地址
	// *"CHINA" 表示该字符串所指向地址上存储的值，根据 %c 转换说明打印字符串 "CHINA" 首字母 C
	
	char *str = "I LOVE CHINA";
	puts(str);									// I LOVE CHINA
	
	str[0] = 'W';								// 尝试更改字符串字面量内部的值，无法执行
	puts(str);									// 程序终止
}
```


### String Array and Initialize
定义字符串数组时，必须让编译器知道需要多少空间。一种方法是用**足够空间的数组**存储字符串。指定数组大小时，要**确保数组的元素个数至少比字符串长度多1**（为了容纳空字符）。所有未被使用的元素都被初始化为 `\0`。

通常，让编译器确定初始化字符数组的大小很方便。**省略数组初始化声明中的大小**，编译器会自动计算数组的大小（通过查找字符串末尾的空字符确定字符串在何处结束）。

```c
// 指定字符数组大小
const char arr[40] = "I LOVE CHINA";

// 让编译器确定字符数组的大小
const char arr1[] = "I LOVE CHINA";

// 指针法创建字符串
const char * pt1 = "I LOVE CHINA";
```

---

二维字符串数组：
```c
#include<stdio.h>
#define LEN 40
#define LIM 3

int main(void){
    const char * arr1[LIM] = {
        "len1",
        "len2",
        "len3"
    };
    char arr2[LIM][LEN] = {
        "abc",
        "def",
        "mno"
    };
}
```

arr1 数组时一个内含 3 个指针的数组，在系统中占用 24 个字节。而 arr2 是一个含有 3 个数组的数组，每个数组内含有 40 个 char 类型的值，共占用 120 字节。
所以，虽然 `arr1[0]` 和 `arr2[0]` 都分别表示一个字符串，但 arr1 和 arr2 的类型并不相同。arr1 中的指针指向初始化时所用的字符串字面量的位置，这些字符串字面量被存储在静态内存中；
而 arr2 中的数组则存储着字符串字面量的副本，所以每个字符串都被存储了两次。

:::tip 总结
如果要用数组表示一系列带显示的字符串，请使用**指针数组**，因为它比二维字符数组的效率高。但指针指向的字符串字面量不能更改。

如果要改变字符串或为字符串输入预留空间，不要使用指向字符串字面量的指针。
:::



### Array and Pointer
数组形式和指针形式的区别：
- **数组形式** - `const char arr1[] = "I LOVE CHINA";`

数组形式 `arr1[]` 在计算机的内存中分配为一个内含 13 个元素的数组（每个元素对应一个字符，还加上一个末尾的空字符 `\0`），每个元素被初始化为字符串字面量对应的字符。
通常，字符串都作为可执行文件的一部分存储在数据段中。当把程序载入内存时，也载入了程序中的字符串。字符串存储在**静态存储区**（static memory）中。但是程序在开始运行时才会为该数组分配内存。此时，才将**字符串拷贝到数组**中。注意，此时字符串有两个副本，一个是在静态内存中的**字符串字面量**，另一个是存储在 `arr1` 数组中的**字符串**。

此后，编译器便把数组名 `arr1` 识别为该数组首元素地址（`&arr1[0]`）的别名。注意：`arr1` 是**地址常量**，不能修改。

---

- **指针形式** - `const char * pt1 = "I LOVE CHINA";`

指针形式 `*pt1` 也使得编译器为字符串在静态区域留出 13 个元素的空间。另外，一旦开始执行程序，它会为**指针变量** `pt1` 留出一个存储位置，并把字符串的地址存储在指针变量中。
该变量最初指向该字符串的首字符，但它的值可以改变。因此，可以使用递增运算符。例如，`++pt1` 将指向第二个字符。

---

字符串自变量被视为 `const` 数据。由于 `pt1` 指向这个 `const` 数据，所以应该把 `pt1` 声明为指向 `const` 数据的指针。这意味着不能用 `pt1` 改变它所指向的数据，但是仍然可以改变 `pt1` 的值。

如果把字符串字面量拷贝给一个数组，就可以随意更改数据，除非把数组声明为 `const`。

:::tip 总结
**初始化数组**：把静态存储区的字符串拷贝到数组中。字符数组默认为非 const 数据，可以修改。

**初始化指针**：只把字符串的地址拷贝给指针。字符串默认为 const 数据，无法修改。

**建议在把指针初始化为字符串字面量时使用 const 限定符。** 推荐用法：`const char * p1 = "I LOVE CHINA";`

**如果打算修改字符串，就不要用指针指向字符串字面量**。
:::

---

举个例子:
```c
#include<stdio.h>
#define MSG "I LOVE CHINA"

int main(){
	char ar[] = MSG;
	const char * pt = MSG;
	printf("address of \"I LOVE CHINA\": %p\n", "I LOVE CHINA");
	printf("address of ar: %p\n", ar);
	printf("address of pt: %p\n", pt);
	printf("address of MSG: %p\n", MSG);
	printf("address of \"I LOVE CHINA\": %p\n", "I LOVE CHINA");
}
```
输出如下:
```markdown
address of "I LOVE CHINA": 0000000000405000
address of ar: 000000000062FE00
address of pt: 0000000000405000
address of MSG: 0000000000405000
address of "I LOVE CHINA": 0000000000405000
```
输出说明以下几点：
- `pt` 和 `MSG` 的地址相同，而 `ar` 的地址不同。
- 虽然字符串字面量 `"I LOVE CHINA"` 使用了两次，但是编译器只是用了一个存储位置，而且与 `MSG` 的地址相同。即**编译器可以把多次使用的相同字面量存储在一处**。
- 静态数据使用的内存与 `ar` 使用的动态内存不同。不仅是值不同，特定编译器甚至使用不同的位数表示两种内存。


## String Input
如果想把一个字符串读入程序，首先必须**预留存储该字符串的空间**，然后用输入函数**获取该字符串**。

```c
// 显式指明数组大小
char name[100];
```


### Deprecated - gets()
在读取字符串时，`scanf()` 和**转换说明** `%s` 只能读取一个单词。可是在程序中经常要读取一整行输入，而不仅仅是一个单词。许多年前 `gets()` 函数就用于处理这种情况。
`gets()` 函数简单易用，它读取整行输入，直到遇到换行符，然后丢弃换行符，存储其余字符，并在这些字符的末尾添加一个空字符使其成为一个 C 字符串。它经常和 `puts()` 函数配对使用，该函数用于显示字符串，并在末尾添加换行符。

非常遗憾，`gets()` 函数**非常不安全**，因为 `gets()` 唯一的参数是 `words`, `gets()` 函数只知道数组的开始处，不知道数组能够承载多少个元素，它无法检查数组是否能够装的下输入行。如果输入的字符串过长，会导致**缓冲区溢出**（buffer overflow）。
如果这些多余的字符只是占用了尚未使用的内存，就不会立即出现问题；如果他们擦写掉程序中的其他数据，会导致程序异常中止；或者还有其他情况。

C99 标准委员会承认了 `gets()` 的问题并建议不要再使用它。C11 标准委员会采用了更强硬的态度，直接从标准中废除了 `gets()` 函数。我们在编程时应摒弃 `gets()`。

举个例子: 
```c
#include<stdio.h>
#define LEN 2

//设定 arr 数组长度为 2， 输入字符长度大于 2， gets() 函数试图访问未分配的内存
int main(){
    setbuf(stdout, NULL);
    char arr[LEN];                      // arr 数组仅能承载2个字符
    printf("%p\n", &arr[0]);
    gets(arr);
    puts(arr);
}
```
动图演示：
![](/img/2022/104_1.gif)

`gets()` 的**替代品**: `fgets()`、`gets_s()`。

### 推荐 - fgets()
`fgets(char * _Buf, int _MaxCount, FILE * _File)`

fgets() 函数通过第二个参数限制读入的字符数来解决溢出的问题。该函数专门设计用于处理文件输入，所以一般情况下可能不太好用。

- fgets() 函数的第 2 个 参数指定了读入字符的最大数量。若该参数为 n，则读入 n-1 个字符，或者读到遇到的第一个换行符为止。
- fgets() 读到一个换行符会把它存储在字符串中。这点与 gets() 不同，gets() 会丢弃换行符。
- fgets() 第 3 个参数要知名读入的文件。如果读入从键盘输入的数据，则会以 stdin（标准输入）作为参数

举个例子:
```c
#include <stdio.h>
#define STLEN 14
// 演示 fgets() 和 fputs() 的用法

int main(void)
{
    char words[STLEN];
    puts("Enter a string, please.");
    fgets(words, STLEN, stdin);
    printf("Your string twice (puts() then fputs()):\n");
    puts(words);
    fputs(words, stdout);

    puts("Enter another string, please.");
    fgets(words, STLEN, stdin);
    printf("Your string twice (puts() then fputs()):\n");
    puts(words);
    fputs(words, stdout);
    puts("Done");

    return 0;
}
/*
Enter a string, please.
apple
Your string twice (puts() then fputs()):
apple

apple
Enter another string, please.
hello everybody
Your string twice (puts() then fputs()):
hello everybo
hello everyboDone
*/
```
`STLEN` 为 14，所以 fgets() 最多读取 13 个字符。读入 `apple\n` 时，小于 13个字符因此 `apple\n\0` 被存储在数组中，puts() 输出时，又在末尾加上了换行符，因此 `apple` 后面有一行空行，fputs() 不会在字符串末尾加上换行符，所以并未打印出空行。
读入 `hello everybody\n` 时，超过了 13 个字符，因此只把 `hello everybo\0` 存入数组。

---

举个例子：
```c
#include<stdio.h>
#define STLEN 10

// 使用 fgets() 和 fputs()

int main(void){
    setbuf(stdout, NULL);
    char words[STLEN];
    printf("%p\n", words);
    puts("Enter strings (empty line to quit):");
    while (fgets(words, STLEN, stdin) != NULL && words[0] != '\n')
        fputs(words, stdout);

    puts("Done.");
    return 0;
}

/*
000000000061FE16
Enter strings (empty line to quit):
123456 789abc defmnopq
123456 789abc defmnopq

Done.
*/
```
**fgets() 返回指向 char 的指针。如果一切顺利，该函数返回的地址与传入的第一个参数相同。** 

**具体分析如下:**

数组长度为 10，每次能够读取 9 个字符，最后一个用于存放 `\0`；系统使用**缓冲的I/O**，**这意味着用户在按下 Return 键之前，输入都被存储在临时存储区（即，缓冲区）中。按下 Return 键就在输入中增加了一个换行符，并把整行输入发送给 fgets()。**
**对于输出， fputs() 把字符发送给另一个缓冲区，当发送换行符时，缓冲区的内容被发送到屏幕上。** 下面来 debug 程序执行的每个步骤。

- 原始内存值如下：
![](/img/2022/104_2.png)

- Step 1: 输入 `123456 789abc defmnopq`，执行第一次 fgets()，读入了 9 个字符 `123456 78`，保存为 `123456 78\0`。
![](/img/2022/104_3.png)

- Step 2: 执行第一次 fputs()，执行第二次 fgets()，读入了 9 个字符 `9abc defm`，保存为 `9abc defm\0` 数组原来的值被覆盖。
![](/img/2022/104_4.png)

- Step 3: 执行第二次 fputs()，执行第三次 fgets()，读入剩余的 5 个字符 `nopq\n`，保存为 `nopq\n\0`，占用 6 个位置，余下的4个位置未被修改，仍是上一次写入的值。
![](/img/2022/104_5.png)

---

**基于 fgets() 创建一个更强大的读取输入函数:**
```c
#include<stdio.h>

/**
 * 读取 stdin 输入，把所有 \n 替换成 \0; 
 * 丢弃尚未读取完的数据(输出行中多出来的字符会被留在缓冲区中，成为下一次读取语句的输入);
 * 缺陷：遇到不合适的输入时毫无反应;
 * @param st
 * @param n
 * @return
 */

char *s_gets(char *st, int n) {
    char *ret_val;
    int i = 0;

    ret_val = fgets(st, n, stdin);
    if (ret_val) {
        while (st[i] != '\n' && st[i] != '\0')
            i++;
        if (st[i] == '\n')
            st[i] = '\0';
        else
            while (getchar() != '\n')
                continue;
    }
    return ret_val;
}
```

:::tip 空字符和空指针
空字符（`'\0'`）是用于标记 C 字符串末尾的字符，其对应字符编码是 0，占用 1 字节。由于其他字符的编码不可能是 0，所以不可能是字符串的一部分。

空指针（NULL）被定义为 `((void *)0)` 可以看作是特殊的指针，大小通常与机器有关，32 位机器则占用 4 字节，64 位机器则占用 8 字节。尽管上面提到了与机器相关的东西，但作为 C 程序员，我们应该始终努力使我们的代码尽可能地可移植。

建议：
- 始终将指针变量初始化为 NULL。
- 在访问任何指针之前始终执行 NULL 检查。

```c
#include<stdio.h>

int main(void){
    printf("d %d\n", NULL);                         // d 0
    printf("c %c\n", NULL);                         // c
    printf("s %s\n", NULL);                         // s (null)
    printf("f %f\n", NULL);                         // f 0.000000
    printf("size of NULL %zd\n", sizeof(NULL));     // size of NULL 8
    printf("address of NULL %p\n", NULL);           // address of NULL 0000000000000000

    int * ptr = NULL;
    printf("%d\n",*ptr);                            // 无法执行

    /*
     * C11 clause 6.5.3.4 mentions that “The sizeof operator shall not be applied to
     * an expression that has function type or an incomplete type, to the parenthesized
     * name of such a type, or to an expression that designates a bit-field member.”
     * Basically, it means that void is an incomplete type whose size doesn't make
     * any sense in C programs but implementations (such as gcc) can choose sizeof(void)
     * as 1 so that the flat memory pointed by void pointer can be viewed as untyped memory
     * i.e. a sequence of bytes.
     */
    printf("size of void %llu\n",sizeof(void));     // 1；GCC 把 sizeof(void) 解释为 1 字节

    /*
     * C11 clause 6.2.5, “A pointer to void shall have the same representation and alignment
     * requirements as a pointer to a character type”.
     */
    printf("size of void * %llu\n",sizeof(void *));  // 8
    // C11 规定，指向void的指针应具有与指向char类型的指针相同的表示和对齐要求
    return 0;
}
```
:::

### 不推荐 - gets_s()
`gets_s(char *, long long len)`

C11 新增的 gets_s() 函数，与 fgets() 类似，用一个参数限制读入的字符数。 但它不是一流的标准函数（只作为 C 库的可选扩展之一），它由Visual Studio（[在MSDN上提到](http://msdn.microsoft.com/en-us/library/5b5x9wc7.aspx)）实现，未包含在 GCC 中。

输入行太长的情况下，gets() 函数不安全，他会擦除现有数据，存在安全隐患。gets_s() 函数很安全，但是，如果并不希望程序中止或退出，就要知道如何编写特殊的“处理函数”。
另外如果打算让程序继续运行，gets_s() 函数会丢弃该输入行的其余字符，无论你是否需要。可见，当输入太长，超过数组可容纳的字符数时，fgets() 函数最容易使用。
所以，当输入与预期不符时，gets_s() 完全没有 fgets() 函数方便、灵活。这也许时 gets_s() 只作为 C 库的可选扩展的原因之一。所以**推荐使用 fgets()函数来处理字符串输入**。


gets_s() 与 fgets() 的区别如下：
- gets_s() 只从标准输入（stdin）中读取数据，所以不需要第 3 个参数。
- 如果 gets_s() 读到换行符，会丢弃它。
- 如果 gets_s() 读到最大字符都没有换行符，会执行以下几步：
  - 1.把目标数组中的首字符设置为空字符，读取并丢弃随后的输入直至读到换行符或文件结尾，然后返回空指针。
  - 2.调用依赖实现的“处理函数”（或你选择的其他函数），可能会中止或退出程序。


### scanf()
scanf() 更像是“获取单词”，而不是“获取字符串”函数；例如 `%10s`，scanf() 将读取 10 个字符或读取到第 1 个空白字符停止（先满足的条件即是结束输入的条件）。

scanf() 函数返回一个整数值，该值等于 scanf() 成功读取的项数或 EOF（读到文件结尾时返回 EOF）。

根据输入数据的性质，用 fgets() 读取从键盘输入的数据更合适。例如，scanf() 无法完整读取书名或歌曲名，除非这些名称是一个单词。
scanf() 的典型用法是读取并转换混合数据类型为某种标准形式。

## String Output
C 有 3 个标准库函数用于打印字符串：`puts()`、`fputs()`、`printf()`。

### puts()
puts() 函数很容易使用，只需把字符串的地址作为参数传递给它即可。puts() 会**自动在显示的字符串末尾加上换行符**。puts() 在遇到**空字符**`'\0'`时就停止输出，所以必须确保有空字符。

```c
#include<stdio.h>
#define MAXLENGTH 100
int main(void){
    char words[MAXLENGTH] = "I LOVE CHINA";
    const char * p1 = words;
    puts(words);
    puts(p1);
    puts("I LOVE CHINA");                     // 用双引号括起来的是字符串常量，被视为该字符串的地址。
}
// I LOVE CHINA
// I LOVE CHINA
// I LOVE CHINA
```

### fputs()
fputs() 是 puts() 针对文件定制的版本。它们的区别如下。

- fputs() 函数的第 2 个参数指明要写入数据的文件。如果要打印在显示器上，可以用定义在 stdio.h 中的 `stdout`（标准输出）作为参数。
- 与 puts() 不同，fputs() 不会在输出的末尾添加换行符。

### printf()
printf() 可以借助**转换说明**（Conversion Specification）格式化不同的数据类型。

## Custom Input/Output
自定义输入/输出函数。如果你不想使用 C 库中的标准函数，完全可以在 getchar() 和 putchar() 的基础上自定义所需的函数。

> 设计一个类似 puts() 但不会自动添加换行符的函数：

```c
#include<stdio.h>

void put1(const char *string){
    while (*string) {                   // 当 string 指向空字符 '\0' 时，*string 的值是0，即测试条件为假
        putchar(*string++);             // 后置递增运算符(++)的优先级高于解引用运算符(*)
        // 含义是解引用当前指针所指向位置的内容，然后把指针指向的位置向后移动一个位置
    }
}
```

> 设计一个类似 puts() 的函数，且该函数还给出待打印字符的个数

```c
#include<stdio.h>

int put2(const char *string) {
    int count = 0;
    while (*string) {
        putchar(*string++);
        count++;
    }
    putchar('\n');              // 不统计换行符

    return count;
}
```

## String Function
C 库提供了多个处理字符串的函数，[ANSI C](https://en.wikipedia.org/wiki/ANSI_C) (C89) 把这些函数的原型放在 `string.h` 头文件中。

### strlen()
`strlen(const char *);`

函数用于统计字符串长度，不包括末尾的空指针。

### strcat()
`char* strcat(char * dest, const char * source);`

接收两个字符串作为参数，该函数把第二个字符串的备份附加在第一个字符串末尾，并把拼接后形成的新字符串作为第 1 个字符串，第 2 个字符串不变，返回第一个字符串的地址。

:::warning 警告
strcat() 函数接收的第一个参数必须是可更改的，且空间要足够大。
```c
#include<stdio.h>
#include<string.h>
#define LEN 6

int main(void) {
    setbuf(stdout, NULL);
    char a[LEN] = "Kasie";
    char *b = "Zhang";
    char *c = "Hello";
    char *ptr = strcat(a, b);          // 能够运行，但存在风险
    // 若第一个数组大小的空间不够大，多出来的字符溢出到相邻存储单元时就会出问题
    
    char *ptr1 = strcat(c, b);         // c 指向字符串常量，由 const 修饰，不可更改；
    // 编译能够通过，但运行会出错（Signal: SIGSEGV (Segmentation fault)），意思是访问了未分配的内存页
}
```
:::

strcat() 和 gets() 类似，也可能导致缓冲区溢出。为什么 C11 标准不废除 strcat()，只留下 strncat()？这也许是因为 gets() 造成的安全隐患来自于使用程序的人，
而 strcat() 暴露的问题是那些粗心的程序员造成的。无法控制用户会进行什么操作，但是，可以控制你的程序做什么。

### strncat()
`char * strncat(char * dest, const char * source, long long count);`

在 strcat() 的基础上，新增第三个参数——**指定了最大添加字符数**。把 Source 字符串的内容附加给 Dest，在加到 Count 个字符或遇到空字符时停止。

注意，请确保 strncat() 的使用安全。

### strcmp()
`int strcmp(const char * str1, const char * str2);`

- 两个字符串**相等**，则返回 `0`。
- 如果在字母表中第 1 个字符串位于第 2 个字符串前面，返回`负数`。
- 如果在字母表中第 1 个字符串位于第 2 个字符串后面，返回`正数`。

strcmp() 比较的是字符串，不是整个数组，也不是单个字符。 

一般而言，strcmp() 会**依次比较每个字符**（按照*机器排序序列*（machine collating sequence）进行比较），直到发现第 1 对不同的字符为止。然后返回对应的值。

### strncmp()
`int strncmp(const char * str1, const char * str, long long maxCount);`

在比较字符串时，仅比较 maxCount 位字符。

举个例子：查找以 "hello" 开头的字符串
```c
#include<stdio.h>
#include<string.h>

#define LISTSIZE 6

int main(void) {
    const char *list[LISTSIZE] = {
            "hellp",
            "hello1",
            "hello2",
            "hello3",
            "lloha",
            "kasie"
    };

    int count = 0;
    for (int i = 0; i < LISTSIZE; i++) {
        if (strncmp("hello", list[i], 5) == 0) {
            printf("Found: %s\n", list[i]);
            count++;
        }
    }
    printf("The list contained %d words beginning with hello", count);
}
/*
Found: hello1
Found: hello2
Found: hello3
The list contained 3 words beginning with hello
*/
```

### strcpy()
`char * strcpy(char * dest, cost char * source);`

如果 pts1 和 pts2 都是指向字符串的指针，那么 `pts2 = pts1` 拷贝的是字符串的地址而不是字符串本身。如果希望拷贝整个字符串，可以使用 strcpy() 函数。

strcpy() 和 strcat() 都有同样的问题，它们都不能检查目标空间是否能够容纳源字符串的副本。拷贝字符串用 `strncpy()` 更安全。

### strncpy()
`char * strncpy(char * dest, const char * source, long long count);`

该函数的第三个参数指明可拷贝的最大字符数。

如果目标空间能容纳源字符串的副本，那么从源字符串拷贝的空字符就是该副本的结尾；如果目标空间装不下副本，则把副本最后一个元素设置为空字符。


### sprintf()
`int sprintf(char * dest, const char * format, ...);`

sprintf() 定义在 `stdio.h` 中，该函数与 printf() 类似，但是它是**把数据写入字符串**，而不是打印在显示器上。

### strchr()
`char * strchr(const char * s, int c);`

如果 **s 字符串中包含 c 字符**，该函数返回指向 s 字符串首次出现 c 字符的指针。否则返回空指针。

### strpbrk()
`char * strpbrk(const char * s1, const char * s2);`

如果 **s1 中包含 s2 字符中的任意字符**，该函数返回指向 s1 字符串首位置的指针。否则返回空字符。

### strrchr()
`char * strrchr(const char * s, char c);`

该函数返回 **s 字符串中 c 字符最后一次出现的位置**。否则返回空指针。

### strstr()
`char * strstr(const char * s1, const char * s2);`

该函数返回指向 **s1 字符串中 s2 字符串出现的首位置**。否则返回空指针。

## Character Function
ANSI C 有一系列标准的函数可以用来分析字符；`ctype.h` 头文件包含了这些函数的原型。

### isXXX
|函数名|如果是以下类型，返回真|
|---|---|
|`isalpha`| 字母 `a-z` `A-Z` 其中**a-z 返回 2**；**a-z 返回 1**|
|`isupper`| 大写字母 `A-Z`|
|`islower`| 小写字母 `a-z`|
|`isdigit`| 数字 `0-9`|
|`isxdigit`| 十六进制数字符 `0-9` `a-f` `A-F`|
|`isspace`|空格符 _0x20_ `space` <br><br>换行符 _0x09_ `\n` <br><br>制表符 _0x0a_ `\t` <br><br>垂直制表符 _0x0b_ `\v` <br><br>换页符 _0x0c_ `\f` <br><br>回车符 _0x0d_ `\r`|
|`ispunct`| 标点符号——`非字母的任意图形字符`|
|`isalnum`| 字母或数字|
|`isprint`| 可打印字符(`图形字符的基础上 + 空格`）|
|`isgraph`| 除空白字符以外的所有可打印字符<br><br>! " # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z \[ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { \| } ~|
|`iscntrl`| 控制字符 [ASCII 码](https://uf.zk123.top/u/O1asFc4L_ascii.svg) 中 `0x00(NUL) - 0x1f(US)` 、`0x7f(DEL)`|


### toupper()
`int toupper(int c);`

字符转大写。

### tolower()
`int tolower(int c);`

字符转小写。

## Command-Line Argument
命令行（command line）是在命令行环境中，用户为运行程序输入命令的行。

命令行参数（command-line argument）是同一行的附加项。一个 C 程序可以读取并使用这些附加项。

C 编译器允许 main() 没有参数或者有两个参数。 main() 有两个参数时，第 1 个参数时命令行中的字符串数量，被称为 `argc`（表示参数计数（argument count））。
系统用空格表示一个字符串的结束和下一个字符串的开始。程序把命令行字符串存储在内存中，并把每个字符串的地址存储在指针数组中，这个指向指针的指针称为 `argv` （表示参数值（argument value））。

如果系统允许，九八程序本身的名称赋给 `argv[0]`，然后把随后的第一个字符串赋给 `argv[1]`，以此类推。

## String To Number - Base
ANSI C 规定 `stdlib.h` 中包含了将 字符串转换为数字的标准库函数。

### atof()
`double atof(const char * string);`

将字符串转化为浮点类型。

### atoi()
`int atoi(const char * string);`

将字符串转化为整型。

### atol()
`long atol(const char * string);`

将字符串转化为 long 类型。

### atoll()
`long long atoll(const char * string)`

将字符串转化为 long long 类型。

## String to Number - Advanced
ANSI C 还提供了一套更智能的函数。

### strtod()
`double strtod(const char * str, char **endPtr);`

**将字符串转化为 double 类型。**

`endPtr` 是一个指针的地址，该指针被设置为**标识输入数字结束字符的地址**。

```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt = NULL;
    double d = strtod(a, &pt);
    printf("%f\n", d);
    printf("%s, %d", pt, (*pt));
    return 0;
}
/*
12.300000
abc, 97
*/
```

### strtof()
`float strtof(const char * nptr, char ** endPtr);`

**将字符串转化为 float 类型。**

`nptr` 是指待转换字符串的指针。`endptr` 是一个指针的地址，该指针被设置为标识输入数字结束字符的地址。

```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt = NULL;
    float f = strtof(a, &pt);
    printf("%f\n", f);
    printf("%s, %d", pt, (*pt));
    return 0;
}
/*
12.300000
abc, 97
*/
```

### strtol()
`long strtol(const char * str,char ** endPtr, int radix);`

**将字符串转化为 long 类型**。`radix` 表示以什么进制写入数字。

```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    char *pt2 = NULL;
    long l1 = strtol(a, &pt1, 10);
    long l2 = strtol(a, &pt2, 16);
    printf("%ld, %ld\n", l1, l2);
    printf("%s, %s", pt1, pt2);
    return 0;
}
/*
12, 18
.3abc, .3abc
*/
```

### strtold()
`long double strtold(const char * string , char ** endPtr);`

**将字符串转化为 long double 类型**。`endptr` 是一个指针的地址，该指针被设置为标识输入数字结束字符的地址。

使用 MinGW-w64 编程，long double 会输出 0.000000，解决办法见另一篇文章 [《踩坑之 —— C long double 打印输出 0.000000》](/article/tec/bugs/bug1.md)


```c
#define printf __mingw_printf
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    printf("%Lf\n", strtold(a, &pt1));
    printf("%s", pt1);
    return 0;
}
/*
12.300000
abc
*/
```

### strtoll()
`long long strtoll(const char * string, char ** endPtr, int radix);`

**将字符串转化为 long long 类型**。`endptr` 是一个指针的地址，该指针被设置为标识输入数字结束字符的地址。`radix` 表示以什么进制写入数字。

```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    long long ll = strtoll(a, &pt1, 10);
    printf("%lld\n", ll);
    printf("%s", pt1);
    return 0;
}
/*
12
.3abc
*/
```
### strtoul()
`unsigned long strtoul(const char * string, char ** endPtr, int radix);`

**将字符串转化为 unsigned long 类型**。`endptr` 是一个指针的地址，该指针被设置为标识输入数字结束字符的地址。`radix` 表示以什么进制写入数字。

```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    unsigned long ul = strtoul(a, &pt1, 10);
    printf("%u\n", ul);
    printf("%s", pt1);
    return 0;
}
/*
12
.3abc
*/
```

### strtoull()
`unsigned long long strtoull(const char * string, char ** endPtr, int radix);`

**将字符串转化为 unsigned long long 类型**。`endptr` 是一个指针的地址，该指针被设置为标识输入数字结束字符的地址。`radix` 表示以什么进制写入数字。


```c
#include<stdio.h>
#include <stdlib.h>

int main(void) {
    char a[10] = "12.3abc";
    char *pt1 = NULL;
    unsigned long long ull = strtoull(a, &pt1, 10);
    printf("%llu\n", ull);
    printf("%s", pt1);
    return 0;
}
/*
12
.3abc
*/
```