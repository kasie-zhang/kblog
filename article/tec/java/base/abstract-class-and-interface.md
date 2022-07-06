---
title: 【Java基础】探究抽象类和接口
date: 2022-04-17
cover: https://api.zk123.top/link/repo1/img/cover/118.webp
sidebar: 'auto'
categories:
- Java
tags:
- Java 基础
publish: true
permalink: /article/118
---

> 第 118 篇文章
<!-- more -->

## 类

### 类的结构

一个完整的Java类通常有以下几个部分：

**1.包定义**

形如 `package top.zk123.api.utils;`

包是类、接口或其他包的集合。借助包，能够形成具有层次的命名空间，缩小了名称冲突的范围，易于名称管理。

每一名Java程序员都可以编写属于自己的Java包，为了保障每个Java包的唯一性，在最新的Java编程规范中，要求程序员在自己定义的包名称之前加上唯一的前缀。由于域名是不会重复的，所以程序员一般采用自己在互联网上的域名作为自己程序包的唯一前缀。例如：`top.zk123.api`，包名应全部小写。

包的路径符合你系统模块的定义。希望你能养成按规则来命名。让人看了你的包名，就知道是什么模块。

对于一个Java源代码文件，如果存在public类的话，只能有一个public类，且此时源代码文件的名称必须和public类的名称完全相同，另外，如果还存在其他类，这些类在包外是不可见的

如果源代码文件没有public类，则源代码文件的名称可以随意命名。



**2.import**

为了能够使用某一个包的成员，我们需要在Java程序中明确导入该包。

如：`import top.zk123.api.utils.*;`
Java 编译器默认为所有 Java 程序引入了 JDK 中 `java.lang` 包中所有的类（`import java.lang.*;`）其中定义了一些常用类：System、String、Object、Math等，因此我们可以直接使用这些类，而不必显式引入。



**3.类定义**

Java 对类中定义的各种属性和方法进行控制，即规定不同的保护等级来限制对它们的使用。Java 引入类似访问控制机制的目的在于实现**信息的封装和隐藏**。Java 语言对类中的属性和方法进行有效地访问控制，将它们分为四个等级：private、无修饰符、protected、public，具体规则如下：

**属性和方法**可以是四个访问级别中的任意一个。

**类**只能是 public 或 default（无修饰级别）级别中的一个。

| 访问权限修饰符      | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| private             | 被其修饰的属性以及方法只能**被该类的对象访问**。子类不能访问，跟不能跨包访问 |
| default（通常省略） | 通常称为“默认访问权限”或“包访问权限“。只允许在**同一个包中进行访问** |
| protected           | 被其修饰的属性和方法只能**被类本身的方法及子类访问**，<br />即使子类在不同的包中也可以访问 |
| public              | 被其修饰的类、属性、方法不仅可以**跨类访问**，且允许**跨包访问** |



**4.类的内部结构**

- **成员变量**：事物属性的描述
- **方法**：事物的行为
- **构造方法**：用于创建对象
- **内部类**：即在类体中声明类
- **代码块**：一块没有名称的代码块

**成员变量（类的属性）**

`修饰符 类型 变量名 = 值;`

- 成员变量直接被类包含。
- 可以使用 Java 语言中的任何一种数据类型。
- 在定义变量时可以对它进行初始化（一开始赋值）初始化的值会随创建对象时一起被拿走（不建议）。如果不对其初始化，在创建对象时，调用构造方法使用该类型的缺省值对其赋值。
- 成员变量在创建对象时会从类中复制一份到对象中。

- 成员变量的作用范围在整个类当中。
- 成员变量的声明周期：对象创建时出现，对象结束时变量也就销毁了。



**构造方法（用于创建对象）**

- 构造方法名要和类名相同，且没有返回值，也不需要 void 修饰。
- 在创建一个对象时，至少要调用一个构造方法。
- 每个类都有自己的构造方法，如果没有显式的定义构造方法，Java 会为该类提供一个默认的构造方法，但是只要在一个 Java 类中定义一个构造方法后，默认的无参构造就会失效。
- 一个类可以拥有多个构造方法，使用形参做区别。



**代码块**

代码块分构造代码块和静态代码块。

**构造代码块：每次创建对象时自动调用，编译后会被编译器加入到各个构造函数的头部。**

```java
{
    // 构造代码块
}
```

**静态代码块：类加载的时候调用，仅调用一次，与是否创建对象无关。**

