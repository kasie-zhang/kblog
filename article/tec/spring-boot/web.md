---
title: SpringBoot 整合web开发
date: 2020-07-29
cover: /img/cover/12.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- 后端
publish: true
permalink: /article/12
---

> 第 12 篇文章
<!-- more -->

## 1. 返回JSON数据

JSON 是目前主流的前后端数据传输方式，Spring MVC中使用消息转换器进行HttpMessageConvert对JSON的转换提供了
很好的支持，在Spring Boot中更进一步，对相关配置做了更进一步的简化，默认情况下，当开发者创建了一个新的SpringBoot项目后，
添加Web依赖，这个依赖中默认加入了jackson-databind作为JSON处理器，此时不需要额外添加JSON处理器就能返回一段JSON了

### 1. 1 创建一个Book实体类

```java 
public class Book {
    private String name;
    private String author;
    @JsonIgnore
    private Float price;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date publicationDate;
    public void setName(String _name) {
        name = _name;
    }
    public void setAuthor(String _author) {
        author = _author;
    }
    public void setPrice(float _price) {
        price = _price;
    }
    public String getName(){
        return name;
    }
    public String getAuthor(){
        return author;
    }
    public float getPrice() {
        return price;
    }
    public void setPublicationDate(Date _date) {
        publicationDate = _date;
    }
}
```
### 1.2 创建BookController,返回Book对象
```java 
@RestController
public class BookController {
    @GetMapping("/book")
    public Book book(){
        Book book = new Book();
        book.setAuthor("罗贯中");
        book.setName("三国演义");
        book.setPrice(30f);
        book.setPublicationDate(new Date());
        return book;
    }
}
```
此时在浏览器中输入"http://localhost:8080/book"，即可看到返回了JSON数据如下图所示

![](/img/2020/web_1.png)


## 2.静态资源访问
SpirngBoot项目中，通过以下四个位置都能够访问到静态资源，访问的优先顺序见下图

![](/img/2020/web_2.png)

### 2.1 自定义策略

可以在application.properties中直接定位过滤规则和静态资源位置，代码如下：
```
spring.mvc.static-path-pattern=/static/**
spring.resources.static-locations=classpath:/static/

过滤规则为/static/**, 静态资源位置为classpath:/static/
重启项目，在浏览器中输入"http://localhost:8080/static/p1.png，即可看到classpath:/static/目录下的资源
```

## 3. 文件上传

### 3.1 单文件上传

首先创建一个SpringBoot项目，并添加spring-boot-starter-web依赖

然后在resources目录下的static目录中创建一个upload.html文件，内容如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>测试上传</title>
</head>
<body>
<form action="/upload" method="post" enctype="multipart/form-data">
<input type="file" name="uploadFile" value="请选择文件">
<input type="submit" value="上传">
</form>
</body>
</html>
```
这是一个简单的文件上传页面，上传接口是/upload，请求方法是post，enctype是multipart/form-data

接着创建文件上传处理接口，代码如下：
```java 
@RestController
public class FileUploadController {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");

