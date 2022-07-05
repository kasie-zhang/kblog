---
title: C 文件输入和输出
date: 2022-03-5
cover: /img/cover/108.webp
sidebar: 'auto'
categories:
 - 笔记
 - C 语言
tags:
 - C
 - 文件IO
publish: true
permalink: /article/108
---

> 第 108 篇文章
<!-- more -->

## 文件及文件模式
文件（file）通常是在磁盘或固态硬盘上的一段已命名的存储区。

所有文件的内容都以二进制形式存储。但是，如果文件最初使用**二进制编码的字符**（如ASCII和Unicode）表示文本，该文件就是**文本文件**，其中包含文本内容。
如果文件中的二进制值代表**机器语言代码**或**数值数据**或**图片和音乐编码**，该文件就是**二进制文件**，其中包含二进制内容。

不同操作系统在文本文件的保存和处理上有差别，为了规范文本文件的处理，C 提供了两种访问文件的途径：**二进制模式**和**文本模式**。

在二进制模式中，程序可以访问文件的每个字节。而在文本模式中，程序所见的内容和文件的实际内容不同。程序以文本模式读取文件时，把本地环境表示的行尾或文件结尾映射为 C 模式。
:::tip 文件结尾
Macintosh 以 `\r` 结尾，MS-DOS 以 `\r\n` 结尾。

C 在以文本模式读取文件时会将其转化为 `\n`，在写入文件时又转化为对应操作系统的结尾符。
:::

### 二进制文件和文本文件的区别
所有文件在计算机内都是以二进制形式存储的。如果文件使用二进制编码（如ASCII，UNICODE编码）的字符，那么这些文件就是文本文件。如果这些二进制表示其他形式的编码（如机器语言编码、图像、音乐），那么这些文件就是二进制文件。

### 二进制流和文本流的区别
这两种文件格式对系统的依赖性不同：二进制文件和文本文件的区别包括在读写流时程序执行的转换。
二进制文件直接读取文件的每个字节，不转换成字符。针对不同系统平台的差异和字符编码的差异，系统可能会对文本文件做一些字符转化。

## 文件的基本操作
程序设计中定义了一个 FILE 结构指针来指向确定存储设备中的文件，并通过该指针来实现文件的读写。文件操作的基本流程如下：

```c
FILE *fp;
fp = fopen("路径名+文件名", "读写模式");
```

**指向标准文件的指针:**
- 标准输入：`stdin`
- 标准输出：`stdout`
- 标准错误：`stderr`

|函数名|函数的声明|函数的功能|
|----|---|----|
|fopen()|FILE * fopen(const char * filename, const char * mode);|打开指定的文件，打开方式由mode参数决定|
|fclose()|int fclose(FILE * stream)|关闭指定的文件，成功返回0，否则返回EOF|
|getc()/putc()|int getc(FILE * stream) <br><br>int putc(int ch, FILE * stream)|getc()从指定文件读取一个字符<br><br>putc()向参数指定的文件输出指定字符|
|fprintf()|int fprintf(FILE * stream, const char * format, ...)|向文件写入指定格式的内容，其他参数的含义类似与printf()|
|fscanf()|int fscanf(FILE * stream, const char * format, ...)| 从指定文件读取指定格式的内容，其他参数的含义类似与scanf()|
|fgets()/fputs()|char * fgets(char * str, int count, FILE * stream)<br><br>int fputs(const char * str, FILE * stream)|fputs()函数向指定文件写入一个字符串;<br><br>fgets()从指定文件读取指定长度的字符串|

### getc() 和 putc()
getc() 和 putc()函数与 getchar() 和 putchar() 函数类似。不同的是告诉getc() 和 putc() 函数使用哪个文件。

```c
ch = getchar();         // 从标准输入流中获取一个字符
ch = getc(fp);          // 从fp指定的文件中获取一个字符

putc(ch, fout);         // 把字符ch放入FILE指针 fout 指定的文件中
// putc(ch,stdout) 等价于  putchar(ch)

// 文件读取范例
int ch1;
FILE *fp;
fp = fopen("demo.txt", "r");
while((ch = getc(fp)) != EOF){
    putc(ch);           // 处理输入
}
```

