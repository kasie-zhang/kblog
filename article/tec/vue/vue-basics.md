---
title: 【Vue之旅】--基础
date: 2020-12-15
cover: /img/cover/55.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /article/55
---

> 第 55 篇文章
 <!-- more -->

## MVVM 概念
![](/img/2020/vue_basics_1.png)
 
## Vue 和 MVVM 之间的对应关系
- 新构造的 Vue 实例担任 VM 的角色
- Vue 实例绑定者 HTML 中的具体元素, 提供所需数据
 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day01</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
    <p id="content">{{msg}}</p>
    </div>
    <script>
        // 创建一个vue实例
        // 导入vue包后,浏览器内存中就多了个Vue的构造函数
        // new 出来的 vm 对象, 就是 MSVVM 中的 VM 调度者
        var vm = new Vue({
            el:"#app",       // 表示,当前创建的vue实例,要控制页面上的哪个区域
            data:{          // data属性中,存放着 el 中要用到的数据
                msg:"hello zhang ke"        // 方便数据渲染 
            },
            methods:{       // 定义当前vue实例所有可用方法
            }
        })
    </script>    
</body>
</html>
```

## v-cloak
- 不需要表达式

- **用法:**
    这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

- **示例:**
    ```css
    [v-cloak] {
      display: none;
    }
    ```
    ```html
    <div v-cloak>
      {{ message }}
    </div>
    ```
  不会显示,直到编译结束
  
## 插值表达式 与 v-text
- 使用 v-cloak 能够解决 插值表达式闪烁问题

- 默认 v-text 没有闪烁问题

- **预期:** `String`

- **详细:** 更新元素的 `textContent`。如果需要更新部分 `textContent`，需要使用 插值表达式

- **示例:** 
    ```html
    <span v-text="msg"></span>
    <!-- 和下面的一样 -->
    <span>{{msg}}</span>
    ``` 

## v-html
- **预期：** `string`

- **详细：** 
    更新元素的 `innerHTML`。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。如果试图使用 `v-html` 组合模板，可以重新考虑是否通过使用组件来替代。
    
    :::danger
    在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。只在可信内容上使用 `v-html`，**永不**用在用户提交的内容上。
    :::
- **示例：**
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>V-cloak</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <p v-text="msg"></p>
            <p v-html="msg"></p>
        </div>
        <script>
            var vm = new Vue({
                el:"#app",
                data:{
                    msg:"<h1>dadas</h1>"
                }
            })
        </script>
    </body>
    </html>
    ``` 
    效果：
    
    ![](/img/2020/vue_basics_2.png)
    
## v-bind
- **缩写：** `:`

- **预期：** `any (with argument) | Object (without argument)`

- **参数：** `attrOrProp (optional)`

- **修饰符：** 
    - `.prop` 作为一个 DOM property 绑定而不是作为 attribute 绑定。
    - `.camel` 将 kebab-case attribute 名转换为 camelCase。
    - `.sync`  语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

- **用法：** 
    动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。
    
    在绑定 `class` 或 `style attribute` 时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。
    
    在绑定 `prop` 时，`prop` 必须在子组件中声明。可以用修饰符指定不同的绑定类型。
    
    没有参数时，可以绑定到一个包含键值对的对象。注意此时 `class` 和 `style` 绑定不支持数组和对象。

- **示例：**
    ```html
    <!-- 绑定一个 attribute -->
    <img v-bind:src="imageSrc">
    
    <!-- 动态 attribute 名 (2.6.0+) -->
    <button v-bind:[key]="value"></button>
    
    <!-- 缩写 -->
    <img :src="imageSrc">
    
    <!-- 动态 attribute 名缩写 (2.6.0+) -->
    <button :[key]="value"></button>
    
    <!-- 内联字符串拼接 -->
    <img :src="'/path/to/images/' + fileName">
    
    <!-- class 绑定 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]">
    
    <!-- style 绑定 -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>
    
    <!-- 绑定一个全是 attribute 的对象 -->
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
    
    <!-- 通过 prop 修饰符绑定 DOM attribute -->
    <div v-bind:text-content.prop="text"></div>
    
    <!-- prop 绑定。“prop”必须在 my-component 中声明。-->
    <my-component :prop="someThing"></my-component>
    
    <!-- 通过 $props 将父组件的 props 一起传给子组件 -->
    <child-component v-bind="$props"></child-component>
    
    <!-- XLink -->
    <svg><a :xlink:special="foo"></a></svg>
    ```
  
