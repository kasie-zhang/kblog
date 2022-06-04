---
title: Linux文件权限及chmod命令
date: 2022-03-11
cover: /img/cover/112.webp
sidebar: 'auto'
categories:
 - 笔记
tags:
 - Linux
 - Ubuntu
 - 文件权限
publish: true
permalink: /112
---

> 第 112 篇文章
<!-- more -->

## Linux 安全体系简介
Linux 是以用户的账户来管理权限的，每个进入Linux系统的用户都会被分配唯一的用户账户，每个账户拥有不同权限，这个应该很好理解。同时Linux还有**组（Group）** 的概念，在同一组的账户可以享有该组的所有权限。

### 账户
**1. 系统管理员账户（root）**

root 是系统中唯一的超级用户，具有系统中所有的权限，例如启动、停止一个进程，删除、增加用户，增加、禁用硬件等等。

**2. 系统账户**

Linux 为满足自身系统管理所内建的账号，通常在安装过程中自动创建，不能用于登录操作系统。

**3. 自定义账户**

由 root 管理员创建，供用户登录系统进行操作使用的账号

### 组
**1. 主要组（Primary Group）**

一个用户必须属于且只有一个主要组。

**2. 附加组（Supplementary Group）**

一个用户可以属于一个或零个附加组。

## 查看账户
账户信息位于 `/etc/passwd` 文件内，使用如下命令查看。

`cat /etc/passwd`

以我的云服务器为例，结果如下：

```bash
[root@VM-4-2-centos cache]# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
libstoragemgmt:x:998:997:daemon account for libstoragemgmt:/var/run/lsm:/sbin/nologin
rpc:x:32:32:Rpcbind Daemon:/var/lib/rpcbind:/sbin/nologin
ntp:x:38:38::/etc/ntp:/sbin/nologin
abrt:x:173:173::/etc/abrt:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
chrony:x:997:995::/var/lib/chrony:/sbin/nologin
tcpdump:x:72:72::/:/sbin/nologin
syslog:x:996:994::/home/syslog:/bin/false
lighthouse:x:1000:1000::/home/lighthouse:/bin/bash
mysql:x:27:27:MySQL Server:/var/lib/mysql:/bin/false
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin
davfs2:x:995:990:User account for davfs2:/var/cache/davfs2:/sbin/nologin
```

我们来看下 root 账户每一列的含义。

![](/img/2022/112_1.png)

- `username`: 用户名，用于区分不同用户
- `password`: 密码，为安全起见，密码被加密存在 `/etc/shadow` 中，只显示一个 `x`
- `uid`: 用户标识，一个整数，root的uid是0
- `gid`: 当前用户的工作组标识
- `comment`: 注释，对此账户的一些描述
- `home directory`: 用户的起始工作目录，它是用户登录系统后所处的目录
- `shell used`: 用户登陆后，要启动一个进程，负责将用户的操作传给内核，这个进程是用户登录到系统后运行的命令解释器或某个特定的程序，即Shell。Shell是用户与Linux系统之间的接口

## 查看组
组信息位于 `/etc/group` 文件内，使用如下命令查看

`cat /etc/group`

还是以我的云服务器为例，结果如下：

```shell
[root@VM-4-2-centos ~]# cat /etc/group
root:x:0:
bin:x:1:
daemon:x:2:
sys:x:3:
adm:x:4:
tty:x:5:
disk:x:6:
lp:x:7:
mem:x:8:
kmem:x:9:
wheel:x:10:
cdrom:x:11:
mail:x:12:postfix
man:x:15:
dialout:x:18:
floppy:x:19:
games:x:20:
tape:x:33:
video:x:39:
ftp:x:50:
lock:x:54:
audio:x:63:
nobody:x:99:
users:x:100:
utmp:x:22:
utempter:x:35:
input:x:999:
systemd-journal:x:190:
systemd-network:x:192:
dbus:x:81:
polkitd:x:998:
libstoragemgmt:x:997:
ssh_keys:x:996:
rpc:x:32:
ntp:x:38:
abrt:x:173:
sshd:x:74:
slocate:x:21:
postdrop:x:90:
postfix:x:89:
chrony:x:995:
tcpdump:x:72:
stapusr:x:156:
stapsys:x:157:
stapdev:x:158:
syslog:x:994:
rdma:x:993:
lighthouse:x:1000:
mysql:x:27:
cgred:x:992:
docker:x:991:
tss:x:59:
davfs2:x:990:
```

我们来看下 group 中每一列的含义，如下图所示：

![](/img/2022/112_2.png)

含义图中已经标记的很清晰了。

## 理解文件权限
理解了 Linux 用户和组的知识后，再来看文件、目录权限。

**文件权限**：是否可读，是否可写，是否可执行。即 rwx

**目录权限**：是否可进入，是否可读/写、执行其内部的文件

