---
title: SpringBoot MyBatis
date: 2020-11-20
cover: https://api.zk123.top/link/repo1/img/cover/43.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- MyBatis
- Java
- 后端
publish: true
permalink: /article/43
---

> 第 43 篇文章
<!-- more -->

MyBatis 是一款优秀的持久层框架，支持`定制化SQL、存储过程、高级映射`。

避免了几乎所有JDBC代码和手动设置参数以及获取结果集。

可以使用简单的XML注解来进行配置和映射原生信息。

将接口和Java的 POJO（plain Old Java Object，普通的Java对象）映射成数据库中的记录。

可以手写SQL，更加灵活； 更容易上手；手写的SQL更容易优化.

[MyBatis详细教程](http://c.biancheng.net/view/4302.html)

## MyBatis 工作原理
![](http://c.biancheng.net/uploads/allimg/190704/5-1ZF4130T31N.png)

1）读取 MyBatis 配置文件：mybatis-config.xml 为 MyBatis 的全局配置文件，配置了 MyBatis 的运行环境等信息，例如数据库连接信息。

2）加载映射文件。映射文件即 SQL 映射文件，该文件中配置了操作数据库的 SQL 语句，需要在 MyBatis 配置文件 mybatis-config.xml 中加载。mybatis-config.xml 文件可以加载多个映射文件，每个文件对应数据库中的一张表。

3）构造会话工厂：通过 MyBatis 的环境等配置信息构建会话工厂 SqlSessionFactory。

4）创建会话对象：由会话工厂创建 SqlSession 对象，该对象中包含了执行 SQL 语句的所有方法。

5）Executor 执行器：MyBatis 底层定义了一个 Executor 接口来操作数据库，它将根据 SqlSession 传递的参数动态地生成需要执行的 SQL 语句，同时负责查询缓存的维护。

6）MappedStatement 对象：在 Executor 接口的执行方法中有一个 MappedStatement 类型的参数，该参数是对映射信息的封装，用于存储要映射的 SQL 语句的 id、参数等信息。

7）输入参数映射：输入参数类型可以是 Map、List 等集合类型，也可以是基本数据类型和 POJO 类型。输入参数映射过程类似于 JDBC 对 preparedStatement 对象设置参数的过程。

8）输出结果映射：输出结果类型可以是 Map、 List 等集合类型，也可以是基本数据类型和 POJO 类型。输出结果映射过程类似于 JDBC 对结果集的解析过程。

## MyBatis 依赖配置
```md
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.20</version>
    <scope>runtime</scope>
</dependency>
```

## 配置文件
Mybatis中的XML分为两类，一类是基础配置文件，通常只有一个，主要是配置一些最基本的上下文参数和运行环境，
另一类是映射文件，可以配置映射关系、SQL、参数等信息。

### mybatis-config.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <typeAliases><!--别名-->
        <typeAlias alias="user" type="com.mybatis.po.User"/>
    </typeAliases>
    <!-- 数据库环境 -->
    <environments default="development">
        <environment id="development">
            <!-- 使用JDBC的事务管理 -->
            <transactionManager type="JDBC" />
            <dataSource type="POOLED">
                <!-- MySQL数据库驱动 -->
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <!-- 连接数据库的URL -->
                <property name="url"
                          value="jdbc:mysql://localhost:3306/mybatis?characterEncoding=utf8" />
                <property name="username" value="root" />
                <property name="password" value="1128" />
            </dataSource>
        </environment>
    </environments>
    <!-- 将mapper文件加入到配置文件中 -->
    <mappers>
        <mapper resource="com/mybatis/mapper/UserMapper.xml" />
    </mappers>
</configuration>
```

- typeAlias (类型别名) 定义了一个别名为user,他代表 com.mybatis.po.User 这个类。这样定义后，在MyBatis上下文中就可以使用别名去替代全称了。

- environment (元素的定义，指数据库) 其中的 \<transactionManager> 元素是配置事务管理器，这里采用JDBC方法。

- dataSource (元素配置数据库) type = POOLED 代表采用MyBatis 内部提供的连接池方式，最后定义数据库连接的相关配置

- mapper 代表引入的那些映射器。

## 创建 SqlSessionFactory
使用 mybatis-config.xml

生成SqlSessionFactory

```java 
SqlSessionFactory factory = null;
String resource = "mybatis-config.xml";
InputStream is;
try {
    InputStream is = Resources.getResourceAsStream(resource);
    factory = new SqlSessionFactoryBuilder().build(is);
} catch (IOException e) {
    e.printStackTrace();
}
```

首先读取 mybatis-config.xml，然后通过SqlSessionFactoryBuilder的Builder方法创建SqlSessionFactory.

## SqlSession
在 MyBatis 中，SqlSession 是其核心接口。在 MyBatis 中有两个实现类，DefaultSqlSession 和 SqlSessionManager。

DefaultSqlSession 是单线程使用的，而 SqlSessionManager 在多线程环境下使用。SqlSession 的作用类似于一个 JDBC 中的 Connection 对象，代表着一个连接资源的启用。具体而言，它的作用有 3 个：
- 获取Mapper接口
- 发送SQL给数据库
- 控制数据库事务

### 创建SqlSession
有了SqlSessionFactory 创建 SqlSession 就非常方便了。

```java 
// 定义SqlSession
SqlSession sqlSession = SqlSessionFactory.openSession();=
try {
    // 打开 SqlSession 会话
    sqlSession = SqlSessionFactory.openSession();
    // some code...
    sqlSession.commit();    // 提交事务
} catch (IOException e) {
    sqlSession.rollback();  // 回滚事务
}finally{
    // 在 finally 语句中确保资源被顺利关闭
    if(sqlSession != null){
        sqlSession.close();
    }
}
```
使用commit方法提交事务，或者使用rollback 方法回滚事务。 因为它代表着一个数据库的连接资源，使用
后要及时关闭它，如果不关闭，那么数据库的连接资源很快就被耗费光，整个系统会陷入瘫痪，所以要使用finally语句保证其顺利关闭。


## 映射器
映射器是 MyBatis 中最重要、最复杂的组件，它由一个接口和对应的 XML 文件（或注解）组成。它可以配置以下内容：
- 描述映射规则
- 提供SQL语句，并可以配置SQL类型参数，返回类型、刷新缓存等
- 配置缓存
- 提供动态SQL

映射器的主要作用就是将SQL查询到的结果映射为一个POJO， 或者将POJO的数据插入到数据库中，并定义一些关于缓存的重要内容。

注意： 开发的只是一个接口，并不是实现一个类。MyBatis运用了动态代理技术使得接口能够运行。


现在有一张表 user, 有对应的POJO类
### XML实现映射器
使用XML定义映射器分为两部分： 接口和 XML。

先定义一个映射器接口：

```java
public interface UserMapper {
    public User getUser(String phoneNumber);
}
```

再定义实现该接口功能的XML文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zk.demo.Mapper.Interface.UserMapper">
    <select id="getUser" parameterType="String" resultType="User">
        SELECT * from user where phone_number = #{phoneNumber}
    </select>
</mapper>
```

XML文件定义完成后，需要在 mybatis-config.xml 文件中声明:

```xml
<mappers>
    <mapper resource="com/zk/demo/Mapper/XML/UserMapper.xml" />
</mappers>
```

有了这两个文件，就完成了一个映射器的定义。
- mapper 元素中的属性 namespace 所对应的是一个接口的全限定名，MyBatis上下文可以通过它找到对应接口
- select 表明这是一个查询语句
    - id: 标识这条SQL语句
    - parameterType 传入SQL语句的变量的 类型 （String）
    - resultType  返回值类型 （User） User是mybatis-config.xml 配置的别名，只带的是Bean/User 这个类
- \#{phoneNumber} 表示传递进去的参数 