## v-on
- **缩写：** `@`

- **预期：** `Function | Inline Statement | Object`

- **参数：** `event`

- **修饰符：** 
    - `.stop` - 调用 `event.stopPropagation()`。
    - `.prevent` - 调用 `event.preventDefault()`。
    - `.capture` - 添加事件侦听器时使用 `capture` 模式。
    - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
    - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
    - `.native` - 监听组件根元素的原生事件。
    - `.once` - 只触发一次回调。
    - `.left` - (2.2.0) 只当点击鼠标左键时触发。
    - `.right` - (2.2.0) 只当点击鼠标右键时触发。
    - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
    - `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

- **用法：** 
    绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。
    
    用在普通元素上时，只能监听**原生 DOM 事件**。用在自定义元素组件上时，也可以监听子组件触发的**自定义事件**。
    
    在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` property：`v-on:click="handle('ok', $event)"`。
    
    从 `2.4.0` 开始，`v-on` 同样支持不带参数绑定一个事件/监听器键值对的对象。注意当使用对象语法时，是不支持任何修饰器的。
    
- **示例：**
    ```html
    <!-- 方法处理器 -->
    <button v-on:click="doThis"></button>
    
    <!-- 动态事件 (2.6.0+) -->
    <button v-on:[event]="doThis"></button>
    
    <!-- 内联语句 -->
    <button v-on:click="doThat('hello', $event)"></button>
    
    <!-- 缩写 -->
    <button @click="doThis"></button>
    
    <!-- 动态事件缩写 (2.6.0+) -->
    <button @[event]="doThis"></button>
    
    <!-- 停止冒泡 -->
    <button @click.stop="doThis"></button>
    
    <!-- 阻止默认行为 -->
    <button @click.prevent="doThis"></button>
    
    <!-- 阻止默认行为，没有表达式 -->
    <form @submit.prevent></form>
    
    <!--  串联修饰符 -->
    <button @click.stop.prevent="doThis"></button>
    
    <!-- 键修饰符，键别名 -->
    <input @keyup.enter="onEnter">
    
    <!-- 键修饰符，键代码 -->
    <input @keyup.13="onEnter">
    
    <!-- 点击回调只会触发一次 -->
    <button v-on:click.once="doThis"></button>
    
    <!-- 对象语法 (2.4.0+) -->
    <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
    ```
    在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：
    
    ```html
    <my-component @my-event="handleThis"></my-component>
    
    <!-- 内联语句 -->
    <my-component @my-event="handleThis(123, $event)"></my-component>
    
    <!-- 组件中的原生事件 -->
    <my-component @click.native="onClick"></my-component>
    ```
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>v-on</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <input type="button" value="按钮" title="2222" v-on:click="show">
        </div>
        <script>
            var vm = new Vue({
                el:'#app',
                data:{
                    msg:'123'
                },
                methods: {
                    show:function(){
                        alert('hello');
                    }
                }
            })
        </script>
    </body>
    </html>
    ```
## 小例子: 跑马灯
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>跑马灯</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <input type="button" value="巴啦啦能量" @click="click1">
        <input type="button" value="沙琪玛,变身" @click="click2">
        <h4>{{msg}}</h4>
    </div>
    <script>
        var vm = new Vue({
            el:'#app',
            data:{
                msg:'巴啦啦~~能量',
                intervalId:null,            // 绑定计时器  interval  间隔
            },
            methods: {
                click1(){
                    if(this.intervalId != null) return;
                    this.intervalId = setInterval(() => {
                            console.log(this.msg);
                            var start = this.msg.substring(0,1);
                            var end = this.msg.substring(1);
                            this.msg = end + start;
                        }, 400);
                },
                click2(){
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }
        })
    </script>
</body>
</html>
```

