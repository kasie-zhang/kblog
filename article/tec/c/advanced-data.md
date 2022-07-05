---
title: C 高级数据表示
date: 2022-04-13
cover: /img/cover/116.webp
sidebar: 'auto'
categories:
 - 笔记
 - C 语言
tags:
 - C
publish: true
permalink: /article/116
---

> 第 116 篇文章
<!-- more -->

对于更高层次的编程技能，工具是次要的，真正挑战的是设计和创建一个项目。

在开始编写代码之前，需要做很多程序设计方面的决定。

通常，程序开发最重要的部分是找到程序中表示数据的好方法。正确地表示数据可以更容易编写程序其余部分。找出合适的数据类型后，还要考虑为数据类型定义有效的操作。本文还会介绍部分算法——操纵数据的方法，
作为一名程序员，应该掌握这些可以反复解决类似问题的处理办法。本文将进一步研究设计数据类型的过程，这是一个把算法和数据表示相匹配的过程。
期间会用到一些常见的数据形式，如队列、链表和二叉树。

## 从数组到链表
静态数组在编译时确定所需内存量，后续无法改变数组大小，数据表示不够灵活。

动态数组能在运行时确定所需内存量，但申请的内存连续，且可能存在冗余，仍不够完美。

链表结构，用多少内存就分配多少，且内存不必连续，是较好的解决方案。

**头指针**（head pointer）：指向链表中的第一项。

### 使用链表
使用链表来存储电影信息。

```c
// films.c
#include <stdio.h>
#include <string.h>
#include <malloc.h>

#define TSIZE   45          /* 片名长度 */

struct film {
    char title[TSIZE];
    int rating;
    struct film *next;     /* 指向链表中下一个结构 */
};
typedef struct film FILM;

char *s_gets(char *st, int n);

int main() {
    FILM *head = NULL;
    FILM *prev, *current;
    char input[TSIZE];

    /* 收集并存储信息 */
    puts("Enter first movie title:");
    while (s_gets(input, TSIZE) != NULL && input[0] != '\0') {
        current = (FILM *) malloc(sizeof(FILM));
        if (head == NULL)
            head = current;
        else
            prev->next = current;
        current->next = NULL;
        strcpy(current->title, input);
        puts("Enter your rating <0-10>:");
        scanf("%d", &current->rating);
        while (getchar() != '\n')
            continue;
        puts("Enter next movie title (empty line to stop):");
        prev = current;
    }

    /* 显示电影列表 */
    if (head == NULL)
        printf("No data entered.");
    else
        printf("Here is the movie list:\n");
    current = head;
    while (current != NULL) {
        printf("Movie: %s Rating: %d\n",
               current->title, current->rating);
        current = current->next;
    }

    /* 释放内存 */
    current = head;
    while (current != NULL) {
        head = current->next;
        free(current);
        current = head;
    }
    return 0;
}

char *s_gets(char *st, int n) {
    char *ret_val;
    char *find;
    ret_val = fgets(st, n, stdin);
    if (ret_val) {
        find = strchr(st, '\n');       // 查找换行符，替换成空字符
        if (find)
            *find = '\0';
        else
            while (getchar() != '\n')
                continue;                  // 处理剩余行
    }
    return ret_val;
}
```

films.c 程序仍有不足，如没有检查 malloc() 是否成功请求到内存，也无法删除链表中的项。这些不足可以弥补，添加代码检查 malloc() 的返回值是否是 NULL（返回NULL说明未获得所需内存）。
如果程序要删除链表中的项，还要编写更多的代码。

这种用特定方法解决特定问题，且在需要时才添加相关功能的编程方式通常不是最好的解决方案。很多成功的大型程序都是由成功的小型程序逐步发展而来。

## ADT
Abstract Data Type，抽象数据类型以面向问题而不是面向语言的方式，把解决问题的方法和数据表示结合起来。

总结起来就是，对数据类型进行基本属性描述，提供操纵数据的方法。

假设要定义一个新的数据类型。首先，需要提供**存储数据的方法**，例如设计一个结构。其次，必须提供**操控数据的方法**。

例如 films.c 程序，该程序用链接的结构来存储信息，而且通过代码实现了添加和显示信息。尽管如此，该程序仍未清楚地表明正在创建一个新类型。

