> Create: 11/13/2020
> 
> Last Update: 7/15/2022

# ARP 断网攻击
## 实现原理
ARP攻击仅能在局域网进行，无法对外网进行攻击。

ARP攻击就是通过伪造IP地址和MAC地址实现ARP欺骗，能够在网络中产生大量的ARP通信量使网络阻塞，攻击者只要持续不断的发出伪造的ARP响应包就能更改目标主机ARP缓存中的IP-MAC条目，造成网络中断或中间人攻击。

## 1. 下载镜像和虚拟机
`Kali Linux 镜像` , `VMWare WORKSTATION`

[Kail Linux 官网下载地址](https://www.kali.org/downloads/)

## 2. 安装虚拟机
[安装教程](https://blog.csdn.net/qq_40950957/article/details/80468030)

## 3. 执行攻击
### 3.1 查看本机ip和MAC地址
![](https://api.zk123.top/link/repo1/img/2020/arp_1.png)

IP：`192.168.1.105`   MAC地址：`64-5D-86-66-5C-3D`

### 3.2 查看虚拟机的`端口号`和`IP地址`

![](https://api.zk123.top/link/repo1/img/2020/arp_2.png)

可见端口号为`eth0`,IP地址为`192.168.1.128`, MAC地址为:`00:0c:29:76:61:55`

注意：必须确保被攻击设备的网段 和 虚拟机网段相同

[设置虚拟机和本机为同一网段](https://www.fujieace.com/vmware/b.html)


### 3.3 使用 `fping` 查看当前局域网中活动的设备

![](https://api.zk123.top/link/repo1/img/2020/arp_3.png)

### 3.4 攻击前确保 被攻击设备已联网

`被攻击设备 PING baidu.com`

![](https://api.zk123.top/link/repo1/img/2020/arp_4.png)

### 3.5 执行攻击
`sudo arpspoof -i eth0 -t 192.168.1.105 192.168.1.1`

## 4. 查看攻击效果
测试被攻击设备能否联网：

![](https://api.zk123.top/link/repo1/img/2020/arp_5.png)

显然，被攻击设备已无法进行正常通讯。

拦截过程：

![](https://api.zk123.top/link/repo1/img/2020/arp_6.png)

:rainbow::rainbow: