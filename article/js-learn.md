---
title: JavaScript学习
date: 2019-04-12
cover: https://api.zk123.top/link/repo1/img/cover/2.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- JavaScript
- 前端
publish: true
permalink: /article/2
---

> 第 2 篇文章
<!-- more -->

## defer 延迟执行

当网页文档内容全部加载后，才解析执行js脚本。而不是遇到js代码块就执行。

## 预编译

    <script>
    alert(a);       // 返回undefined
    var a = 1;
    alert(a);
    </script>

预编译实现了将变量声明提前到了所有代码之前，来进行执行。

	 <script>
        fun();
        function fun() {
            alert(1);
        }
    </script>
支持先调用，后定义函数。

一般在声明变量和函数时，会实现预编译提前（即支持先调用，后声明）。

## 代码块

js引擎执行脚本时，按照块来执行，浏览器在解析HTML文档流时，遇到script标签，js引擎会等到这个代码块都加载完，然后对这个代码段进行预编译，再执行，执行完毕后，再继续解析下面的HTML文档流。

所有代码块在一个文档中，同属于一个全局作用域，但是需要注意块之间的变量函数（代码块的解析是有先后顺序的）。

## 响应事件
js的操作通过 **事件驱动** 的模式实现

js的响应事件具有不确定性

### **window.onload**
在**网页加载完毕**后立即执行的操作，即当HTML文档加载完毕后，立即执行某个方法。 通常用于\<body>元素。

	window.onload = function(){
		fun1();
		fun2();
	}
#### 为何使用window.onload()？
因为在js中的函数方法，需要在HTML文档渲染完毕后才可以使用，如果没有渲染完成，此时的[dom树](article/front-end/js/basics/dom.md)是不完整的，这时调用一些js代码可能会报错“undefined”。

## 动态脚本-document.write()
document.write()运行原理：
document.write()是js对document.open()所开启的文档流操作的API方法。 

- 若文档流已经关闭，则document.write()会重新调用document.write()打开新的文档流并写入，此时原来的文档流就会被清空，已经渲染好的页面会被覆盖，浏览器会重新构建新的DOM并渲染新的页面

### 写入文本
 在页面加载时不会出问题

### 写入脚本
[借鉴博客](https://blog.csdn.net/wei_ke_zhi/article/details/82153778)

	注意点1： 写入脚本时，这段脚本被拦腰截断。 浏览器将它解析成了以下代码
	
	<script>
	 
	document.write('<script>alert(1)

	</script>

	');

	插入文本中的</script>被当成了第一个scrip的闭合标签，因此这段代码成了非法代码。 （浏览器的HTML解析会被js的加载所阻塞）
	解决方案：为</script>加上转移字符   <\script>=><\/script>

插入脚本会导致整个页面先跳出弹窗，弹窗关闭后，才显示出原来的HTML文档。

### 动态脚本的使用场景
1.加载需要配合js脚本使用的外部CSS文件

2.在新窗口中写入新的页面数据（新建一个页面不会重写之前的页面）

## 使用控制台

console.log()

- log(message) : 将一般消息输出到控制台
- warn(message): 将警告信息输出到控制台
- info(message) : 将信息性消息输出到控制台
- error(message) : 将错误消息输出到控制台

## 处理异常(try-catch)

	try{
		// 可能出错的代码
	}catch(error){
		// 在发生错误时怎么处理
	}

---
	实例：
    <script>
    try{
        a+b;
    }catch (e) {
        alert(e.message);	// 通过.message方法，可以获取错误的详细信息
    }
    </script>

- message  弹出错误信息	(a is not defined)
- description 弹出错误消息 (undefined)
- name 弹出错误名称 (ReferenceError)

### finally属性
finally 是try-catch处理异常结构中的最后一个部分，也是一定会执行的部分。

## 字符编码
js支持Unicode编码。即可以使用中文作为变量和该函数的名字。

## 基本数据类型
 数据类型| 描述|
:--:|:--:|
null| 表示空值，不存在
undefined|未定义，声明了变量但没有赋值时会显示该值
number|数值
string|字符串
boolean|布尔值
object|对象

    typeof function(){}     // 类型：function
    typeof null             // 类型：object
    typeof {}               // 类型：object
    typeod []               // 类型：object
    typeof undefined        // 类型：undefined
    
### number
number 分为整型数值int、 浮点型数值float
#### int
进制|前缀
:--:|:--:
十六进制|0x
八进制|0

    var num1 = 0x1F4        // f 不区分大小写
    var num2 = 0111;        // 73
    
#### float
1. 浮点数能够使用科学计数法表示

        var float = 1.2e3;          // float = 1200

#### 运算函数
:::tip Math.floor() 剔除小数位，只取整数
```javascript
var num1 = Math.floor(2.8);         // (Math中的M必须大写)
alert(num1);                        // 输出： 2
```
:::

:::tip Math.round() 四舍五入
```javascript
var num2 = Math.round(4.5);         
alert(num2);                        // 输出： 5
```
:::

#### 设置数字显示的位数
:::tip toFixed(a)      保留小数点后a位数
```javascript
var a = 10;
alert(a.toFixed(2));        // 返回 10.00
```
:::

:::tip toExponential(a)  保留小数点后a位有效数字的科学计数法表示方式   
```javascript
var a = 123456789;
alert(a.toExponential(2));      // 返回1.23e +8
```
:::

#### 转化成数字
:::tip parseInt()   逐个转化，遇到不能够转化的字符则停止转化，若第一个字符不能转化，则直接返回NaN
```javascript
alert(parseInt("123abc"));          // 返回数字123
alert(parseInt("1.73"));            // 返回数字1
alert(parseInt(".123"));            // 返回NaN
alert(parseInt("123",2));           // 声明进制为2进制，把2进制的123转化为10进制的整数
// 第一个参数是十进制的值，包含0前缀时。 为了避免误解成八进制的数字，应指定第二个参数 10
alert(parseInt("010",10));        
```
:::

:::tip parseFloat()     在parseInt()的基础上能够识别小数点
```javascript
alert(parseFloat("1.23"));          // 返回数字1.23
```
:::

:::tip 使用乘法，实现快速转换
```javascript
var a = 1;
var b = "1";
alert(a+b);         // 返回字符串"11"
alert(a+(b*1));     // 返回数值2
```
:::

#### 转化成布尔值
:::tip 使用 !!  强制转化成布尔值
```javascript
var a = !!0;        // 返回false
var b = !!1;        // 返回true
var c = !!NaN;      // 返回false
var d = !!null;     // 返回false
var e = !!undefined;        // 返回false
var f = !!{};           // 返回true
var g = !![];           // 返回true
```
:::

:::tip 使用Boolean()构造函数转换
```javascript
var a = 0;
var b = 1;
a = new Boolean(a);     // 返回true
b = new Boolean(b);     // 返回false
var c = !!1;
alert(typeof a);        // 返回object
alert(typeof c);        // 返回boolean
```
:::

#### 加法运算
```javascript
// NaN与任何值相加都返回NaN
// Infinity(无穷大)        
// -Infinity (负无穷大 )
// (-Infinity)+Infinity = NaN;      负无穷大和正无穷大相加返回NaN
```

#### 减法运算
```javascript
// 特殊
```