## 事件修饰符
- 使用 `.stop` 阻止冒泡

- 使用 `.prevent` 阻止默认行为

- 使用 `.capture` 捕获机制, 先调用 divHandler 方法

- 使用 `.self` 只当事件在该元素本身(比如不是子元素)触发时触发回调
    - `.self` 只会阻止自己身上冒泡行为的触发,并不会真正阻止冒泡事件
    
- 使用 `.once` 只触发一次

- `示例:`
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>事件修饰符</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <style>
            .inner{
                height: 150px;
                background-color: lightcyan;
            }
        </style>
    </head>
    <body>
        <div id="d1" class="inner" @click="divHandler">
            <!-- 使用 .stop 阻止冒泡 -->
            <p>展示 .stop 用法</p>
            <input type="button" value="戳他" @click.stop="btnHandler">
        </div>
    
        <div id="d2">
            <!-- 使用 .prevent 阻止默认行为 -->
            <p>展示 .prevent 用法</p>
            <a href="http://zk123.top" @click.prevent="linkClick">欢迎光临我的首页</a>
        </div>
    
            <!-- 使用 .capture 捕获机制, 先调用 divHandler 方法 -->
        <div id="d3" class="inner" @click.capture="divHandler">
            <p>展示 .capture 用法</p>
            <input type="button" value="戳他" @click="btnHandler">
        </div>    
    
            <!-- 使用 .self 只当事件在该元素本身(比如不是子元素)触发时触发回调 -->
        <div id="d4" class="inner" @click.self="divHandler">
            <p>展示 .sellf 用法</p>
            <input type="button" value="戳他" @click="btnHandler">
        </div>
    
        <!-- 使用 .once 只触发一次 -->
        <div id="d5" class="inner" @click="divHandler">
            <p>展示 .once 用法</p>
            <a href="http://zk123.top" @click.prevent.once="linkClick">欢迎光临我的首页</a>
        </div>
    
        <script>
            var vm = new Vue({
                el:"#d1",
                data:{
    
                },
                methods: {
                    divHandler(){
                        console.log("触发了Div处理事件");
                    },
                    btnHandler(){
                        console.log("触发了Btn处理事件")
                    },
                }
            });
            var vm2 = new Vue({
                el:"#d2",
                data:{},
                methods:{
                    linkClick(){
                        console.log("触发了点击事件")
                    }
                }
            });
            var vm3 = new Vue({
                el:"#d3",
                data:{},
                methods: {
                    divHandler(){
                        console.log("触发了Div处理事件");
                    },
                    btnHandler(){
                        console.log("触发了Btn处理事件")
                    },
                }
            });   
            var vm4 = new Vue({
                el:"#d4",
                data:{},
                methods: {
                    divHandler(){
                        console.log("触发了Div处理事件");
                    },
                    btnHandler(){
                        console.log("触发了Btn处理事件")
                    },
                }
            });
    
            var vm5 = new Vue({
                el:"#d5",
                data:{},
                methods:{
                    linkClick(){
                        console.log("触发了点击事件")
                    },
                    divHandler(){
                        console.log("触发了Div处理事件");
                    }
                }
            });
        </script>
    </body>
    </html>
    ```
  
## `v-model` 和 `双向数据绑定`
- `v-bind` 只能单项绑定, 从`M`自动绑定到`V`

- `v-model` 可以实现 表单元素和 `Model` 中数据的双向绑定
    - `v-model` 只能用在`表单元素`中(Input, select, checkbox, textarea)
    
- `修饰符:`
    - `.lazy` 取代 `input` 监听 `change` 事件
    - `.number` 输入字符串转化为有效的数字
    - `.trime` 输入首位空格过滤
- `示例`
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>v-model制作计算器</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <input type="text" v-model="n1">
    
            <select v-model="opt">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
    
            <input type="text" v-model="n2">
    
            <input type="button" value="=" @click="calc">
    
            <input type="text" v-model="result">
        </div>
        <script>
            var vm = new Vue({
                el:"#app",
                data:{
                    n1:'0',
                    n2:'0',
                    result:'0',
                    opt:'+'
                },
                methods: {
                    calc(){
                        switch(this.opt){
                            case '+':
                                this.result = parseInt(this.n1) + parseInt(this.n2);
                                break;
                            case '-':
                                this.result = parseInt(this.n1) - parseInt(this.n2);
                                break;
                            case '*':
                                this.result = parseInt(this.n1) * parseInt(this.n2);
                                break;
                            case '/':
                                this.result = parseInt(this.n1) / parseInt(this.n2);
                                break;
                        }
                    }
                }
            })
        </script>
    </body>
    </html>
    ```
