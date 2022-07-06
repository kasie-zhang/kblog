---
title: SpringBoot 整合 NoSQL
date: 2020-08-02
cover: https://api.zk123.top/link/repo1/img/cover/16.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- NoSQL
- 后端
- 数据库
publish: true
permalink: /article/16
---

> 第 16 篇文章
<!-- more -->

::: theorem NoSQL
NoSQL，泛指**非关系型**的数据库。随着互联网web2.0网站的兴起，传统的关系数据库在处理web2.0
网站，特别是超大规模和高并发的SNS类型的web2.0纯动态网站已经显得力不从心，
出现了很多难以克服的问题，而非关系型的数据库则由于其本身的特点得到了非常迅速的发展。
NoSQL数据库的产生就是为了解决大规模数据集合多重数据种类带来的挑战，尤其是大数据应用难题。

非关系型数据库和关系型数据库存在许多显著的不同点，其中最重要的是NoSQL不使用SQL作为查询语言。
其数据库可以不需要固定的表格模式，一般都有水平可扩展性的特征。

NoSQL主要有以下几种不同的分类：

Key/Value键值存储。这种数据存储通常都是无数据结构，一般被当做字符串或者二进制数据，但是数据
加载速度非常快，典型的使用场景有：处理高并发，或者用于系统日志中。 典型数据库有：**Redis**。

列存储数据库。列存储数据库功能相对局限，但是查找速度快，容易进行分布式扩展，一般用于分布式文件系统
中，典型数据库有：**HBase**,**Cassandra**。

文档型数据库。 和Key/Value键值对存储类似，文档型数据库也没有严格的数据格式。 不需要预先创建表
结构，数据格式更加灵活，一般可用在Web应用中，典型数据库有：**MongoDB**

图形数据库。专注于构建关系图谱，例如社交网络，推荐系统等，典型数据库有：**Neo4J**,**DEX**
::: right
来自 [百度百科](https://baike.baidu.com/item/NoSQL/8828247?fr=aladdin)
:::

## 1. 整合Redis
### 1.1 Redis简介
Redis是使用C语言编写的基于内存的NoSQL数据库，它是目前最流行的键值对存储数据库，Redis由一个
Key,Value映射成字典构成，与其他NoSQL不同，Redis中Value的类型不局限于字符串，还支持列表、
集合、有序集合、散列等。

Redis不仅可以当做缓存使用，也可以配置数据持久化后当做NoSQL数据库使用，目前支持两种持久化方式：
快照持久化和AOF持久化[^1]。另一方面，Redis也可以搭建集群或者主从复制结构，在高并发环境下具有
高可用性。

### 1.2 Redis安装
Windows下安装Redis

下载地址1：[Github最新版](https://github.com/tporadowski/redis/releases)

本站提供[Redis-x64-5.0.9.zip](https://sherrykeeper.oss-cn-hangzhou.aliyuncs.com/Pakage/Redis-x64-5.0.9.zip)
版本。

下载完成后，将文件解压到C:\Redis

打开cmd，进入到C:\Redis,执行以下命令：
```bash 
redis-server.exe redis.windows.conf
```
![](https://api.zk123.top/link/repo1/img/2020/no_sql_1.png)

这时候另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了。

切换到 redis 目录下运行:
```bash 
redis-cli.exe -h 127.0.0.1 -p 6379
```
设置键值对：
```bash 
set myKey abc
```
取出键值对：
```bash 
get myKey
```
![](https://api.zk123.top/link/repo1/img/2020/no_sql_2.png)

### 1.3 配置Redis
```bash 
daemonize yes
requirepass 123456
protected-mode no
```

:::tip 配置解释：
第一行表示允许Redis在后台启动
第二表示登录该Redis实例需要密码
由于第二行设置了密码，所以第三行可以关闭保护模式了
:::


### 1.4 启动和关闭
#### 1.4.1
进入Redis安装目录，输入以下代码：
```bash 
redis-server.exe redis.windows.conf
```
![](https://api.zk123.top/link/repo1/img/2020/no_sql_3.png)
打开另一个cmd窗口，进入Redis安装目录，输入以下代码：
```bash 
redis-cli.exe -a 123456
```
其中 -a 表示Redis的登录密码
![](https://api.zk123.top/link/repo1/img/2020/no_sql_4.png)

至此，单机版Redis就安装并启动成功了。:rainbow: :rainbow:

一些常用命令：
```shell
keys *      用于查看当前数据库中所有的key

flushall    用于清除Redis 所有的key
```

### 1.5 整合SpringBoot
SpringBoot 借助Spring Data Redis为Redis提供了开箱急用的自动化配置，开发者只需要添加相关依赖并
配置Redis连接信息即可，整合步骤如下：
#### 1.5.1 创建SpringBoot项目
首先创建SpringBoot web项目，添加如下依赖：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
``` 

#### 1.5.2 配置Redis
在application.properties中配置Redis连接信息，代码如下：
```properties
# 使用的Redis库的编号，Redis提供了16个database，编号为0~15
spring.redis.database=0
# 本地局域网
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.password=123456
# Redis连接池的最大连接数
spring.redis.jedis.pool.max-active=8
# Redis连接池中最大空闲连接数
spring.redis.jedis.pool.max-idle=8
# Redis连接池的最大阻塞等待时间，默认为-1ms,表示没有限制
spring.redis.jedis.pool.max-wait=-1ms
# 连接池最小空闲连接数
spring.redis.jedis.pool.min-idle=0
```

#### 1.5.3 创建实体类
创建一个Book类，代码如下：
```java 
public class Book implements Serializable {
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
    public String getName() { return name; }
    public String getAuthor() { return author; }
    public Integer getId() {
        return id;
    }
}
```

创建Controller，代码如下:
```java 
@RestController
public class BookController {
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @GetMapping("/test1")
    public void test1() {
        ValueOperations<String, String> ops1 = stringRedisTemplate.opsForValue();
        ops1.set("name", "三国演义");
        String name = ops1.get("name");
        System.out.println(name);
        ValueOperations ops2 = redisTemplate.opsForValue();
        Book b1 = new Book();
        b1.setAuthor("曹雪芹");
        b1.setName("红楼梦");
        b1.setId(1);
        ops2.set("b1", b1);
        Book book = (Book) ops2.get("b1");
        assert book != null;
        System.out.println("author:" + book.getAuthor());
        System.out.println("ID:" + book.getId());
        System.out.println("Name:" + book.getName());
    }
}
```
:::details 代码解释
StringRedisTemplate是RedisTemplate的子类，StringRedisTemplate中的key和value都是
字符串，采用的序列化方案是StringRedisSerializer，而RedisTemplate则可以使用来操作对象，
RedisTemplate采用的序列化方案是JdkSerializer。无论是StringRedisTemplate还是RedisTemplate
，操作Redis的方法都是一致的

通过opsForValue、opsForZSet或者opsForSet方法先获取一个操作对象，再使用该操作对象完成
数据的读写。
:::
在浏览器中输入"http://localhost:8080/test1"，测试结果：

![](https://api.zk123.top/link/repo1/img/2020/no_sql_5.png)


## 2. 整合MongoDB
面向文档的数据库关系系统，介于关系型数据库和菲关系型数据库之间

### 2.1 创建SpringBoot工程
添加MongoDB依赖，代码如下：
```xml
<!--mongodb-->
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-mongodb</artifactId>
    <version>1.8.1.RELEASE</version>
</dependency>
```

### 2.2 在SpringBoot中配合MongoDB
在application.properties中配置MongoDB的连接信息,代码如下：
```java 
# 配置MongoDB
spring.data.mongodb.authentication-database=admin
spring.data.mongodb.database=test
spring.data.mongodb.host=127.0.0.1
spring.data.mongodb.port=27017
spring.data.mongodb.username=root
spring.data.mongodb.password=123456
```

### 2.3 创建实体类
创建实体类Book，代码如下：
```java 
public class Book implements Serializable {
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
    public String getName() { return name; }
    public String getAuthor() { return author; }
    public Integer getId() {
        return id;
    }
}
```
### 2.4 创建BookDao
BookDao定义类似于JPA中的Repository定义，代码如下：
```java 
public interface BookDao extends MongoRepository<Book, Integer> {
    List<Book> findByAuthorContains(String author);

    Book findByNameEquals(String name);
}
```

### 2.5 创建Controller
直接将BookDao注入Controller进行测试：
```java 
@RestController
public class BookController {
    @Autowired
    BookDao bookDao;
    @GetMapping("/test")
    public void test(){
        List<Book> bookList = new ArrayList<>();
        Book b1 = new Book();
        b1.setAuthor("鲁迅");
        b1.setId(1);
        b1.setName("dasdsa");
        bookList.add(b1);
        Book b2 = new Book();
        b2.setName("朝花夕拾");
        b2.setAuthor("鲁迅");
        b2.setId(2);
        bookList.add(b2);
        bookDao.insert(bookList);
        List<Book> books = bookDao.findByAuthorContains("鲁迅");
        System.out.println(books);
    }
}
```
### 2.6 运行项目
运行项目后，在浏览器中输入网址：locallhost:8080/test

接下来启动MongoDB查看刚才输入的数据：

<img src="https://api.zk123.top/link/repo1/img/2020/no_sql_6.png"/>

### 2.7 使用MongoTemplate
除了继承MongoRepository以外，Spring Data MongoDB还提供了MongoTemplate来方便的
操作MongoDB。 在SpringBoot中，若添加了MongoDB的依赖，而开发者并没有提供MongoTemplate
，则默认会有一个MongoTemplate注册到Spring容器中，相关配置源码在MongoDataAutoConfiguration
类中。 因此，用户可以直接使用MongoTemplate，在Controller中直接注入MongoTemplate就
可以使用了。

#### 创建Controller
代码如下：
```java 
@RestController
public class BookController {
    @Autowired
    MongoTemplate mongoTemplate;
    @GetMapping("/test")
    public void test2(){
        List<Book> bookList = new ArrayList<>();
        Book b1 = new Book();
        b1.setId(3);
        b1.setAuthor("钱钟书");
        b1.setName("围城");
        bookList.add(b1);
        Book b2 = new Book();
        b2.setId(4);
        b2.setName("宋诗选注");
        b2.setAuthor("钱钟书");
        bookList.add(b2);
        mongoTemplate.insertAll(bookList);
        List<Book> books = mongoTemplate.findAll(Book.class);
        System.out.println(books);
        Book book = mongoTemplate.findById(3, Book.class);
        System.out.println(book);
    }
}
```

在浏览器中输入 locallhost:8080/test，并在MongoDB数据库中查询：

<img src="https://api.zk123.top/link/repo1/img/2020/no_sql_7.png"/>

[^1]: Redis 的持久化机制有两种，第一种是快照，第二种是 AOF 日志。快照是一次全量备 份，AOF 日志是连续的增量备份。快照是内存数据的二进制序列化形式，在存储上非常紧凑，而 AOF 日志记录的是内存数据修改的指令记录文本。AOF 日志在长期的运行过程中会 变的无比庞大，数据库重启时需要加载 AOF 日志进行指令重放，这个时间就会无比漫长。 所以需要定期进行 AOF 重写，给 AOF 日志进行瘦身。