针对这，计算机科学领域已经开发了一种**定义新类型**的好方法，用3个步骤完成从抽象到具体的过程。

1. 提供类型属性和相关操作的抽象描述。这些描述不依赖特定实现，不依赖特定编程语言。这种正式的抽象描述被称为**抽象数据类型**（ADT）。
2. 开发一个实现 ADT 的接口。即指明如何存储数据和执行所需操作的函数。在C中，可以提供结构定义和操控该结构的函数原型。
3. 编写代码实现接口。这一步至关重要，但是使用该新类型的程序员无需了解具体实现细节。
## ADT - 链表

### 建立抽象
还是以 films.c 为例，我们采用一种简化的链表作为抽象数据类型。该类型的总结如下：

**类型名**： 简单列表

**类型属性**：可以存储一系列项

**类型操作：**
- 初始化链表为空
- 确定链表为空
- 确定链表已满
- 确定链表中的项数
- 在链表末尾添加项
- 遍历链表，处理链表中的项
- 清空链表

下一步是为简单链表 ADT 开发一个 C 接口。

### 建立接口
我们编写 `list.h` 头文件，定义结构体、接口函数等内容。并使用 `#ifndef LIST_H` 来避免头文件的重复包含。

数据隐藏是一种从编程的更高层次隐藏数据表示细节的艺术。

```c
// list.h 简单链表的头文件
#ifndef LIST_H
#define LIST_H

#include <stdbool.h>

#define TSIZE 45    /* size of film array */
typedef struct {
    char title[TSIZE];
    int rating;
} Item;

typedef struct node {
    Item item;
    struct node *next;
} Node;

typedef Node *List;

/* prototype of functions */
void InitializeList(List *plist);

bool ListIsEmpty(const List *plist);

bool ListIsFull(const List *plist);

unsigned int ListItemCount(const List *plist);

bool AddItem(Item item, List *plist);

/* apply the function to each item in the linked list,
 * which return nothing and the argument is Item */
void traverse(const List *plist, void(*func)(Item item));

void EmptyTheList(List *plist);

#endif
```

### 实现接口
把函数实现统一放在 `list.c` 文件中。

```c
// list.c
#include <stdio.h>
#include <stdlib.h>
#include "list.h"

/* 局部函数原型 */
static void CopyToNode(Item item, Node *pnode);

/* 接口函数 */
/* 初始化链表 */
void InitializeList(List *plist) {
    *plist = NULL;
}

/* 判断链表是否为空 */
bool ListIsEmpty(const List *plist){
    if( *plist == NULL)
        return true;
    else
        return false;
}

/* 判断链表是否已满 */
bool ListIsFull(const List *plist) {
    Node *pt;
    bool full;
    pt = (Node *) malloc(sizeof(Node));
    if (pt == NULL)
        full = true;
    else
        full = false;
    free(pt);

    return full;
}

/* 返回节点数量 */
unsigned int ListItemCount(const List *plist) {
    unsigned int count = 0;
    Node *pnode = *plist;       // 设置链表的开始
    while (pnode != NULL) {
        ++count;
        pnode = pnode->next;
    }
    return count;
}

/* 添加节点 */
bool AddItem(Item item, List *plist) {
    Node *pnew;
    Node *scan = *plist;
    pnew = (Node *) malloc(sizeof(Node));
    if (pnew == NULL)
        return false;
    CopyToNode(item, pnew);
    pnew->next = NULL;
    /* 找到链表末尾 */
    if (scan == NULL)           // 空链表
        *plist = pnew;
    else {                      // 链表非空
        while (scan->next != NULL)
            scan = scan->next;
        scan->next = pnew;
    }
    return true;
}

/* 访问每个节点并执行 func 指向的函数 */
void Traverse(const List *plist, void(*func)(Item item)) {
    Node *pnode = *plist;       // 设置链表的开始
    while (pnode != NULL) {
        (*func)(pnode->item);
        pnode = pnode->next;
    }
}

/* 释放链表 */
void EmptyTheList(List *plist) {
    Node *psave;
    while (*plist != NULL) {
        psave = (*plist)->next;     // 保存下一个节点的地址
        free(*plist);               // 释放当前节点
        *plist = psave;             // 前进至下一节点
    }
}

/* 把一个项拷贝到节点中 */
static void CopyToNode(Item item, Node *pnode){
    pnode->item = item;
}
```


