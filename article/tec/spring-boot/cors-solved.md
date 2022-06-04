---
title: SpringBoot 跨域请求配置
date: 2021-04-21
cover: /img/cover/76.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- CORS
publish: true
permalink: /76
---

> 第 76 篇文章
<!-- more -->

新建  `GlobalCORSConfig.java`, 详细配置如下

```java  
@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class GlobalCORSConfig {

    /**
     * 允许跨域请求
     *
     * @return {@link CorsFilter}
     */
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        //允许所有域名进行跨域调用
        config.addAllowedOriginPattern("*");
        //允许跨越发送cookie
        config.setAllowCredentials(true);
        //放行全部原始头信息
        config.addAllowedHeader("*");
        //允许所有请求方法跨域调用
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```