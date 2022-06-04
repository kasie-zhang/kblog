---
title: Ubuntu 安装使用 MWget | Axel
date: 2021-12-29
cover: /img/cover/99.webp
sidebar: 'auto'
categories:
- Tool
tags:
- MWget
- Ubuntu
- 下载工具
publish: true
permalink: /99
---
> 第 99 篇文章
<!-- more -->

:::tip
Multi Wget 多线程下载工具
:::
<!-- more -->

## MWget
### 安装
```shell
# 拷贝 mwget 库
git clone https://github.com/kasie-zhang/mwget.git

cd mwget

# 检查环境是否已配置，没有报错则执行 make
./configure

# ERROR: The pkg-config script could not be found or is too old
apt install pkg-config

# ERROR: No package ‘openssl’ found
apt install libssl-dev

# ERROR: Your intltool is too old.  You need intltool 0.35.0 or later.
apt install intltool

make

make install

# 安装完成
```

### 用法
```shell
mwget -n 10 "URL"
```

```markdown
用法： mwget [选项]....[URL]
选项：
  -b,  --debug          调试模式，显示调试信息
  -c,  --count=num      设置重试次数为[num],不限制次数设置为“0“，默认设置为“99”。
  -d,  --directory=dir  设置本地目录为[dir],默认值为当前目录。
  -f,  --file=file      重命名下载后文件为[file]
  -h,  --help           显示帮助信息。
  -i,  --interval=num   设置FTP重试期限为[num]秒，默认为“5“。
  -n,  --number=num     设置下载的线程数，默认开4个线程。
  -r,  --referer=URL    使用“Referer: [URL]”在HTTP头中欺骗服务器。
  -t,  --timeout=num    设置超时时间为[num]秒，默认设置是“30”。
  -v,  --version        显示mwget的版本，然后退出。
  -x,  --proxy=URL      设置代理 [URL]
```

## Axel
### 安装
```shell
git clone https://hub.fastgit.org/kasie-zhang/axel.git

cd axel

./configure

make && make install

vim /etc/profile

# 添加配置
export PATH=$PATH:/home/zhangke/workspace/axel-2.17.10
# 添加后，保存退出，用 source 应用修改
source /etc/profile
```

### 使用
```md
--max-speed=x           -s x    Specify maximum speed (bytes per second)
--num-connections=x     -n x    Specify maximum number of connections
--output=f              -o f    Specify local output file
--search[=n]            -S[n]   Search for mirrors and download from n servers
--ipv4                  -4      Use the IPv4 protocol
--ipv6                  -6      Use the IPv6 protocol
--header=x              -H x    Add HTTP header string
--user-agent=x          -U x    Set user agent
--no-proxy              -N      Just don't use any proxy server
--insecure              -k      Don't verify the SSL certificate
--no-clobber            -c      Skip download if file already exists
--quiet                 -q      Leave stdout alone
--verbose               -v      More status information
--alternate             -a      Alternate progress indicator
--help                  -h      This information
--timeout=x             -T x    Set I/O and connection timeout
--version               -V      Version information
```