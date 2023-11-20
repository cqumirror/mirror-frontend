---
title: "OpenWrt / LEDE 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/openwrt/_index'
---
## 地址
http://mirrors.cqu.edu.cn/openwrt/
## 说明
OpenWrt / LEDE 软件源
## 收录架构
官方支持的全部架构
## 使用说明
### Luci
在 Luci 中依次进入：`System` -> `Software` -> `Advanced`
找到软件源编辑的区域，将全部 `downloads.openwrt.org` 替换为 `mirrors.cqu.edu.cn/openwrt`。
单击 `Submit` 提交修改。
切换到`Package`页面并单击 `refresh` 刷新包管理器缓存。
### Shell

{{% notice note %}}
请确保在此次登陆后及时修改 root 密码
{{% /notice %}}

使用如 putty 等支持 openssh 的工具，Linux 以及 MacOS 可以直接在终端中执行：
```bash
ssh root@IP -p PORT
# IP 以及 PORT 请替换为具体值，port 一般为 22
```
以登录至 shell。然后执行：
```bash
cp /etc/opkg/distfeeds.conf /etc/opkg/distfeeds.conf.save
```
备份默认软件源列表。
然后执行：
```bash
sed -i 's/downloads.openwrt.org/mirrors.cqu.edu.cn\/openwrt/g' /etc/opkg/distfeeds.conf
opkg update
```
更改软件源并刷新缓存。

{{% notice warn %}}
刷新缓存时请注意网络连接，重庆大学校内请注意要有有效的校园网连接（不需要登录认证）
{{% /notice %}}

## 相关链接
官网：
https://openwrt.org

官方论坛:
https://forum.openwrt.org
