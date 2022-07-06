---
title: Pycharm使用教程
date: 2019-03-08
cover: https://api.zk123.top/link/repo1/img/cover/1.webp
sidebar: 'auto'
categories:
- 教程
tags:
- Pycharm
- Python
- IDE
publish: true
permalink: /article/1
---
 
> 第 1 篇文章
<!-- more -->

直接通过jetbrain官网进行下载：[官网地址][1]

资金充足的同学可以付费订阅，资金不足的同学可以参照这位博主的[破解文章][2]
## 怎么通过pycharm软件下载一些使用插件？

Setting（设置）中找到 Plugins，然后在Marketplace下方进行相关插件的搜索。

![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODQzNjY2Ny0xNTFjOTEzM2UyYTA1YmU5LnBuZw)

## 推荐一些插件

### 1.IdeaVim 

使用了vim插件，基本就可以和鼠标说拜拜了，用熟vim之后，能大幅提升撸代码的效率

### 2.Material Theme UI

原生的pycharm界面有的小伙伴会觉得很丑，担忧不知道怎么去改变pycharm的UI， 这款插件能够完美的解决你的烦恼！从基本的页面设置，再到字体，颜色等等一应俱全，可以说是十分好用了

### 3.Markdown

能让你在pycharm的界面中直接使用Markdown，使用的方法是新建file，直接命名为（xxxxx.md)

 ![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODQzNjY2Ny02MmQ0ZGYxMzllZGQ0YTMwLnBuZw)

实际的效果如下:

![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODQzNjY2Ny00YTdjYzI0NzFhOTI4NmE5LnBuZw)

那么写好的文档怎么导出呢？	field->Save As ； 选择需要保存的地址即可

![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODQzNjY2Ny1hYWM3MmQ4ZWU0Mjk5NzNjLnBuZw)

### 4.Background Image Plus

允许用户使用图片作为背景；使用方法：

View->Set Background Image; 进行图片的选择和设置

![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODQzNjY2Ny0xYzI1MmQ3YzA2MWIyMDk1LnBuZw)

[参考博客](https://blog.csdn.net/stormdony/article/details/90261391)

### 5.pyinstall
实现将.py文件转化成.exe文件
#### 安装pyinstall插件
 在pycharm中打开Terminal，命令行中输入：

	pip install pyinstaller
		
接着可能会出现两种情况
	
 情况1：提示pip版本较老，需要升级pip
	
 解决方法：在Terminal的命令行中输入
	
	python -m pip install --user  --upgrade pip
	
情况2：没有报错，安装成功

#### 进行打包操作
 在Terminal命令行中输入：

	pyinstaller -F XXXX.py		# xxxx表示准备导出文件的名称
		
#### 查看生成文件
生成文件的位置：你存放python代码的文件夹下会生成build和dist两个新的文件夹

- 生成.exe文件就在dist文件夹中

- build文件夹存放生成exe的相关文件

### 6.you-get插件
通过视频、文件链接下载相关资源
#### 安装 you-get 插件
pycharm的Terminal界面中输入

    pip install you-get

#### 使用 you-get 插件

    you-get 视频链接

下载位置一般在Pycharm的Project位置

## pycharm必备快捷键
	序号	 快捷键						   作用

	1	CTRL + ALT + SPACE				快速导入任意类

	2	CTRL + SHIFT + ENTER			代码补全

	3	SHIFT + F1						查看外部文档
	
	4	CTRL + Q						快速查找文档

	5	CTRL + P						参数信息（在方法中调用的参数）

	6	CTRL + MOUSE OVER CODE			基本信息
	
	7	CTRL + F1						显示错误或警告的描述

	8	CTRL + O						重载方法
	
	9	CTRL + ALT + T					包裹代码
	
	10	CTRL + /						单行注释
	11	CTRL + SHIFT + /				块注释
	
	12	CTRL + W						逐步选择代码（块）

	13	CTRL + SHIFT + W				逐步取消选择代码（块）

	15	CTRL + SHIFT + [				从当前位置选择到代码块的开始
	16	CTRL + SHIFT + ]				从当前位置选择到代码块的结束
	
	17	ALT + ENTER						代码快速修正

	18	CTRL + ALT + L					代码格式标准化
	
	19	CTRL + ALT + O					最佳化导入

	20	CTRL + ALT + I					自动缩进

	21	CTRL + SHIFT + V				历史复制粘贴表
	
	22	CTRL + D						复制当前代码行/块
	23	CTRL + Y						删除当前代码行/块
	
	24	CTRL + SHIFT + U				字母大写

	25	CTRL +DELETE					向后逐渐删除
	26	CTRL + BACKSPACE				向前逐渐删除

	27	CTRL + NUMPAD+/-				代码块展开/折叠
	28	CTRL + SHIFT + NUMPAD+			所有代码块展开叠
	29	CTRL + SHIFT + NUMPAD-			所有代码块折叠
	
	30	CTRL + F4						关闭活动编辑窗口

	31  Ctrl + Enter       				在下方新建行但不移动光标；

	32  Ctrl + N            			查找所有的类的名称
	
	33  Alt + Shift + C       			快速查看您最近对项目的更改。
	
	34   通过拖动鼠标指针轻松进行列选择，同时保持按下Alt键。 alt键同时选择多行，同时对多行进行输入

当pycharm的某些快捷键不能使用时，很有可能是某些正在运行的软件与其存在热键冲突，像是比较常见的搜狗输入法抢占了 ctrl + shift + F, 以及QQ也会导致某些键位不能正常使用。


## 怎么通过pycharm将代码上传到码云上
许多博客写的都不全，当初是小白的我也是很懵逼，看不懂博主们的步骤，所以我将写一个十分完整详细的博客，教你如何将pycharm代码上传到码云。

### 1.创建码云账号
创建自己的码云账号，并且建立一个仓库

### 2.获取仓库地址[^1]
下面要用到，所以顺着步骤先做了
- 1.点击克隆/下载按钮
- 2.复制仓库的地址
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sR0g4UC5qcGc)
### 3.下载gitee插件
pycharm菜单栏打开setting，左侧选择Plugins,在Marketplace搜索gitee，安装插件，安装完成后重启pycharm。
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sSjNyRC5qcGc)

