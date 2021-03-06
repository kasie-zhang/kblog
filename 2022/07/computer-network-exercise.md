> Create: 12/28/2020
>
> Last Update: 7/20/2022

# **计算机网络实验【汇总】**

## 资源

[思科模拟计算机网络实验汇总](https://drive.zk123.top/api/v3/file/source/918/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E5%AE%9E%E9%AA%8C.zip?sign=l-aj2z9s22R_z4yeKbZirRci-C8htfBS7Mkd2Z7-_0k%3D%3A0)

## 1. 传输介质

- **传输介质:**

  - 同轴电缆、细缆、粗缆、双绞线、光导纤维

- **直连线和交叉线使用场景的区别**

  - `直连线`：电脑连接交换机
  - `交叉线`：电脑连接电脑

- **制作双绞线步骤**

1. 拨线（3-5cm）

2. 调换导线顺序

3. 插入水晶头

4. 压实

5. 测线仪测试

- EIA-586 标准(制作交叉线)

![](https://api.zk123.top/link/repo1/img/2020/computer_network_EIA-586.png)

1、2 号线 负责`发送数据`

3、6 号线 负责`接受数据`

## 2. Dynamic Host Configuration protocol(动态主机配置协议)

### 实验

1. **服务器配置**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_1.png)

2. PC 设置动态获取 IP 地址

3. 连通性测试

## 3. Domain name System(域名解析系统)

- **域名解析过程**(反复查询解析)

  - 客户机将指定的域名放在一个 DNS 请求中,并发送给局域网中的 DNS 服务器 A
  - DNS 服务器 A 收到请求

    - 发现指定的域名属于自己的管辖范围,则直接回答这个 DNS 请求. 解析结束

    - 发现指定的域名不属于自己的管辖范围, 则改 DNS 服务器 A 成为另一个 DNS 服务器 B 的客户机,向 DNS 服务器 B 发送 DNS 域名解析请求
      - 循环直到域名解析成功, DNS 服务器 B 向 A 发送解析结果,A 向客户机发送解析结果,并保留域名解析的副本

- **DNS 性能优化**
  - 缓存
    - 将查找到的新域名解析结果存储至本地缓存,以提高域名解析响应速度
  - 复制
    - 根服务器存在多个副本, 为客户机请求提供最快速的响应

### 实验

1. **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_2.png)

2. 实验步骤

   - 1. 建立 DNS 服务器, 配置服务器的`IP地址`、`Subnet Mask`、`GateWay`、`DNS Server`

   - 2. 配置 PC1、PC2， 分别设置 `IP地址`、`Subnet Mask`、`GateWay`、`DNS Server`

   - 3. 连通性测试， `Ping www.zk.com`

     ![](https://api.zk123.top/link/repo1/img/2020/computer_network_3.png)

## 4. Internet Information Server(服务管理器)

### 实验

1. **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_4.png)

2. **搭建 Web 服务**

