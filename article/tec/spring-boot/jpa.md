---
title: SpringBoot JPA
date: 2020-11-20
cover: /img/cover/44.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- JPA
- 后端
publish: true
permalink: /44
---

> 第 44 篇文章
<!-- more -->

JPA(Java Persistence API) 是一种面向对象的查询语言，无论查询还是修改，
全部操作的都是实体类对象，而非数据库的表。

## JPA依赖
```pom
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

## 配置文件

```md 
#数据库连接地址
spring.datasource.url = jdbc:mysql://localhost:3306/数据库名称?useUsharedPreferencenicode=true&characterEncoding=utf-8&serverTimezone=UTC

#数据库账号、密码
spring.datasource.username = xxx
spring.datasource.password = xxx

#数据库jdbc驱动
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

#jpa设置
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect

#数据库自动建表
spring.jpa.hibernate.ddl-auto=update

# 控制台打印SQL
spring.jpa.show-sql = true
```

## 创建实体类对象
```java 
package com.zk.demo.Bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id    // 声明此属性为主键,此处为userID
    private String phoneNumber;

    private String nickName;
    private String email;
    private String wechat;
    private String password;
    private String hostCode;
    private String idCode;

    @Transient
    private String sessioId;

//    @Transient
//    private ArrayList<String> permissions;

    @Transient
    private int passwordSetted;

    public User(String phoneNumber, String nickName, String email, String wechat, String password, String hostCode, String idCode) {
        this.phoneNumber = phoneNumber;
        this.nickName = nickName;
        this.email = email;
        this.wechat = wechat;
        this.password = password;
        this.hostCode = hostCode;
        this.idCode = idCode;
    }

    public User() {
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWechat() {
        return wechat;
    }

    @JsonIgnore
    public String getSessioId() {
        return sessioId;
    }

    public void setSessioId(String sessioId) {
        this.sessioId = sessioId;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

//    public ArrayList<String> getPermissions() {
//        return permissions;
//    }
//
//    public void setPermissions(ArrayList<String> permissions) {
//        this.permissions = permissions;
//    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getHostCode() {
        return hostCode;
    }

    public void setHostCode(String hostCode) {
        this.hostCode = hostCode;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public int getPasswordSetted() {
        return passwordSetted;
    }

    public void setPasswordSetted(int passwordSetted) {
        this.passwordSetted = passwordSetted;
    }
}
```

注解 @Entity 表示这是一个实体类

在属性上加上 @Id 注解，表示这是数据库中的主键

使用@GeneratedValue(strategy = GenerationType.IDENTITY) 表示此字段自增长

在属性上加上 @Column(nullable = false, unique = true) 可以设置字段的一些属性

