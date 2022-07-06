---
title: Vue快速入门
cover: https://api.zk123.top/link/repo1/img/cover/4.webp
date: 2019-04-23
sidebar: 'auto'
categories:
- 笔记
tags:
- Vue
- 前端
publish: true
permalink: /article/4
---

> 第 4 篇文章
<!-- more -->

## for, forEach, for in, for of的区别

### for
:::tip  代码式
```javascript
let arr = [3, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```
输出：
    
    3,2,3,4,5
    
:::
### forEach
:::tip 声明式,不支持**return
```javascript
let arr=[3,2,3,4,5];
arr.forEach(function (item) {                
    console.log(item);   
})
```
输出：

    3、2、3、4、5
    
:::
### for in
:::tip   将key转化成string类型，能够输出数组的私有属性
```javascript
let arr = [3, 2, 3, 4, 5];
arr.b='b';                  // 私有成员
for (let key in arr) {
    console.log(arr[key]);
}
```
输出：

    3,2,3,4,5,b
:::

### for of
:::tip  支持return，返回值是数组，不能遍历对象
```javascript
let arr = [3, 2, 3, 4, 5];
for(let a2 of arr){
    console.log(a2);
}

let obj = {name:'zk', age:'19'};         // Object.keys 将对象的key作为新的数组
for (let val of Object.keys(obj)) {
    console.log(obj[val]);
}
```
输出：
        
        3,2,3,4,5    
        zk,19
:::

## filter   (过滤)
效果：删除

返回值：过滤后的新数组

回调函数返回true，表示这一项放到新的数组中

:::tip 返回一个符合条件的新数组
```javascript
let newArry=[1,2,3,4,5,6].filter(function (item) {
    return item<5&&item>2;
})
console.log(newArry);
```
输出：

    [ 3, 4 ]
:::

## map (映射)
效果：更新

返回值：映射后的新数组

回调函数中返回什么这一项就是什么
:::tip 返回li标签包裹着的数据
```javascript
let arr1 = [1,2,3].map(function (item) {
    //return item*2;                   //  [2,4,6]
    return `<li>${item}</li>`
    // ${} 大括号中包裹变量
    // ``  模板字符串
})
console.log(arr1.join(''));
```
输出：
    
    [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]
:::

## includes
:::tip 判断数组是否包含
返回值：布尔型
```javascript
let arry = [1,22,3];
console.log(arry.includes(2));
```
输出：

    false
:::

## find
:::tip 返回找到的那一项
返回值：回调函数返回bool，表示寻找状态； 找到后停止循环
```javascript
let arr = ['a','b','asd'];
let result=arr.find(function (item,index) {
    return item.toString().indexOf('a')>-1;
})
console.log(result);    // 找不到返回undefined
```
结果：
    
    a
:::

## some && every
:::tip 
some 寻找true，找到true后停止，返回true
every 寻找false， 找到false后停止， 返回false
:::


