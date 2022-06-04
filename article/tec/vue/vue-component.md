---
title: 【Vue之旅】-- 组件
date: 2020-12-19
cover: /img/cover/59.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /59
---

> 第 59 篇文章
<!-- more -->

## 组件概念
- **什么是组件**
组件的出现是为了拆分Vue实例的代码量,能够让我们以不同的组件来划分不同的`功能模块`,将来需要什么样的功能
调用对应的组件即可.

- **模块化与组件化的区别**
    - `模块化`: 从 `代码逻辑` 角度进行划分; 方便代码分层开发,保证每个功能模块的单一
    - `组件化`: 从 `UI界面` 的角度进行划分; 前端的组件化, 方便UI的重用

## 创建组件
- **注意：** 不论是哪种方式创建的组件，组件的 `template` 属性所指向的模板内容，必须有且只有一个`根元素`
### 第一种方式
- 1. 使用 `Vue.extend()` 创建 `模板对象`
- 2. 使用 `Vue.component()` 将模板对象 注册成为真正的组件

```js
// 1.1 使用Vue.extend 来创建模板对象
var com1 = Vue.extend({
        // 通过 template 属性,指定组件要展示的HTML结构
        template: '<h3>这是使用Vue.extend 创建出来的组件</h3>'
    })
// 1.2 使用Vue.component('组件的名称', 创建出来的模板对象) 将模板对象 注册成 真正的组件
Vue.component('myCom1', com1);
```

**注意:**

- 若组件名称采用`驼峰命名`, 则在引用中需要进行转化。例：组件名称：`myCom1`, 则应使用 `my-com1` 进行调用

- **示例**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>第一种方式创建组件</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <!-- 如果要引入组件,直接把组件的名称, 以HTML标签的形式,引入到页面中即可, 若使用驼峰命名,则需要进行转化 -->
        <my-com1></my-com1>
    </div>
    <script>
        // 1.1 使用Vue.extend 来创建模板对象
        var com1 = Vue.extend({
            // 通过 template 属性,指定组件要展示的HTML结构
            template: '<h3>这是使用Vue.extend 创建出来的组件</h3>'
        })
        // 1.2 使用Vue.component('组件的名称', 创建出来的模板对象) 将模板对象 注册成 真正的组件
        Vue.component('myCom1', com1);

        var vm = new Vue({
            el:"#app",
            data:{},
            methods:{}
        })
    </script>
</body>
</html>
```
### 第二种方式
```js
Vue.component('myCom2', {
    template:'<h3>这是使用 Vue.extend() 创建的组件</h3>'
})
```

在第一种方式的基础上进行简化

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>第二种方式创建组件</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
<div id="app">
    <!-- 如果要引入组件,直接把组件的名称, 以HTML标签的形式,引入到页面中即可, 若使用驼峰命名,则需要进行转化 -->
    <my-com1></my-com1>
    <my-com2></my-com2>
</div>
<script>
    // 不论是哪种方式创建的组件，组件的 `template` 属性所指向的模板内容，必须有且只有一个`根元素`
    // 改进第一种方式， 简写
    Vue.component('myCom1', Vue.extend({
        template: '<div><h3>这是使用 Vue.extend() 创建的组件</h3> <span>aaa</span></div>'
    }));

    // 也可以省略 Vue.extend
    Vue.component('myCom2', {
        template:'<h3>这是使用 Vue.extend() 创建的组件</h3>'
    })

    var vm = new Vue({
        el:"#app",
        data:{},
        methods:{}
    })
</script>
</body>
</html>
```

### **第三种方式** (推荐)
在第二种方式的基础上，把 `template` 模板 定义在外部
```html
<template id="tmp1">
    <div>
        <h1>在外部定义template</h1>
        <h2>有提示</h2>
        <h3>真不错</h3>
    </div>
</template>
```
```js
Vue.component('myCom1', {
            template: '#tmp1'
        });
```

- **示例：**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>创建组件-方法3</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <my-com1></my-com1>
    </div>

    <template id="tmp1">
        <div>
            <h1>在外部定义template</h1>
            <h2>有提示</h2>
            <h3>真不错</h3>
        </div>
    </template>

    <script>
        Vue.component('myCom1', {
            template: '#tmp1'
        });
        var vm = new Vue({
            el:"#app",
            data:{},
            methods:{}
        })
    </script>
</body>
</html>
```

## 定义私有组件
```js
var vm = new Vue({
    el:"#app",
    components:{
    }
});
```

- **示例：**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>定义私有组件</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <login></login>
    </div>

    <template id="login">
        <h1>这是Login的模板</h1>
    </template>
    <script>
        var vm = new Vue({
            el:"#app",
            components:{
                login:{
                    template:"#login"
                }
            }
        })
    </script>
</body>
</html>
```