    @PostMapping("/upload")
    public String upload(MultipartFile uploadFile, HttpServletRequest request) {
        String realPath = request.getSession().getServletContext().getRealPath("/uploadFile/");
        String format = sdf.format(new Date());
        File folder = new File(realPath + format);
        if (!folder.isDirectory()) {
            folder.mkdirs();
        }
        String oldName = uploadFile.getOriginalFilename();
        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());
        try {
            uploadFile.transferTo(new File(folder, newName));
            String filePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() +
                    "/uploadFile/" + format + newName;
            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "上传失败";
    }
}
```
:::tip 代码解释
第7~9行代码表示规划上传文件的保存路径为运行目录下的uploadFile文件夹，并在文件夹中通过日期对上传的文件归类保存

第13~14行代码表示给上传的文件夹重命名，避免文件重名

第16行是文件保存操作

第17~19行是生成上传文件的访问路径，并将路径返回
:::

#### 3.1.1 上传流程

1. 选择上传文件

![](/img/2020/web_3.png)

2. 得到上传文件的访问链接

![](/img/2020/web_4.png)

3. 访问链接(能够正常访问则成功)

![](/img/2020/web_5.png)

#### 3.1.2 配置上传细节

在application.properties文件中输入以下代码：
```properties
# 开启文件上传支持，默认为true
spring.servlet.multipart.enabled=true
# 文件写入磁盘的阈值，默认为0
spring.servlet.multipart.file-size-threshold=0
# 上传文件的临时保存位置
spring.servlet.multipart.location=C:\\temp
# 上传的单个文件的最大大小，默认为1MB
spring.servlet.multipart.max-file-size=1MB
# 多文件上传时文件的总大小
spring.servlet.multipart.max-request-size=10MB
# 文件是否延迟解析,默认为false
spring.servlet.multipart.resolve-lazily=false
```
### 3.2 多文件上传

多文件上传和单文件上传基本一致，首先修改HTML文件，代码如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>多文件上传</title>
</head>
<body>
<form action="/uploads" method="post" enctype="multipart/form-data">
<input type="file" name="uploadFiles" value="请选择文件" multiple>
<input type="submit" value="上传">
</form>
</body>
</html>
```
然后修改控制器，代码如下：
```java 
@RestController
public class FileUploadsController {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");

    @PostMapping("/uploads")
    public String upload(MultipartFile[] uploadFiles, HttpServletRequest req) {
        String path = "";
        int i = 0;
        for (MultipartFile uploadFile : uploadFiles) {
            String realPath = req.getSession().getServletContext().getRealPath("/uploadFiles/");
            String format = sdf.format(new Date());
            File folder = new File(realPath + format);
            if (!folder.isDirectory()) {
                folder.mkdirs();
            }
            String oldName = uploadFile.getOriginalFilename();
            String newName = i + UUID.randomUUID().toString() +
                    oldName.substring(oldName.lastIndexOf("."), oldName.length());
            i++;
            try {
                uploadFile.transferTo(new File(folder, newName));
            } catch (IOException e) {
                e.printStackTrace();
            }
            String filePath = req.getScheme() + "://" + req.getServerName() + ":" +
                    req.getServerPort() + "/uploadFiles/" + format + newName;
            path = path + filePath + "\n";

        }
        return path;
    }
}
```
#### 3.2.1 上传流程

1. 选中需要上传的多个文件，点击上传

