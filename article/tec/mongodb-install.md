---
title: Windows 安装MongoDB (4.4.0)
date: 2020-08-08
cover: /img/cover/17.webp
sidebar: 'auto'
categories:
- 教程
tags:
- 软件安装
publish: true
permalink: /17
---

> 第 17 篇文章
<!-- more -->

## 1. 下载MongoDB
官网下载地址：[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

## 2. 安装MongoDB
4.4.0版本的MongoDB几乎省去了所有的配置步骤，安装过程中可以几乎全部按照默认配置，注意：**需要取消安装MongoDB可视化界面** 
这非常费时间！

## 3. 配置MongoDB账户
MongoDB虽然省去了大部分的配置操作，但是仍然没有初始设定的用户，这一点非常不安全，所有我们下面
来配置MongoDB的用户！

cmd进入MongoDB安装文件夹的Bin目录
执行以下代码：
```bash 
mongo.exe       # 启动MongoDB

use admin       # 设定admin数据库
# 提示 switched to db admin

db.createUser({user:"root",pwd:"123456",roles:[{role:"readWrite",db:"test"}]})
# user - 用户名；  pwd - 密码
```
以上操作完成了用户的设定，下面用我们刚才设定的用户来登录数据库。

exit退出刚才的数据库并执行以下代码：
```bash 
mongo.exe

db.auth("root","123456")
# 1         提示1表示验证成功，可以对数据库进行如些操作了
```
## 4. MongoDB相关命令
```sql
MongoDb 命令查询所有数据库列表  
  
CODE:  
  
> show dbs  
  
如果想查看当前连接在哪个数据库下面，可以直接输入db  
CODE:  
  
> db  
Admin  
想切换到test数据库下面  
CODE:  
  
> use test  
switched to db test  
> db  
Test  
想查看test下有哪些表或者叫collection，可以输入  
CODE:  


> show collections  
system.indexes  
user  
想知道mongodb支持哪些命令，可以直接输入help  
CODE:  
> help  
Dos代码  收藏代码  
  
    HELP    
          show dbs                     show database names    
          show collections             show collections in current database    
          show users                   show users in current database    
          show profile                 show most recent system.profile entries with time >= 1ms    
          use <db name>                set curent database to <db name>    
          db.help()                    help on DB methods    
          db.foo.help()                help on collection methods    
          db.foo.find()                list objects in collection foo    
          db.foo.find( { a : 1 } )     list objects in foo where a == 1    
          it                           result of the last line evaluated; use to further iterate    
  
如果想知道当前数据库支持哪些方法：  
CODE:  



> db.help();  
Java代码  收藏代码  
  
    DB methods:    
          db.addUser(username, password) 添加数据库授权用户    
          db.auth(username, password)                访问认证    
          db.cloneDatabase(fromhost) 克隆数据库    
          db.commandHelp(name) returns the help for the command    
          db.copyDatabase(fromdb, todb, fromhost)  复制数据库    
          db.createCollection(name, { size : ..., capped : ..., max : ... } ) 创建表    
          db.currentOp() displays the current operation in the db    
          db.dropDatabase()        删除当前数据库    
          db.eval_r(func, args) run code server-side    
          db.getCollection(cname) same as db['cname'] or db.cname    
          db.getCollectionNames()        获取当前数据库的表名    
          db.getLastError() - just returns the err msg string    
          db.getLastErrorObj() - return full status object    
          db.getMongo() get the server connection object    
          db.getMongo().setSlaveOk() allow this connection to read from the nonmaster member of a replica pair    
          db.getName()    
          db.getPrevError()    
          db.getProfilingLevel()    
          db.getReplicationInfo()    
          db.getSisterDB(name) get the db at the same server as this onew    
          db.killOp() kills the current operation in the db    
          db.printCollectionStats()   打印各表的状态信息    
          db.printReplicationInfo()        打印主数据库的复制状态信息    
          db.printSlaveReplicationInfo()        打印从数据库的复制状态信息    
          db.printShardingStatus()                打印分片状态信息    
          db.removeUser(username) 删除数据库用户    
          db.repairDatabase() 修复数据库    
          db.resetError()    
          db.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into { cmdObj : 1 }    
          db.setProfilingLevel(level) 0=off 1=slow 2=all    
          db.shutdownServer()    
          db.version() current version of the server    

如果想知道当前数据库下的表或者表collection支持哪些方法，可以使用一下命令如：  
CODE:  
  
> db.user.help();  user为表名  
Java代码  收藏代码  
  
    DBCollection help    
          db.foo.count()                统计表的行数    
          db.foo.dataSize()        统计表数据的大小    
          db.foo.distinct( key ) - eg. db.foo.distinct( 'x' )                按照给定的条件除重    
          db.foo.drop() drop the collection 删除表    
          db.foo.dropIndex(name)  删除指定索引    
          db.foo.dropIndexes() 删除所有索引    
          db.foo.ensureIndex(keypattern,options) - options should be an object with these possible fields: name, unique, dropDups  增加索引    
          db.foo.find( [query] , [fields]) - first parameter is an optional query filter. second parameter is optional set of fields to return.     
  
  
根据条件查找数据  
-----------------------  
通过条件查询： db.foo.find( { x : 77 } , { name : 1 , x : 1 } )  
-----------------------------  

如果想知道当前数据库下的表或者表collection支持哪些方法，可以使用一下命令如：  
CODE:  
  
> db.user.help();  user为表名  
Java代码  收藏代码  
  
DBCollection help    
      db.foo.count()                统计表的行数    
      db.foo.dataSize()             统计表数据的大小    
      db.foo.distinct( key ) - eg. db.foo.distinct( 'x' )                按照给定的条件除重    
      db.foo.drop() drop the collection 删除表    
      db.foo.dropIndex(name)  删除指定索引    
      db.foo.dropIndexes() 删除所有索引    
      db.foo.ensureIndex(keypattern,options) - options should be an object with these possible fields: name, unique, dropDups  增加索引    
      db.foo.find( [query] , [fields]) - first parameter is an optional query filter. second parameter is optional set of fields to return.     

  
根据条件查找数据  
-----------------------  
通过条件查询： db.foo.find( { x : 77 } , { name : 1 , x : 1 } )  
-----------------------------  
             instead of connecting to a mongod instance  
-v [ --verbose ]         be more verbose (include multiple times for more  
                         verbosity e.g. -vvvvv)  
-o [ --out ] arg (=dump) output directory  
[falcon@www.fwphp.cn  ~/mongodb/bin]$ ./mongodump -d test -o test/  
connected to: 127.0.0.1  
DATABASE: test         to         test/test  
      test.user to test/test/user.bson  
               100000 objects  
      test.system.indexes to test/test/system.indexes.bson  
               1 objects  
[falcon@www.fwphp.cn  ~/mongodb/bin]$ ls  
2     mongo   mongodump    mongofiles   mongorestore  mongosniff  
dump  mongod  mongoexport  mongoimport  mongos     test  
MongoDB的数据恢复工具mongorestore  
  
查看test库中的表  
CODE:  
  
> show collections  
system.indexes  
User  
删除user表  
CODE:  
  
> db.user.drop();  
True  

> show collections  
System.indexes  
现在利用mongorestore表恢复刚才利用mongodump备份的数据  
CODE:  
  
[falcon@www.fwphp.cn  ~/mongodb/bin]$ ./mongorestore --help  
usage: ./mongorestore [options] [directory or filename to restore from]  
options:  
--help                  produce help message  
-h [ --host ] arg       mongo host to connect to  
-d [ --db ] arg         database to use  
-c [ --collection ] arg collection to use (some commands)  
-u [ --username ] arg   username  
-p [ --password ] arg   password  
--dbpath arg            directly access mongod data files in this path,  
                        instead of connecting to a mongod instance  
-v [ --verbose ]        be more verbose (include multiple times for more  
                        verbosity e.g. -vvvvv)  
  
[falcon@www.fwphp.cn  ~/mongodb/bin]$ ./mongorestore -d test -c user test/test/user.bson  
connected to: 127.0.0.1  
test/test/user.bson  
       going into namespace [test.user]  
  
       100000 objects  
User表中的10w条记录已经恢复  
CODE:  
  
> show collections  
system.indexes  
user  
> db.user.find();  
{ "_id" : ObjectId("4b9c8db08ead0e3347000000"), "uid" : 1, "username" : "Falcon.C-1" }  
{ "_id" : ObjectId("4b9c8db08ead0e3347010000"), "uid" : 2, "username" : "Falcon.C-2" }  
{ "_id" : ObjectId("4b9c8db08ead0e3347020000"), "uid" : 3, "username" : "Falcon.C-3" }  
{ "_id" : ObjectId("4b9c8db08ead0e3347030000"), "uid" : 4, "username" : "Falcon.C-4" }  
{ "_id" : ObjectId("4b9c8db08ead0e3347040000"), "uid" : 5, "username" : "Falcon.C-5" }  
.................  
has more  
  
  
  
  
  
   1. 超级用户相关：  
  
         #增加或修改用户密码  
  
         db.addUser('admin','pwd')  
  
         #查看用户列表  
  
         db.system.users.find()  
  
         #用户认证  
  
         db.auth('admin','pwd')  
  
         #删除用户  
  
         db.removeUser('mongodb')  

   #查看所有用户  
  
         show users  
  
         #查看所有数据库  
  
         show dbs  
  
         #查看所有的collection  
  
         show collections  
  
         #查看各collection的状态  
  
         db.printCollectionStats()  
  
         #查看主从复制状态  
  
         db.printReplicationInfo()  
  
         #修复数据库  
  
         db.repairDatabase()  
  
         #设置记录profiling，0=off 1=slow 2=all  
  
         db.setProfilingLevel(1)  
  
         #查看profiling  
        show profile  
  
         #拷贝数据库  
  
         db.copyDatabase('mail_addr','mail_addr_tmp')  
  
         #删除collection  
  
         db.mail_addr.drop()  
  
         #删除当前的数据库  
  
         db.dropDatabase()  
  
   2. 客户端连接  
  
          /usr/local/mongodb/bin/mongo user_addr -u user -p 'pwd'  
  
   3. 增删改  
  
           #存储嵌套的对象  
  
          db.foo.save({'name':'ysz','address':{'city':'beijing','post':100096},'phone':[138,139]})  
  
          #存储数组对象  
  
          db.user_addr.save({'Uid':'yushunzhi@sohu.com','Al':['test-1@sohu.com','test-2@sohu.com']})  
  
          #根据query条件修改，如果不存在则插入，允许修改多条记录  
   db.foo.update({'yy':5},{'$set':{'xx':2}},upsert=true,multi=true)  
  
          #删除yy=5的记录  
  
          db.foo.remove({'yy':5})  
  
          #删除所有的记录  
  
         db.foo.remove()  
  
   4. 索引  
  
          增加索引：1(ascending),-1(descending)  
  
          db.things.ensureIndex({firstname: 1, lastname: 1}, {unique: true});  
  
          #索引子对象  
  
          db.user_addr.ensureIndex({'Al.Em': 1})  
  
          #查看索引信息  
  
          db.deliver_status.getIndexes()  
  
          db.deliver_status.getIndexKeys()  
  
          #根据索引名删除索引  
    db.user_addr.dropIndex('Al.Em_1')  
  
   5. 查询  
  
          查找所有  
  
          db.foo.find()  
  
          #查找一条记录  
  
          db.foo.findOne()  
  
          #根据条件检索10条记录  
  
          db.foo.find({'msg':'Hello 1'}).limit(10)  
  
          #sort排序  
  
          db.deliver_status.find({'From':'yushunzhi@sohu.com'}).sort({'Dt',-1})  
  
          db.deliver_status.find().sort({'Ct':-1}).limit(1)  
  
         #count操作  
  
         db.user_addr.count()  
  
         #distinct操作  
  
         db.foo.distinct('msg')  
    #>操作  
  
         db.foo.find({"timestamp": {"$gte" : 2}})  
  
         #子对象的查找  
  
         db.foo.find({'address.city':'beijing'})  
  
   6. 管理  
  
          查看collection数据的大小  
  
          db.deliver_status.dataSize()  
  
          #查看colleciont状态  
  
          db.deliver_status.stats()  
  
          #查询所有索引的大小  
  
          db.deliver_status.totalIndexSize()
```