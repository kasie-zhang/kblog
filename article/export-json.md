---
title: SpringBoot导出JSON文件并下载
date: 2021-04-25
cover: https://api.zk123.top/link/repo1/img/cover/81.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Java
- Util
- 后端
publish: true
permalink: /article/81
---

> 第 81 篇文章
<!-- more -->

## 导出JSON并下载
使用第三方包 fastjson.

`com.alibaba.fastjson`


```java
public void ExportJSON(HttpServletRequest request, HttpServletResponse response, long UId) {
    OutputStream out;
    Certificate cert = certificateMapper.findByUid(UId);
    // 创建JSON对象
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("institutionId", cert.getInstitutionId());
    jsonObject.put("certType", cert.getCertType());
    jsonObject.put("certState", cert.getCertState());
    jsonObject.put("certPic", cert.getCertPic());
    jsonObject.put("institution", cert.getInstitution());
    jsonObject.put("issueDate", cert.getIssueDate());
    jsonObject.put("certId", cert.getCertId());
    jsonObject.put("education", cert.getEducation());
    jsonObject.put("academy", cert.getAcademy());
    jsonObject.put("major", cert.getMajor());
    jsonObject.put("admissionDate", cert.getAdmissionDate());
    jsonObject.put("graduationDate", cert.getAdmissionDate());
    jsonObject.put("name", cert.getName());
    jsonObject.put("sex", cert.getSex());
    jsonObject.put("birth", cert.getBirth());
    jsonObject.put("userPic", cert.getUserPic());
    jsonObject.put("userId", cert.getUserId());
    // 写入JSON文件到前端
    String JSON_name = "数字证书";
    String fileName = JSON_name + ".json";
    try {
        fileName = new String(fileName.getBytes(StandardCharsets.UTF_8), "iso8859-1");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Pargam", "no-cache");
        response.addHeader("Cache-Control", "no-cache");
        response.flushBuffer();
        byte[] buffer = new byte[1024];
        out = response.getOutputStream();
        String json = String.valueOf(jsonObject);
        InputStream fis = new ByteArrayInputStream(json.getBytes());
        BufferedInputStream bis = new BufferedInputStream(fis);
        int i = bis.read(buffer);
        while (i != -1) {
            out.write(buffer, 0, i);
            i = bis.read(buffer);
        }
        out.flush();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```