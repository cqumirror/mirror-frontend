---
title: "openSUSE Tumbleweed 镜像使用帮助"
draft: false
weight: 2
---
## 地址
http://mirrors.cqu.edu.cn/opensuse/tumbleweed/
## 说明
openSUSE tumbleweed 软件仓库
## 收录架构
- i586
- x86_64
## 收录版本
Tumbleweed
## 使用说明

首先禁用全部仓库：
```bash
sudo zypper mr -da
```
然后依次执行(Leap 15.1 为例):
```bash
# OSS
sudo zypper ar -fc http://mirrors.cqu.edu.cn/opensuse/tumbleweed/repo/oss   openSUSE-CQU-OSS
# NON-OSS
sudo zypper ar -fc http://mirrors.cqu.edu.cn/opensuse/tumbleweed/repo/non-oss   openSUSE-CQU-NON-OSS
```
然后执行：
```bash
zypper up
```
刷新缓存

## 相关链接
官方主页
https://www.opensuse.org/

邮件列表
https://en.opensuse.org/Communicate/Mailinglists

论坛
https://forums.opensuse.org/

中文论坛
https://forum.suse.org.cn/

Wiki
https://en.opensuse.org/

中文 Wiki
https://zh.opensuse.org/

文档
https://en.opensuse.org/Documentation

openSUSE Guide
https://lug.ustc.edu.cn/sites/opensuse-guide/
