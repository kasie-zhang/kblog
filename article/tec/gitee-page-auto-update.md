---
title: 基于 Puppeteer 实现Gitee自动部署更新
date: 2020-09-01
cover: /img/cover/19.webp
sidebar: 'auto'
categories:
- 教程
tags:
- Puppeteer
- 自动化
- JavaScript
publish: true
permalink: /19
---

> 第 19 篇文章 
<!-- more -->

>众所周知，国内GitHub加载速度实在是不太行，而大多数开发者会使用GitHub的GitHub Page 功能来搭建博客，因此博客的访问速度会受到影响（影响很大!）。为了解决这个问题，我决定今天将博客放到Gitee上进行部署。

## 参考资源

[blog](https://yang0033.gitee.io/2020/07/07/gitee-page-%E6%97%A0%E6%B3%95%E8%87%AA%E5%8A%A8%E6%9B%B4%E6%96%B0/)

[Puppeteer 入门教程](https://www.jb51.cc/js/32426.html)

[Puppeteer 实操视频](https://www.bilibili.com/video/av74296450?p=1&t=132)

## 部署存在的问题

以前Gitee Page 存在付费版，不仅能够自定义域名，而且能够自动更新部署，但是最近付费版功能由于某些原因下线了，所以只能自己来实现自动更新功能了。

## 自动化解决方案

使用 puppeteer 操作浏览器进行更新按钮点击。

代码如下：

```js
// 此处安装版本为 1.8.0
const puppeteer = require('puppeteer'); 

(async () => {
    const browser = await puppeteer.launch({
        // 此处可以使用 false 有头模式进行调试, 调试完注释即可
          headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://gitee.com/login');
    // 1. 选中账号控件
    let accountElements = await page.$x('//*[@id="user_login"]') // 此处使用 xpath 寻找控件，下同
    // 2. 填入账号
    await accountElements[0].type('你的 gitee 账户')
    // 3. 选中密码控件
    let pwdElements = await page.$x('//*[@id="user_password"]')
    // 4. 填入密码
    await pwdElements[0].type('你的 gitee 密码')
    // 5. 点击登录
    let loginButtons = await page.$x('//*[@id="new_user"]/div[2]/div/div/div[4]/input')
    await loginButtons[0].click()
    // 6. 等待登录成功
    await page.waitFor(1000)
    await page.goto('你的 gitee page 更新按钮页面'); // 比如： https://gitee.com/yang0033/hexo-blog/pages
    // 7.1. 监听步骤 7 中触发的确认弹框，并点击确认
    await page.on('dialog', async dialog => {
        console.log('确认更新')
        dialog.accept();
    })
    // 7. 点击更新按钮，并弹出确认弹窗
    let updateButtons = await page.$x('//*[@id="pages-branch"]/div[7]')
    await updateButtons[0].click()
    // 8. 轮询并确认是否更新完毕
    while (true) {
        await page.waitFor(2000)
        try {
            // 8.1 获取更新状态标签
            deploying = await page.$x('//*[@id="pages_deploying"]')
            if (deploying.length > 0) {
                console.log('更新中...')
            } else {
                console.log('更新完毕')
                break;
            }
        } catch (error) {
            break;
        }
    }
    await page.waitFor(500);
    // 10.更新完毕，关闭浏览器
    browser.close();
})();
```

使用之前，需要在npm环境下安装puppeteer组件。

安装代码：

```shell
yarn add puppeteer
```



安装完成后，新建 giteeUpdate.js 文件，填入上述代码，在pakage.json文件中添加以下代码：

```markdown
  "scripts": {
      "gitee": "node giteeUpdate.js"
  },
```

然后在 deploy.sh 文件中添加以下代码：

```shell
npm run gitee
```

## 实现效果

打包好项目通过git上传到GitHub以及Gitee以后，实现giteePage自动更新。

完结，撒花​!:rainbow: :cherry_blossom:

