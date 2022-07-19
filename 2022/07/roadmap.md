> Create: 6/22/2022
>
> Last Update: 7/19/2022

# Build a Roadmap by Docsify

# 1.本文目标

通过 Docsify 搭建自己的知识网络。

# 2.工具选择 - Docsify

[Docsify](https://docsify.js.org/)是一款基于 Vue 开发的静态文章生成器，有以下几个特征：

- Simple and light-weight
- No statically built html files
- Multiple themes

当前市场上有很多静态文档生成工具，hexo、vuepress、wordpress 等等，我期望构建器满足下几点要求：

- 简单、轻量
- 不需要复杂的界面
- 支持导航栏
- 支持 Markdown 语法

Docsify 在满足了以上几点要求的基础上是最轻量的，成为了我搭建知识网络的第一选择。

# 3.安装使用 Docsify

## 3.1.环境配置

Docsify 仅需要当前系统中有 `npm` 环境，使用以下命令查看当前系统中 `npm` 的版本。

```shell
npm -v
```

## 3.2.安装 Docsify

使用以下命令全局安装 Docsify。

```shell
npm install -v docsify
```

## 3.3.使用 Docsify

首先需要新建一个工作目录，然后初始化 `docsify`。

```shell
# make a directory
mkdir roadmap

# initialize，generate 3 files: index.html、README.md、.nojekyll
docsify init

# preview your site
docsify serve
```

完成以上步骤，访问 `http://localhost:3000` 能够看到构建的前端页面。

# 4.配置 Docsify

编辑项目目录下的 `index.html` 文件。

```md
    window.$docsify = {
      name: 'Kasie Zhang\'s Roadmap',
      repo: '',
      coverpage: true
    }
```

在该文件夹中增添键值对。

## 4.1.启用封面

在 `index.html` 文件中添加:

```md
coverpage: true
```

然后新建 `_coverage.md`，该文件的内容就是封面的呈现效果，下面是 `_coverage.md` 的内容。

```md
![logo](./src/roadmap.png)

书山有路勤为径，学海无涯苦作舟！

在互联网蓬勃发展的时代，借助互联网我们能方便地获取海量资源。

获取资源已不是难事，怎样合理利用资源才是我们应该思考的问题。

此网站旨在建立一个清晰有条理的知识库，并不断扩充、完善它。

知识库涵盖一系列清晰的学习路线、高效的工具、读书分享等。

[**Start Reading**](README.md)
```

## 4.2.启用顶部导航栏

在 `index.html` 文件中添加:

```md
loadNavbar: true
```

## 4.3.添加 Docsify 插件

Docsify 拥有丰富的[插件库](https://docsify.js.org/#/awesome?id=plugins)。

- [docsify-count](https://github.com/827652549/docsify-count) - 添加字数统计
- [docsify-copy-code](https://github.com/jperasmus/docsify-copy-code) - 添加 markdown 代码块复制
- [docsify-tabs](https://jhildenbiddle.github.io/docsify-tabs/#/) - 显示 markdown 选项卡式内容
- [docsify-pdf-embed](https://github.com/lazypanda10117/docsify-pdf-embed) - 嵌入 pdf
- [docsify-plugin-flexible](https://github.com/fzankl/docsify-plugin-flexible-alerts) - markdown 样式
- [docsify-footer-enh](https://github.com/erickjx/docsify-footer-enh) - 页脚工具
- [docsify-progress](https://github.com/HerbertHe/docsify-progress) - 进度条

# 5.正式编写文件

至此，Docsify 配置完成，可以愉快的编写正文内容了。