## Vue设置class样式
- 1. 直接传递`数组`
- 2. 能够在数组中使用`三元表达式`
- 3. 改进三元表达式,以`对象`的形式呈现, 提高代码可读性
- 4. 直接使用`对象`


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue中使用样式</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
        .red{
            color: red;
        }
        .thin{
            font-weight: 200;
        }
        .italic{
            font-style: italic;
        }
        .active{
            letter-spacing: 0.5em;
        }
    </style>

</head>
<body>
    <div id="app">
        <h1 class="red thin">这是一个大的H1</h1>
        <!-- 1. 直接传递数组 -->
        <h1 :class="['thin', 'red']">这是一个大的H1</h1>
        <!-- 2. 能够在数组中使用三元表达式 -->

        <!-- 3. 改进三元表达式,以对象的形式呈现, 提高代码可读性 -->
        <h1 :class="['thin', {red: flag}]">这是一个大的H1</h1>

        <!-- 4. 直接使用对象 -->
        <h1 :class="{thin:true, red:true}">这是一个大的H1</h1>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                flag: true
            },
            methods: {
            }
        })
    </script>
</body>
</html>
```

## Vue设置style样式
- 使用`v-bind` 绑定`对象`、`多个对象`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue中使用样式2</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <!--1. 使用对象-->
        <h1 :style="styleObj1">这是一个H1</h1>
        <!--2. 使用多个对象-->
        <h1 :style="[styleObj1, styleObj2]">这是一个H1</h1>
    </div>
    <script>
        var vm = new Vue({
            el:"#app",
            data:{
                styleObj1:{color:'red', 'font-weight':200},
                styleObj2:{'font-style': 'italic'},
            },
            methods: {}
        })
    </script>
</body>
</html>
```

