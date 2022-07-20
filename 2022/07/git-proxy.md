> Create: 12/30/2020
>
> Last Update: 7/19/2022

# **Git 代理设置**

GitHub 经常存在访问不稳定情况，以下介绍两种解决方式。

# 1.镜像网站

无前置条件，采用镜像网站，利用 CDN 加速实现快速访问。

编辑 `~/.gitconfig` 文件（如果不存在，就新建一个），添加以下配置：

```conf
[url "https://hub.fastgit.xyz/"]
	insteadOf = https://github.com/
```

# 2.代理

## 2.1.安装 proxychains

**需要本机有代理设置，基于 proxychians 给终端设置代理。**

首先，安装 proxychains，以 archlinux 为例，在终端中输入以下命令：

```bash
sudo yay -S proxychains
```

## 2.2.配置 proxychains

安装完成后配置一下代理。

```bash
sudo vim /etc/proxychains.conf
```

定位到文件尾，添加如下配置：

> [!TIP] 注意，添加的是 SOCK5 的代理，端口号要对应

```conf
socks5 127.0.0.1 1090
```

编辑完毕，保存文件并退出，配置完毕。

## 2.3.使用 proxychains

在使用的命令前添加 `proxychains` 就可以实现代理了，比如：

```sh
proxychains git clone xxx
```