### 使用接口
我们编写 `films.c` 来测试链表接口应用。

现在整个程序由三部分组成：
- list.h （定义数据结构和提供用户接口的原型）
- list.c （提供函数代码实现接口）
- films.c（把链表接口应用与特定编程问题的源代码文件）

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "list.h"

void showMovies(Item item);

char *s_gets(char *st, int n);

int main() {
    List movies;
    Item temp;

    /* 初始化 */
    InitializeList(&movies);
    if (ListIsFull(&movies)) {
        fprintf(stderr, "No memory available! Bye!\n");
        exit(1);
    }

    /* 获取用户输入并存储 */
    puts("Enter the first movie title:");
    while (s_gets(temp.title, TSIZE) != NULL && temp.title[0] != '\0') {
        puts("Enter your rating <0-10>:");
        scanf("%d", &temp.rating);
        while (getchar() != '\n')
            continue;
        if (AddItem(temp, &movies) == false) {
            fprintf(stderr, "Problem allocating memory\n");
            break;
        }
        if (ListIsFull(&movies)) {
            puts("The list is now full.");
            break;
        }
        puts("Enter next movie title (empty line to stop):");
    }

    /* 显示 */
    if (ListIsEmpty(&movies))
        printf("No data entered.");
    else {
        printf("Here is the movie list:\n");
        Traverse(&movies, showMovies);
    }
    printf("You entered %d movies.\n", ListItemCount(&movies));

    /* 清理 */
    EmptyTheList(&movies);
    printf("Bye!\n");

    return 0;
}

void showMovies(Item item) {
    printf("Movie: %s Rating: %d\n", item.title, item.rating);
}

char *s_gets(char *st, int n) {
    char *ret_val;
    char *find;

    ret_val = fgets(st, n, stdin);
    if (ret_val) {
        find = strchr(st, '\n');
        if (find)
            *find = '\0';
        else
            while (getchar() != '\n')
                continue;
    }
    return ret_val;
}
```

### 评估ADT
使用 ADT 前，程序暴露了所有的编程细节。

使用 ADT 后，程序隐藏了这些细节，并用与任务直接相关的方式表达程序。即，该程序讨论的是创建链表和向链表中添加项，而不是调用内存函数或重置指针。

简言之，ADT 版本程序是根据解决程序所需的工具来表达程序，可读性更高，且针对的是最终用户所关心的问题。

其次，`list.h` 和 `list.c` 文件组成了**可复用**的资源。如果需要另外的链表，也可以使用这些文件，只要重新定义 Item 类型。

使用 ADT 进行程序开发，当程序运行出现问题，可以把问题定位到具体的函数上，更改方便。

## ADT - 队列
队列(queue) 是具有两个特殊属性的链表。
- 新项只能添加到末尾
- 只能从链表的开头移除项

### 建立接口
`queue.h`

```c
/* queue.h -- Queue 的接口 */
#ifndef _QUEUE_H
#define _QUEUE_H

#include <stdbool.h>

typedef int Item;
#define MAXQUEUE 10         // 队列最大长度

typedef struct node {
    Item item;
    struct node *next;
} Node;

typedef struct queue {
    Node *front;           // 指向队列首项的指针
    Node *rear;            // 指向队列尾项的指针
    int items;              // 队列中的项数
} Queue;

/* 操纵函数 */

/* 初始化队列 */
void InitializeQueue(Queue *pq);

/* 检查队列是否满 */
bool QueueIsFull(const Queue *pq);

/* 检查队列是否为空 */
bool QueueIsEmpty(const Queue *pq);

/* 确定队列中的项数 */
int QueueItemCount(const Queue *pq);

/* 在队列末尾添加项 */
bool EnQueue(Item item, Queue *pq);

/* 删除队列开头项 */
bool DeQueue(Item *pitem, Queue *pq);

/* 清空队列 */
void EmptyTheQueue(Queue *pq);

