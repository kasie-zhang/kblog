> Create: 7/13/2022
>
> Last Update: 7/13/2022

---

# Kasie API

本文主要介绍我编写的 API, 包括 API 功能以及如何调用。

API Base Link: `https://api.zk123.top`。

---

## URL 编码解码

| 功能         | 请求类型 | API 调用方式             |
| ------------ | -------- | ------------------------ |
| GBK Encode   | GET      | `/encode/gbk?url=[url]`  |
| GBK Decode   | GET      | `/decode/gbk?url=[url]`  |
| UTF-8 Encode | GET      | `/encode/utf8?url=[url]` |
| UTF-8 Decode | GET      | `/decode/utf8?url=[url]` |

---

## OneDrive Direct Link Parser

输入 OneDrive 分享链接，输出下载页面。

> GET 请求

调用方式：`/od?link=[link]`

返回页面如下图所示：

![](https://api.zk123.top/link/repo1/img/2022/7-13-01.png)

---

## 每日一图

---

### Bing

获取 Bing 的每日一图

> GET 请求

调用方式：`/bing`

返回页面如下图所示：

![](https://api.zk123.top/bing)

---

### NASA

[NASA API 中心](https://api.nasa.gov/index.html#apply-for-an-api-key)

---

#### 普通品质

> GET 请求

调用方式：`/nasa`

返回图片如下所示：

![](https://api.zk123.top/nasa)

---

#### 高品质

> GET 请求

调用方式：`/nasahq`

返回图片如下图所示：

![](https://api.zk123.top/nasahq)

---

## GitHub Static File Repo

访问 GitHub Repo 中的静态文件，根据文件的类型，分为以下几种访问方式。

---

### Image

- Image: `/link/{repo}/img/{folder}/{filename}`

![](https://api.zk123.top/link/repo1/img/personal/bg1.webp)

---

### Music

- Music: `/link/{repo}/music/{filename}`

[晴天 - 周杰伦](https://api.zk123.top/link/repo1/music/m_1.mp3 ":include")

---

### PDF

- Pdf: `/link/{repo}/pdf/{filename}`

```pdf
https://api.zk123.top/link/repo1/pdf/SpringBoot-Roadmap.pdf
```

---

### Script

- Script: `/link/{repo}/script/{folder}/{filename}`

例如：[Rename.py](https://api.zk123.top/link/repo1/script/python/rename.py)

---

## 短链

> GET 请求

调用方法：`/s?link=[link]`
