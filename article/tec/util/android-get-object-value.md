---
title: Android 获取Object对象中的属性
date: 2020-11-02
cover: /img/cover/39.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- Android
- Util
publish: true
permalink: /39
---

> 第 39 篇文章
<!-- more -->

## 思路
Object  -->  Map --> Map.get("属性名")

## 实现
1. Object to Map

```java 
public static Map<String, Object> getObjValue(Object object) {
        String dataStr = new Gson().toJson(object);
        JSONObject json = null;
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            json = new JSONObject(dataStr);
            Iterator it = json.keys();
            while (it.hasNext()) {
                String key = (String) it.next();
                Object value = json.get(key);
                map.put(key, value);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return map;
    }
```

2. Get Object Value From Map

```java 
Map<String, Object> map = GlobalUtils.getObjValue(result.getData());
BaseApplication.sessionId = (String) map.get("sessionId");
BaseApplication.studentName = (String) map.get("username");
BaseApplication.role = (String) map.get("role");
```

