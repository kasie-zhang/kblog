---
title: SpringBoot 实现前端Alert操作以及网页跳转
cover: https://api.zk123.top/link/repo1/img/cover/87.webp
date: 2021-05-23
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- 后端
publish: true
permalink: /article/87
---

> 第 87 篇文章
<!-- more -->

使用描述：网页端点击**邮箱激活链接**时，调用后端接口，进行某些业务操作，最后将提示信息展示给用户，用户点击确定后，跳转回我们设定好的网址。

```java 
public void ActiveEmail(String encryptPhone, String encryptEmail, HttpServletResponse response) throws IOException {
    //判断邮箱是否激活
    String phoneNumber = AESUtil.decode(AESUtil.key, encryptPhone);
    User user = userMapper.findByPhoneNumber(phoneNumber);
    if (user.getEmail() != null) {
        // 实现前端Alert操作
        response.setContentType("text/html; charset=utf-8");
        PrintWriter out;
        out = response.getWriter();
        out.print("<script>alert('邮箱已成功激活，请勿重复操作!');</script>");
        out.print("<script>location='https://www.zk123.top';</script>");
        out.flush();
        return;
    }
    String email = AESUtil.decode(AESUtil.key, encryptEmail);
    user.setEmail(email);
    userMapper.save(user);
    response.setContentType("text/html; charset=utf-8");
    PrintWriter out;
    out = response.getWriter();
    out.print("<script>alert('邮箱激活成功!');</script>");
    out.print("<script>location='https://www.zk123.top';</script>");
    out.flush();
}
```