### fopen() 的模式字符串
|模式字符串|含义|
|----|----|
|"r"|以读模式打开文件|
|"w"|以写模式打开文件，**把现有文件长度截为0**，如果文件不存在则创建一个|
|"a"|以写模式打开文件，把现有文件末尾添加内容，如果文件不存在，则创建一个新文件|
|"r+"|以更新模式打开文件（可以读写文件）|
|"w+"|以更新模式打开文件（读和写），如果文件存在，则将其长度截为0；如果文件不存在，则创建一个新文件|
|"a+"|以更新模式打开文件（读和写），在现有的文件末尾添加内容，如果文件不存在则创建一个新文件；可以读整个文件，但是只能从末尾添加内容|
|"rb"、"wb"、"ab"、"rb+"、"r+b"<br>"wb+"、"w+b"、"ab+"、"a+b"|与上一个模式类似，但是以**二进制模式**而不是文本模式打开文件（像UNIX和Linux系统，带b字母的模式和不带b字母的模式相同）|
|"wx"、"wbx"、"w+x"、"wb+x"| C11新增，无法打开一个现有文件；独占特性（其他程序或线程无法访问正在被打开的文件）|


### `exit(0);` 和 `return 0;` 的区别

在最初调用的 main() 中使用 return 和调用 exit() 效果相同。但在其他函数中调用 exit() 也会结束整个程序，在其他函数中使用 return，仅将控制权交给上一级递归。

## 文件的I/O函数
文件I/O函数要用FILE指针指定待处理的文件。

### fprintf() 和 fscanf()
fprintf() 和 fscanf() 函数的工作方式和 printf() 和 scanf()类似，区别在于前者要用第一个参数指定待处理的文件。

`int fprintf(FILE * fp, const char * format, ...);`

`int fscanf(FILE * fp, const char * format, ...);`

### fgets() 和 fputs()
`char * fgets(char * buf, int maxCount, FILE * file);`

读取 maxCount-1 大小（读取到第一个换行符或读到文件末尾），然后在末尾添加一个空字符，使之成为一个字符串。读取到 EOF 时返回 NULL。

`int fputs(const char * str, FILE * file);`

在打印字符串时，不会再添加换行符。

## 文件的随机模式
### fseek() 和 ftell()
`int fseek(FILE * file, long offset, int origin);`
- file: 指向待查找文件，已用 fopen() 打开
- offset: 偏移量，正（前移）、负（后移）、零（保持不动）
- origin: 模式，stdio.h 中规定了几个表示模式的明示常量（manifest constant）
  - 文件开始：`#define SEEK_SET 0`   SET - offset （因为偏移量是从头开始算的，所以SET就指代了开头） 
  - 当前位置：`#define SEEK_CUR 1`   CUR - current
  - 文件末尾：`#define SEEK_END 2`   END - end

```c
fseek(fp, 0L, SEEK_SET);            // 定位至文件开始处
fseek(fp, 10L, SEEK_CUR);           // 从文件当前位置前移 2 个字节
fseek(fp, -2L, SEEK_END);           // 从文件结尾回退 2 个字节
```

`long ftell(FILE * file)`

返回参数指向文件的当前位置距文件开始处的字节数。

```c
long last = ftell(fp);
for(long count = 1L; count <= last; count++){
    fseek(fp, -count, SEEK_END);                /* go backward */
    ch = getc(fp);
}
```

### fgetpos() 和 fsetpos()
fseek() 和 ftell() 把文件大小限制在 long 类型能表示的范围内（2^31 -1，约21亿字节），但随着存储设备容量迅猛增长，文件也越来越大。鉴于此，ANSI C 增加了两个处理较大文件的新定位函数：
fgetpos() 和 fsetpos()。

这两个函数用一种新类型：`fpos_t`（file position type） 64 位来定义。
```c
#if (!defined(NO_OLDNAMES) || defined(__GNUC__))
  __MINGW_EXTENSION typedef __int64 fpos_t;
#define _FPOSOFF(fp) ((long)(fp))
#else
  __MINGW_EXTENSION typedef long long fpos_t;
```

`int fgetpos(FILE * restrict file, fpos_t * restrict pos);`

调用 fgetpos()，把 fpos_t 类型的值（文件中当前位置距文件开头的字节数）放在指向 pos 位置的地方。成功返回0，否则返回非0。

`int fsetpos(FILE * file, const fpos_t * pos);`

调用 fsetpos()，使用 pos 指向位置上的 fpos_t 类型值来设置文件指针指向偏移该值后指定的位置。成功返回0，否则返回非0。

