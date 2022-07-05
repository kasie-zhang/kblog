---
title: SpringBoot 整合持久层技术
date: 2020-07-31
cover: /img/cover/13.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- 数据库
- Java
- 后端
publish: true
permalink: /article/13
---

> 第 13 篇文章
<!-- more -->

## 1.整合jdbcTemplate
### 1.1 创建数据库和表
![](/img/2020/persistance_layer_1.png)

### 1.2 创建SpringBoot项目
项目中添加以下依赖：
```xml
<dependencies>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.19</version>
</dependency>
</dependencies>
```
### 1.3 数据库配置
在application.properties中配置数据库的连接信息，代码如下：
```java 
spring.datasource.type = com.alibaba.druid.pool.DruidDataSource
spring.datasource.url=jdbc:mysql:///book?serverTimezone=GMT%2B8
spring.datasource.username=root
spring.datasource.password=1234
```

### 1.4 创建实体类
创建Book实体类，代码如下：
```java 
public class Book {
    private Integer id;
    private String name;
    private String author;
    public void setName(String _name) {
        name = _name;
    }
    public void setAuthor(String _author) {
        author = _author;
    }
    public void setId(Integer _id) {
        id = _id;
    }
    public String getName() {
        return name;
    }
    public String getAuthor() {
        return author;
    }
    public Integer getId() {
        return id;
    }
}
```
### 1.5创建数据库访问层

创建BookDao，代码如下：
```java
@Repository
public class BookDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    // 增加书籍
    public int addBook(Book book) {
        return jdbcTemplate.update("INSERT INTO book(name,author) VALUES (?,?)",
                book.getName(), book.getAuthor());
    }

    // 更新书籍信息
    public int updateBook(Book book) {
        return jdbcTemplate.update("UPDATE book SET name=?,author=? WHERE id=?",
                book.getName(), book.getAuthor(), book.getId());
    }

    // 根据id删除书籍记录
    public int deleteBookById(Integer id) {
        return jdbcTemplate.update("DELETE FROM book WHERE id=?", id);
    }

    public Book getBookById(Integer id) {
        return jdbcTemplate.queryForObject("SELECT * FROM book WHERE id = ?",
                new BeanPropertyRowMapper<>(Book.class), id);
    }

    public List<Book> getAllBooks(){
        return jdbcTemplate.query("SELECT * FROM book", new BeanPropertyRowMapper<>(Book.class));
    }

}
```
:::tip 提示
在jdbcTemplate中，增删改主要使用update 和 batchUpdate方法来完成。

query 和 queryForObject方法主要用来完成查询操作。

excute方法用来执行任意的SQL,call方法用来调用存储过程
:::
::: theorem BeanPropertyRowMapper
在执行查询操作时，需要有一个RowMapper将查询出来的列与实体类中的属性一一对应，
如果列名和属性名都是相同的，那么可以直接使用**BeanPropertyRowMapper**;

如果列名和属性名不同，就需要开发者自己实现RowMapper接口，将列和实体类属性一一对应。

