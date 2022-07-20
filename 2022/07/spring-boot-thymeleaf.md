> Create: 7/28/2020
>
> Last Update: 7/20/2022

# **SpringBoot 整合视图层技术 以 Thymeleaf 为例**

# 1.前言

---

[Thymeleaf](https://www.thymeleaf.org/)是新一代 Java 模板引擎，类似于 Freemaker，Velocity 等传统 Java 模板引擎。 与传统模板引擎不同的是
Thymeleaf 支持 HTML 原型，既可以让前端工程师在浏览器中直接打开查看样式，也可以让后端工程师结合真实数据查看效果。
同时，SpringBoot 提供了 Thymeleaf 自动化配置方案，因此在 SpringBoot 中使用 Thymeleaf 非常方便。

在目前企业级开发中，前后端分离是趋势，但是视图层技术还有一席之地。 SpringBoot 对视图层及时提供了很好的支持。
官方推荐使用的模板引擎是 Thymeleaf，本文也就采用 Thymeleaf 进行开发。

# 2.实战

## 2.1. 创建工程，添加依赖

新建一个 SpringBoot 项目，添加 spring-boot-starter-web 和 spring-boot-starter-thymeleaf 依赖,代码如下

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## 2.2. 配置控制器

创建 Book 实体类，然后在 Controller 中返回 ModelAndView

```java
//Book.java
public class Book {
    private Integer id;
    private String name;
    private String author;
    public Integer getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public String getAuthor(){
        return author;
    }
    public void setId(Integer _id) {
        id = _id;
    }
    public void setName(String _name) {
        name = _name;
    }
    public void setAuthor(String _author) {
        author = _author;
    }
}
```

```java
//BookController.java
@Controller
public class BookController {
    @GetMapping("/books")
    public ModelAndView books()
    {
        List<Book> bookList = new ArrayList<>();
        Book b1 = new Book();
        b1.setAuthor("罗贯中");
        b1.setId(1);
        b1.setName("三国演义");
        Book b2 = new Book();
        b2.setName("红楼梦");
        b2.setId(2);
        b2.setAuthor("曹雪芹");
        bookList.add(b1);
        bookList.add(b2);
        ModelAndView mv = new ModelAndView();
        mv.addObject("books", bookList);    // 使用参数名books 代替模型
        mv.setViewName("books");                        // 跳转到指定页面
        return mv;
    }
}
```

## 2.3.创建视图

在 resources 目录下的 template 目录中创建 books.html，具体代码如下

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="https://www.thymeleaf.org">
  <head>
    <meta charset="UTF-8" />
    <title>图书列表</title>
  </head>
  <body>
    <table border="1">
      <tr>
        <td>图书编号</td>
        <td>图书名称</td>
        <td>图书作者</td>
      </tr>
      <tr th:each="book:${books}">
        <td th:text="${book.id}"></td>
        <td th:text="${book.name}"></td>
        <td th:text="${book.author}"></td>
      </tr>
    </table>
  </body>
</html>
```

> [!NOTE] **代码解释**
>
> 在第二行导入 Thymeleaf 的名称空间
>
> 在 14-18 行通过遍历，将 books 中的数据展示出来，Thymeleaf 中通过 `th:each` 进行集合遍历，
> 通过 `th:text` 进行数据展示

实现效果如下:

![](https://api.zk123.top/link/repo1/img/2020/thymeleaf_1.png)
