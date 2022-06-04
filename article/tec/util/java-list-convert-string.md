---
title: Java List 和 String 相互转化
date: 2020-11-02
cover: /img/cover/38.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Java
- Util
publish: true
permalink: /38
---

> 第 38 篇文章
<!-- more -->

## 前言
数据结构如此之多，各种格式之间的转换必不可少，在此记录一下用到过的格式转化！

## StringToList
```java
    public static List<String> StringToList(String str) {
        List<String> list = new ArrayList<String>();
        String[] s = str.split(",");
        Collections.addAll(list, s);
        return list;
    }
```

## ListToString
```java
    public static String ListToString(List<String> list) {
        String[] s1 = (String[]) list.toArray(new String[0]);
        return String.join(",", s1);
    }
```