## 组件中的 data
- 1. 组件可以有自己的 `data` 数据
- 2. 组件中的 `data` 必须是一个方法，并且返回 `Object`
- 3. 组件中的 `data`，和 `Vue实例` 中的使用方法一致

:::tip 为何组件中的data要返回Obj
一个组件可能被多次实例化，为了保证每个实例`数据独立`， 所以要在每次调用组件时，产生一个新的对象
:::

## v-if和v-else和flag一起使用 实现组件切换
- **实现效果**

![](/img/2020/vue_component_1.gif)

- **示例：**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>组件切换</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <a href="" @click.prevent="flag=true">登录</a>
        <a href="" @click.prevent="flag=false">注册</a>

        <login v-if="flag"></login>
        <register v-else="flag"></register>
    </div>

    <template id="login">
        <h1>登录组件</h1>
    </template>

    <template id="register">
        <h1>注册组件</h1>
    </template>

    <script>
        Vue.component('login',{
            template: "#login",
        });
        Vue.component('register',{
            template: "#register"
        })
        var vm = new Vue({
            el:"#app",
            data:{
                flag: true
            }
        })
    </script>
</body>
</html>
```

## Vue提供的Component元素实现组件切换
- **实现效果**

![](/img/2020/vue_component_1.gif)
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Component组件切换</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
<div id="app">
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <!-- Vue 提供 component 来展示对应的组件-->
    <component :is="comName"></component>
</div>

<!--模板-->
<template id="login">
    <h1>登录组件</h1>
</template>
<template id="register">
    <h1>注册组件</h1>
</template>

<script>
    // 注册组件
    Vue.component('login',{
        template: "#login",
    });
    Vue.component('register',{
        template: "#register"
    })
    var vm = new Vue({
        el:"#app",
        data:{
            flag: true,
            comName: 'login'        // 切换组件的变量
        }
    });
</script>
</body>
</html>
```

## 使用动画实现组件间的切换
- **实现效果**

![](/img/2020/vue_component_2.png)

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>组件切换-切换动画</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css" rel="stylesheet">
    <style>
    </style>
</head>
<body>
    <div id="app">
        <a href="" @click.prevent="comName='login'">登录</a>
        <a href="" @click.prevent="comName='register'">注册</a>
        <transition leave-active-class="flipOutX" mode="out-in">
            <component :is="comName"></component>
        </transition>
    </div>

    <!--模板-->
    <template id="login">
        <h1>登录组件</h1>
    </template>
    <template id="register">
        <h1>注册组件</h1>
    </template>

    <script>
        // 注册组件
        Vue.component('login',{
            template: "#login",
        });
        Vue.component('register',{
            template: "#register"
        })
        var vm = new Vue({
            el:"#app",
            data:{
                flag: true,
                comName: 'login'        // 切换组件的变量
            }
        });
    </script>
</body>
</html>
```

## 父组件向子组件传值
- **使用:**
    - 1. 父组件,在引用子组件时, 通过属性绑定(`v-bind`)的形式, 传递数据
    ```vue
    <child :parent_msg="msg"></child>     // parent_msg 子组件使用该变量时的名称      msg 父组件中的数据
    ```
    
    - 2. 父组件传递的属性, 需要先在子组件的`props`属性中声明,才能使用
    
    - 3. v-bind 绑定的变量名 推荐使用`下划线方式`, 若采用`驼峰命名法`, 则子组件的props属性中,重新命名时,需要全部为`小写`

- `data` 和 `props` 属性的区别
    - 1. `data`是一个 `函数` , 返回 `Obj` ; `props` 是一个 `数组`
    - 2. `data` 是组件自身的属性; `props` 是父组件传递给子组件的数据
    - 3. `data` `可读可写`; `props` `只读`
    
- **示例:**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>父组件向子组件传值</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <!--父组件,在引用子组件时, 通过属性绑定(v-bind)的形式, 把需要传递给子组件的数据, 传递给子组件-->
        <!--父组件传递的属性, 需要先在子组件的props属性中声明,才能使用-->
        <!--v-bind 绑定的变量名 推荐使用下划线方式, 若采用驼峰命名法, 则子组件的props属性中,重新命名时,需要全部为小写-->
        <child :parent_msg="msg"></child>
    </div>

    <!--template-->
    <template id="child">
        <h1>这是一个子组件 -- {{parentmsg}}</h1>
    </template>

    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                msg:'父组件中的数据'
            },
            components:{
                child:{
                    data(){         // 子组件自身的数据; 可读可写
                        return{
                            title: '123',
                            name: '张三'
                        }
                    },
                    template: '<h1>这是一个子组件 -- {{parent_msg}}</h1>',
                    props: ['parent_msg']       // 父组件传递给子组件的数据; 只读
                }
            }
        })
    </script>
</body>
</html>
```