## 其他常用函数
### feof()
`int feof(FILE * file);`

当上一次输入调用检测到文件结尾时，feof() 返回一个非零值，否则返回0。

### ferror()
`int ferror(FILE * file);`

当读或写出现错误时，返回一个非零值，否则返回0。

### rewind()
`void rewind(FILE * file);`

设置文件位置为给定流的文件的开头。

### ungetc()
`int ungetc(int ch, FILE * file);`

将一个字符退回到输入流中，这个退回的字符会由下一个读取文件流的函数取得。

```c
#include<stdio.h>
#include<ctype.h>
int main()
{
  int i=0;
  char ch;
  puts("Input an integer followed by a char:");
  // 读取字符直到遇到结束符或者非数字字符
  while((ch = getchar()) != EOF && isdigit(ch))
  {
    i = 10 * i + ch - 48; // 转为整数
  }
  // 如果不是数字，则放回缓冲区
  if (ch != EOF)
  {
    ungetc(ch,stdin); // 把一个字符退回输入流
  }
  printf("\n\ni = %d, next char in buffer = %c\n", i, getchar());
  system("pause");
  return 0;
}
```

### fflush()
`int fflush(FILE * file);`

将输出缓冲区中所有未写入的数据发送到指定的输出流。这个过程被称为**刷新缓冲区**。如果 fp 是空指针，所有输出缓冲区都被刷新。

:::warning 警告
在输入流中使用 fflush() 函数的效果是未定义的。
:::

### setvbuf()
`int setvbuf(FILE * restrict file, char * restrict buf, int mode, size_t size);`

创建一个供标准I/O函数替换使用的缓冲区。在打开文件后且未对流进行操作之前，调用该函数。

- file: 识别待处理的流
- buf: 指向待使用的存储区（数组），若使用NULL，该函数会自己分配一个缓冲区
- mode: 缓冲格式
  - `_IOFBF`: 完全缓冲（在缓冲区满时刷新）
  - `_IOLBF`: 行缓冲（在缓冲区满时，或写入一个换行符时）
  - `_IONBF`: 无缓冲
- size: 告诉缓冲存储区的大小

操作成功，函数返回0，否则返回一个非0值。

```c
#include<stdio.h>

int main(){
    char buff[1024];
    
    memset(buff, '\0', sizeof( buff ));
    
    fprintf(stdout, "启用全缓冲\n");
    setvbuf(stdout, buff, _IOFBF, 1024);
    return 0;
}
```

## 二进制读写函数
将浮点数保存为字符串的过程中容易丢失精度，读取文件时就无法将其恢复为更高的精度。一般而言，fprintf()把数值转换为字符数据，这种转换可能改变值。

为保证数值在存储前后一致，最精确的做法就是使用与计算机相同的**位组合**来存储。因此，double 类型的值应该存储在一个 double 大小的单元中。如果程序所用的表示法把数据存储在文件中，则称以**二进制形式**存储数据。不存在数值形式到字符串的转换过程。

### fwrite()
`size_t  fwrite(const void * restrictstr ptr, size_t size, size_t count, FILE * restrict file);`

以二进制形式写入文件。返回成功写入项的数量，正常情况下就是 count，但如果出现写入错误，返回值会比 count 小。

```c
double ear[10];
fwrite(ear, sizeof(double), 10, fp);        // 把 ear 中的数据写入文件，数据被分为 10 块，每块都是 double 大小
```

### fread()
`size_t fread(void * restrict ptr,size_t size, size_t count, FILE * restrict file);`

以二进制形式读取文件，返回成功读取项的数量，正常情况下就是 count，但如果出现写入错误，返回值会比 count 小。

例如，要恢复上例中保存的内含 10 个 double 类型值的数组：
```c
double ear[10];
fread(ear, sizeof(double), 10, fp);
```

## 程序示例
### 文件 I/O
下面用一个程序示例来演示这些函数的用法。

> 程序功能：把多个文本的内容附加在主文件的末尾，完成后输出主文件内容。

