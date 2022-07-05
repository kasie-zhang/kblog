---
title: SpringBoot 实现文件上传
date: 2021-04-25
cover: /img/cover/80.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- Util
- 后端
publish: true
permalink: /article/80
---

> 第 80 篇文章
<!-- more -->

## 上传单个文件，以Excel为例
>`UploadPath.java` 存储文件上传前的名称，文件上传后的名称

```java 
public class UploadPath {
    private String originFileName;
    private String newFileName;
    // 省略 get，set
}
```

>上传单个文件
```java 
/**
 * 上传单个Excel文件.
 *
 * @param file     文件
 * @param filePath 文件保存路径
 * @return 原文件名，更新后的文件名
 * @throws FileEmptyException     上传文件为空
 * @throws WrongFileTypeException 错误文件类型
 * @throws FileUploadException    文件上传失败
 */
public static UploadPath fileUpload(MultipartFile file, String filePath) throws FileEmptyException,
        WrongFileTypeException, FileUploadException {
    String path;
    // 文件不为空
    if (file.isEmpty()) {
        throw new FileEmptyException();
    }
    // 获取文件后缀名
    String originFileName = file.getOriginalFilename();
    String extension = GlobalUtils.getExtension(Objects.requireNonNull(originFileName));
    // 仅支持 xlsx, jpg, png 上传
    if (!(extension.equals("xlsx") || extension.equals("png") || extension.equals("jpg"))) {
        throw new WrongFileTypeException();
    }
    // 更新文件名 (UUID.后缀)
    String newFileName = UUID.randomUUID().toString() + "." + extension;
    // 上传存储路径
    path = filePath + newFileName;
    File dest = new File(path);
    if (!dest.getParentFile().exists()) {
        dest.getParentFile().mkdirs();
    }
    try {
        // 文件写入
        file.transferTo(dest);
    } catch (IOException e) {
        throw new FileUploadException("文件上传失败");
    }
    return new UploadPath(originFileName, newFileName);
}
```

>获取文件后缀
```java 
/**
 * @param fileName "xxx.后缀"
 * @return "后缀"
 * @since 2021-3-18
 */
public static String getExtension(String fileName) {
    String extension = "";
    if (fileName == null || "".equals(fileName)) {
        throw new NullPointerException();
    }
    int i = fileName.lastIndexOf(".");
    if (i > 0) {
        extension = fileName.substring(i + 1);
    }
    return extension;
}
```

## 上传多个文件，以图片文件为例
```java 
/**
 * 上传单张、多张图片.
 *
 * @param files    文件
 * @param filePath 文件保存路径
 * @return 列表(文件名.后缀)
 * @throws FileEmptyException     上传文件为空
 * @throws WrongFileTypeException 错误文件类型
 * @throws FileUploadException    文件上传失败
 */
public static List<UploadPath> filesUpload(MultipartFile[] files, String filePath) throws
        FileUploadException, FileEmptyException, WrongFileTypeException {
    List<UploadPath> result = new ArrayList<>();
    int pos = 0;
    for (MultipartFile file : files) {
        if (!file.isEmpty()) {
            pos++;
            // 获取文件后缀名
            String extension;
            String originFileName = file.getOriginalFilename();
            extension = GlobalUtils.getExtension(Objects.requireNonNull(originFileName));
            // 仅支持 xlsx, jpg, png 上传
            if (!(extension.equals("xlsx") || extension.equals("png") || extension.equals("jpg"))) {
                throw new WrongFileTypeException();
            }
            try {
                // 文件重命名 (UUID.后缀)
                String newFileName = UUID.randomUUID().toString() + "." + extension;
                // 上传存储路径
                File dest = new File(filePath + newFileName);
                if (!dest.getParentFile().exists()) {
                    dest.getParentFile().mkdirs();
                }
                // 写入文件
                file.transferTo(dest);
                result.add(new UploadPath(originFileName, newFileName));
            } catch (IOException e) {
                throw new FileUploadException("第" + pos + "个文件上传失败");
            }
        } else {
            throw new FileEmptyException("第" + pos + "个文件上传失败,文件为空");
        }
    }
    return result;
}
```