#endif
```
### 实现接口
`queue.c`

```c 
/* queue.c -- Queue 的实现 */
#include "queue.h"
#include <stdio.h>
#include <stdlib.h>

/* 局部函数 */
static void CopyToNote(Item item, Node *pn);

static void CopyToItem(Node *pn, Item *pi);

void InitializeQueue(Queue *pq) {
    pq->front = pq->rear = NULL;
    pq->items = 0;
}

bool QueueIsFull(const Queue *pq) {
    return pq->items == MAXQUEUE;
}

bool QueueIsEmpty(const Queue *pq) {
    return pq->items == 0;
}

int QueueItemCount(const Queue *pq) {
    return pq->items;
}

bool EnQueue(Item item, Queue *pq) {
    Node *pnew;
    if (QueueIsFull(pq))
        return false;
    pnew = (Node *) malloc(sizeof(Node));
    if (pnew == NULL) {
        fprintf(stderr, "Unable to allocate memory!\n");
        exit(1);
    }
    CopyToNote(item, pnew);
    pnew->next = NULL;
    if (QueueIsEmpty(pq))
        pq->front = pnew;                   // 项位于队列的首端
    else
        pq->rear->next = pnew;              // 链接到队列末尾
    pq->rear = pnew;                        // 记录队列尾端的位置
    pq->items++;                            // 队列项数加 1

    return true;
}

bool DeQueue(Item *pitem, Queue *pq) {
    Node *pt;
    if (QueueIsEmpty(pq))
        return false;
    CopyToItem(pq->front, pitem);           // 删除头项之前，拷贝该项数据
    pt = pq->front;                         // 存储待删节点位置
    pq->front = pq->front->next;            // 首节点重置为指向下一个节点
    free(pt);
    pq->items--;
    if (pq->items == 0)
        pq->rear = NULL;
    return true;
}

void EmptyTheQueue(Queue *pq) {
    Item dummy;                             // 仿制品
    while (!QueueIsEmpty(pq))
        DeQueue(&dummy, pq);
}

static void CopyToNote(Item item, Node *pn){
    pn->item = item;
}

static void CopyToItem(Node *pn, Item *pi){
    *pi = pn->item;
}
```
### 使用接口
`test.c`

```c
/* test.c -- 测试程序 */
#include "queue.h"
#include <stdio.h>

int main() {
    Queue line;
    Item temp;
    char ch;

    InitializeQueue(&line);
    puts("Testing the Queue interface. Type a to add a value, ");
    puts("type d to delete a value, and type q to quit.");
    while ((ch = getchar()) != 'q') {
        if (ch != 'a' && ch != 'd')
            continue;
        if (ch == 'a') {
            printf("Integer to add: ");
            scanf("%d", &temp);
            if (!QueueIsFull(&line)) {
                printf("Putting %d into queue\n", temp);
                EnQueue(temp, &line);
            } else
                puts("Queue is full");
        } else {
            if (QueueIsEmpty(&line))
                puts("Nothing to delete!");
            else {
                DeQueue(&temp, &line);
                printf("Removing %d from queue\n", temp);
            }
        }
        printf("%d items in queue\n", QueueItemCount(&line));
        puts("Type a to add, d to delete, q to quit:");
    }
    EmptyTheQueue(&line);
    puts("Bye!");
    return 0;
}
```

## 比较链表和数组
许多编程问题，如创建一个简单链表或队列，都可以用链表或数组来处理。每种形式都有其优缺点，所以要根据具体问题的要求来决定选择哪一种形式。

| 数据形式 | 优点                                 | 缺点                                     |
| -------- | ------------------------------------ | ---------------------------------------- |
| 数组     | C直接支持<br>提供随机访问            | 在编译时确定大小<br>插入和删除元素很费时 |
| 链表     | 运行时确定大小<br>快速插入和删除元素 | 不能随机访问<br>用户必须提供编程支持     |

如果**频繁地插入和删除项**导致经常调整大小，而不需要经常查找，选择**链表**更好。

如果只是偶尔插入或删除项，但是**经常进行查找**，使用**数组**更好。

如果**既要频繁插入和删除项，又要频繁进行查找**，数组和链表都无法胜任。这种情况下应该选择**二叉查找树**。

## ADT 二叉树
二叉查找树是一种结合了二分查找策略的链接结构。

左节点的项在父节点的项前面，右节点的项在父节点的项后面。

假设要在二叉树中查找一个项（即目标项）。如果目标项在根节点项的前面，则秩序查找左子树；如果目标项在根节点项的后面，则只需查找右子树。
因此，每次比较就排除半个树。与二分查找类似，每次比较都能排除一半的可能匹配项。

二叉查找树在链式结构中结合了二分查找的效率。但是，这样编程的代价是构建一个二叉树比一个链表更复杂。

### 建立接口
`tree.h`

```c
/* tree.h -- 二叉查找树 */
#ifndef _TREE_H_
#define _TREE_H_