## v-for
- **预期：** `Array` | `Object` | `number` | `string` | `Iterable (2.6 新增)`
- **用法：**
    基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression，为当前遍历的元素提供别名：
    ```html
    <div v-for="item in items">
      {{ item.text }}
    </div>
    ```
  另外也可以为数组索引指定别名 (或者用于对象的键)：
  ```html 
  <div v-for="(item, index) in items"></div>
  <div v-for="(val, key) in object"></div>
  <div v-for="(val, name, index) in object"></div>
  ```
  `v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊 attribute `key` 来提供一个排序提示：
  ```html 
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```
  :::danger
  当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。
  :::
  
- **示例:**
    ```html
   <!doctype html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport"
             content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
       <title>Document</title>
       <!-- 引入vue包 -->
       <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
   </head>
   <body>
       <div id="app">
           <!--1. 循环简单数组-->
           <p v-for="(item,i) in list">索引值：{{i}}   每一项：{{item}}</p>
   
           <!--2. 循环复杂数组-->
           <p v-for="user in list2">id: {{user.id}}  name: {{user.name}}</p>
   
           <!--3. 循环对象-->
           <p v-for="(value, key, i) in user">键:{{key}}  值:{{value}} 索引:{{i}}</p>
   
           <!-- 4. 迭代数字, 值从1开始-->
           <p v-for="count in 10">这是第{{count}}次迭代</p>
       </div>
       <script>
           var vm = new Vue({
               el:"#app",
               data:{
                   list:[1,2,3,4,5,6],
                   list2:[
                       {id:1, name:1},
                       {id:2, name:2},
                       {id:3, name:3},
                       {id:4, name:4}
                   ],
                   user:{
                       id:1,
                       name:"zk",
                       gender:"男"
                   }
               },
               methods:{}
           })
       </script>
   </body>
   </html> 
   ```
  
  
- **v-for 问题演示:**
    ```html 
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>v-for中的key</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <label>Id:
                <input type="number" v-model="id">
            </label>
            <label>Name:
                <input type="text" v-model="name">
            </label>
            <input type="button" value="添加" @click="add">
    <!--        注意: v-for 循环时, key属性只能使用number或者string, 且要保证key是不重复的-->
    <!--        注意: key在使用时,必须使用 v-bind 属性绑定的形式,指定key的值-->
            <p v-for="item in list" :key="item.id">
                <input type="checkbox">{{item.id}} ---- {{item.name}}
            </p>
        </div>
        <script>
            var vm = new Vue({
                el:'#app',
                data:{
                    id:'',
                    name:'',
                    list:[
                        {id:1, name:'张三'},
                        {id:2, name:'李四'},
                        {id:3, name:'王五'},
                        {id:4, name:'赵六'}
                    ]
                },
                methods:{
                    add(){  // 在列表头部添加数据
                        this.list.unshift({id: this.id, name: this.name});
                    }
                }
            })
        </script>
    </body>
    </html>
    ```
## v-if 和 v-show
- **v-if:** 每次都会重新删除或创建元素

- **v-show:** 不进行DOM的删除和创建操作,只是切换元素的 `display:none` 样式

- **性能比较:**
    - `v-if` 有较高的切换性能消耗
    - `v-show` 有较高的初始渲染性能消耗
    
## 添加列表案例
- **效果:** 实现记录的增加、删除、查找
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加品牌列表</title>
    <!-- 引入vue包 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
</head>
<body>
    <div id="app">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">添加品牌</h3>
            </div>
            <div class="panel-body form-inline">
                <label>Id:
                    <input type="number" class="form-control" v-model="id">
                </label>
                <label>Name:
                    <input type="text" class="form-control" v-model="name">
                </label>
                <label>
                    <input type="button" value="添加" class="btn btn-primary" @click="add">
                </label>
                <label>
                    搜索名称或者关键字：
                    <input type="text" class="form-control" v-model="keyWords">
                </label>
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Ctime</th>
                <th>Operation</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in search(keyWords)" :key="item.id">
                <td v-text="item.id"></td>
                <td v-text="item.name"></td>
                <td v-text="item.ctime"></td>
                <td>
                    <a href="" @click.prevent="del(item.id)">删除</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                id: '',
                name: '',
                keyWords:'',
                list: [
                    {id: 1, name: '奔驰', ctime: new Date()},
                    {id: 2, name: '宝马', ctime: new Date()},
                ]
            },
            methods:{
                add(){
                    var car = {id: this.id, name:this.name, ctime:new Date()};
                    this.list.push(car);
                    this.name = this.id='';
                },
                del(id){
                    // 数组的some()方法, 如果return true ,就立即终止这个数组的后续循环
                    this.list.some((item, i)=>{
                        if(item.id === id){
                            this.list.splice(i, 1);
                        }
                    });

                    // 当数组元素在测试条件返回true时,findIndex() 返回符合条件的元素的索引位置, 之后不再执行函数
                    // var index = this.list.findIndex(item => {
                    //     if (item.id === id) {
                    //         return true;
                    //     }
                    // });
                    // this.list.splice(index, 1);
                },
                search(keyWords) {
                    // forEach 查找
                    // var newList = [];
                    // this.list.forEach(item => {
                    //     if(item.name.indexOf(keyWords) !== -1){
                    //         newList.push(item);
                    //     }
                    // })

                    // filter 过滤
                    return this.list.filter(item=>{
                        if (item.name.includes(keyWords)) {
                            return item;
                        }
                    })
                },
            }
        })
    </script>
</body>
</html>
```

