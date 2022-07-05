---
title: SpringBoot 集成 Shiro
date: 2021-04-25
cover: /img/cover/79.webp
sidebar: 'auto'
categories:
- 笔记
tags:
- SpringBoot
- Shiro
- Java
- 框架
- 后端
publish: true
permalink: /article/79
---

> 第 79 篇文章
<!-- more -->

## Shiro
[参考文章](https://www.w3cschool.cn/shiro/co4m1if2.html)
Apache Shiro 是 Java 的一个安全框架，相较于Spring Security 更简单，适用于小型项目。

## 使用

1. 拦截器 - `ShiroAuthFilter.java`
```java 
package top.zk123.chain.shiro;

import org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import top.zk123.chain.exception.TokenInvalidException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 拦截器，拦截和验证 Token 的有效性.
 *
 * @author Ke Zhang
 * @since 1.0
 */
public class ShiroAuthFilter extends BasicHttpAuthenticationFilter {

    /**
     * 存储 Token 的 Headers Key
     */
    protected static final String AUTHORIZATION_HEADER = "Authorization";
    /**
     * Token 的开头部分
     */
    protected static final String BEARER = "Bearer ";
    private String token;

    /**
     * 判断是否允许访问
     *
     * @param request     Request
     * @param response    Response
     * @param mappedValue mapperValue
     * @return true 表示允许访问
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        if (this.getAuthzHeader(request) != null) {
            // Case 1: Token 未过期，如果即将过期，则刷新 Token
            try {
                // 对 Token 进行检查
                executeLogin(request, response);
                String refreshToken = new TokenUtils().refreshToken(this.token);
                if (refreshToken != null) {
                    this.token = refreshToken.substring(BEARER.length());
                    // 更新 Header 中的 Token 值
                    shiroAuthResponse(response);
                }
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    /**
     * 从 Request 的 Header 取得 Token
     *
     * @param request ServletRequest
     * @return token or null
     */
    @Override
    protected String getAuthzHeader(ServletRequest request) {
        try {
            // header 是否存在 Token
            HttpServletRequest httpRequest = WebUtils.toHttp(request);
            this.token = httpRequest.getHeader(AUTHORIZATION_HEADER).substring(BEARER.length());
            return this.token;
        } catch (Exception e) {
            return null;
        }
    }

    // 自动调用 ShiroRealm 进行登入
    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) {
        // Subject 主体，可以代表用户和程序，它需要访问系统，系统则需要对其进行认证和授权。
        this.getSubject(request, response).login(new ShiroAuthToken(this.token));
        return true;
    }

    /**
     * 未授权访问 || 刷新 Header 中 Token的值
     *  @param response Response
     *
     */
    private void shiroAuthResponse(ServletResponse response) throws TokenInvalidException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        // 刷新 Token，设置返回的头部
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        httpServletResponse.setHeader("Access-Control-Expose-Headers", "Authorization");
        httpServletResponse.addHeader(AUTHORIZATION_HEADER, BEARER + this.token);
    }
}
```

2. 实现 AuthenticationToken 接口，作为 Token 传入到 Realm 的载体 - `ShiroAuthToken.java`

```java 
package top.zk123.chain.shiro;

import org.apache.shiro.authc.AuthenticationToken;

/**
 * 实现 AuthenticationToken 接口，作为 Token 传入到 Realm 的载体
 *
 * @author Ke Zhang
 * @since 1.0
 */
public class ShiroAuthToken implements AuthenticationToken {
    private String token;

    public ShiroAuthToken(String token) {
        this.token = token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
```

3. 自定义 Realm，对 Token 进行身份认证和角色权限配置
```java 
package top.zk123.chain.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Service;
import top.zk123.chain.bean.Institution;

import javax.annotation.Resource;
import java.util.Arrays;

/**
 * 从 ShiroAuthToken 取得 Token 并进行身份验证和角色权限配置。
 *
 * @author Ke Zhang
 * @since 1.0
 */
@Service
public class ShiroRealm extends AuthorizingRealm {
    @Resource
    TokenUtils tokenUtils;

    @Override
    public boolean supports(AuthenticationToken authenticationToken) {
        // 指定当前 authenticationToken 需要为 ShiroAuthToken 的实例
        return authenticationToken instanceof ShiroAuthToken;
    }

    /**
     * 获取 Token 并验证
     *
     * @param authenticationToken Token 实例
     * @return 授权信息
     * @throws AuthenticationException Exception
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        ShiroAuthToken shiroAuthToken = (ShiroAuthToken) authenticationToken;
        String token = (String) shiroAuthToken.getCredentials();
        // 验证 Token
        Institution institution = tokenUtils.validationToken(token);
        if (institution == null) {
            throw new AuthenticationException("Token 无效");
        }
        return new SimpleAuthenticationInfo(token, token, "ShiroRealm");
    }

    /**
     * 实现用户角色、用户权限的配置，对于没有用户角色、权限的系统来说，可以不实现，直接 super
     *
     * @param principals Token
     * @return 认证信息
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        // 获取用户信息
        Institution institution = tokenUtils.validationToken(principals.toString());
        // 创建一个授权对象
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        // 判断用户角色是否存在
        if (!institution.getRole().isEmpty()) {
            // 角色设置
            info.addRole(institution.getRole());
        }
        if (!institution.getPermission().isEmpty()) {
            // 进行权限设置,根据 , 分割
            Arrays.stream("admin".split(",")).forEach(info::addStringPermission);
        }
        return info;
    }
}
```

4. TokenUtils 基于 JWT 生成 Token
```java 
package top.zk123.chain.shiro;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import top.zk123.chain.bean.Institution;
import top.zk123.chain.exception.TokenInvalidException;

import java.io.Serializable;
import java.util.Date;

/**
 * 生成和验证 Token 的工具类.
 *
 * @author Ke Zhang
 * @since 1.0
 */
@Component
public class TokenUtils implements Serializable {
    private static final long serialVersionUID = -3L;
    /**
     * Token 有效时长 7 天
     **/
    private static final Long EXPIRATION = 7 * 24 * 60 * 60L;

    /**
     * 生成 Token 字符串
     *
     * @param institution 用户信息
     * @return 生成的Token字符串 or null
     */
    public String createToken(Institution institution) {
        try {
            // 生成 Token
            String token = Jwts.builder()
                    // 设置 Token 签发者 可选
                    .setIssuer("时长两分半练习生")
                    // 根据用户Id设置 Token 的接受者
                    .setId(institution.getInstitutionId())
                    // 设置过期时间
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION * 1000))
                    // 设置 Token 生成时间 可选
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    // 通过 claim 方法设置一个 key = role，value = userRole 的值
                    .claim("role", institution.getRole())
                    .claim("permission", institution.getPermission())
                    // 用户角色
                    // 设置加密密钥和加密算法，注意要用私钥加密且保证私钥不泄露
                    .signWith(SignatureAlgorithm.HS512, "Private Key")
                    .compact();
            return String.format("Bearer %s", token);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 解析 Token
     *
     * @param token Token 字符串
     * @return sysUser 用户信息
     */
    public Institution validationToken(String token) {
        try {
            // 解密 Token，获取 Claims 主体
            Claims claims = Jwts.parser()
                    // 设置公钥解密，以为私钥是保密的，因此 Token 只能是自己生成的，如此来验证 Token
                    .setSigningKey("Private Key")
                    .parseClaimsJws(token).getBody();
            assert claims != null;
            Institution institution = new Institution();
            // 获得用户信息
            institution.setInstitutionId(claims.getId());
            return institution;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Token 刷新
     *
     * @param token Token
     * @return String 新 Token 或者 null
     * @throws TokenInvalidException Token失效
     */
    public String refreshToken(String token) throws TokenInvalidException {
        try {
            // 解密 Token，获取 Claims 主体
            Claims claims = Jwts.parser()
                    // 公钥解密
                    .setSigningKey("Private Key")
                    .parseClaimsJws(token).getBody();
            assert claims != null;
            // Token 过期时间
            Date expiration = claims.getExpiration();
            // Case 1: 20分钟内过期则刷新 Token
            if (!expiration.before(new Date(System.currentTimeMillis() + 20 * 60 * 1000))) {
                return null;
            }
            Institution institution = new Institution();
            institution.setInstitutionId(claims.getId());
            return createToken(institution);
        } catch (ExpiredJwtException e) {
            throw new TokenInvalidException();
        }
    }
}
```

5. Shiro 配置 使用自定义的 Realm，关闭 Session 管理器，自定义拦截规则
```java 
package top.zk123.chain.shiro;

import org.apache.shiro.mgt.DefaultSessionStorageEvaluator;
import org.apache.shiro.mgt.DefaultSubjectDAO;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * shiro 配置
 *
 * @author Ke Zhang
 * @since 1.0
 */
@Configuration
public class ShiroConfig {
    /**
     * 使用自定义的 Realm 和关闭 Session 管理器
     *
     * @param realm 自定义的 Realm
     * @return SecurityManager
     */
    @Bean
    public DefaultWebSecurityManager securityManager(ShiroRealm realm) {
        DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
        // 使用自己的 realm
        manager.setRealm(realm);
        // 关闭 Session
        // shiro.ini 方式参考 http://shiro.apache.org/session-management.html#disabling-subject-state-session-storage
        DefaultSessionStorageEvaluator defaultSessionStorageEvaluator = new DefaultSessionStorageEvaluator();
        defaultSessionStorageEvaluator.setSessionStorageEnabled(false);
        DefaultSubjectDAO subjectDAO = new DefaultSubjectDAO();
        subjectDAO.setSessionStorageEvaluator(defaultSessionStorageEvaluator);
        manager.setSubjectDAO(subjectDAO);
        return manager;
    }

    /**
     * 添加拦截器和配置拦截规则
     *
     * @param securityManager 安全管理器
     * @return 拦截器和拦截规则
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean factoryBean = new ShiroFilterFactoryBean();
        factoryBean.setSecurityManager(securityManager);
        // 一定要用 LinkedHashMap，HashMap 顺序不一定按照 put 的顺序，拦截匹配规则是从上往下的
        // 比如 /api/user/login ，已经匹配到了，即使用 anon 的拦截器，就不会再去匹配 /** 了
        // anon 支持匿名访问的拦截器
        LinkedHashMap<String, String> filterChainDefinitions = new LinkedHashMap<>(4);
        // 登录接口和注册放开
        filterChainDefinitions.put("/login", "anon");
        filterChainDefinitions.put("/register", "anon");
        filterChainDefinitions.put("/wx/login", "anon");
        filterChainDefinitions.put("/verify/**", "anon");
        filterChainDefinitions.put("/wx/exportJSON", "anon");


        //  添加 shiroAuthFilter 的拦截器
        Map<String, Filter> filters = new HashMap<>(2);
        filters.put("authFilter", new ShiroAuthFilter());
        // 其他请求通过自定义的 authFilter
        filterChainDefinitions.put("/**", "authFilter");

        factoryBean.setFilterChainDefinitionMap(filterChainDefinitions);
        factoryBean.setFilters(filters);
        return factoryBean;
    }

}
```
