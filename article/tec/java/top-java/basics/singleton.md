---
title: 类和对象的单例模式
date: 2020-09-23
cover: /img/cover/30.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Java 基础
publish: true
permalink: /30
---

> 第 30 篇文章
<!-- more -->

## 类和对象的单例模式

### 饿汉式单例模式

- GiantDragon.java

```java
package com.company;

public class GiantDragon {
    // 私有化构造方法
    private GiantDragon() {
    }
    // 准备一个类属性，指向实例化对象。 因为是类属性，所以只有一个
    private static GiantDragon instance = new GiantDragon();

    // 提供调用者获取类属性
    public static GiantDragon getInstance() {
        return instance;
    }

}
```

- testGiantDragon

```java
package com.company;

public class testGiantDragon {
    public static void main(String[] args) {
        //GiantDragon g = new GiantDragon();

        GiantDragon ins1 = GiantDragon.getInstance();
        GiantDragon ins2 = GiantDragon.getInstance();
        GiantDragon ins3 = GiantDragon.getInstance();
        System.out.println(ins1 == ins2);
        System.out.println(ins2 == ins3);
    }
}

// output : true true
```

### 懒汉式单例模式

与 饿汉式 单例模式不同，只有在调用 getInstance 时，才会创建实例。

GiantDragon.java

```java
package com.company;

public class GiantDragon {
    // 私有化构造方法
    private GiantDragon() {
    }
    // 准备一个类属性，指向实例化对象。 因为是类属性，所以只有一个
    private static GiantDragon instance = new GiantDragon();

    public static GiantDragon getInstance() {
        if (null == instance) {
            instance = new GiantDragon();
        }
        return instance;
    }
}
```

- testGiantDragon

```java
package com.company;

public class testGiantDragon {
    public static void main(String[] args) {
        //GiantDragon g = new GiantDragon();

        GiantDragon ins1 = GiantDragon.getInstance();
        GiantDragon ins2 = GiantDragon.getInstance();
        GiantDragon ins3 = GiantDragon.getInstance();
        System.out.println(ins1 == ins2);
        System.out.println(ins2 == ins3);
    }
}

// output: true true
```

## 什么使用饿汉式，什么时候使用懒汉式？

**饿汉式**是立即加载的方式，无论是否会用到这个对象，都会加载。

如果在构造方法里写了性能消耗较大，占时较久的代码，比如建立与数据库的连接，那么就会在启动的时候感觉稍微有些卡顿。

**懒汉式**，是延迟加载的方式，只有使用的时候才会加载。

使用懒汉式，在启动的时候，会感觉到比饿汉式略快，因为并没有做对象的实例化。 但是在第一次调用的时候，会进行实例化操作，感觉上就略慢。

看业务需求，如果业务上允许有比较充分的启动和初始化时间，就使用饿汉式，否则就使用懒汉式

## 单例模式三元素

- 构造方法私有化
- 静态属性指向实例
- public static 的getInstance方法，返回第二步的静态属性

