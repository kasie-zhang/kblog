> Create: 3/9/2022
>
> Last Update: 7/19/2022

# **踩坑之 —— C fseek() 回退时总是到达文件头**

# **开发环境**

操作系统：Win11

编译器：[MinGW-w64](https://en.wikipedia.org/wiki/Mingw-w64)

IDE：[CLion](https://www.jetbrains.com/clion/)

GCC Version：8.1.0

# **问题描述**

C 语言使用 `fseek()` 向前移动文件指针时，总是直接到达文件头。

```c
// 打开一个文件，将其中的小写字母全部转换为大写字母。
#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>

int main() {
    setbuf(stdout, NULL);
    FILE *fp;
    char file_name[80];
    int ch;
    printf("Input the filename:\n");
    scanf("%s", file_name);

    if ((fp = fopen(file_name, "r+")) == NULL) {
        printf("Can not open the file");
        exit(EXIT_FAILURE);
    }
    while ((ch = getc(fp)) != EOF) {
        fseek(fp, -(long) sizeof(char), SEEK_CUR);      // 回退一个字符
        putc(toupper(ch), fp);                          // 将大写字符覆盖原先的小写字符
    }
    fclose(fp);
    return 0;
}
```

直接运行出现异常，程序不断向文件写入字符，只能手动终止。

# **问题分析**

Debug 后发现，每次循环 fseek() 函数都将文件指针移动到文件头，导致 while 循环始终无法结束。但正常情况应该是每次回退一个字节。

分析导致 fseek() 函数失效的几个原因：

1. 文件打开模式: 追加读取相关的("a"、"a+"、"ab"、"ab+")模式、单纯的 "w" 模式会导致 fseek 失效
2. 《C 陷阱与缺陷》5.2 讲过：为了保持与过去不能同时进行读写操作的程序的向下兼容，一个输入操作不能随后直接跟一个输出操作。

# **解决办法**

1. 不使用追加读取相关的文件打开模式，将 "w" 替换成 "w+" 模式
2. 在输入和输出操作之间加一个 fseek()。

```c
#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>

int main() {
    setbuf(stdout, NULL);
    FILE *fp;
    char file_name[80];
    int ch;
    printf("Input the filename:\n");
    scanf("%s", file_name);

    if ((fp = fopen(file_name, "r+")) == NULL) {
        printf("Can not open the file");
        exit(EXIT_FAILURE);
    }
    while ((ch = getc(fp)) != EOF) {
        fseek(fp, -(long) sizeof(char), SEEK_CUR);
        putc(toupper(ch), fp);
        // 加上下面这行操作，程序就能正常执行！
        fseek(fp, 0L, SEEK_CUR);          // 在输出 putc() 和下一次的输入 getc() 之间，插入 fseek()函数
    }
    fclose(fp);
    return 0;
}
```