## 过滤器
- **使用场景：** `插值表达式`、`v-bind`
- **使用方法：** { name | 过滤器的名称(args)}
- **注意：** 
    - 过滤器可以调用多次
    - 若存在同名的`全局过滤器`和`私有过滤器`， 根据就近原则，优先调用`私有过滤器`
- **定义过滤器：** Vue.filter('过滤器名称', function(data,args)))
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>过滤器</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    </head>
    <body>
    <div id="app">
        <h1>{{msg | filter1('参数1')}}</h1>
    </div>
    <script>
        // 定义过滤器
        Vue.filter('filter1', function (data, arg) {
            return data+"====出走他乡，归来仍是少年！"+"===="+arg;
        });
    
        // 使用过滤器    {{ name | 过滤器的名称}}
        var vm = new Vue({
            el: "#app",
            data: {
                msg:"漂洋过海来看你"
            },
        });
    </script>
    </body>
    </html>
    ```

- **定义私有过滤器：**
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>过滤器</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    </head>
    <body>
    <div id="app">
        <h1>{{date | dataFormat('')}}</h1>
    </div>
    <div id="app2">
        <!--无法调用到 app1 的私有过滤器-->
        <h1>{{date | dataFormat('')}}</h1>
    </div>
    
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                date: new Date(),
            },
            // 私有过滤器
            filters: {
                dataFormat: function (data, pattern = "") {
                    var dt = new Date(data);
                    // yyyy-mm-dd
                    var y = dt.getFullYear();
                    var m = dt.getMonth() + 1;
                    var d = dt.getDate();
    
                    if (pattern.toLowerCase() === "yyyy-mm-dd") {
                        return `${y}-${m}-${d}`;
                    } else {
                        var hh = dt.getHours();
                        var mm = dt.getMinutes();
                        var ss = dt.getSeconds();
                        return `${y}-${m}-${d}-${hh}-${mm}-${ss}`;
                    }
                }
            }
        });
    
        var vm2 = new Vue({
            el:"#app2",
            data:{
                date:new Date(),
            }
        })
    </script>
    </body>
    </html>
    ```

- **示例：**
    实现日期格式化
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>过滤器</title>
        <!-- 引入vue包 -->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.css">
    </head>
    <body>
    <div id="app">
        <h1>{{date | dataFormat('')}}</h1>
    </div>
    <div id="app2">
        <!--无法调用到 app1 的私有过滤器-->
        <h1>{{date | dataFormat('')}}</h1>
    </div>
    
    <script>
        var vm = new Vue({
            el: "#app",
            data: {
                date: new Date(),
            },
            // 私有过滤器
            filters: {
                dataFormat: function (data, pattern = "") {
                    var dt = new Date(data);
                    // yyyy-mm-dd
                    var y = dt.getFullYear();
                    var m = (dt.getMonth() + 1).toString().padStart(2, '0');
                    var d = dt.getDate().toString().padStart(2,'0');
    
                    if (pattern.toLowerCase() === "yyyy-mm-dd") {
                        return `${y}-${m}-${d}`;
                    } else {
                        var hh = dt.getHours().toString().padStart(2,'0');
                        var mm = dt.getMinutes().toString().padStart(2,'0');
                        var ss = dt.getSeconds().toString().padStart(2,'0');
                        return `${y}-${m}-${d}-${hh}-${mm}-${ss}`;
                    }
                }
            }
        });
    
        var vm2 = new Vue({
            el:"#app2",
            data:{
                date:new Date(),
            }
        })
    </script>
    </body>
    </html>
    ```
  
## 自定义按键修饰符
- **Vue提供的按键修饰符：**
    - `.enter`
    - `.tab`
    - `.delete` (捕获“删除”和“退格”键)
    - `.esc`
    - `.space`
    - `.up`
    - `.down`
    - `.left`
    - `.right`

- **自定义键盘码：**
    - `Vue.config.keyCodes.f2 = 113;`
