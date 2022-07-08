> 最后更新于 7/6/2022

# 1.安装使用 Docsify

## 1.1.安装 Docsify

全局安装 `docsify-cli` 工具。

```bash
npm i docsify-cli -g
```

## 1.2.Clone 仓库

克隆 KBlog 仓库。

```bash
git clone https://hub.fastgit.xyz/kasie-zhang/kblog.git kblog
```

## 1.3.启动 Docsify 服务

克隆 KBlog 仓库后，进入 kblog 文件夹，执行以下命令来启动本地服务器，实现实时预览。默认访问地址 http://localhost:3000 。

```bash
docsify serve
```

# 2.Docsify 语法

## 2.1.Markdown 高亮

Markdown 基于 Prism 实现代码高亮，支持的语言如下：

- `markup`,`html`,`xml`,`svg`,`mathml`,`ssml`,`atom`,`rss`、`md`
- `css`
- `clink`,`c`,`cpp`,`csharp`
- `js`、`java`,`go`,`python`,`lua`,`ruby`,`sql`,`swift`
- `makefile`,`matlab`,`nginx`,`regex`,`bash`

更多语言支持请查看 [Prism JS CDN](https://cdn.jsdelivr.net/npm/prismjs@1/components/)。

## 2.2.容器

### 2.2.1.Note

```md
> [!NOTE]
> This is a note
```

> [!NOTE]
> This is a note

### 2.2.2.Tip

```md
> [!TIP]
> This is a tip
```

> [!TIP]
> This is a tip

### 2.2.3.Warning

```md
> [!WARNING]
> This is a warning
```

> [!WARNING]
> This is a warning

### 2.2.4.Attention

> [!ATTENTION]
> This is an attention

> [!COMMENT]
> This is an attention

## 2.3.嵌入文件

使用 docsify 4.6 能够嵌入任何类型的文件。

你可以将这些文件作为视频、音频、iframe 或代码块嵌入，甚至 Markdown 文件可以直接嵌入到文档中。

### 2.3.1.嵌入 Markdown

例如，嵌入一个 Markdown 文件，你只需这样做：

```md
[fileName](filePath/fileName.md ":include")

比如，将博客首页插入进来

[Navbar](https://cdn.jsdelivr.net/gh/kasie-zhang/kblog@master/README.md ":include")
```

[Navbar](https://cdn.jsdelivr.net/gh/kasie-zhang/kblog@master/README.md ":include")

---

### 2.3.2.嵌入 Bilibili

直接从 Bilibili 视频下方复制内嵌链接，添加属性 `height="650"` 即可，具体效果如下，只能 360P 普通清晰度，和 Youtube 完全没得比。

<iframe src="//player.bilibili.com/player.html?aid=35199206&bvid=BV14b411w7La&cid=61680672&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="650"> </iframe>

### 2.3.3.嵌入 Youtube

直接从 Youtube 视频下方复制内嵌链接，微调 `height` 属性即可。

<iframe width="560" height="650" src="https://www.youtube.com/embed/UF8uR6Z6KLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 2.3.4.嵌入音频

能够内嵌 `mp3`,`flac` 格式的音频。

```md
[晴天-周杰伦](https://cdn.jsdelivr.net/gh/kasie-zhang/static-file-repo1/music/m_1.mp3 ":include :type=audio controls width=100%")
```

[晴天-周杰伦](https://cdn.jsdelivr.net/gh/kasie-zhang/static-file-repo1/music/m_1.mp3 ":include :type=audio controls width=100%")

### 2.3.5.嵌入视频

能够内嵌 `mp4`,`mkv` 格式的视频。

```md
[filename]](vedio-link ':include :type=video width=100% height=600px controls')
```

[酒女](https://drive.zk123.top/api/v3/file/source/35664/Work.Later.Drink.Now.S01E01.1080p.WEB-DL.H264.AAC-AppleTor.mp4?sign=qezCyYJV6691Nr4xjz4G7XEWVb3lybvUBB3pdrToZGg%3D%3A0 ":include :type=video width=100% height=600px controls")

### 2.3.6.嵌入 PDF

要求 PDF 链接必须是直链。

```md
```pdf
Link ```
```

```pdf
https://static.r2coding.com/r2_static/pdf/c.pdf
```