```c
#include<stdio.h>
#include<string.h>
#include <stdlib.h>

#define BUFSIZE 4096
#define SLEN 81

char *s_gets(char *st, int n);

void append(const FILE *source, FILE *dest);

int main() {
    FILE *fd, *fs;               // fd - 目标文件； fs - 源文件
    int file_count = 0;          // 附加的文件数量
    char file_dest[SLEN];        // 目标文件名
    char file_src[SLEN];         // 源文件名
    int ch;

    puts("Enter name of destination file:");
    s_gets(file_dest, SLEN);
    // 打开目标文件
    if ((fd = fopen(file_dest, "a+")) == NULL) {
        fprintf(stderr, "Can't open %s\n", file_dest);
        exit(EXIT_FAILURE);
    }
    // 设置缓冲区
    if (setvbuf(fd, NULL, _IOFBF, BUFSIZE) != 0) {
        fputs("Can't create output buffer\n", stderr);
        exit(EXIT_FAILURE);
    }
    puts("Enter name of first source file (empty line to quit):");

    // 打开源文件
    while (s_gets(file_src, SLEN) && file_src[0] != '\0') {
        if (strcmp(file_src, file_dest) == 0)
            fputs("Can't append file to itself\n", stderr);
        else if ((fs = fopen(file_src, "r")) == NULL)
            fprintf(stderr, "Can't open %s\n", file_src);
        else {
            if (setvbuf(fs, NULL, _IOFBF, BUFSIZE) != 0) {
                fputs("Can't create input buffer\n", stderr);
                continue;
            }
            append(fs, fd);
            if (ferror(fs) != 0)
                fprintf(stderr, "Error in reading file %s.\n", file_src);
            if (ferror(fd) != 0)
                fprintf(stderr, "Error in writing file %s.\n", file_dest);
            fclose(fs);
            file_count++;
            printf("File %s appended.\n", file_src);
            puts("Next file (Empty line to quit):");
        }
    }
    printf("Done appending. %d files appended.\n", file_count);
    rewind(fd);                     // 指向文件开头
    printf("%s contents:\n", file_dest);
    while ((ch = getc(fd)) != EOF)
        putchar(ch);
    puts("\nDone displaying.");
    fclose(fd);

    return 0;
}

/**
 * 从命令行读取数据
 * @param st
 * @param n
 * @return
 */
char *s_gets(char *st, int n) {
    char *ret_val;
    char *find;
    ret_val = fgets(st, n, stdin);
    if (ret_val) {
        find = strchr(st, '\n');        // 查找换行符替换成空字符
        if (find)
            *find = '\0';
        else
            while (getchar() != '\n')
                continue;
    }
    return ret_val;
}

/**
 * 把源文件附加到目标文件末尾
 * @param source
 * @param dest
 */
void append(const FILE *source, FILE *dest) {
    size_t bytes;
    static char temp[BUFSIZE];              // 只分配一次

    while ((bytes = fread(temp, sizeof(char), BUFSIZE, source)) > 0) {
        fwrite(temp, sizeof(char), bytes, dest);
    }
}
```


### 二进制 I/O 随机访问
创建一个存储 double 类型数字的文件，然后让用户访问这些内容。
```c
#include <stdio.h>
#include <stdlib.h>

#define LEN 1000

int main() {
    double numbers[LEN];
    double value;
    const char *file = "numbers.dat";
    long pos;
    int i;
    FILE *iofile;
    // 创建一组 double 类型的值
    for (i = 0; i < LEN; i++)
        numbers[i] = 100.0 * i + 1.0 / (i + 1);
    // 打开文件
    if ((iofile = fopen(file, "wb") == NULL)) {
        fprintf(stderr, "Could not open %s for output.\n", file);
        exit(EXIT_FAILURE);
    }
    // 以二进制格式把数组写入文件
    fwrite(numbers, sizeof(double), LEN, iofile);
    fclose(iofile);

    // 从文件中读取选定内容
    if ((iofile = fopen(file, "rb") == NULL)) {
        fprintf(stderr, "Could not open %s for output.\n", file);
        exit(EXIT_FAILURE);
    }
    printf("Enter an index in the range 0-%d.\n", LEN - 1);
    while (scanf("%d", &i) == 1 && i > 0 && i < LEN) {
        pos = (long) (i * sizeof(double));        // 计算偏移量
        fseek(iofile, pos, SEEK_SET);
        fread(&value, sizeof(double), 1, iofile);
        printf("The value there is %f.\n", value);
        printf("Next index (out of range to quit):\n");
    }
    fclose(iofile);
    puts("Bye!");
    return 0;
}
```
