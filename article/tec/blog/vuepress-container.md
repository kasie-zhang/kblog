---
title: VuePress自定义容器
date: 2019-04-23
cover: /img/cover/5.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- VuePress
publish: true
permalink: /5
---

> 第 5 篇文章
<!-- more -->

## 自定义容器
    ::: tip 提示
    This is a tip
    :::
    
    ::: warning
    This is a warning
    :::
    
    ::: danger
    This is a dangerous warning
    :::
    
    ::: theorem 牛顿第一定律
    假若施加于某物体的外力为零，则该物体的运动速度不变。
    
    ::: right
    来自 [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
    :::
    
    :::details 点击查看代码
    详细信息
    :::
::: tip 提示
This is a tip
:::

::: warning 
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: theorem 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。

::: right
来自 [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
:::

:::details 点击查看代码
详细信息
:::
## 代码块中语法高亮

*输入*

    ```C
    #include <iostream>
    using namespace std;
    
    int main(){
     cout<<"aaa"<<endl;
    }
    ```

*输出*

```C
#include <iostream>
using namespace std;

int main(){
 cout<<"aaa"<<endl;
}
```

<a href="https://prismjs.com/#languages-list">查看更多合法的语言列表</a>


*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification is maintained by the W3C.