#include<stdbool.h>

#define SLEN 20

typedef struct item {
    char pet_name[SLEN];
    char pet_kind[SLEN];
} Item;

#define MAXITEMS 10

/* 树节点 */
typedef struct tr_node {
    Item item;
    struct tr_node *left;
    struct tr_node *right;
} Tr_node;

typedef struct tree {
    Tr_node *root;          // 根节点
    int size;               // 树的项数
} Tree;

/* function prototype */
void InitializeTree(Tree *ptree);

bool TreeIsEmpty(const Tree *ptree);

bool TreeIsFull(const Tree *ptree);

int TreeItemCount(Tree *ptree);

bool AddItem(const Item *pi, Tree *ptree);

bool InTree(const Item *pi, const Tree *ptree);

bool DeleteItem(const Item *pi, Tree *ptree);

bool Traverse(const Tree *ptree, void (*pfun)(Item item));

void DeleteAll(Tree *ptree);

#endif
```

### 实现接口
`tree.c`

```c
#include "tree.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/* 局部数据类型 */
typedef struct pair {
    Tr_node *parent;
    Tr_node *child;
} Pair;

/* 局部函数原型 */
static Tr_node *MakeNode(const Item *pi);

/* 比较新项和左子树 */
static bool ToLeft(const Item *i1, const Item *i2);

/* 比较新项和右子树 */
static bool ToRight(const Item *i1, const Item *i2);

static void AddNode(Tr_node *new_node, Tr_node *root);

static void InOrder(const Tr_node *root, void (*pfun)(Item item));

static Pair SeekItem(const Item *pi, const Tree *ptree);

static void DeleteNode(Tr_node **ptr);

static void DeleteAllNodes(Tr_node *root);

/* 函数定义 */
void InitializeTree(Tree *ptree) {
    ptree->root = NULL;
    ptree->size = 0;
}

bool TreeIsEmpty(const Tree *ptree) {
    return ptree->root == NULL;
}

bool TreeIsFull(const Tree *ptree) {
    return ptree->size == MAXITEMS;
}

int TreeItemCount(Tree *ptree) {
    return ptree->size;
}

bool AddItem(const Item *pi, Tree *ptree) {
    Tr_node *new_node;
    if (TreeIsFull(ptree)) {                            // 树需要有足够空间
        fprintf(stderr, "Tree is full!\n");
        return false;
    }
    if (SeekItem(pi, ptree).child != NULL) {            // 不能存在重复项
        fprintf(stderr, "Attempt to add duplicated item.\n");
        return false;
    }
    new_node = MakeNode(pi);                            // 指向新节点
    if (new_node == NULL) {
        fprintf(stderr, "Couldn't creat node.\n");
        return false;
    }
    ptree->size++;
    if (ptree->root == NULL)
        ptree->root = new_node;
    else
        AddNode(new_node, ptree->root);
    return true;
}

bool InTree(const Item *pi, const Tree *ptree) {
    return (SeekItem(pi, ptree).child == NULL) ? false : true;
}

bool DeleteItem(const Item *pi, Tree *ptree) {
    Pair look;
    look = SeekItem(pi, ptree);
    if (look.child == NULL)              // item 不存在
        return false;
    if (look.parent == NULL)             // 父节点不存在，即 item 是根节点
        DeleteNode(&ptree->root);
    else if (look.parent->left == look.child)    // 删除左节点
        DeleteNode(&look.parent->left);
    else
        DeleteNode(&look.parent->right);        // 删除右节点
    ptree->size--;
    return true;
}

