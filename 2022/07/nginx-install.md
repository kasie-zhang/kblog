> Create: 7/21/2022
>
> Last Update: 7/21/2022

# **Nginx Install**

# 1.Arch Linux

## 1.1.下载 Nginx

进入[Nginx 官网](https://nginx.org/en/download.html)下载适合自己版本的 Nginx。

```bash
wget https://nginx.org/download/nginx-1.23.1.tar.gz
```

## 1.2.解压文件

解压缩文件

```bash
tar -zxvf nginx-1.23.1.tar.gz

cd nginx-1.23.1
```


## 1.3.配置预置环境

- GCC 编译器：`yay -S gcc`
- 正则表达式 PCRE 库：`yay -S pcre-devel`

```bash

./configure --
```
