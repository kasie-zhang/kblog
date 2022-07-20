> Create: 10/10/2020
>
> Last Update: 7/20/2022

# **Spring Boot 实战 -- 文件上传下载**

# 1.文件上传

## 1.1.上传单个文件，以 Excel 为例

> `UploadPath.java` 存储文件上传前的名称，文件上传后的名称

```java
public class UploadPath {
    private String originFileName;
    private String newFileName;
    // 省略 get，set
}
```

> 上传单个文件

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

> 获取文件后缀

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

## 1.2.上传多个文件，以图片文件为例

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

# 2.文件上传下载

## 2.1.配置 freemarker

```protobuf
spring.freemarker.cache=false
spring.freemarker.charset=utf-8
spring.freemarker.template-loader-path=classpath:/templates/
spring.freemarker.suffix=.ftl
```

## 2.2.pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```

## 2.3.indexController

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

## 2.4.fileController

```java
@RestController
public class fileController {
    private static final String filePath = "~/Desktop/";
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

## 2.5.index.ftl

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${info}</title>
  </head>
  <body>
    <p>单文件上传</p>
    <form action="upload" method="post" enctype="multipart/form-data">
      文件:<input type="file" name="file" /><input type="submit" />
    </form>
    <hr />
    <p>多文件上传</p>
    <form action="batch" method="post" enctype="multipart/form-data">
      <p>文件1:<input type="file" name="file" /></p>
      <p>文件2:<input type="file" name="file" /></p>
      <p><input type="submit" value="上传" /></p>
    </form>
  </body>
</html>
```
