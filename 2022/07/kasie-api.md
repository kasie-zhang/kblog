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