![](https://src.zk123.top/md/md_015.png)

2. 得到上传文件的链接

![](https://src.zk123.top/md/md_016.png)

3. 访问链接(能够成功访问则成功)

![](https://src.zk123.top/md/md_017.png)

## 4. 自定义错误页

在SpringBoot中，默认情况下，如果用户在发起请求时发生了404错误或者500错误，SpringBoot会有一个默认的页面展示给用户。

SpringBoot默认是在error项目中查找4xx，5xx的文件作为错误视图，当找不到时，会回到errorHtml中，然后使用error作为默认的
错误页面视图名，如果名为error的视图也找不到，用户就会看到默认的错误提示页面。

###  4.1 创建404.html

1. 在 resources/static/error 目录下创建404.html,代码如下：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <meta charset="UTF-8" http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <title>404-ERROR</title>

    <style type="text/css">

        .head404{ width:580px; height:234px; margin:50px auto 0 auto; background:url(https://www.daixiaorui.com/Public/images/head404.png) no-repeat; }

        .txtbg404{ width:499px; height:169px; margin:10px auto 0 auto; background:url(https://www.daixiaorui.com/Public/images/txtbg404.png) no-repeat;}

        .txtbg404 .txtbox{ width:390px; position:relative; top:30px; left:60px;color:#eee; font-size:13px;}

        .txtbg404 .txtbox p {margin:5px 0; line-height:18px;}

        .txtbg404 .txtbox .paddingbox { padding-top:15px;}

        .txtbg404 .txtbox p a { color:#eee; text-decoration:none;}

        .txtbg404 .txtbox p a:hover { color:#FC9D1D; text-decoration:underline;}

    </style>

</head>



<body bgcolor="#494949">

<div class="head404"></div>

<div class="txtbg404">

    <div class="txtbox">

        <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>

    </div>

</div>

</body>

</html>
</html>
```
实现效果如下：

[404_demo](https://src.zk123.top/blog/404.html)

### 4.2 创建500.html

在 resources/static/error 目录下创建500.html,代码如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>500-ERROR</title>
</head>
<section class="centered">
    <h1>500 Server Error</h1>
    <div class="container">
        <span class="message" id="js-whoops"></span> <span class="message" id="js-appears"></span> <span class="message" id="js-error"></span> <span class="message" id="js-apology"></span>
        <div><span class="hidden" id="js-hidden">Message Here</span></div>
    </div>
</section>

<style>
    @import url('https://fonts.googleapis.com/css?family=Lato|Roboto+Slab');

    * {
        position: relative;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .centered {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin-bottom: 50px;
        font-family: 'Lato', sans-serif;
        font-size: 50px;
    }

    .message {
        display: inline-block;
        line-height: 1.2;
        transition: line-height .2s, width .2s;
        overflow: hidden;
    }

    .message,
    .hidden {
        font-family: 'Roboto Slab', serif;
        font-size: 18px;
    }

    .hidden {
        color: #FFF;
    }
</style>

<script>
    // Here are the different messages we'll use for creating the 500 displayable message
    const messages = [
        ['Whoops.', 'Oops.', 'Excuse me.', 'Oh Dear.', 'Well poo.', 'Hm...', 'This is awkward.', 'Well gosh!'],
        ['It appears', 'Looks like', 'Unfortunately,', 'It just so happens', 'Sadly,', 'Seemingly from nowhere'],
        ['there was an error.', 'we goofed up.', 'a bad thing happend.', 'the server crashed.', 'a bug appeared.', 'someone did a naughty.', 'pixies got into the server!', 'the server threw a tantrum.', 'the website had a bad day.', 'our code pooped out.'],
        ['Sorry.', 'Apologies.', 'Our bad.', 'Sad day.', 'We are quite contrite.', 'Beg pardon.']
    ];

    // These are the different elements we'll be populating. They are in the same order as the messages array
    const messageElements = [
        document.querySelector('#js-whoops'),
        document.querySelector('#js-appears'),
        document.querySelector('#js-error'),
        document.querySelector('#js-apology')
    ];

    // we'll use this element for width calculations
    const widthElement = document.querySelector('#js-hidden');
    // keeping track of the message we just displayed last
    let lastMessageType = -1;
    // How often the page should swap messages
    let messageTimer = 4000;

    // on document load, setup the initial messages AND set a timer for setting messages
    document.addEventListener('DOMContentLoaded', (event) => {
        setupMessages();
        setInterval(() => {
            swapMessage();
        }, messageTimer);
    });

    // Get initial messages for each message element
    function setupMessages() {
        messageElements.forEach((element, index) => {
            let newMessage = getNewMessage(index);
            element.innerText = newMessage;
        });
    }

    // set the width of a given element to match its text's width
    function calculateWidth(element, message) {
        // use our dummy hidden element to get the text's width. Then use that to set the real element's width
        widthElement.innerText = message;
        let newWidth = widthElement.getBoundingClientRect().width;
        element.style.width = `${newWidth}px`;
    }

    // swap a message for one of the message types
    function swapMessage() {
        let toSwapIndex = getNewSwapIndex();
        let newMessage  = getNewMessage(toSwapIndex);
        // Animate the disappearing, setting width, and reappearing
        messageElements[toSwapIndex].style.lineHeight = '0';
        // once line height is done transitioning, set element width & message
        setTimeout(() => {
            // make sure the element has a width set for transitions
            checkWidthSet(toSwapIndex, messageElements[toSwapIndex].innerText);
            // set the new text
            messageElements[toSwapIndex].innerText = newMessage;
            // set the new width
            calculateWidth(messageElements[toSwapIndex], newMessage);
        }, 200);
        // once width is done, transition the lineheight back to 1 so we can view the message
        setTimeout(() => {
            messageElements[toSwapIndex].style.lineHeight = '1.2';
        }, 400);
    }

    // We need to make sure that the element at the passed index has a width set so we can use transitions
    function checkWidthSet(index, message) {
        if (false == messageElements[index].style.width) {
            messageElements[index].style.width = `${messageElements[index].clientWidth}px`;
        }
    }

    // Return a new index to swap message in. Should not be the same as the last message type swapped
    function getNewSwapIndex() {
        let newMessageIndex = Math.floor(Math.random() * messages.length);
        while (lastMessageType == newMessageIndex) {
            newMessageIndex = Math.floor(Math.random() * messages.length);
        }
        return newMessageIndex;
    }

    // Get a new message for the message element.
    function getNewMessage(toSwapIndex) {
        const messagesArray   = messages[toSwapIndex];
        const previousMessage = messageElements[toSwapIndex].innerText;
        // Get a new random index and the message at that index
        let newMessageIndex = Math.floor(Math.random() * messagesArray.length);
        let newMessage      = messagesArray[newMessageIndex];
        // let's make sure they aren't the same as the message already there
        while (newMessage == previousMessage) {
            newMessageIndex = Math.floor(Math.random() * messagesArray.length);
            newMessage      = messagesArray[newMessageIndex];
        }
        return newMessage;
    }
</script>
</html>
```
实现效果：

[500_demo](https://src.zk123.top/blog/500.html) 



## 5.路径映射

一般情况下，使用了页面模板后，用户需要通过控制器才能访问页面。有些页面需要在控制器中加载数据，然后渲染，才能显示出来；还有一些页面在控制器中不需要加载数据，只是完成简单的跳转，对于这种页面，可以直接配置路径映射，提供访问速度。

### 5.1普通的访问方式
在Controller中创建该页面的控制器，例如在template中创建了hello.html，创建对应的控制器，代码如下：
```java
@Controller
public class helloController {
    @GetMapping("/hello")
    public String hello() {
        // 在springBoot集成了thymeleaf后，会在默认路径下（static\template） 寻找名字为hello的HTML页面
        return "hello";
    }
}
```
:::details 代码解释
通过控制器实现访问。

![](https://src.zk123.top/md/md_027.png)
:::



### 5.2实现WebMvcConfig接口中的addViewControllers方法进行路径映射

代码如下：

```java
@Configuration

public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 第一个路径是类似于Controller中的接口路径urlPath，第二个是View要访问的页面
        // 实现不需要进行数据渲染的页面路径映射
        registry.addViewController("/hell").setViewName("hello");
    }
}
```
:::details 代码解释
通过控制器实现访问。

![](https://src.zk123.top/md/md_028.png)
:::

## 6.自定义相关功能
### 6.1自定义欢迎页
SpringBoot 项目在启动后，首先会去静态资源下查找index.html作为首页文件，若找不到，则去查找
动态页面作为项目首页，若想使用动然页面作为项目首页，则需要在Resource/templates目录下创建
index.html（使用Thymeleaf模板）然后在Controller中返回逻辑视图名。

代码如下：
```java 
@SpringBootApplication
public class Chapter02Application {

    public static void main(String[] args) {
        SpringApplication.run(Chapter02Application.class, args);
    }
    @RequestMapping("/index")
    public String StartUpPage()
    {
        return "index";
    }
}
```
:::details 效果展示
![](https://src.zk123.top/md/md_029.png)
:::

### 6.2自定义favicon
favicon是浏览器选项卡的左上角图标，可以放在静态资源路径下或者类路径下，静态资源路径下的
favicon.ico优先级高于类路径下的favicon.ico

可以使用[在线转换网站](https://jinaconvert.com/cn/convert-to-ico.php)将一张普通图片
转回为.ico图片，转换成功后，将文件重命名为favicon.ico，然后复制到resources/static目录下，这样就可以在浏览器选项卡中看到效果了

