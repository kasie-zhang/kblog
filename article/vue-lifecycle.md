---
title: 【Vue之旅】-- 生命周期函数
date: 2020-12-18
cover: https://api.zk123.top/link/repo1/img/cover/56.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /article/56
---

> 第 56 篇文章
<!-- more -->

## Vue示例的生命周期
- **生命周期：** 从Vue实例的创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件统称为`生命周期`。

- **生命周期钩子：** 生命周期事件的`别名`

- **主要生命周期函数的分类：**
    - `创建期间`的生命周期函数
    
    - `运行期间`的生命周期函数
    
    - `销毁期间`的生命周期函数

![](https://api.zk123.top/link/repo1/img/2020/vue_lifecycle_1.png)

### 创建期间生命周期
- **beforeCreated()**
    - 这是我们遇到的`第一个`生命周期函数, 表示实例完全被创建出来之前,会执行它

    - 此时, `data` 和 `methods` 中的数据尚未初始化

- **created()**
    - 这是我们遇到的`第二个`生命周期函数
    - 此时, `data` 和 `methods` 都已经被初始化好了

- **beforeMount()**
    - 这是我们遇到的`第三个`生命周期函数
    - 此时,模板已经在内存中编辑完成了,但是`尚未把模板渲染到页面`中(页面中的元素没有被真正替换过来,只是之前写的一些模板字符串)
- **mounted()**
    - 这是我们遇到的`第四个`生命周期函数
    - 此时,内存中的模板,已经挂在到了页面中,用户可以看到渲染好的页面
    - `mounted`是实例创建的`最后一个`生命周期函数。执行完 `mounted`表示实例创建完成 
    
### 运行期间生命周期
- **beforeUpdate()**
    - 界面没有更新， 数据已经更新了; 页面尚未和最新数据保持同步

- **updated()**
    - 页面和`data数据`已经保持同步了，是最新的

### 销毁期间生命周期
- **beforeDestroy**
    - Vue实例已经从运行阶段，进入到了销毁阶段
    - 执行`beforeDestroy`时，实例身上所有的`data`和`methods`，以及`过滤器`、`指令`都处于可用状态，没有执行真正的销毁过程

- **destroy**
    - 组件已经完全被销毁
    
## axios 发送网络请求

![参考地址](https://cn.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)