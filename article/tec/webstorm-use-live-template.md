---
title: WebStorm 启用 LiveTemplate
date: 2021-07-30
cover: /img/cover/91.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- WebStorm
- IDE
- 配置
publish: true
permalink: /article/91
---

> 第 91 篇文章
<!-- more -->

WebStorm 允许用户自定义 Live Template， 用好了 Live Template 能够很大程度提升编码体验。
下面介绍如何设置Live Template.
## 建立模板
:::tip 建立模板
打开 `设置` - `Live Template（实时模板）`

点击 `+` 

建立一个 `模板组`

在新建立的模板组中点击 `+` 新建一个动态模板
:::


![](/img/2021/live_template_1.png)

## 配置模板
:::tip 编辑模板
模板格式如下：
```md
---
title: $Title$
date: $date$
sidebar: 'auto'
categories:
 - $categories$
tags:
 - $tags$
publish: true
---

> 第 $NUM$ 篇文章
```
使用 `$VAR$` 占位符来充当变量
:::

![](/img/2021/live_template_2.png)
点击 `编辑变量` 来配置 `变量默认值`、 `变量表达式`、`如果定义则跳过`。 

部分常用表达式如下表，更多内容参照 [官方文档](https://www.jetbrains.com/help/webstorm/template-variables.html#predefined_functions)
|  Function  |  Description  |
| ---- | ---- |
|   `date([format])`   | Returns the current system date.<br />By default, without a parameter, it returns the date in the current system format. To use a different format, provide a parameter according to the [SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) specification. For example, the `date("Y-MM-d, E, H:m")` returns the date formatted as `2020-02-27, Thu, 16:11`. |
| `fileNameWithoutExtension()` | Returns the name of the current file without its extension. |
| `fileName()` | Returns the name of the current file with its extension. |
| `filePath()` | Returns the absolute path to the current file. |
| `lineNumber()` | Returns the current line number. |
| `user()` | Returns the name of the current user. |

## 启用模板
![](/img/2021/live_template_3.png)
点击 `更改`, 给Live Template 设置所适用的范围，若仅勾选 JSON ，则该 Live Template 只有在以 `.json` 为后缀的文件
中可以使用。


## 效果展示
![](/img/2021/live_template_4.png)

完结撒花 :cherry_blossom::cherry_blossom:!