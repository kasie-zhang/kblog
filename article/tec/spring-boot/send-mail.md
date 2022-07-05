---
title: SpringBoot 整合邮件发送
date: 2021-05-19
cover: /img/cover/83.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- 后端
- Util
- 邮件发送
publish: true
permalink: /article/83
---

> 第 83 篇文章
<!-- more -->

邮件发送是日常中非常常用的功能，Spring中提供了JavaMailSender来简化邮件配置。

本文介绍三种邮件发送方式：简单文本邮件、带附件邮件、邮件正文带图片。

## 1. 开启SMTP服务
开启SMTP服务，拿到密钥

## 2. SpringBoot 配置
1. 配置文件 `application.properties`
```properties
# email 配置
spring.mail.host=smtp.163.com
spring.mail.username=xxx@163.com
spring.mail.password= [开启SMTP服务时拿到的密钥]
spring.mail.default-encoding=utf-8
## 配置 SSL 加密工厂
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory
spring.mail.properties.mail.smtp.socketFactory.port=465
## 自定义发件方
mail.mailFrom=xxx@163.com
```

2. 依赖 `pom.xml`
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

## `EmailService.java`
实现三种发送邮件方式的接口

```java 
package top.zk123.when2meet.service;

import java.io.File;
import java.util.List;

public interface EmailService {
    /**
     * 发送普通文本邮件
     *
     * @param mailFrom     发件人邮箱
     * @param mailFromNick 发件人昵称
     * @param mailTo       收件人邮箱（多个收件人之间用逗号分割）
     * @param cc           抄送人（可为空）
     * @param subject      主题
     * @param content      内容
     */
    void sendSimpleMail(String mailFrom, String mailFromNick, String mailTo, String cc,
                        String subject, String content);

    /**
     * 发送带有附件的邮件
     *
     * @param mailFrom     发件人邮箱
     * @param mailFromNick 发件人昵称
     * @param mailTo       收件人邮箱（多个收件人之间用逗号分割）
     * @param cc           抄送人（可为空）
     * @param subject      主题
     * @param content      内容
     * @param files        文件
     */
    void sendMailWithAttachments(String mailFrom, String mailFromNick, String mailTo, String cc,
                                 String subject, String content, List<File> files);

    /**
     * 发送邮件：正文内容带图片
     *
     * @param mailFrom     发件人邮箱
     * @param mailFromNick 发件人昵称
     * @param mailTo       收件人邮箱（多个收件人之间用逗号分割）
     * @param cc           抄送人（可为空）
     * @param subject      主题
     * @param content      内容
     * @param imagePaths   图片地址
     * @param imageId      图片Id
     */
    void sendMailWithImages(String mailFrom, String mailFromNick, String mailTo, String cc,
                            String subject, String content, List<String> imagePaths, List<String> imageId);

}
```


## `EmailServiceImp.java`
发送邮件的具体实现

