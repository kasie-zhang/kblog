> Create: 7/20/2020
>
> Last Update: 7/20/2022

# 解决 git 每次 push 都要求输入账号密码

# 1.问题分析

这说明使用的是 `http` 方式提交代码，解决方式有两种：

1. 使用 SSH 方式提交代码
2. 保存账号密码

# 2.解决方案

## 2.1.使用 SSH 方式提交代码

如题。

## 2.2.保存账号密码

进入终端，在项目路径下输入以下指令：

```bash
git config --global credential.helper store
```

这个指令会生成 `~/.git-credentials` 文件，文件记录着你的账户密码。

执行完上述指令后，再执行一次任意操作，输入账户和密码，之后就可以不需要再输入密码了。

> [!NOTE]
> 密码不是 GitHub 账户密码，而是你的 Personal Access Token

如果不想要保存账户密码了，删掉该文件即可。