- 1. 建立 Web 服务器。 配置相关信息。

  ![](https://api.zk123.top/link/repo1/img/2020/computer_network_5.png)

- 2. 建立 DNS 服务器， 配置相关信息

  ![](https://api.zk123.top/link/repo1/img/2020/computer_network_6.png)

- 3. 设置 PC1

  ![](https://api.zk123.top/link/repo1/img/2020/computer_network_7.png)

- 4. 访问站点， 验证 IIS 服务和 DNS 服务是否成功开启
     ![](https://api.zk123.top/link/repo1/img/2020/computer_network_8.png)

1. **搭建 FTP 站点**

步骤与搭建 Web 服务类似

- 命令行中输入 `ftp www.zk.com` 访问站点; 进入成功后,使用 `dir` 列出所有文件
  ![](https://api.zk123.top/link/repo1/img/2020/computer_network_9.png)

## 5. Switch 基本配置

工作在数据链路层, 独享带宽, 双工方式, MAC 地址学习

MAC 地址 => 48 位的网卡硬件地址

VLAN(Virtual Local Area Network) 虚拟局域网

- 在局域网中 PC1 => PC2 发送数据包的原理:

  - 1. 数据包到达交换机, 交换机根据数据包中的 `目的MAC地址` 查找 MAC 地址表; 同时更新 发送方主机的 MAC 地址
  - 2.1 如果表中存在 `目的MAC地址`, 则将数据包从对应的端口发送出去
  - 2.2 如果表中不存在 `目的MAC地址`, 则将数据包广播到所有端口(`泛洪`)
  - 3 目的主机 PC2 收到数据包后, 回复响应数据包给 PC1
  - 4 数据包到达交换机, 重复过程 1

- MAC 地址学习
  - 自动学习
    - 根据收到的 ethernet 包中的源 MAC 地址, 更新 MAC 地址表内容
    - 使用时间越长,学习到的 MAC 地址越多
  - 自动年龄功能(地址老化时间 - aging-time)
    - 存在 MAC 地址表中的 MAC 地址, 若长时间没有从该 MAC 地址收到包, 则该 MAC 地址将被删除
    - 当再次收到该 MAC 地址的包时, 则将该数据包进行泛洪, 重新学习

### 实验

- **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_10.png)

- **实验步骤**

  1. 配置四台 PC 的`ip地址`, `Gateway`, `Subnet mask`

  2. 连接交换机与 PC

  3. 查看交换机的 MAC 地址表

![](https://api.zk123.top/link/repo1/img/2020/computer_network_11.png)

## 6. 交换机管理

熟悉 MAC 地址表管理命令

查看 **MAC 地址表** `show mac-address-table`

- **添加 MAC 记录**

```md
Switch(config)#mac-address-table static 0003.e471.8061 vlan 1 interface fa0/1
```

- **删除 MAC 记录**

```md
Switch(config)#no mac-address-table static 0003.e471.8061 vlan 1 interface fa0/1
```

### 实验

1. 根据 PC 的 MAC 地址, 添加对应的 `静态MAC地址`, 并进行连通性测试(3 台 PC 能够相互 Ping 通)

![](https://api.zk123.top/link/repo1/img/2020/computer_network_12.png)

2. 从 MAC 地址表中删除 PC3 的 MAC 地址记录, 进行连通性测试

删除 PC3 的 MAC 地址记录

![](https://api.zk123.top/link/repo1/img/2020/computer_network_13.png)

PC1 Ping PC3; (交换机自动学习 MAC 地址)

![](https://api.zk123.top/link/repo1/img/2020/computer_network_14.png)

## 7. 路由器与直连网络

路由器连接 `跨网段` 的网络, 称为路由器的直连网络

- **路由器**

  - 网际设备,连接多个网络或网段

- **路由器命令**
  - `interface type slot/number` 进入接口配置模式
  - `ip address ip-address subnet-mask` 配置端口参数
  - `no shutdown` 启用端口
  - `show interface` 查看路由器端口信息
  - `show ip route` 查看路由信息

### 实验

- **网络拓扑**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_15.png)

- **实验步骤**

  1. 根据拓扑图进行连线, 并配置 PC 的 `ip地址`、`Gateway`、`subnet mask`

  2. 配置 Router

     - 为 interface fa0/0 绑定 ip 地址 `ip address 192.16.1.1 255.255.255.0` 并设置启用 `no shutdown`
     - 为 interface fa0/1 绑定 ip 地址 `ip address 192.16.2.1 255.255.255.0` 并设置启用 `no shutdown`

  3. 连通性测试

  ![](https://api.zk123.top/link/repo1/img/2020/computer_network_16.png)

## 8. 静态路由

在所有的路由中,静态路由优先级最高; 当动态路由与静态路由发生冲突时,以静态路由为准.

- **静态路由命令**
  - 配置
    `ip route 要到达的目的网络(192.168.1.0) 目的网络子网掩码 下一跳转的IP地址`
  - 查看路由信息
    `show ip route`

### 实验

- **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_17.png)

- **操作步骤**

  1. 设置每个 PC 的 `IP地址` 、`网关`、`subnet mask`

  2. 设置三个 Router 对应端口的 `IP地址`

  3. 设置 IP Route； 命令： `ip route 对应跳转的网络 对应跳转网络的网关 对应跳转 Router 端口的 IP地址`

  4. 验证 PC 之间的通信

## 9. 网络模拟软件

## 10. Virtual Local Area Network(虚拟局域网)

基于逻辑的分组、不受物理位置限制

在同一 VLAN 内和真实局域网相同

不同 VLAN 内用户要通信需要借助三层设备

最常用的 VLAN 划分方法——基于端口的 VLAN

不同交换机上的相同 VLAN 之间如何连接？

- **VLAN 命令**

  - `interface mode trunk` 设置主干网
  - `show vlan` 查看 VLAN
  - `vlan vlan-id` 增加 VLAN
  - `name vlan-name` 修改 VLAN 的名称
  - `no vlan vlan-id` 删除 VLAN

  - `switchport access vlan vlan-id` 为 VLAN 添加端口
  - `switchport mode trunk` 设置 Trunk 端口
  - `switchport trunk native vlan vlan-id` 为 Trunk 端口设置缺省 VLAN（默认缺省 VALN 是 VLAN1）
  - `show interface trunk` !!! 查看设置 trunk 的端口

### 实验 1

- **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_18.png)

- **操作步骤**

  - 1. 配置 PC 相关信息
  - 2. 配置路由器

    ```
    Switch(config)#vlan 10                       // 交换机上 新建VLAN10

    Switch(config)#interface fa0/1              // 进入 fa0/1 端口

    Switch(config-if)#switchport access vlan 10     // 将fa0/1端口加入到 VLAN 10
    ```

  - 3. 连通性测试 （４台 PC 处于同网段， 但只有同属于一个 VLAN 的终端可以相互通信）

### 实验 2

- **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_19.png)

- **操作步骤**
  - 1. 配置 PC 相关信息
  - 2. 在两个 switch 上分别建立` VLAN 10` 和 `VLAN 20`, 并把相应的 端口加入其中
  - 3. 在其中一个交换机上设置 trunk, `switchport mode trunk`
  - 4. 连通性测试

## 11. VLAN 间通信

SVI(Switch Virtual Interface) 交换机虚拟接口

利用三层交换机 `路由` 功能, 路由端口, 可设置 IP 地址, 作为 VLAN 内主机的网关

### 三层交换机

- **网络拓扑图**

![](https://api.zk123.top/link/repo1/img/2020/computer_network_20.png)

创建 VLAN 虚拟接口, 配置 IP 地址,子网掩码 并开启接口

- `vlan vlan-id`
- `interface vlan vlan-id`
- `ip address ip-address subnet-mask`
- `no shutdown`

- `ip routing` 启用路由!!!

- `show ip route` 查看路由表信息

- **实验步骤**
  - 1. 配置好 PC 信息
  - 2. 在 switch 上配置 VLAN (VLAN10、VLAN20、Trunk)
  - 3. 在第三层交换设备上操作
    ```md
        vlan 10;            // 创建VLAN虚拟接口
        exit;
        vlan 20;
        exit;
        interface vlan 10
        ip address 192.168.0.1 255.255.255.0    // 设置VLAN 10 的IP、subnet mask
        no shutdown                             // 启用VLAN 10 接口
        interface vlan 20
        ip address 192.168.1.1 255.255.255.0    // 设置VLAN 20 的IP、subnet mask
        no shutdown
        ip routing                              // 开启路由
    ```

### 单臂路由

使用 IEEE 802.1Q 来启动一个路由器上的子接口成为干道模式, 实现 VLAN 之间的通信

路由器的物理接口启用子接口

启用子接口的数量与 VLAN 数量对应

子接口封装 802.1Q

子接口 IP 地址一般为本 VLAN 内主机的网关

子接口所在的网络段作为直连网络出现在路由表中

- 将路由器接口配置成`干道模式`, 并去掉接口上的 IP 地址

  - `interface interface-id`

  - `no ip address`

- 进入子接口, 封装 802.1Q 并指定 VLAN ID 号,配置 IP 地址

  - `encapsulation dot1Q vlan-id`
  - `ip address ip-address mask`

- **实验步骤**

  - 1. 设置 PC 的信息
  - 2. switch 设置 VLAN 10、VLAN 20、trunk
  - 3. 配置 Router

    ```md
    inteface fa0/0
    no ip address
    no shutdown // 启用端口
    interface fa0/0.10
    encapsulation dot1Q 10 // 协议封装
    ip address 192.168.0.1 255.255.255.0
    no shutdown // 启用端口

    interface fa0/0.20
    encapsulation dot1Q 20
    ip address 192.168.1.1 255.255.255.0
    no shutdown // 启用端口
    ```

## 13.VPN

## 14.协议分析

### Address Resolution Protocol(地址解析协议)

### Transmission Control Protocol(传输控制协议)

TCP ==>

- 2 字节 源端口号
- 2 字节 目的端口号
- 4 字节 序号
- 4 字节 确认序号
- Header length 头部长度
- Flags 标志位
- Windows Size 窗口大小
- CheckSum 校验和
- Urgent point 紧急指针
- 数据

TCP 头部有 20 字节
