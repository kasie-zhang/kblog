---
title: Puppeteer 使用教程
date: 2020-09-01
cover: /img/cover/20.webp
sidebar: 'auto'
categories:
- 教程
tags:
- 浏览器
- 自动化
publish: true
permalink: /article/20
---

> 第 20 篇文章
<!-- more -->

## 相关资源
[官方API文档](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md)

[中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)

[xpath,css select 定位元素](https://www.cnblogs.com/liushuxian/p/11390380.html)

## Puppeteer 简介

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 [DevTools](https://chromedevtools.github.io/devtools-protocol/) 协议控制 Chromium 或 Chrome。Puppeteer 默认以 [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) 模式运行，但是可以通过修改配置文件运行“有头”模式。

## 使用

### 安装

```shell
npm i puppeteer
# 或者
yarn add puppeteer
```

Note: 当你安装 Puppeteer 时，它会下载最新版本的Chromium（~170MB Mac，~282MB Linux，~280MB Win），以保证可以使用 API。 如果想要跳过下载，请阅读[环境变量](https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#environment-variables)。

### Demo1  - 网页截图

创建example.js

```js
const puppeteer = require('puppeteer');

(async ()=>{
    // 打开浏览器
    const browser = await puppeteer.launch({
        // 此处可以使用 false 有头模式进行调试, 调试完注释即可
        headless: false,
    });
    // 打开新的网页
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    // 转到新的站点
    await page.goto('https://sherrykeeper.gitee.io/blog/');
    // 截图
    await page.screenshot({path: 'c:\\Users\\张珂\\Desktop\\screenshot.png'});
    // 等待浏览器关闭
    await browser.close();
})();
```

在命令行中输入

``` shell
node example.js
```

得到截图：

![puppeteer_basics_1](/img/2020/puppeteer_basics_1.png)



### Demo2 - 创建一个PDF

[page.pdf()](https://github.com/puppeteer/puppeteer/blob/v1.10.0/docs/api.md#pagepdfoptions)

文件为 generatePdf.js

```js
const puppeteer = require('puppeteer');

(async ()=>{
    // 打开浏览器
    const browser = await puppeteer.launch({
        // 注意：使用page.pdf 时，应使用无头模式！！
        headless: true,
        defaultViewport: null
    });
    // 打开新网页
    const page = await browser.newPage();
    // 设置网页的长宽
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto('https://sherrykeeper.gitee.io/blog/',{waitUntil: 'networkidle2'});
    await page.waitFor(1000);
    // 创建pdf
    await page.pdf({path: 'c:\\Users\\张珂\\Desktop\\generatePdf.pdf', width:'1920px', height:'1080px', printBackground:true});

    await browser.close();
})();
```

在命令行中输入:

```shell
node generatePdf.js 
```

得到网页的PDF

![puppeteer_basics_2](/img/2020/puppeteer_basics_2.png)



waitUntil 代表什么时候才认为导航加载成功。

- load: window.onload事件被触发时候完成导航,某些情况下它根本不会发生。
- domcontentloaded: Domcontentloaded事件触发时候认为导航成功
- networkidle0: 在 500ms 内没有网络连接时就算成功(全部的request结束),才认为导航结束
- networkidle2: 500ms 内有不超过 2 个网络连接时就算成功(还有两个以下的request),就认为导航完成。

对比了下加载时长 `networkidle0> networkidle2>load>domcontentloaded`



注意：

- page.pdf() 只支持无头模式！

- 设置浏览器的长宽

  ```js
  await page.setViewport({
      width: 1920,
      height: 1080,
  });
  ```



