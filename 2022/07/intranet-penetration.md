> Create: 12/5/2020
>
> Last Update: 7/21/2022

# **内网穿透方法合集**

# 1.frp

## 1.1.使用前提

有一台云主机

## 1.2.实现效果

使用**远程桌面**访问内网中的机器。

## 1.3.使用教程

### 1.3.1.资源

[软件下载地址](https://github.com/fatedier/frp/releases)

[软件官方教程](https://gofrp.org/docs/)

### 1.3.2.服务器配置

拷贝文件`frps.exe`和`frps.ini`到服务器

配置`frps.ini`:

```conf
[common]
bind_port = 7000
```

在 CMD 中执行 `frp.exe` 以启动 frp 服务.

> [!TIP] 不要关闭 CMD 窗口,否则 frp 服务就停止了!

启动成功如下图:

![](https://api.zk123.top/link/repo1/img/2020/frp_1.png)

### 1.3.3.自己 Windows 配置

删除服务器所需的文件,仅保留如下文件

![](https://api.zk123.top/link/repo1/img/2020/frp_2.png)

**配置`frpc.ini`**:

```conf
[common]
# 服务器公网地址
server_addr = xxx.xxx.xxx.xxx
# 端口
server_port = 7000

[ssh]
# 类型
type = tcp
# 本地地址
local_ip = 127.0.0.1
# 本地端口
local_port = 3389
# 线上对外暴露端口
remote_port = 6000
```

## 1.4.使用远程桌面

1. 计算机一栏填写 `云主机地址:6000` 6000 是`frpc.ini`中所配置的 remote_port 的属性值

2. 用户名: Windows 登录用户的名称(在账户中查看)

3. 密码: PIN 码 (解锁计算机的密码)

![](https://api.zk123.top/link/repo1/img/2020/frp_3.png)

# 2.ngrok

[ngrok](https://ngrok.com/)是一款免费，易用的软件。ngrok 代理本机的某个服务端口实现公网访问。

```bash
# 代理 http 80 端口
ngrok http 3000

# 代理 tcp 22 端口
ngrok tcp 22
```
