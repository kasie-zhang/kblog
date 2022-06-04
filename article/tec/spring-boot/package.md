---
title: SpringBoot 打包部署
date: 2021-04-15
cover: /img/cover/73.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- 部署
- Java
- 后端
publish: true
permalink: /73
---

> 第 73 篇文章
<!-- more -->

## SpringBoot 打成War包
### step1: 修改 pom.xml 文件默认的jar方式为war
```xml
<parent>
<groupId>com.example</groupId>
<artifactId>application</artifactId>
<version>0.0.1-SNAPSHOT</version>
<!--改为war方式-->
<packaging>war</packaging>
</parent>
```

### step2: 排除内置的Tomcat容器
先排除 spring-boot-start-web 中的Tomcat
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### step3: 加上Tomcat容器
项目中仍会使用部分 tomcat 内置包, 所以使用 `<scope>provided</scope>` 修饰,意思是:在编译和测试的过程中有效，最后生成 war 包时不会加入
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <!--打包的时候可以不用包进去，别的设施会提供。事实上该依赖理论上可以参与编译，测试，运行等周期。
        相当于compile，但是打包阶段做了exclude操作-->
    <scope>provided</scope>
</dependency>
```

### step4 修改主类配置
```java
public class DemoApplication extends SpringBootServletInitializer {
     // 注意这里要指向原先用main方法执行的Application启动类
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DemoApplication.class);
    }
}
```

## 使用 mvn 命令打包
jar 方式打包，使用内置Tomcat：mvn clean install -Dmaven.test.skip=true

war方式打包，使用外置Tomcat：mvn clean package -Dmaven.test.skip=true


## 部署
将war包放在 webapp 下, tomcat热部署扫描到 war 包后会自动解压并执行项目.

## 注意事项
使用外部Tomcat部署访问的时候，application.properties 中配置的 `server.port=` 将失效，请使用外置 tomcat
的端口，webapps下的项目名进行访问。