## 父组件向子组件传方法
- **使用:**
    - 1. 父组件向子组件传递方法, 使用事件绑定机制 `v-on`, 简写为 `@`
    ```html
    <com1 @func="show"></com1>        
    <!-- func是提供给子组件调用的方法名,  show 是父组件中的方法名; 通过事件绑定机制, 向子组件传递方法-->  
    ```
  
  - 2. 子组件使用 `this.$emit()`触发父组件传递的方法

- **示例:**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>父组件向子组件传方法</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <!--父组件向子组件传递方法, 使用事件绑定机制 v-on-->
        <com1 @func="show"></com1>
    </div>

    <!--template-->
    <template id="com1">
        <div>
            <h1>这是一个子组件</h1>
            <input type="button" value="这是子组件中的按钮, 点击它, 触发父组件传递过来的func方法" @click="myClick">
        </div>
    </template>

    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                dataFromSon: null
            },
            methods:{
                show(data){
                    console.log("调用了父组件");
                    this.dataFromSon = data;        // 通过方法, 将子组件中的数据, 传递给父组件
                }
            },
            components:{
                com1:{
                    data(){
                        return{
                            arg: {name: '张三', age: 18}
                        }
                    },
                    template: "#com1",
                    methods: {
                        myClick() { // 使用 this.$emit()触发父组件传递的方法
                            this.$emit('func', this.arg);
                        }
                    }
                }
            }
        })
    </script>
</body>
</html>
```

## 组件案例
- **效果展示:**
![](/img/2020/vue_component_3.png)

- **源码:**
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>组件案例</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
</head>
<body>
    <div id="app">
        
        <comment-box @load-comments="loadComments"></comment-box>

        <ul class="list-group">
            <li class="list-group-item" v-for="item in list" :key="item.id">
                <span class="badge">评论人: {{item.user}}</span>
                {{item.content}}
            </li>
        </ul>
    </div>  

    <!-- template -->
    <template id="tmp1">
        <div>
            <div class="form-group">
                <label>评论人:</label>
                <input type="text" class="form-control" v-model="user">
            </div>

            <div class="form-group">
                <label>评论内容:</label>
                <textarea class="form-control" v-model="content"></textarea>
            </div>

            <div class="form-group">
                <input type="button" value="发表评论" class="btn btn-primary" @click="postComment">
            </div>
        </div>
    </template>

    <script>
        
        var vm = new Vue({
            el:"#app",
            data:{
                list:[
                    {id: Date.now(), user:'张三', content: '天生我才必有用'},
                    {id: Date.now()+1, user:'李四', content: '劝君更尽一杯酒'},
                    {id: Date.now()+2, user:'王五', content: '采菊东篱下,悠然见南山'},
                ]
            },
            created () {
              this.loadComments();  
            },
            methods:{
                loadComments(){     // 从本地的 localStorage 中加载列表
                    var list = JSON.parse(localStorage.getItem('cmts') || '[]');
                    this.list = list;
                }
            },
            components: {
                commentBox:{
                    template:"#tmp1",
                    data(){
                        return{
                            user:'',
                            content:''
                        }
                    },
                    methods: {
                        postComment(){
                            var comment = {id:Date.now(), user:this.user, content:this.content};
                            // 从 localStorage 中获取最新的评论
                            var list = JSON.parse(localStorage.getItem('cmts') || '[]');
                            list.unshift(comment);
                            // 重新保存最新的评论
                            localStorage.setItem('cmts', JSON.stringify(list));
                            this.user = this.content = '';
                            // 刷新原页面
                            this.$emit('load-comments');
                        }
                    }
                }
            }
        });
    </script>
</body>
</html>
```

## 使用 `$ref` 来操作DOM
- **原理:**
ref => reference(引用) 通过给DOM元素设置 `ref` 属性, 实现通过 `this.$refs` 对该DOM元素的引用

- **示例:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ref获取DOM元素和组件引用</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <input type="button" value="获取元素" @click="getElement">
        <h1 id="myh1" ref="myh1">这是一个H1标题</h1>

        <login ref="login"></login>
    </div>


    <template id="login">
        <h1>登录组件</h1>
    </template>

    <script>
        var vm = new Vue({
            el:"#app",
            data:{

            },
            methods: {
                getElement(){
                    this.$refs.login.show();    // 使用 ref(reference)
                }
            },
            components: {
                login:{
                    template:"#login",
                    methods: {
                        show(){
                            console.log("调用了组件的方法");
                        }
                    }
                }
            }
        })
    </script>
</body>
</html>
```