```java 
package top.zk123.when2meet.service.Imp;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import top.zk123.when2meet.service.EmailService;
import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.List;


@Service
public class EmailServiceImp implements EmailService {
    @Resource
    private JavaMailSender javaMailSender;
    
    // 引入配置文件中的邮件发送人
    @Value("${mail.mailFrom}")
    private String from;
    
    @Override
    public void sendSimpleMail(String mailFrom, String mailFromNick, String mailTo, String cc,
                               String subject, String content) {
        try {
            // 多个收件之间只用逗号分隔
            String[] mailToArr = mailTo.split(",");
            for (String address : mailToArr) {
                // 简单邮件信息类
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                // HTML 邮件聚合类
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
                // 设置发件人昵称、发件地址
                mimeMessageHelper.setFrom(new InternetAddress(mailFromNick + "<" + mailFrom + ">"));
                mimeMessageHelper.setTo(address);
                // 设置抄送人
                if (!cc.isEmpty()) {
                    mimeMessageHelper.setCc(cc);
                }
                // 设置邮件主题
                mimeMessageHelper.setSubject(subject);
                // 设置邮件内容
                mimeMessageHelper.setText(content);
                javaMailSender.send(mimeMessage);
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void sendMailWithAttachments(String mailFrom, String mailFromNick, String mailTo,
                                        String cc, String subject, String content, List<File> files) {
        try {
            // 多个收件之间只用逗号分隔
            String[] mailToArr = mailTo.split(",");
            for (String address : mailToArr) {
                // 简单邮件信息类
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                // HTML 邮件聚合类;  multipart参数为 true，表示构造一个 Multipart message 类型的邮件；该类型
                // 的邮件包含多个正文、附件及内嵌资源，邮件的表现形式更为丰富。
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
                // 设置发件人昵称、发件地址
                mimeMessageHelper.setFrom(new InternetAddress(mailFromNick + "<" + mailFrom + ">"));
                mimeMessageHelper.setTo(address);
                // 设置抄送人
                if (!cc.isEmpty()) {
                    mimeMessageHelper.setCc(cc);
                }
                // 设置邮件主题
                mimeMessageHelper.setSubject(subject);
                // 设置邮件内容
                mimeMessageHelper.setText(content);
                // 添加附件
                if (files != null) {
                    for (File file : files) {
                        mimeMessageHelper.addAttachment(file.getName(), file);
                    }
                }
                javaMailSender.send(mimeMessage);
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


    @Override
    public void sendMailWithImages(String mailFrom, String mailFromNick, String mailTo, String cc,
                                   String subject, String content, List<String> imagePaths, List<String> imageId) {
        try {
            // 多个收件之间只用逗号分隔
            String[] mailToArr = mailTo.split(",");
            for (String address : mailToArr) {
                // 简单邮件信息类
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                // HTML 邮件聚合类;  multipart参数为 true，表示构造一个 Multipart message 类型的邮件；该类型
                // 的邮件包含多个正文、附件及内嵌资源，邮件的表现形式更为丰富。
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
                // 设置发件人昵称、发件地址
                mimeMessageHelper.setFrom(new InternetAddress(mailFromNick + "<" + mailFrom + ">"));
                mimeMessageHelper.setTo(address);
                // 设置抄送人
                if (!cc.isEmpty()) {
                    mimeMessageHelper.setCc(cc);
                }
                // 设置邮件主题
                mimeMessageHelper.setSubject(subject);
                // 设置邮件内容; 第二个参数为 true 表示邮件正文是 html 格式的，默认为 false
                mimeMessageHelper.setText(content, true);
                // 添加图片
                if (imagePaths != null && imagePaths.size() != 0) {
                    for (int i = 0; i < imagePaths.size(); i++) {
                        // 通过 FileSystemResource 构造静态资源
                        FileSystemResource fileSystemResource = new FileSystemResource(imagePaths.get(i));
                        // 将资源加入邮件对象中
                        mimeMessageHelper.addInline(imageId.get(i), fileSystemResource);
                    }
                }
                javaMailSender.send(mimeMessage);
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
```

## 测试
```java 
public void test(String email) {
    // 发送普通邮件
    String verifyCode = GlobalUtils.generateVerifyCode();
    String subject = "When2meet 验证码";
    String content = "【When2meet】您的验证码是: " + verifyCode + "，在15分钟内有效。请勿泄露给他人!";
    sendSimpleMail(from, "【When2meet】", email, "", subject, content);

    // 发送带附件的邮件
    List<File> files = new ArrayList<>();
    File file1 = new File("C:\\Users\\zk\\Pictures\\background\\72.jpg");
    File file2 = new File("C:\\Users\\zk\\Pictures\\background\\82.jpg");
    files.add(file1);
    files.add(file2);
    sendMailWithAttachments(from, "【测试带附件的方法】", email, "", "【测试带附件的方法】", content, files);

    // 发送正文内容带图片的邮件
    List<String> imagePath = new ArrayList<>();
    imagePath.add("C:\\Users\\zk\\Pictures\\background\\72.jpg");
    imagePath.add("C:\\\\Users\\\\zk\\\\Pictures\\\\background\\\\82.jpg");

    List<String> imageId = new ArrayList<>();
    imageId.add("1");
    imageId.add("2");
    // cid => content-id；表示将图片地址指向附件，所以 imageId 要唯一
    String html = "这是图片1:<div><img src='cid:1'/></div>" +
            "这是图片2:<div><img src='cid:2'/></div>";
    sendMailWithImages(from, "正文带图片", email, "", "【正文带图片】", html,
            imagePath, imageId);
}
```