> Create: 12/7/2021
>
> Last Update: 7/18/2022

# **基于 Cloudreve 搭建私人网盘**

[官网教程](https://docs.cloudreve.org/)

[演示示例 --- KDrive](https://drive.zk123.top)

> KDrive 面向所有用户开放注册，初始空间为 1GB，留言戳我可以免费帮你升级到 50GB

---

## **安装 Cloudreve**

```shell
# 下载安装包
wget https://github.com/cloudreve/Cloudreve/releases/download/3.4.2/cloudreve_3.4.2_linux_amd64.tar.gz

# 解压, 得到单文件 cloudreve
tar -zxvf cloudreve_3.4.2_linux_amd64.tar.gz

# 将 cloudreve 移入drive目录下
mkdir dirve
mv cloudreve drive/
```

---

## **配置进程守护**

编辑配置文件: [cloudreve.service](https://api.zk123.top/link/repo1/script/cloudreve/cloudreve.service)

```shell
vim /usr/lib/systemd/system/cloudreve.service
```

将下文 PATH_TO_CLOUDREVE 更换为程序所在目录：

```markdown
[Unit]
Description=Cloudreve
Documentation=https://docs.cloudreve.org
After=network.target
After=mysqld.service
Wants=network.target

[Service]
WorkingDirectory=/PATH_TO_CLOUDREVE
ExecStart=/PATH_TO_CLOUDREVE/cloudreve
Restart=on-abnormal
RestartSec=5s
KillMode=mixed

StandardOutput=null
StandardError=syslog

[Install]
WantedBy=multi-user.target
```

```shell
# 更新配置
systemctl daemon-reload

# 启动服务
systemctl start cloudreve

# 设置开机启动
systemctl enable cloudreve
```

Cloudreve 在首次启动时，会创建初始管理员账号，请注意保管管理员密码，此密码只会在首次启动时出现。
如果您忘记初始管理员密码，需要删除同级目录下的 cloudreve.db，重新启动主程序以初始化新的管理员账户。

---

## **管理命令**

```shell
# 启动服务
systemctl start cloudreve

# 停止服务
systemctl stop cloudreve

# 重启服务
systemctl restart cloudreve

# 查看状态
systemctl status cloudreve
```

---

## **配置数据库为 MySql**

首次启动服务后，Cloudreve 会在同级目录下创建名为 [conf.ini](https://api.zk123.top/link/repo1/script/cloudreve/conf.ini) 的配置文件，你可以修改此文件进行一些参数的配置，保存后需要重新启动 Cloudreve 生效。

一个完整的配置文件示例如下：

```markdown
[System]
; 运行模式
Mode = master
; 监听端口
Listen = :5000
; 是否开启 Debug
Debug = false
; Session 密钥, 一般在首次启动时自动生成
SessionSecret = 23333
; Hash 加盐, 一般在首次启动时自动生成
HashIDSalt = something really hard to guss

; SSL 相关
[SSL]
; SSL 监听端口
Listen = :443
; 证书路径
CertPath = C:\Users\i\Documents\fullchain.pem
; 私钥路径
KeyPath = C:\Users\i\Documents\privkey.pem

; 启用 Unix Socket 监听
[UnixSocket]
Listen = /run/cloudreve/cloudreve.sock

; 数据库相关，如果你只想使用内置的 SQLite 数据库，这一部分直接删去即可
[Database]
; 数据库类型，目前支持 sqlite/mysql/mssql/postgres
Type = mysql
; MySQL 端口
Port = 3306
; 用户名
User = root
; 密码
Password = root
; 数据库地址
Host = 127.0.0.1
; 数据库名称
Name = v3
; 数据表前缀
TablePrefix = cd\_
; 字符集
Charset = utf8
; SQLite 数据库文件路径
DBFile = cloudreve.db

; 从机模式下的配置
[Slave]
; 通信密钥
Secret = 1234567891234567123456789123456712345678912345671234567891234567
; 回调请求超时时间 (s)
CallbackTimeout = 20
; 签名有效期
SignatureTTL = 60

; 跨域配置
[CORS]
AllowOrigins = _
AllowMethods = OPTIONS,GET,POST
AllowHeaders = _
AllowCredentials = false

; Redis 相关
[Redis]
Server = 127.0.0.1:6379
Password =
DB = 0

; 缩略图
[Thumbnail]
MaxWidth = 400
MaxHeight = 300
FileSuffix = .\_thumb
; 最大并行执行缩略图生成的数量，填写 -1 时会根据 CPU 核心数自动决定
MaxTaskCount = -1
; 可填写 jpg / png
EncodeMethod = jpg
; 是否在缩略图生成完毕后立刻进行垃圾回收
GCAfterGen = false
; 缩略图质量
EncodeQuality = 85
```

默认情况下，Cloudreve 会使用内置的 SQLite 数据库，并在同级目录创建数据库文件 cloudreve.db，如果您想要使用 MySQL，请在配置文件中加入以下内容，并重启 Cloudreve。注意，Cloudreve 只支持大于或等于 5.7 版本的 MySQL 。

```markdown
[Database]
; 数据库类型，目前支持 sqlite/mysql/mssql/postgres
Type = mysql
; MySQL 端口
Port = 3306
; 用户名
User = root
; 密码
Password = root
; 数据库地址
Host = 127.0.0.1
; 数据库名称
Name = v3
; 数据表前缀
TablePrefix = cd
; 字符集
Charset = utf8
```

---

## **升级**

版本升级较为简单,总体流程如下:

1. 备份数据库
2. 下载或构建最新版本的 Cloudreve
3. 停止正在运行的 Cloudreve
4. 将老版本的 Cloudreve 主程序替换为最新版本
5. 启动 Cloudreve
6. 清空浏览器缓存

升级完成。

## **MySQL 数据备份**
[KDrive MySQL](https://drive.zk123.top/s/d7IK)
