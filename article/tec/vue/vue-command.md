---
title: 【Vue之旅】-- 指令
date: 2020-12-18
cover: /img/cover/57.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /article/57
---

> 第 57 篇文章
<!-- more -->

## 自定义全局指令
- **使用：** `Vue.directive()`

- **注意：** 
    - 在`定义`时，指令的名称前面不需要加 `v-` 前缀
    - 在`调用`时，必须在指令的前面加上 `v-` 前缀来调用
- **钩子函数：**
    一个指令定义对象可以提供如下几个钩子函数 
    - `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    - `update`: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
    
- **钩子函数`参数`:**
    - `el`:指令所绑定的元素，可以用来直接操作DOM
    - `binding`: 一个对象，
        - `name`: 属性名，不包括 `v-`前缀
        - `value`: 指令绑定的值。 例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
        - `oldValue`: 指令绑定前的一个值，仅在`update`和`componentUpdated`钩子中可用
        - `expression`: 字符串形式的指令表达式。 例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`
        - `arg`： 传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
        - `modifiers`: 一个包含修饰符的对象
    - `vnode`: Vue编译生成的虚拟节点
    - `oldVnode`: 上一个虚拟节点，仅在`update`和`componentUpdated`钩子中可用
- **示例：**
```js
Vue.directive('focus', {
    bind: function (el) { // 指令第一次绑定到元素上时调用
        // 在元素刚刚绑定指令的时候，还没有插入到DOM中去，调用focus没有作用
        // 因为，一个元素，只有插入DOM之后，才能过去到焦点
        el.focus();
    },
    inserted: function (el) { // 元素插入到DOM中时，执行 inserted 函数
        el.focus();
    },
    update: function () {  // 当VNode更新时，会执行updated， 可能会执行多次

    }
});
```

## 定义私有指令
在`Vue对象`中定义 `directives`对象。

## 指令的简写
在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写：

```js
// 等同于把代码写到了 bind 和 update 中去
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

- **示例：**
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
    <div>
        <h1 v-color v-font="50">我自横刀向天笑</h1>
    </div>
</div>

<script>
    // 定义全局指令
    Vue.directives('focus', {
        // 指令第一次绑定到元素时调用
        bind: function (el, binding) {
            el.focus();
        },
        // 元素插入到DOM时调用
        inserted: function (el, binding) {
            el.focus();
        },
        // 元素更新时调用
        update: function (el, binding) {
            el.focus();
        }
    });
    var vm = new Vue({
        el:"#app",
        data:{
        },
        directives:{
            // 定义简写私有指令， 同时写入到 bind 和 update
            'color': function (el) {
                el.style.color = 'red';
            },
            // 定义私有指令
            'font':{
                bind: function (el, binding) {
                    el.style.fontSize = parseInt(binding.value) +'px';
                }
            }
        }
    })
</script>
</body>
</html>
```