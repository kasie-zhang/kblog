---
title: 【Vue之旅】-- 路由
date: 2020-12-21
cover: /img/cover/62.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /62
---

> 第 62 篇文章
<!-- more -->

## 什么是路由
- **后端路由:** 对于普通网站,所有的超链接都是URL地址,所有的URL地址都对应着服务器上对应的资源.

- **前端路由:** 对于单页面的应用程序来说,主要通过URL中的 `哈希`(#号)来实现不同页面之间的切换,同时 `hash` 有一个特点:HTTP请求中不会包含哈希相关的内容;
所以,单页面程序中的页面跳转主要用 `hash` 实现.

:::details URL中的 hash
[参考博客](https://www.cnblogs.com/joyho/articles/4430148.html)

## HTTP 请求中不包含#
#号是用来指导浏览器动作的，对服务器端完全无用。

## #后面的字符
在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。

## 改变#不触发网页重载
单单改变#后的内容，浏览器只会滚动到相应位置，不会重新加载网页。

## 改变#会改变浏览器的访问历史
每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。

这对于ajax应用程序特别有用，可以用不同的#值，表示不同的访问状态，然后向用户给出可以访问某个状态的链接。
:::

## vue-router 基本使用
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>路由的基本使用</title>
    <script src="../lib/vue.js"></script>
    <script src="../lib/vue-router.js"></script>
    <style>
        .router-link-active,.my-active{
            color: red;
            font-weight: 800;
            font-style: italic;
            font-size: 80px;
        }
        .v-enter{
            opacity: 0;
            transform: translateX(50px);
        }

        .v-enter-active{
            transition: all 0.5s ease;
        }
    </style>
</head>

<body>
    <div id="app">
        <a href="#/login">登录</a>
        <a href="#/register">注册</a>
        <!-- 设置路由切换的动画 -->
        <transition mode="out-in">
            <!-- 占位符 -->
            <router-view></router-view>
        </transition>   
    </div>
    
    <script>
        // 注册组件
        var login = {
            template: '<h1>Login</h1>'
        }    
        var register = {
            template: '<h1>Register</h1>'
        }
        
        // 创建 router 实例
        var router = new VueRouter({
            routes: [ // 路由匹配规则
                // 属性1: path, 表示监听的路由链接地址
                // 属性2: component, 展示的组件
                {
                    path: '/',
                    redirect: '/login'      // redirect 实现重定向
                },
                {
                    path: '/login',
                    component: login
                },
                {
                    path: '/register',
                    component: register
                }
            ],
            linkActiveClass:'my-active'
        })
        
        // 创建 Vue 实例
        var vm = new Vue({
            el: "#app",
            router, // 将路由规则对象, 注册到vm实例上, 用来监听URL地址的变化, 然后展示对应的组件; 等价于 router: router
        })
    </script>
</body>
</html>
```

1. 创建路由实例. 
- route属性有两个参数: `path`表示监听的路由链接地址, `component`为展示的组件名
```js
var routeObj = new VueRouter({
            routes: [ // 路由匹配规则
                // 属性1: path, 表示监听的路由链接地址
                // 属性2: component, 展示的组件
                {
                    path: '/login',
                    component: login
                },
                {
                    path: '/register',
                    component: register
                }
            ]
        })
```

2. 创建Vue实例, 并将路由规则对象注册到vm实例上

```js
var vm = new Vue({
    el: "#app",
    router: routeObj, // 将路由规则对象, 注册到vm实例上, 用来监听URL地址的变化, 然后展示对应的组件
})
```

3. `redirect` 实现重定向


4. `linkActiveClass`

设置链接激活时使用的 CSS 类名, 默认值可以通过路由的构造选项 linkActiveClass 来全局配置。默认值为`router-link-active`

