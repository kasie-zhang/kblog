---
title: Vuepress中那些优质Markdown插件
date: 2019-04-22
cover: https://api.zk123.top/link/repo1/img/cover/3.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Markdown
- 插件
publish: true
permalink: /article/3
---

> 第 3 篇文章
<!-- more -->

## 前言
插件需要在config.js中配置
```javascript
markdown: {  
    extendMarkdown: md => {
            // 使用更多的 markdown-it 插件!
            md.use(require('markdown-it-xxx'))
    }
}
```
## markdown-it-abbr
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-abbr' target='_blank'>markdown-it-abbr</a>生成缩写标签
```markdown
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
```
效果：
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.
:::

## markdown-it-sub
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-sub' target='_blank'>markdown-it-sub</a>生成下标标签
```markdown
H~2~0
```
效果：
H~2~0
:::

## markdown-it-sup
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-sup' target='_blank'>markdown-it-sup</a>生成上标标签
```markdown
15^th^
```
效果：
15^th^
:::

## markdown-it-mark
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-mark' target='_blank'>markdown-it-mark</a>生成高亮标签
```markdown
==高亮标签==
```
效果：
==高亮标签==
:::


## markdown-it-kbd
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-kbd' target='_blank'>markdown-it-kbd</a>生成键位标签
```markdown
[[a]]
```
效果：
[[a]]
:::


## markdown-it-underline
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-underline' target='_blank'>markdown-it-underline</a>生成下划线
```markdown
_下划线_
```
效果：
_下划线_
:::

## markdown-it-emoji
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-emoji' target='_blank'>markdown-it-emoji</a>输入表情符号
```markdown
:100: :smiley:
```
效果：
:100: :smiley:

<a href='https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json' target='_blank'>更多表情列表</a>
:::

## markdown-it-footnote
:::tip 使用<a href='https://www.npmjs.com/package/markdown-it-footnote' target='_blank'>markdown-it-footnote</a>生成脚注
```markdown
Here is a footnote reference,[^1] and another.[^2]

[^1]: Here is the footnote.

[^2]: Here is the footnote.

```
效果：
Here is a footnote reference,[^1] and another.[^2]

[^1]: Here is the footnote.

[^2]: Here is the footnote.

:::

## 自定义容器
:::tip 提示
这是一个提示
:::

:::warning &nbsp
这是一个警告
输入&nbsp表示一个空格
:::

:::danger danger
这是一个危险警告
:::

:::details 点击查看代码
详细信息
:::

## 代码高亮
:::details 点击查看代码
    ``` js
    export default {
      name: 'MyComponent',
      // ...
    }
    ```
:::

实现效果：
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
VuePress 使用了  [Prism](https://prismjs.com/) 来为 markdown 
中的代码块实现语法高亮。Prism 支持大量的编程语言，
你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：

