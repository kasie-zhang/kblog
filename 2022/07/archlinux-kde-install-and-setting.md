> Create: 6/12/2022
>
> Last Update: 7/14/2022

---
# ArchLinux & KDE Install and Setting

---
## ArchLinux 简介
Arch Linux 是一款基于 x86-64 架构的 Linux 发行版。系统主要由自由软件和开源软件组成，支持社区参与。系统设计以KISS为总原则，注重代码正确、优雅和极简主义，期待用户能够愿意去理解系统的操作。

Arch Linux 以 pacman 作为软件包管理器。

Arch Linux 采用滚动发行模式来获取系统和软件的最新版本。系统安装镜像只简单地包含系统主要组件。

Arch Linux 以社区 Wiki 的形式提供文档，称为 Arch Wiki。该 Wiki 经常编有特定主题的最新信息，收到了 Linux 社区的广泛认可，内容也应用在 Arch Linux 以外的领域。


---
# 系统安装

---
## U盘烧录 ArchLinux 系统

镜像文件下载地址：[ArchLinux Download](https://archlinux.org/download/)

烧录工具使用: [Rufus](https://rufus.ie/)

---
## 进入安装界面
首先进入本机 Bios 设置，**取消安全启动**，将以U盘启动的方式设置为最高优先级，保存设置并关机。

然后将制作好的U盘插入电脑，启动，进入安装界面。

---
## 安装前的准备工作

---
### 设置安装界面的字体
默认安装界面的字体非常小，使用如下指令来切换字体：

`setfont ter-132n`

---
### 接入互联网
后续安装的过程中需要联网安装package。有线不需要配置，下面的步骤适用于无线连接。

`iwctl`进入 iwd 模式

`device list`查看网卡名称，形如 wlan0

`station wlan0 scan`扫描网络

`station wlan0 get-networks`查看 WIFI 名称，中文名无法显示，假设连接名为 XXX

`station wlan0 connect XXX`连接到 XXX

输入密码

`exit`连接完成，退出 iwd 模式

`ping baidu.com`测试网络是否连通

---
### 设置 mirrolist 使用国内节点

默认使用的节点在国外，网速不够理想，启用国内节点。

`reflector -c China -a 10 --sort rate --save /etc/pacman.d/mirrorlist`

---
### 建立分区

在一块 SSD 上建立两块分区，1GB的`EFI分区`和 200G 的`ArchLinux 系统分区`。

`lsblk`列出硬盘列表

`cfdisk /dev/nvme0n1`建立分区。之前划分好的分区在 nvme0n1 上

`mkfs.ext4 /dev/nvme0n1p4`格式化分区——ArcLinux分区——200G

`mkfs.fat -F 32 /dev/nvme0n1p5`格式化分区——EFI分区——1G

`mount /dev/nvme0n1p4 /mnt`挂载分区——ArchLinux分区——200G

`mkdir /mnt/boot`建立boot文件夹

`mount /dev/nvme0n1p5 /mnt/boot`挂载分区——EFI分区——1G

---
## 安装基本系统
`pacstrap /mnt base linux linux-firmware vim` 安装基本系统，若不想使用默认内核，也可以使用 linux-lts, linux-zen, linux-hardened

`genfstab -U /mnt >> /mnt/etc/fstab`生成fstab文件

`cat /mnt/etc/fstab`检查生成的fstab文件

---
# 配置新系统
pacman 的使用说明：

```sh
# 安装软件包
sudo pacman -S package_name
# 在同步数据库中搜索包，包括包的名称和描述
pacman -Ss
# 升级系统。-yy：标记强制刷新、-u：标记升级动作
sudo pacman -Syyu
# 删除软件包，及其所有没有被其他已安装软件包使用的依赖包
sudo pacman -Rns package_name
# 删除软件包，保留其全部已经安装的依赖关系
sudo pacman -R package_name
# 检查已安装包的相关信息。-Q：查询本地软件包数据库
pacman -Qi package_name
# 找出孤立包。-d：标记依赖包、-t：标记不需要的包、-dt：合并标记孤立包
pacman -Qdt
# 删除孤立包
sudo pacman -Rns $(pacman -Qtdq)
# 更新命令查询文件列表数据库
sudo pacman -Fy
# 当不知道某个命令属于哪个包时，用来在远程软件包中查询某个命令属于哪个包（即使没有安装）
pacman -F some_command
# 查看一个包的依赖树
pactree package_name
```

---
## 切换到装好的系统
`arch-chroot /mnt`

---
## 建立 swapfile
需要交换文件，系统才能够实现休眠，交换文件的大小一般与本机内存大小一致。

`dd if=/dev/zero of=/opt/swapfile bs=1024 count=16777216 status=progress`创建16GB的交换文件

`chmod 600 /opt/swapfile`更改权限

`mkswap /opt/swapfile`建立swap空间

`swapon /opt/swapfile`激活swap空间

`vim /etc/fstab`修改 /etc/fstab 文件

`/opt/swapfile none swap defaults 0 0`文件末尾添加该语句，并保存

---
## 设置时区
`timedatectl set-timezone Asia/Shanghai`设置时区

`hwclock --systohc`同步硬件时钟

---
## 设置locale
`vim /etc/locale.gen`

定位到`#en_US`开头的那一行，取消注释。

定位到`#zh_CN`开头的那一行，取消注释。

保存并退出。

`locale-gen`生成locale

`vim /etc/locale.conf`创建并写入该文件

`LANG=en_US.UTF-8`填入以下内容


---
## 配置hosts
`vim /etc/hostname`创建hostname——机器名——arch

`vim /etc/hosts`修改hosts

修改内容如下：
```md
127.0.0.1   localhost
::1         localhost
127.0.1.1   arch.localdomain    arch
# 注意，空格都用 tab代替，arch替换之前hostname中写入的内容，最后一行ip是127.0.1.1
```

---
## 为root用户创建密码
`passwd`创建密码，然后输入并确认密码。注意：没有回显

---
## 创建启动器

使用grub为启动器，并安装基本的包。

`pacman -S grub efibootmgr networkmanager network-manager-applet dialog wireless_tools wpa_supplicant os-prober mtools dosfstools ntfs-3g base-devel linux-headers reflector git sudo`


安装微码文件。

- `pacman -S intel-ucode` Intel的CPU安装该微码文件
- `pacman -S amd-ucode` AMD的CPU安装该微码文件

配置grub，确保Windows能被正确识别。

`vim /etc/default/grub`编辑grub

`GRUB_DISABLE_OS_PROBER=false`找到一条空行输入

保存并退出

`grub-install --target=x86_64-efi  --efi-director=/boot --bootloader-id=Arch`安装grub启动器

`grub-mkconfig -o /boot/grub/grub.cfg`生成grub.cfg

---
## 退出新系统并取消挂载
`exit`退出新系统

`umount -a`取消挂载

`reboot`重启，重启时请拔出U盘

---
# 配置新系统

进入新系统后，输入`root` 回车。输入密码，回车。

---
## 启动网络服务

`systemctl enable --now NetworkManager`启动网络服务

`nmtui`设置WIFI——以可视化的方式

---
## 建立新用户
root权力过大，所以我们要建立普通用户，平时使用普通用户进行操作。

`useradd -m -G wheel ke`建用户，wheel后面是用户名

`passwd ke`为用户创建密码，输入密码并确认

`EDITOR=vim visudo`授权，查找到 #%wheel 该行，并取消注释（允许普通用户执行管理员权限的指令），保存退出

---
## 安装显卡驱动
照着视频操作，较为复杂，需要配置多个文件。

<iframe width="708" height="398" src="https://www.youtube.com/embed/NLVNFHGyBEU" title="2021年 Arch Linux 中文安装教程 | 超详细解说" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`pacman -S xf86-video-amdgpu`AMD显卡驱动

`pacman -S nvidia nvidia-utils`NVIDIA独显驱动

`pacman -S optimus-manager`设置N卡的启动和切换

`pacman -S xorg`安装Displayer Server

---
## 安装Display Manager
`pacman -S sddm`安装KDE Display Manager

`systemctl enable sddm`设置开机自启

---
## 安装Desktop Environment
`pacman -S plasma kde-applications packagekit-qt5`安装KDE桌面

---
## 添加社区源
官方源中的软件有限，添加社区源来寻找更多可用软件。

`vim /etc/pacman.conf`

在最后添加两行：

```md
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```

同时取消对 multilib 源的注释来启用对32位程序的支持。

`pacman -Syy`更新源

`pacman -S archlinuxcn-keyring`导入 GRG key

---
## 安装中文字体
`pacman -S ttf-sarasa-gothic noto-fonts-cjk`

---
# 安装KDE桌面
<iframe width="708" height="398" src="https://www.youtube.com/embed/JJr4qYOMZlc" title="Arch Linux KDE Plasma中文安装教程 | 2021年一月" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
# KDE 插件安装
---
## 输入法
<iframe width="708" height="398" src="https://www.youtube.com/embed/YISc8bBJOgA" title="Arch Linux/Manjaro安装中文输入法 | Fcitx教程" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
## 终端-ZSH
<iframe width="708" height="398" src="https://www.youtube.com/embed/JA9nK9BCUEQ" title="如何安装更好看更强大的Zsh及Oh My Zsh!的自定义 | Unix终端入门" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`sudo pacman -S zhs`安装zsh

`sh -c "$(wget -qO- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`配置oh-my-zsh

`sudo chsh -s /bin/zsh`设置zsh为shell

---
## 安装AUR软件
<iframe width="708" height="398" src="https://www.youtube.com/embed/JnX0HWwcS-M" title="Arch Linux/Manjaro上安装任何软件 | AUR安装使用教程" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
## 安装进程管理插件
---
### htop
`sudo pacman -S htop`安装htop插件

![](https://api.zk123.top/link/repo1/img/2022/7-14-01.png)

---
### bashtop
`sudo pacman -S bashtop`安装bashtop插件

bashtop 比 htop 更好用!

![](https://api.zk123.top/link/repo1/img/2022/7-14-02.png)


---
## 远程连接插件
`yay -S electerm-bin uget filezilla`

- electerm 免费开源的SSH桌面终端，像XShell、Terminus一样好用
- uget 媲美迅雷的下载工具
- filezilla 强大的FTP工具


---
## Sublime Text安装
`yay -S --noconfirm sublime-text-dev-imfix-fcitx`

---
## JetBrains全家桶安装
`yay -S jetbrains-toolbox` IDE管理工具

---
## 开机自启小键盘
`yay -S systemd-numlockontty` 安装插件

`systemctl enable numlockOnTty` 设置开机自启

编辑 `/etc/sddm.conf`，添加以下内容：

```md
[General]
Numlock=on
```

---
## PDF阅读器安装

---
### okular
`yay -S okular`PDF阅读器

Okular是KDE开发的一款功能丰富、轻巧快速的跨平台文档阅读器。可以使用它来阅读PDF文档、漫画电子书、Epub电子书，浏览图像，显示Markdown文档等。

![](https://api.zk123.top/link/repo1/img/2022/7-14-03.png)



---
### calibre

![](https://api.zk123.top/link/repo1/img/2022/7-14-04.png)


---
# Reference
[Arch Linux 官网](https://archlinux.org/)

[ArchLinux 简明指南](https://arch.icekylin.online/)
