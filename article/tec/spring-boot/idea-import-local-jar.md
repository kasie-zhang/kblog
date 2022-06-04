---
title: SpringBoot 使用本地JAR包
date: 2021-04-12
cover: /img/cover/72.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- 后端
- JAR
publish: true
permalink: /72
---

> 第 72 篇文章
<!-- more -->

## 使用本地JAR包
### 1. 引入 JAR 包
在 `resources` 目录下新建 `lib` 包, 将本地 JAR 包放在这个路径下。

### 2. 配置 pom 使 JAR 包生效
- **groupId**: 创建项目的组织或团体的唯一ID， 一般是网址倒着写

- **artifactId**: 项目唯一ID

- **version**: 产品版本号

- **scope**: JAR包作用范围(默认的依赖范围是 compile)
    - test: 测试范围有效，在编译和打包时都不会使用这个依赖
    - compile: 编译范围有效，在编译和打包时都会将依赖存储进去
    - provided: 在编译和测试的过程中有效，最后生成 war 包时不会加入，例如 tomcat 等服务器已经在存在，如果再打包会产生冲突
    - runtime: 在运行的时候依赖，在编译的时候不依赖


```xml
<!--按如下方式引入每一个第三方的jar包，其中${pom.basedir}指当前项目的根目录-->
<dependency>
    <groupId>top.zk123</groupId>
    <artifactId>util</artifactId>
    <scope>system</scope>
    <version>1.0</version>
    <systemPath>${pom.basedir}/src/main/resources/lib/util.jar</systemPath>
</dependency>
```


## 3. 打包配置
```xml
<plugins>
  <!--如果是打jar包，则需在build的plugins中添加如下配置-->
  <plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
      <!--值为true是指打包时包含scope为system的第三方Jar包-->
      <includeSystemScope>true</includeSystemScope>
    </configuration>
  </plugin>

  <!--如果是打war包，则需在build的plugins中设置maven-war-plugin插件，否则外部依赖无法打进war包 -->
  <plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-war-plugin</artifactId>
    <configuration>
      <webResources>
        <resource>
          <directory>src/main/resources/lib</directory>
          <targetPath>WEB-INF/lib/</targetPath>
          <includes>
            <include>**/*.jar</include>
          </includes>
        </resource>
      </webResources>
    </configuration>
  </plugin>
</plugins>
```