bool Traverse(const Tree *ptree, void (*pfun)(Item item)) {
    if (ptree != NULL)
        InOrder(ptree->root, pfun);
}

void DeleteAll(Tree *ptree) {
    if (ptree != NULL)
        DeleteAllNodes(ptree->root);
    ptree->root = NULL;
    ptree->size = 0;
}

/* 局部函数 */
/* 新增一个节点 */
static Tr_node *MakeNode(const Item *pi) {
    Tr_node *newNode;
    newNode = (Tr_node *) malloc(sizeof(Tr_node));
    if (newNode != NULL) {
        newNode->item = *pi;
        newNode->left = NULL;
        newNode->right = NULL;
    }
    return newNode;
}

/* 两个节点之间的比较，返回 item1 是否是 item2 的左子树 */
static bool ToLeft(const Item *i1, const Item *i2) {
    int comp1;
    if ((comp1 = strcmp(i1->pet_name, i2->pet_name)) < 0)
        return true;
    else if (comp1 == 0 && strcmp(i1->pet_kind, i2->pet_kind) < 0)
        return true;
    else
        return false;
}

/* 两个节点之间的比较，返回 item1 是否是 item2 的右子树 */
static bool ToRight(const Item *i1, const Item *i2) {
    int comp1;
    if ((comp1 = strcmp(i1->pet_name, i2->pet_name)) > 0)
        return true;
    else if (comp1 == 0 && strcmp(i1->pet_kind, i2->pet_kind) > 0)
        return true;
    else
        return false;
}

/* 二叉树添加一个新的节点 */
static void AddNode(Tr_node *new_node, Tr_node *root) {
    if (ToLeft(&new_node->item, &root->item)) {         // new_node 是 root 的左节点
        if (root->left == NULL)
            root->left = new_node;
        else
            AddNode(new_node, root->left);              // root 已有左节点，则递归至左子树进行比较
    } else if (ToRight(&new_node->item, &root->item)) {
        if (root->right == NULL)                        // new_node 是 root 的右节点
            root->right = new_node;
        else
            AddNode(new_node, root->right);             // root 已有右节点，则递归至右子树进行比较
    } else {
        fprintf(stderr, "location error in AddNode().\n");
        exit(1);
    }
}

/* 递归实现所有节点调用 pfun 函数 */
static void InOrder(const Tr_node *root, void (*pfun)(Item item)) {
    if (root != NULL) {
        InOrder(root->left, pfun);
        (*pfun)(root->item);
        InOrder(root->right, pfun);
    }
}

static Pair SeekItem(const Item *pi, const Tree *ptree) {
    Pair look;
    look.parent = NULL;
    look.child = ptree->root;
    if (look.child == NULL)          // 父节点不存在，提前退出
        return look;
    while (look.child != NULL) {
        if (ToLeft(pi, &look.child->item)) {         // item 属于左子树
            look.parent = look.child;
            look.child = look.child->left;
        } else if (ToRight(pi, &look.child->item)) { // item 属于右子树
            look.parent = look.child;
            look.child = look.child->right;
        } else                                      // item 等于当前项
            break;
    }
    return look;
}

/* 删除指定节点；ptr 是指向目标节点的父节点指针成员的地址 */
static void DeleteNode(Tr_node **ptr) {
    Tr_node *temp;
    if ((*ptr)->left == NULL) {             // 父节点只有右子节点
        temp = *ptr;
        *ptr = (*ptr)->right;
        free(temp);
    } else if ((*ptr)->right == NULL) {    // 父节点只有左子节点
        temp = *ptr;
        *ptr = (*ptr)->left;
        free(temp);
    } else {                                // 父节点有左右子节点
        /* 找到重新连接右子树的位置 */
        for (temp = (*ptr)->left; temp->right != NULL; temp = temp->right)
            continue;
        temp->right = (*ptr)->right;        // 父节点的右子树挂载至左子树
        temp = (*ptr);
        *ptr = (*ptr)->left;                // 重置当前 Tr_node 指针
        free(temp);
    }
}