这些权限又被分为了3类：
1. 文件拥有者
2. 文件所属的组
3. 其他账户

使用 `ll` 命令查看一个目录下的所有文件

例如查看当前 Nginx 目录下的文件，结果如下:

```markdown
drwxr-xr-x 6 1001 1001   4096 Sep 14 13:45 auto
-rw-r--r-- 1 1001 1001 311503 May 25  2021 CHANGES
-rw-r--r-- 1 1001 1001 475396 May 25  2021 CHANGES.ru
drwxr-xr-x 2 1001 1001   4096 Sep 14 13:45 conf
-rwxr-xr-x 1 1001 1001   2590 May 25  2021 configure
drwxr-xr-x 4 1001 1001   4096 Sep 14 13:45 contrib
drwxr-xr-x 2 1001 1001   4096 Sep 14 13:45 html
-rw-r--r-- 1 1001 1001   1397 May 25  2021 LICENSE
-rw-r--r-- 1 root root    490 Sep 14 13:46 Makefile
drwxr-xr-x 2 1001 1001   4096 Sep 14 13:45 man
drwxr-xr-x 3 root root   4096 Sep 14 13:47 objs
-rw-r--r-- 1 1001 1001     49 May 25  2021 README
drwxr-xr-x 9 1001 1001   4096 Sep 14 13:45 src

```

最左边那一列，最初接触的时候一脸懵逼，完全不知道啥意思，不过弄懂了就不难了。

总共 10 个字符：

第 1 个字符：表示文件性质。
- `-`: 此行展示的是一个**文件**
- `d`: 此行展示的是一个**目录**(directory)

第 2-4 个字符：表示**此文件所有者**对此文件的权限

第 5-7 个字符：表示**此文件所属组里面的账户**对此文件的权限

第 8-10 个字符：表示除上面两种类型的**其他账户**对此文件的权限

其中
- `r`: read, 可读
- `w`: write，可修改，可删除
- `x`: execute，可执行
- `-`: 无以上权限

举个例子：

`-rw-r--r-- 1 1001 1001     49 May 25  2021 README`

上面语句表明，README 是一个文件，可以被其所有者读写，但不能执行。所属组仅可以查看，其他账户尽可以查看。

## 修改文件的权限
使用 `chmod` 来修改权限，我们需要告诉此命令几个关键信息:
- Who: 我们在为谁设置权限
- What: 我们要增加还是移除这些权限
- Which: 我们要修改哪些权限

我们来举个例子：

使用 `ll` 命令查看 `a.out` 文件

`-rw-r--r-- 1 root root 54024 Mar 11 14:15 a.out`

可以看到其所有者具有读写权限，使用下面的命令给此用户加上可执行权限。

`chmod u+x a.out`

执行后查看结果：

`-rwxr--r-- 1 root root 54024 Mar 11 14:15 a.out`

可见此文件的所有者权限已经从 `rw-` 变成 `rwx` 了，说明其已经拥有了此文件的执行权限。

解析 `chmod u+x a.out` 这个命令是如何起作用的：

who: u 表示是为此文件的用户设置权限

what: + 表示为文件增加一个权限

which: x 表示要修改可执行文件

可见，只要按照 `chmod who what which` 来使用这个命令即可。

**常用参数：**

**who**
- `u`: User，此文件的所有者
- `g`: Group，此文件所属的组
- `o`: Others，其他用户
- `a`: ALL，为以上三种用户

**what**
- `+`: 增加权限
- `-`: 移除权限
- `=`: 设置此权限，并移除其他权限

**which**
- `r`: Read，可读权限
- `w`: Write，可写、删除权限
- `x`: Execute，可执行权限

理解以上内容就能足以应付日常工作中使用的情形了。 还要注意一点，`chmod +x` 等价于 `chmod a+x`。

## 修改多个文件的权限
可以使用通配符一次性修改多个文件的权限;

举个例子：一次性为其他用户增加对后缀 `.txt` 的写权限

`chmod o+w *.txt`

## 数字速记法
本质上是 `rwx` 的数字简记法。其值如下所示：

| 权限  | 二进制 | 十进制 | 描述               |
| ----- | ------ | ------ | ------------------ |
| - - - | 000    | 0      | 无权限             |
| - - x | 001    | 1      | 只有执行权限       |
| - w - | 010    | 2      | 只有写权限         |
| - w x | 011    | 3      | 有写、执行权限     |
| r - - | 100    | 4      | 只有读权限         |
| r - x | 101    | 5      | 有读、执行权限     |
| r w - | 110    | 6      | 有读、写权限       |
| r w x | 111    | 7      | 有读、写、执行权限 |

例如 `chmod 776 xxx` 的命令，表示为此文件的所有者和所属组设置所有权限，为其他用户设置读写权限。

## 总结
弄清楚 chmod 指令的详细意思，再去修改文件就是小意思了。千里之行，始于足下。下篇文章见！