> Create: 12/20/2022
>
> Last Update: 7/19/2022

# **lrzsz —— 实现文件传输**

之前向 Linux 服务器传输文件需要借助 WinSCP 实现，而命令操作又要通过 XShell 来完成，打开两个软件实在不便，现在可以借助
`lrzsz` 工具包实现 XShell 文件传输。

# **安装 lrzsz 包**

首先，在 Linux 服务器上安装 `lrzsz` 包

```shell
yum install lrzsz
```

rz，sz 是便是 Linux/Unix 同 Windows 进行 ZModem 文件传输的命令行工具，
所以要在 Xshell 连接属性中的设置上传协议为 Zmodem 和接受的文件路径等，如下图所示：

![](https://api.zk123.top/link/repo1/img/2021/xshell-1.png)

# **使用方法**

1. 运行 `rz` 指令

- 本机 ----> 远程服务器（服务器接收文件）
- XShell 会弹出文件选择对话框
- 也可以把文件直接拖到 XShell 中实现上传（不能是文件夹）

2. 运行 `sz [file]` 指令

- 远程服务器 ----> 本机（本机接收文件）
