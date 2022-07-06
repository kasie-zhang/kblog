---
title: Tomcat 配置教程 (80端口、HTTPS、HTTP自动转化HTTPS、启用多个服务)
date: 2020-12-05
cover: https://api.zk123.top/link/repo1/img/cover/52.webp
sidebar: 'auto'
categories:
- 教程
tags:
- Tomcat
- 配置
- 运维
publish: true
permalink: /article/52
---

> 第 52 篇文章
<!-- more -->

## 先决条件
有个人域名，且个人域名已经解析到了服务器

## 下载Tomcat
[https://tomcat.apache.org/](https://tomcat.apache.org/)

## 安装
以 Windows 服务器为例, 解压Tomcat到C盘.

找到 `Tomcat\bin\startup.bat` 文件,双击来**启动Tomcat服务**

在浏览器中输入 `localhost:8080` , tomcat默认的服务端口为8080端口

若看到小汤姆猫,则表明Tomcat服务开启成功.

![](https://api.zk123.top/link/repo1/img/2020/tomcat_basics_1.png)

如果看不到汤姆猫,查看Tomcat的CMD命令中的报错信息

如果是 `org.apache.catalina.core.StandardService.initInternal Failed to initialize connector [Connector[HTTP/1.1-80]]`

则问题出在`80端口占用`.

**解决思路**: 查看本机是否开启了IIS服务 (IIS服务默认会占用 80 端口).

```
// cmd 命令
netstat -ano                    // 查看所有端口使用情况

netstat -ano | findstr "80"     //查看 80 端口使用情况
```
## 配置
### 配置80端口
打开`Tomcat/conf/server.xml`文件

在第 69 行左右找到以下代码

```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

将 8080 改成 `80`, 8443 改成 `443`
:::tip 提示
网址访问的默认端口号是 `80` 端口

HTTPS 的默认端口是 `443` 端口

redirectPort 是转发端口，修改成`443` 后能够实现输入网址后自动启用HTTPS
:::

更改完成之后重新启动Tomcat服务

待服务启动后,在浏览器中输入 `localhost` 查看能否访问

### 配置 HTTPS
到阿里云下载你对应域名申请的证书,证书很多，根据你的服务器类型选择

![](https://api.zk123.top/link/repo1/img/2020/tomcat_basics_2.png)

下载的文件中包括`xxx.pfx` 和 `密钥.txt`

把 pfx 文件复制到服务器的Tomcat目录下，然后配置 `server.xml`

```xml
<Connector port="443" protocol="org.apache.coyote.http11.Http11NioProtocol"
           maxThreads="150" SSLEnabled="true">
    <SSLHostConfig>
        <Certificate 
        certificateKeystoreFile="C:/apache-tomcat-8.5.60/cert/【证书文件（.pfx结尾）】"
        certificateKeystorePassword="证书文件中的密码"
        certificateKeystoreType="PKCS12"/>
    </SSLHostConfig>
</Connector>
```

配置完成后，启动Tomcat服务，使用域名访问； 此时既能使用 http访问，也能用 https 访问

![](https://api.zk123.top/link/repo1/img/2020/tomcat_basics_3.png)

![](https://api.zk123.top/link/repo1/img/2020/tomcat_basics_4.png)

### 强制启用HTTPS
配置`conf/web.xml`

在文件的最后找到以下代码：
```xml
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
</welcome-file-list>
```

在这段代码后加入以下内容

```xml
<!--		强制使用HTTPS		-->
<login-config>  
    <!-- Authorization setting for SSL -->  
    <auth-method>CLIENT-CERT</auth-method>  
    <realm-name>Client Cert Users-only Area</realm-name>  
</login-config>  
<security-constraint>  
    <!-- Authorization setting for SSL -->  
    <web-resource-collection >  
        <web-resource-name >SSL</web-resource-name>  
        <url-pattern>/*</url-pattern>  
    </web-resource-collection>  
    <user-data-constraint>  
        <transport-guarantee>CONFIDENTIAL</transport-guarantee>  
    </user-data-constraint>  
</security-constraint> 
```

修改完成后，重新启动Tomcat，测试设置是否成功

在浏览器中直接输入域名，如果网址能够自动跳转到`HTTPS`，那么恭喜你，设置成功了！


### 启用多个服务
举个例子，你搭建了一个Web版的在线音乐播放器，并希望通过`域名/music`的方式访问

#### 实现过程
1. 在 `webapps`目录下新建 `music` 目录，将服务文件放进去

2. 配置 `server.xml`
:::details 配置内容
定位到文件末尾，找到如下内容:
```xml
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
       prefix="localhost_access_log" suffix=".txt"
       pattern="%h %l %u %t &quot;%r&quot; %s %b" />
```
在该文件下，新增配置:
```xml
<Content path="/music/" docBase="C:\\apache-tomcat-8.5.60\\webapps\\music" reloadable="true" />
```
参数描述：
- path: 通过对应网址访问该服务。   （例：https:xxx.com/music）
- docBase: 提供对应服务的文件所在的绝对路径。 
- reloadable: 自动重载该服务。    （启用后，更改该文件不需要重启Tomcat）
:::


本文结束:rainbow::rainbow: