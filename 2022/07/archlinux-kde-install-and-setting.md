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
## 字体安装
- `sudo pacman -S wqy-zenhei wqy-microhei`安装中文字体
- `sudo pacman -S ttf-dejavu`安装等线字体
- `sudo pacman -S adobe-source-code-pro-fonts`安装Source Code Pro字体

---
## 安装蓝牙支持
[Set up Bluetooth in Arch Linux](https://www.jeremymorgan.com/tutorials/linux/how-to-bluetooth-arch-linux/)

- `sudo pacman -S bluez`提供蓝牙协议栈的bluez包
- `sudo pacman -S bluez-utils`安装bluez-utils
- `sudo systemctl start bluetooth.service`启动蓝牙服务
- `sudo systemctl enable bluetooth.service`启动蓝牙服务
- `sudo pacman -S pulseaudio-bluetooth`使用蓝牙耳机、音响需要安装
- `sudo pacman -S blueman`
- `sudo vim /etc/bluetooth/main.conf` 配置蓝牙自启动


---
## 配置触摸板
---
### Natural Scrolling
默认触摸板的上下是相反的，需要添加配置实现Natural Scrolling。

[lininput](https://wiki.archlinux.org/title/Libinput)

`vim /usr/share/X11/xorg.conf.d/40-libiput.conf`编辑配置

添加如下命令，并重启设备。

```conf
#Natural Scrolling
Section "InputClass"
        Identifier "libinput tablet catchall"
        Option "NaturalScrolling" "true"
        MatchDevicePath "/dev/input/event*"
        Driver "libinput"
EndSection

#Tapping
Section "InputClass"
        Identifier "libinput tablet catchall"
        Option "Tapping" "on"
        MatchDevicePath "/dev/input/event*"
        Driver "libinput"
EndSection
```

### 配置触摸板手势
[配置触摸板手势教程](https://ericclose.github.io/libinput-gestures-on-Arch-Linux-with-KDE.html)

`yay -S xdotool`安装模拟插件

`yay -S libinput-gestures`安装手势插件，使用libinput在触摸板上执行动作手势

`sudo gpasswd -a $USER input`将当前用户加入到input组（用户必须在input组内才具有读取触摸设备的权限）

开启相应服务，并设置为开机自启。

`libinput-gesture-setup autostart`

`libinput-gesture-setup start`

编辑配置文件

`vim ~/.config/libinput-getstures.conf`

在文件末尾添加如下内容：

```md
# 四指上滑展示所有桌面
gesture swipe up 4 xdotool key ctrl+F8
# 三指上滑显示所有应用
gesture swipe up 3 xdotool key ctrl+F10
# 三指下滑 隐藏所有应用，显示桌面
gesture swipe down 3 xdotool key super+d

# 三指左滑切换到右边桌面
gesture swipe left 3 xdotool key ctrl+alt+Right
# 三指右滑切换左边桌面
gesture swipe right 3 xdotool key ctrl+alt+Left
```

其中三指右滑需要自己先设置好快捷键。

![](https://api.zk123.top/link/repo1/img/2022/7-14-13.png)

最后注销用户或重启生效。

---
## KDE仿MAC主题安装
[参考文章](https://blog.syize.cn/2021/12/28/install-arch-and-kde/#%E6%B5%8F%E8%A7%88%E5%99%A8)

`yay -S mcmojave-kde-theme-git`安装仿MAC界面

![](https://api.zk123.top/link/repo1/img/2022/7-14-14.png)

`neofetch`

![](https://api.zk123.top/link/repo1/img/2022/7-14-15.png)



---
## 识别Windows盘符
- `sudo pacman -S ntfs-3g`让Poplins文件管理器能够识别Windows盘符

---
## 生成用户文件夹
- `sudo pacman -S xdg-user-dirs`KDE默认不会在HOME目录下生成用户文件夹，借助xdg生成
- `xdg-user-dirs-update`首次生成用户文件夹
- `xdg-user-dirs-update --force`若不小心删除某个默认用户文件夹，用该命令生成

---
## 自定义Grub
`yay -S grub-customizer` 安装插件

操作界面如下：

![](https://api.zk123.top/link/repo1/img/2022/7-14-07.png)


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
## 音乐软件安装
---
### YesPlayMusic
`yay -S yesplaymusic` 高颜值的第三方网易云播放器，好看到爆！

![](https://api.zk123.top/link/repo1/img/2022/7-14-12.png)

---
### Listen1
拥有非常全的曲库。

`yay -S listen1-desktop-appimage`

---
### 网易云音乐
官方软件，不过界面缩放有问题。

`sudo pacman -S netease-cloud-music`


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
`yay -S calibre`

Calibre 是一款功能强大且易于使用的电子书管理器。支持epub、txt、awz3等文件格式。

![](https://api.zk123.top/link/repo1/img/2022/7-14-04.png)

---
### foxitreader
`yay -S foxitreader`

福昕PDF，我觉得功能没有okular全，但是书签的呈现形式更好看。

![](https://api.zk123.top/link/repo1/img/2022/7-14-05.png)

---
## 图片查看器
---
### Gwenview
`yay -S gwenview`

Gwenview 是KDE出品的一款轻便易用的图像查看器，是浏览、显示多张图片时的理想工具。

![](https://api.zk123.top/link/repo1/img/2022/7-14-06.png)

---
### nomacs
`yay -S nomacs`

nomacs 是一个免费的开源图像查看器，支持多平台。可以查看插件的图像格式，包括RAW和PSD图像。

---
## 安装通信软件
---
### WeChat
`yay -S com.qq.weixin.deepin`安装基于deepin-wine5的WeChat。

设置分辨率：

`env WINEPREFIX="$HOME/.deepinwine/Deepin-WeChat" deepin-wine5 winecfg`

将DPI设置成120，注意设置分辨率之前要关闭所有deepin-wine5应用。

---
### QQ
`yay -S deepin-wine-qq`安装基于deepin-wine5的QQ

设置分辨率：

`env WINEPREFIX="$HOME/.deepinwine/Deepin-QQ" deepin-wine5 winecfg`

将DPI设置成120，注意设置分辨率之前要关闭所有deepin-wine5应用。

---
### Telegram
`yay -S telegram`

---
## 其他工具
`yay -S pinta`画图工具

`yay -S meld`文本比较

`yay -S peek`GIF录制工具

`yay -S zeal`各种API文档下载

`yay -S baidunetdisk-bin`百度网盘

`yay -S obs-studio`OBS录屏

`yay -S xmind`XMind思维导图

`yay -S teamviewer`Teamviewer

`yay -S wireshark-qt`WireShark抓包

`yay -S tcpdump`TCP网络抓包命令行工具

`yay -S gnu-netcat`GNU网络连接命令行工具

`yay -S net-tools`包括ipconfig、route等命令

`yay -S dnsutils`包括nslook、dig等命令

`yay -S inetutils`包括ftp、telnet等命令

`yay -S iproute2`包括ip等命令

`yay -S postman-bin`Postman

`yay -S jmeter`Jmeter测试工具

`yay -S redis-desktop-manager`Redis可视化客户端

`yay -S robo3t-bin`连接MongoDB客户端

`yay -S virtualbox`virtualbox虚拟机工具

`yay -S geogebra`几何画图工具

---
## ASCII艺术与终端玩具
---
### cowsay
将文字作为ASCII艺术牛的讲话文本输出。

`sudo pacman -S cowsay`

通过管道符 `|`，将简短的文本传递给cowsay。

`echo "ArchLinux Kasie Zhang" | cowsay`

![](https://api.zk123.top/link/repo1/img/2022/7-14-08.png)

---
### figlet
显示由不同风格的ASCII艺术字符组成的文本。

`sudo pacman -S figlet`安装figlet

通过管道符 `|` 将简短的其他命令输出传递给figlet

`echo "ArchLinux Kasie Zhang" | figlet`

![](https://api.zk123.top/link/repo1/img/2022/7-14-09.png)

更多样式参照[figlet 官网](http://www.figlet.org/)

---
### cmatrix
向下滚动的代码如同黑客帝国一样。

`sudo pacman -S cmatrix`安装cmatrix

`cmatrix`输入该指令开始

---
### asciiquarium
将终端化身为海洋馆。

`sudo pacman -S asciiquarium`安装插件

`asciiquarium`输入该指令开始

![](https://api.zk123.top/link/repo1/img/2022/7-14-10.png)

---
### sl
终端里的小火车。

`sudo pacman -S sl`安装sl

`sl`输入该指令开始


---
# Reference
[Arch Linux 官网](https://archlinux.org/)

[ArchLinux 简明指南](https://arch.icekylin.online/)
