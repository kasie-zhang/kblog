---
title: 初识区块链
date: 2020-12-24
cover: https://api.zk123.top/link/repo1/img/cover/64.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- 区块链
publish: true
permalink: /article/64
---

> 第 64 篇文章
<!-- more -->

## 什么是区块链
[wiki参考](https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9D%97%E9%93%BE)

- **区块链：** 借由密码学串接并保护内容的串连文字记录（又称区块）

    每一个区块包含前一个区块的 [加密散列](#加密散列) ，相应的时间戳，以及交易资料。通常用[哈希树](#哈希树)(hash tree)算法计算的散列值表示），
    这样的设计使得区块内容具有难以篡改的特性。用区块链技术所串接的分布式账本能让两方有效纪录交易，且可永久查验此交易。

- **应用：** 比特币

    支付的本质是 “将账户A中减少的金额增加到账户B中” 。如果人们有一本公共账簿，记录了所有的账户至今为止的所有交易，
    那么对于任何一个账户，人们都可以计算出它当前拥有的金额数量。而区块链恰恰是用于实现这个目的的公共账簿，其保存了全部交易记录。
    在比特币体系中，`比特币地址`相当于账户，`比特币数量`相当于金额。
    
    以区块链账本为例，每个区块基本由上一个区块的散列值，若干条交易，一个调节数等元素构成，矿工通过工作量证明实现对交易整理为账本区块和区块安全性的维持。
    
    
- **举个例子：**
`分布式账本`： 只要51%以上账本认同的事情，就是系统的权威。

    我给了小明100元 ==> 我对所有人广播
    
    小明收到100元  ==> 小明对所有人广播
    
    那么我给小明100元，并且小明收到100元这件事情，所有人都是公证人，将来需要对账时，就有了证据。
    
    **生三个问题：**
    - 1. 在广播时，如何迅速让所有人听到？
    :::details 解决方案
        提升网速。
    :::
    
    - 2. 广播时，如何保护个人隐私？
    :::details 解决方案
        加密散列
        任何信息都可以转化为一个256位的二进制字符串
    :::
    - 3. 如何让所有人的账本快速达成共识（快速核对交易）？
    :::details 解决方案
        区块链中 设有一个 “帐房先生” 负责记录每天的交易记录，省去了每个人都记账的麻烦。
        
        当双方之间发生多次交易时
        例如：第一次交易 100元;   则广播 "111";  假设，这一次交易的加密散列值 hash(交易1) = "111"
        第二次交易 1000元;    则广播 "222";    假设，这一次交易的加密散列值  hash("111",交易2) = "222"
        
        这时，只需要核对 第二次的加密值，就能够判断两笔交易是否一致。
        
        多条账目的打包，就称为“区块”， 区块的打包时间可以变动，区块之间通过结转余额的方式联系在一起，就组成了区块链。
        这就产生了新的问题，账房先生的收入哪来？        
    :::

    - 4. 如何解决账房先生的收入问题？
    :::tip 解决方案
        共识机制，选出当下的帐房先生，并设立奖励机制（打包手续费、系统奖励）。
    :::
    
    - 5. 如何解决距离账簿较远，更新不便？
    :::tip 解决方案
        项目中的每一个成员，都可以看作是一个节点。
        p2p 网络。  每个既是信息的接受者，同时也是信息的传播者。
        最终，每个人手中都有一个账本，所以实现了去中心化。 账目篡改非常困难。
    :::


## 加密散列
- `加密散列函数`（Cryptographic hash function），也称密码散列函数，是散列函数中的一种。
 
     它被认为是一种`单向函数`，也就是说极其难以由散列函数输出的结果，回推输入的资料是什么。这种散列函数的输入资料，通常被称为消息（message），而它的输出结果，通常被称为消息摘要（digest),
    在信息安全中，很多应用都使用了密码散列函数实现，例如`数字签名`。

- **演示:**

    [SHA-2](https://tool.oschina.net/encrypt?type=2)

- **特性：**
    - 对于任何给定消息，都很容易计算出散列数值
    - 难以由一个已知的散列值，去推导出原始的消息
    - 在不更改散列数值的前提下，修改消息内容是不可行的
    - 对于两个不同的消息，只有极低的几率会产生相同的散列数值


## 哈希树
一种树形数据结构，每个叶子节点均已`数据块的哈希`作为标签，除了叶子节点以外的节点则以其`子节点的标签的加密哈希`作为标签

![](https://api.zk123.top/link/repo1/img/2020/hash_tree.svg)
