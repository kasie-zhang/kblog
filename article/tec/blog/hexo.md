---
title: hexo搭建个人博客
date: 2020-09-05
cover: /img/cover/22.webp
sidebar: 'auto'
categories:
- 教程
tags:
- 搭建博客
- Hexo
publish: true
permalink: /article/22
---

> 第 22 篇文章
<!-- more -->

## 使用hexo搭建博客
### 第一步 - 安装hexo

```bash
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

## 第二步 - 安装其他主题

```bash
git clone https://gitclone.com/github.com/viosey/hexo-theme-material.git themes/material
```

主题安装完成后，删除默认主题文件夹——landscape

然后进入material文件夹中，删除.git文件（整个项目仅需要一个.git仓库）

## 第三步 - 上传至gitee远程仓库

首先在码云上建立hexo仓库；

```bash
# 设置gitee登录信息
git config --global user.name "用户名"
git config --global user.email "邮箱"

# 初始本地化仓库
git init

# 添加远程仓库
git remote add origin git@gitee.com:xxx/hexo.git

# 添加hexo插件
yarn add hexo-deployer-git
```

更改_config.yml 设置，添加以下信息

```yml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://gitee.com/xxx/hexo.git
  branch: master
```

使用 **hexo.deploy** 命令部署到gitee。

然后使用gitee page 部署到线上。