static void DeleteAllNodes(Tr_node *root) {
    Tr_node *pright;
    if (root != NULL) {
        pright = root->right;
        DeleteAllNodes(root->left);
        free(root);
        DeleteAllNodes(pright);
    }
}
```

### 测试接口
`test.c`

```c
#include "tree.h"
#include <stdio.h>
#include <ctype.h>
#include <string.h>

char menu(void);

void addPet(Tree *pt);

void dropPet(Tree *pt);

void showPets(const Tree *pt);

void findPet(const Tree *pt);

void printItem(Item item);

void uppercase(char *str);

char *s_gets(char *st, int n);

int main() {
    Tree pets;
    char choice;

    InitializeTree(&pets);
    while ((choice = menu()) != 'q') {
        switch (choice) {
            case 'a':
                addPet(&pets);
                break;
            case 'l':
                showPets(&pets);
                break;
            case 'f':
                findPet(&pets);
                break;
            case 'n':
                printf("%d pets in club\n", TreeItemCount(&pets));
                break;
            case 'd':
                dropPet(&pets);
                break;
            default:
                puts("Switching error");
        }
    }
    DeleteAll(&pets);
    puts("Bye");
    return 0;
}

char menu(void) {
    int ch;
    puts("==========K Pet Club==========");
    puts("Enter the letter corresponding to your choice");
    puts("a) add a pet");
    puts("l) show list of pets");
    puts("n) number of pets");
    puts("f) find pets");
    puts("d) delete a pet");
    puts("q) quit");
    puts("==============================");
    while ((ch = getchar()) != EOF) {
        while (getchar() != '\n')
            continue;
        ch = tolower(ch);
        if (strchr("alfndq", ch) == NULL)
            puts("Please enter an a, l, n, f, d or q:");
        else
            break;
    }
    if (ch == EOF)
        ch = 'q';

    return ch;
}

void addPet(Tree *pt) {
    Item temp;
    if (TreeIsFull(pt))
        puts("No room in the club!");
    else {
        puts("Enter name of pet:");
        s_gets(temp.pet_name, SLEN);
        puts("Enter kind of pet:");
        s_gets(temp.pet_kind, SLEN);
        uppercase(temp.pet_name);
        uppercase(temp.pet_kind);
        AddItem(&temp, pt);
    }
}

void dropPet(Tree *pt) {
    Item temp;
    if (TreeIsEmpty(pt)) {
        puts("No entries");
        return;
    }
    puts("Enter name of pet you wish to delete:");
    s_gets(temp.pet_name, SLEN);
    puts("Enter pet kind:");
    s_gets(temp.pet_kind, SLEN);
    uppercase(temp.pet_name);
    uppercase(temp.pet_kind);
    printf("%s the %s ", temp.pet_name, temp.pet_kind);
    if (DeleteItem(&temp, pt))
        printf("is dropped from the club\n");
    else
        printf("is not a member\n");
}

void showPets(const Tree *pt) {
    if (TreeIsEmpty(pt))
        puts("No entries");
    else
        Traverse(pt, printItem);
}

void findPet(const Tree *pt) {
    Item temp;
    if (TreeIsEmpty(pt)) {
        puts("No entries");
        return;
    }
    puts("Enter name of pet you wish to delete:");
    s_gets(temp.pet_name, SLEN);
    puts("Enter pet kind:");
    s_gets(temp.pet_kind, SLEN);
    uppercase(temp.pet_name);
    uppercase(temp.pet_kind);
    printf("%s the %s", temp.pet_name, temp.pet_kind);
    if (InTree(&temp, pt))
        printf("is a number.\n");
    else
        printf("is not a number.\n");
}

void printItem(Item item) {
    printf("Pet: %-19s  Kind: %-19s\n", item.pet_name, item.pet_kind);
}

void uppercase(char *str) {
    while (*str) {
        *str = toupper(*str);
        str++;
    }
}

char *s_gets(char *st, int n) {
    char *ret_val;
    char *find;

    ret_val = fgets(st, n, stdin);
    if (ret_val) {
        find = strchr(st, '\n');
        if (find)
            *find = '\0';
        else
            while (getchar() != '\n')
                continue;
    }
    return ret_val;
}
```

[测试程序.exe](https://drive.zk123.top/s/oXcZ)