::: right
来自 [博客分享](https://www.jianshu.com/p/5cad506fad94)
:::
### 1.6 创建Service和Controller
#### 1.6.1 创建BookService
代码如下：
```java 
@Service
public class BookService {
    @Autowired
    BookDao bookDao;

    public int addBook(Book book) {
        return bookDao.addBook(book);
    }

    public int updateBook(Book book) {
        return bookDao.updateBook(book);
    }

    public int deleteBookById(Integer id) {
        return bookDao.deleteBookById(id);
    }

    public Book getBookById(Integer id) {
        return bookDao.getBookById(id);
    }
    public List<Book> getAllBooks(){
        return bookDao.getAllBooks();
    }
}
```
#### 1.6.2 创建BookController
代码如下：
```java 
@RestController
public class BookController {
    @Autowired
    BookService bookService;
    @GetMapping("/bookOps")
    public void bookOps(){
        Book b1 = new Book();
        b1.setName("插入一本书的名称");
        b1.setAuthor("插入作者名称");
        int i = bookService.addBook(b1);
        System.out.println("addBook>>>" + i);

        Book b2 = new Book();
        b2.setId(1);
        b2.setName("啦啦啦");
        b2.setAuthor("wuuwuwwu");
        int updateBook = bookService.updateBook(b2);
        System.out.println("updateBook>>>" + updateBook);

        Book book3 = bookService.getBookById(1);
        System.out.println("getBookById>>>" + book3);

        int delete = bookService.deleteBookById(2);
        System.out.println("deleteBookById" + delete);
        List<Book> allBooks = bookService.getAllBooks();
        System.out.println("getAllBooks" + allBooks);
    }
}
```
执行之前数据库的数据信息:

![](/img/2020/persistance_layer_2.png)

执行之后数据库的数据信息:

![](/img/2020/persistance_layer_3.png)

:::details 结果分析
原始数据库：

|   id   |    name  |author|
| ---- | ---- | ----|
| 1 | 朝花夕拾 | 鲁迅 |
| 2 | 三国演义 | 罗贯中 |
| 3 | 西厢记 | 王实甫 |

1. 执行插入操作：

|   id   |    name  |author|
| ---- | ---- | ----|
| 1 | 朝花夕拾 | 鲁迅 |
| 2 | 三国演义 | 罗贯中 |
| 3 | 西厢记 | 王实甫 |
| 4 | 插入一本书的名称 | 插入作者名称 |

2. 更新记录中ID为1的信息

|   id   |    name  |author|
| ---- | ---- | ----|
| 1 | 啦啦啦 | wuuwuwwu |
| 2 | 三国演义 | 罗贯中 |
| 3 | 西厢记 | 王实甫 |
| 4 | 插入一本书的名称 | 插入作者名称 |

3. 输出ID为1的书籍的信息，不改变数据信息

4. 删除ID为2的记录，得到**最终结果**

|   id   |    name  |author|
| ---- | ---- | ----|
| 1 | 啦啦啦 | wuuwuwwu |
| 3 | 西厢记 | 王实甫 |
| 4 | 插入一本书的名称 | 插入作者名称 |
:::

## 2.整合[Mybatis](https://mybatis.org/mybatis-3/zh/index.html)

MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

### 2.1 创建项目
创建SpringBoot项目，添加MyBatis依赖，数据库驱动依赖以及数据库连接池依赖，代码如下：
```xml
<dependencies>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.19</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>1.3.2</version>
</dependency>
</dependencies>
```
### 2.2 创建数据库、表、实体类等
数据库、表、实体类以及application.properties中的配置与上一节中的一样，不在重复配置

### 2.3 创建数据库访问层
在项目的根包下创建一个子包Mapper，在Mapper中创建BookMapper，代码如下:
```java 
@Mapper
public interface BookMapper {
    int addBook(Book book);

    int deleteBookById(Integer id);

    int updateBook(Book book);

    Book getBookById(Integer id);

    List<Book> getAllBooks();
}
```
### 2.4 创建BookMapper.xml
在Mapper目录下创建BookMapper.xml文件，代码如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zk.chapter02.Mapper.BookMapper">
    <insert id="addBook" parameterType="com.zk.chapter02.Bean.Book">
        INSERT INTO book(name, author)
        VALUES (#{name}, #{author})
    </insert>
    <delete id="deleteBookById" parameterType="int">
        DELETE
        FROM book
        WHERE id = #{id}
    </delete>
    <update id="updateBookById" parameterType="com.zk.chapter02.Bean.Book">
        UPDATE book
        set name=#{name},
            author=#{author}
        WHERE id = #{id}
    </update>
    <select id="getBookById" parameterType="int" resultType="com.zk.chapter02.Bean.Book">
        SELECT *
        FROM book
        WHERE id = #{id}
    </select>
    <select id="getAllBooks" resultType="com.zk.chapter02.Bean.Book">
        SELECT * FROM book
    </select>
</mapper>

```
:::tip 说明
针对BookMapper接口中的每一个方法，BookMapper.xml都列出了相应的实现
|修饰符|作用|
| :----: | :---- |
|namespace|映射当前的Mapper接口，所有的增删改查的参数和返回值类型，就可以直接填写缩写，不区分大小写，直接通过方法名去找类型|
| id | 为提取的SQL代码，取一个id，起标识作用 |
| parameterType | 声明输入参数的类型 ，应该填写pojo的全路径[^1]|
| resultType | 声明输出结果的类型，应该填写pojo的全路径 |
|#{}|输入参数的占位符，相当于jdbc的？ |
|${}|字符串拼接|

<div  style="text-align:right">
<a  href="https://blog.csdn.net/qq_42780864/article/details/88055480" target="_blank" >参考博客</a>
</div>
&nbsp;
:::

### 2.5 在pom.xml中包含BookMapper.xml文件
添加以下代码：
```xml
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>com/zk/chapter02/Mapper/BookMapper.xml</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
</build>
```

### 2.5 创建Service和Controller
BookService.java
```java 
@Service
public class BookService {
    @Autowired
    BookMapper bookMapper;

    public int addBook(Book book) {
        return bookMapper.addBook(book);
    }

    public int updateBook(Book book) {
        return bookMapper.updateBookById(book);
    }

    public int deleteBookById(Integer id) {
        return bookMapper.deleteBookById(id);
    }

    public Book getBookById(Integer id) {
        return bookMapper.getBookById(id);
    }

    public List<Book> getAllBooks()
    {
        return bookMapper.getAllBooks();
    }

}
```

BookController.java
```java 
@RestController
public class BookController {
    @Autowired
    BookService bookService;
    @GetMapping("/booksOp")
    public void booksOp() {
        // 添加书籍记录
        Book b1 = new Book();
        b1.setId(4);
        b1.setName("朝花夕拾");
        b1.setAuthor("鲁迅");
        bookService.addBook(b1);

        // 通过ID更新书籍记录
        Book b2 = new Book();
        b2.setId(1);
        b2.setName("呐喊");
        b2.setAuthor("鲁迅");
        bookService.updateBook(b2);

        // 返回ID为1的记录
        Book b3 = bookService.getBookById(1);

        // 删除ID为2的记录
        bookService.deleteBookById(2);

        // 返回所有书籍信息
        List<Book> allBooks = bookService.getAllBooks();
        System.out.println(allBooks);
    }
}
```

### 2.6 测试使用效果
测试前数据库截图：

![](/img/2020/persistance_layer_4.png)

测试后数据库截图：

![](/img/2020/persistance_layer_5.png)

测试成功！ :rainbow: :rainbow:

### 2.7 使用感悟
mybatis最值得使用的地方就在于可以通过简单的XML注解来配置和映射原始类型；原本使用jdbc-template需要创建
Dao实现数据库的一些操作。

使用mybatis的步骤(以book为例)：

1.首先定义实体类 Book.java

2. 定义BookMapper.java 只需要定义，不需要实现其中的方法

3. 创建BookMapper.xml文件，可以在resources文件夹下创建； 或者在src.main.java.com.zk.chaptor02.Mapper文件夹下创建,
此时需要在pom.xml中将BookMapper.xml文件引入使用

4. 创建BookService.java 定义数据库的相关操作，使用BootMapper来实现

5. 创建BookController.java 定义网页路由和相关操作，调用BookService来实现操作




[^1]:例如 parameterType="com.zk.chapter02.Bean.Book"  表示函数输入的数据类型是Book类型
