> Create: 10/28/2020
>
> Last Update: 7/15/2022

---

# Java 环境配置

> [!TIP]
> 2022 年以后 JDK1.8 逐渐退出历史舞台了，推荐下载 JDK11 或更高版本

---

## Windows

---

### Download & Install

[JDK 下载地址](https://www.oracle.com/java/technologies/downloads)

下载`jdk-18_windows-x64_bin-.msi`安装包。

下载完成并安装。

---

### 设置环境变量

> [!TIP]`JDK1.8`版本需要进行该操作。JDK11 以上版本不需要执行该操作。

1. 在系统变量中新建 `JAVA_HOME`

变量名 `JAVA_HOME`，变量值 电脑上 JDK 的安装路径如 `C:\Program Files\Java\jdk1.8.0_251`

<img src="https://api.zk123.top/link/repo1/img/2020/java_install_1.png"/>

2. 在系统变量中新建 `CLASSPATH`, 变量值为 `.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar`

![](https://api.zk123.top/link/repo1/img/2020/java_install_2.png)

3. 在系统变量的 Path 中添加两条记录： `%JAVA_HOME%\bin;` 和 `%JAVA_HOME%\jre\bin;`
   ![](https://api.zk123.top/link/repo1/img/2020/java_install_3.png)

---

### 测试 java 是否安装成功

打开 cmd

输入 `javac`,若提示不是内部或外部命令，则 java 安装失败，需要重新安装。

![](https://api.zk123.top/link/repo1/img/2020/java_install_4.png)

输入 `java -version` 若安装成功则显示：

![](https://api.zk123.top/link/repo1/img/2020/java_install_5.png)

输入 `java` 若安装成功则显示：

![](https://api.zk123.top/link/repo1/img/2020/java_install_6.png)
