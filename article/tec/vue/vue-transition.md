---
title: 【Vue之旅】-- 动画
date: 2020-12-19
cover: /img/cover/58.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /article/58
---

> 第 58 篇文章
<!-- more -->

## 进入/离开
![](/img/2020/vue_transition_1.png)

![](/img/2020/vue_transition_2.png)

[Vue 文档](https://cn.vuejs.org/v2/guide/transitions.html)


- **示例**
    - **实现效果**
    
    ![](/img/2020/vue_transition_3.png)
    ```html
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Vue-动画</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <style>
            /*
                v-enter 进入之前元素的起始状态， 在元素被插入之前生效，在元素被插入之后的下一帧移除。
                v-enter-to  在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
                v-enter-active  在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。
    
                v-leave  离开过渡的初始状态， 在离开过渡被触发时立刻生效，下一帧被移除
                v-leave-to  在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
                v-leave-active  在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。
             */
            .v-enter{
                color: red;
                transform: translateX(500px);
            }
            .v-enter-to{
                color: #1b6d85;
            }
            .v-enter-active {
                transition: all 1s ease;
            }
            .v-leave{
                color: yellow;
            }
            .v-leave-to {
                transform: translateX(500px);
                color: #3e8f3e;
            }
            .v-leave-active{
                transition: all 1s ease;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <input type="button" value="toggle" @click="flag=!flag">
    <!--使用 transition 把需要被动画控制的元素，包裹起来-->
            <transition>
                <h3 v-if="flag">这是一个H3</h3>
            </transition>
        </div>
    
        <script>
            var vm = new Vue({
                el:"#app",
                data:{
                    flag:false,
                }
            })
        </script>
    </body>
    </html>
    ```

## 动画-自定义v-前缀
- **实现:** 在`transition`属性中添加 `name`属性

- **示例:**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>动画自定义v-前缀</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
        .my-enter{
            color: red;
            transform: translateY(500px);
        }
        .my-enter-to{
            color: #1b6d85;
        }
        .my-enter-active {
            transition: all 1s ease;
        }
        .my-leave{
            color: yellow;
        }
        .my-leave-to {
            transform: translateY(500px);
            color: #3e8f3e;
        }
        .my-leave-active{
            transition: all 1s ease;
        }
    </style>
</head>
<body>
    <div id="app">
        <input type="button" value="toggle2" @click="flag2=!flag2">
        <transition name="my">
            <h3 v-if="flag2">这个另一个H3</h3>
        </transition>

    </div>

    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                flag:false,
                flag2:false
            }
        })
    </script>
</body>
</html>
```

## 动画-使用第三方库 - animate.css
- **示例:**
    ```html
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>动画-使用css库</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css" rel="stylesheet">
    </head>
    <body>
        <div id="app">
            <input type="button" value="toggle" @click="flag=!flag">
    <!--        使用 :duration="{enter:200, leave:800}" 毫秒 来指定动画的入场和离场时间-->
            <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" :duration="{enter:600, leave:600}">
                <h3 v-if="flag">这个一个H3</h3>
            </transition>
        </div>
        <script>
            var vm = new Vue({
                el:"#app",
                data:{
                    flag:false,
                }
            })
        </script>
    </body>
    </html>
    ```
  
## 动画-钩子函数实现半场动画
可以在 attribute 中声明 JavaScript 钩子

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

- **示例:**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>使用钩子函数模拟半场动画</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <style>
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
        }

    </style>
</head>
<body>
    <div id="app">
        <input type="button" value="点击加入购物车" @click="flag=!flag">
        <!--设置动画-->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
        <div class="ball" v-show="flag"></div>
        </transition>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                flag:false
            },
            methods: {
                // el表示要执行动画的那个DOM元素, 是原生的JS DOM对象
                beforeEnter: function (el) {    // 动画执行前的起始样式
                    // 设置小球起始的位置
                    el.style.transform = "translate(0,0)";
                },
                enter: function (el, done) {
                    // 动画开始后 的样式
                    el.offsetWidth;     // 强制刷新动画
                    el.style.transform = "translate(150px, 500px)";
                    el.style.transition = 'all 1s ease';
                    // done() 其实是 afterEnter()函数的引用
                    done();
                },
                afterEnter: function (el) {
                    this.flag = !this.flag;
                }
            }
        })
    </script>
</body>
</html>
```

## 列表动画
- **示例效果:**
![](/img/2020/vue_transition_4.gif)

- **示例:**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>列表动画</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
        li {
            border: 1px dashed cadetblue;
            margin: 5px;
            line-height: 35px;
            padding-left: 5px;
            font-size: 15px;
            width: 100%;
        }
        /*定义专属动画*/
        .my-enter {
            opacity: 0;
            transform: translateY(80px);
        }
        .my-enter-active{
            transition: all 0.6s ease;
        }

        li:hover {
            background-color: #1b6d85;
            transition: all 0.3s ease;
        }

        /*v-move 和 v-leave-active 配合使用,能够实现列表后续元素,渐渐飘起来的效果*/
        .my-move {
            transition: all 0.6s ease;
        }
        .my-leave-active{
            position: absolute;
        }

    </style>
</head>
<body>
    <div id="app">
        <div>
            <label>
                Id:
                <input type="text" v-model="id">
            </label>
            <label>
                Name:
                <input type="text" v-model="name">
            </label>
            <input type="button" @click="add" value="添加">
        </div>
            <!--实现列表动画 + 自定义动画名称-->
            <!--通过给 transition-group 添加 appear属性 ,设置初始页面的入场效果-->
            <!--通过给 transition-group 设置 tag属性,指定 transition-group 渲染为指定的元素,若不指定,则默认渲染为 span 标签-->
            <transition-group name="my" tag="ul" appear>
                <li v-for="(item,i) in list" :key="item.id" @click="del(i)">
                    {{item.id}} ---- {{item.name}}
                </li>
            </transition-group>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                list: [
                    {id: 1, name: '张三'},
                    {id: 2, name: '李四'},
                    {id: 3, name: '王五'}
                ],
                name:'',
                id:''
            },
            methods:{
                add(){
                    this.list.push({id: this.id, name: this.name});
                    this.id = this.name = '';
                },
                del(i) {
                    this.list.splice(i, 1);
                }
            }
        })
    </script>
</body>
</html>
```

