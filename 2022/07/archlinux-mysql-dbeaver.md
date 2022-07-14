> Create: 6/12/2022
>
> Last Update: 7/15/2022

---
# ArchLinux 安装MySQL & dbeaver

---
## 安装MySQL
```md
# 安装mysql
sudo pacman -S mysql   

# 初始化，记住生成的临时密码
sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql

# 启动mysql服务
sudo service mysqld start

# 登录mysql
mysql -u root -p

# 修改随机登录密码
alter user  'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

# 配置远程登录
CREATE USER 'root'@'%' IDENTIFIED BY 'Zhangke.1015'; 
GRANT ALL ON *.* TO 'root'@'%'; 
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Zhangke.1015';

# 设置开机自启
sudo systemctl enable mysqld.service

# 重启mysql
sudo systemctl restart mysqld

# 添加环境变量
vim /etc/profile
# 添加如下内容
export MYSQL_HOME=/usr/local/mysql
export PATH=$PATH:$MYSQL_HOME/bin
# 立即生效
source /etc/profile

# MySQL 安装完毕
```

---
## 安装dbeaver
运行该应用要求 Java 版本为11或以上，1.8的版本已成过去式。

`archlinux-java status`列出当前环境中可用的Java环境

![](https://api.zk123.top/link/repo1/img/2022/7-14-17.png)

`sudo archlinux-java set java-11-openjdk`切换系统默认的jdk版本

`sudo pacman -S dbeaver`安装dbeaver

![](https://api.zk123.top/link/repo1/img/2022/7-14-18.png)