```java
static {
    // 实例代码块
}
```

注意事项：

- Java 编译器编译一个 Java 源文件时，会把成员变量的声明语句提前至该类的最前端。
- 成员变量的初始化工作其实都在构造函数中执行。
- 一旦经过 Java 编译器编译后，构造代码块中的代码会被移动到构造函数中的顶部，是在构造函数之前执行的。



举个例子：

我们定义一个 Dog 类，然后编译。

```java
package top.zk123.api.util;

public class Dog {
    String name;

    {
        System.out.println("构造代码块1");
    }

    static {
        System.out.println("静态代码块1");
    }

    public Dog() {
        System.out.println("Dog 无参实例化");
    }

    public Dog(String name) {
        this.name = name;
    }

    {
        System.out.println("构造代码块2");
    }

    int age;


    public static void main(String[] args) {
        Dog a = new Dog();
    }

}
```

查看编译后的 Dog.class 文件。 可以看到，构造代码块中的内容被编译器分别加入到了各个构造函数的头部。

这就是构造代码块的作用：给所有对象进行统一的初始化。构造函数只是给特定的对象进行初始化。底层原理是编译器帮你把构造代码块中的代码拷贝到所有构造函数的头部，省得你一个个添加。

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package top.zk123.api.util;

public class Dog {
    String name;
    int age;

    public Dog() {
        System.out.println("构造代码块1");
        System.out.println("构造代码块2");
        System.out.println("Dog 无参实例化");
    }

    public Dog(String var1) {
        System.out.println("构造代码块1");
        System.out.println("构造代码块2");
        this.name = var1;
    }

    public static void main(String[] var0) {
        new Dog();
    }

    static {
        System.out.println("静态代码块1");
    }
}
```



## Java对象创建过程

只有一个子类继承一个父类时，new 子类对象时其初始化顺序为：

1. 父类静态属性初始化（静态变量、静态代码块，无先后顺序，按代码顺序执行初始化）
2. 子类静态属性初始化（静态变量、静态代码块，无先后顺序，按代码顺序执行初始化）
3. 父类普通成员变量初始化（先初始零值再显式赋值）
4. 父类构造代码执行
5. 父类构造方法执行
6. 子类普通成员变量初始化（先初始零值再显式赋值）
7. 子类构造代码块执行
8. 子类构造方法执行

精炼概括下就是：

- **主类的超类由高到低按顺序初始化静态成员（静态变量、静态代码块，无先后顺序，按照代码顺序执行初始化）**
- **主类静态成员的初始化**
- **主类的超类由高到低进行默认构造方法的调用（即构造代码块+构造方法）。注意，在调用每个超类默认构造方法之前，先进行对此超类进行非静态成员的初始化**
- **主类非静态成员的初始化**
- **调用主类的构造方法（即构造代码块+构造方法）**



**总结对象创建的过程：**

1. 首次创建对象时，类中的静态方法/静态字段首次被访问时，Java 解释器必须先查找类路径，以定位 .class 文件。

2. 然后载入 .class（这将创建一个 class 对象），有关静态初始化的所有动作都会执行。因此，静态初始化只会在Class对象首次加载的时候进行一次！

3. 当用 new 创建对象时，首先在堆上为对象分配足够的存储空间。
4. 这块存储空间会被清0，这就自动的将对象中的所有基本类型数据都设置成了缺省值，而引用则被设置成了 null。

5. 然后进行非静态对象的初始化。

6. 然后执行构造器（执行构造代码块+构造方法）



举个例子：

普通类 BlackHorse 继承自抽象类 Horse，抽象类 Horse 继承自抽象类 Animal。

```java
package top.zk123.api.util;

abstract class Animal {
    static int animal = 1;

    static {
        System.out.println("Abstract Animal 静态代码块");
    }

    {
        System.out.println("Abstract Horse 构造代码块");
    }

    Animal() {
        System.out.println("Abstract Animal 无参构造器");
    }

    Animal(int a) {
        System.out.println("Abstract Animal 有参构造器");
    }
}

abstract class Horse extends Animal {
    static int horse = 1;

    static {
        System.out.println("Abstract Horse 静态代码块");
    }

    {
        System.out.println("Abstract Horse 构造代码块");
    }

    Horse() {
        System.out.println("Horse 无参构造器");
    }

    Horse(int a) {
        super(1);
        System.out.println("Horse 有参构造器");
    }
}