### 4.登录码云账号
setting选择 Version Control中的Gitee
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sSnJxZy5qcGc)
点击右上角的加号来登录,账号和密码就是你码云的账号和密码
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sSnlaUS5qcGc)

### 5.设置本地仓库
本地仓库是每次代码提交的地方，将代码存至本地仓库后再pull到码云上
打开VCS，选中Import into Version Control，再选中 Creat Git Respository![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sWTlkSC5wbmc)
在硬盘上建立一个文件夹存储python文件
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sWUVTUC5qcGc)

### 6.将想要上传的文件+Add
+Add相当于是把文件放到一个缓冲区，你可以重复选择多个文件进行Add操作
鼠标右键当前选中文件，选中Git，选中Add
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzIwL21KNkVTeC5wbmc)

### 7.提交要上传的文件
左上角可以选择需要上传的文件，显示的文件即刚才进行Add操作的文件，你可以在Commit Message中对于这次上传进行备注。最后确定好后，点击下方的commit
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzIwL21KNlI3NC5qcGc)

### 8.进行pull操作
选中Git，选中Respository，选中Push
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sWWh0QS5wbmc)
弹出Push Commits(这是绑定了码云仓库地址后），没有绑定地址的会弹出绑定仓库地址的提示框，提示框中的网址就是上面步骤中复制的：忘记网址怎么获取的同学于可以拉到文章底部，定位到相关步骤！
[^1]:仓库地址

![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sWUlwdC5qcGc)
提示push成功
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sdHVqSy5qcGc)
去码云查看是否上传成功
![](https:/https://api.zk123.top/link/repo1/imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzA4LzE5L21sdDNBSC5qcGc)
显示上传成功！
这就是pycharm上传码云的全部流程了。


## 提升插件的下载速度和成功率
python中的pip是官方自带的源，国内在使用pip进行第三方插件安装的时候十分缓慢，而且经常下载到一半报错，
所以最好是更换成中国国内的源地址。

    清华: https://pypi.tuna.tsinghua.edu.cn/simple
    
    豆瓣: http://pypi.douban.com/simple/
    
    阿里: http://mirrors.aliyun.com/pypi/simple/

## 常用参数集合
		
	–icon=图标路径（pyinstaller -F --icon=xx.ico XXXX.py）
	-F(注意大写)  打包成一个exe文件
	-w 使用窗口，无控制台
	-c 使用控制台，无窗口
	-D 创建一个目录，里面包含exe以及其他一些依赖性文件 
	
<a href="http://zk123.top/src/putty.exe">测试下载</a>
 
<a href="http://zk123.top/src/Alan Walker - Fade.mp3"  target="_blank">Alan Walker - Fade</a>

<a href="http://zk123.top/src/vedio.mp4" target="_blank">vedio</a>



[1]: https://www.jetbrains.com/
[2]: https://blog.csdn.net/u014044812/article/details/78727496

