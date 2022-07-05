---
title: Spring Boot 实战  -- 文件上传下载
date: 2020-10-10
cover: /img/cover/33.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- Util
- 后端
publish: true
permalink: /article/33
---

> 第 33 篇文章
<!-- more -->

## Spring Boot 实战  - - 文件上传下载

### 配置freemarker

```protobuf
spring.freemarker.cache=false
spring.freemarker.charset=utf-8
spring.freemarker.template-loader-path=classpath:/templates/
spring.freemarker.suffix=.ftl
```

### pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```



### indexController

```java
@Controller
public class IndexController {
    @GetMapping("/")
    public String download(ModelMap modelMap) {
        modelMap.addAttribute("info", "文件上传下载");
        return "index";
    }
}
```

### fileController

```java
@RestController
public class fileController {
    private static final String filePath = "C:\\Users\\张珂\\Desktop\\";
    private static final Logger log = LoggerFactory.getLogger(fileController.class);

    @RequestMapping(value = "/upload")
    public String upload(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return "文件为空";
            }
            // 获取文件名
            String fileName = file.getOriginalFilename();
            log.info("上传的文件名为：" + fileName);
            // 设置文件存储路径
            String path = filePath + fileName;
            File dest = new File(path);
            // 检测目录是否存在
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();      //新建文件夹
            }
            file.transferTo(dest);      // 文件写入
            return "上传成功,文件所在的路径为："+path;
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "上传失败";
    }

    @PostMapping("/batch")
    public String handleFileUpload(HttpServletRequest request) {
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        MultipartFile file = null;
        BufferedOutputStream stream = null;
        for (int i = 0; i < files.size(); ++i) {
            file = files.get(i);
            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes();
                    stream = new BufferedOutputStream(new FileOutputStream(new File(filePath + file.getOriginalFilename())));
                    stream.write(bytes);
                    stream.close();
                } catch (Exception e) {
                    stream = null;
                    return "第" + (i+1) + "个文件上传失败===>" + e.getMessage();
                }
            } else {
                return "第" + (i+1) + "个文件上传失败，因为文件为空";
            }
        }
        return "上传成功";
    }

    @GetMapping("/download")
    public String downloadFile(HttpServletResponse response) {
        String fileName = "1.jpg";
        if (fileName != null) {
            File file = new File(filePath + fileName);
            if (file.exists()) {
                response.setContentType("application/force-download");
                response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);
                byte[] buffer = new byte[1024];
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = response.getOutputStream();
                    int i = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    return "下载成功";
                } catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    if (bis != null) {
                        try {
                            bis.close();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    if (fis != null) {
                        try {
                            fis.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        return "下载失败";
    }
}
```

### index.ftl

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${info}</title>
</head>
<body>
<p>单文件上传</p>
<form action="upload" method="post" enctype="multipart/form-data">文件:<input type="file" name="file"/><input type="submit"/> </form>
<hr/>
<p>多文件上传</p>
<form action="batch" method="post" enctype="multipart/form-data">
    <p>文件1:<input type="file" name="file"/></p>
    <p>文件2:<input type="file" name="file"/></p>
    <p><input type="submit" value="上传"/> </p>
</form>
</body>
</html>
```