public class BlackHorse extends Horse {
    static int blackHorse = 1;

    static {
        System.out.println("BlackHorse 静态代码块");
    }

    {
        System.out.println("BlackHorse 构造代码块");
    }

    BlackHorse() {
        System.out.println("BlackHorse 无参构造器");
    }

    BlackHorse(int a) {
        super(2);
        System.out.println("BlackHorse 有参构造器");
    }

    public static void main(String[] args) {
        BlackHorse horse1 = new BlackHorse();
    }
}

/*
Abstract Animal 静态代码块
Abstract Horse 静态代码块
BlackHorse 静态代码块
Abstract Horse 构造代码块
Abstract Animal 无参构造器
Abstract Horse 构造代码块
Horse 无参构造器
BlackHorse 构造代码块
BlackHorse 无参构造器
*/
```

一道笔试题：

```java
public class Test_A {
    public static void main(String[] args) {
        new B();//1
    }
}

class A {

    private Integer n = 20;//3

    public A() {
        say();//4  //此处调用的是子类的重写方法
    }

    void say() {
        System.out.println(n);
    }
}

class B extends A {

    private Integer n = 10;//6

    public B() { //隐式super() //2
        say();//7
    }

    void say() {
        System.out.println(n);//5 //8
    }
}
/*
null
10
*/
```



## 抽象类

**什么是抽象类？**

本质上是一个类，由Abstract关键字修饰，抽象类种的抽象方法只有声明，没有实现。

抽象类是对类的抽象，是一种模板设计。

抽象类主要用于当作基础类使用，即基类。如果想要拥有一些方法，并且这些方法有默认实现，那么使用抽象类。



**为什么要设计抽象类，有啥大的贡献？**

首先，抽象类的出现是为了捕捉子类的通用特性，进行一个封装，从而减少编程过程中的工作量 。

举个例子：dog，cat，cow都继承自普通类 Animal，Animal类种有Run方法。由于Animal父类中已经实现了Run方法，所以dog，cat，cow在继承Animal类时，都要重写Run方法体，Animal类中Run方法的方法体现在是冗余的。这时候，JDK说了，既然这么多类需要继承他，我直接不实现这个方法，你们谁用谁实现好了。这就是抽象类存在的意义！而且，父类不是先这个方法后，子类就要强制实现这个方法，否则无法编译，这也一定程度上确保了系统出错的风险。

说的官方点，就是抽象类可以将**设计和实现分离**，你设计你的抽象类，我写我的实现方法。这也就是为什么说抽象方法必须被继承才有意义！



总结一下：

- **有抽象方法的必然是抽象类**
- **抽象类不可以被实例化**
- **抽象类可以包含属性、方法、构造方法，但是构造方法不能用来new实例，只能被子类调用**
- **抽象类只能用来继承**
- **抽象类的抽象方法必须被子类继承**



**抽象类的特性：**

1. 抽象类用来**捕捉子类的通用特性**，是对大多数看上去不同，可是本质上却是相同的具体概念的抽象。
2. 抽象类不能被初始化，只能被继承。
3. 包含抽象方法的一定是抽象类，但抽象类不一定包含抽象方法。
4. 抽象方法的修饰只能是Public（默认）或protected
5. 若子类实现了父类（抽象类）的所有抽象方法，那么该子类可以不必是抽象类，否则就是抽象类。



**抽象类构造方法的作用：**

抽象类不能构建实例，那么抽象类中的构造方法有什么用呢？

1. 首先，抽象类是一个特殊的类，Java 规定类都要有一个构造方法，如果没有，则默认提供一个空参构造。

2. 抽象类中的构造方法不是用来实例化的，而是用来**给属性赋初始化值**的，抽象类可以定义变量，那么就需要构造方法给变量赋值。这里就可以理解接口中的属性必须是常量（public static final）了（接口根本没有构造方法）。
3. 抽象方法需要被子类继承，子类的构造方法中会隐式使用 super() 来调用父类的构造方法。所以如果抽象类没有构造方法，那就无法被子类继承。



## 接口

接口是对行为的抽象，是一种行为的规范。

接口是抽象方法的合集。

接口主要用于模块与模块之间的调用。主要用接口来实现多继承。

接口是特殊的抽象类，没有构造方法，所有属性都是常量，所有方法都是抽象方法。

实现接口的类叫做实现类，实现类如果是普通类必须重写接口中所有的抽象方法，否则实现类是一个抽象类。