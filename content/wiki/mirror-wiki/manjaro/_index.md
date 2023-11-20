---
title: "Manjaro Linux 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/manjaro/_index'
---
## 地址
https://mirrors.cqu.edu.cn/manjaro/
## 说明
Monjoro Linux 软件源
## 收录架構
- x86_64
- i686
## 使用说明
以 root 身份手动编辑文件`/etc/pacman.d/mirrorlist`，在文件顶端加入
```bash
Server = https://mirrors.cqu.edu.cn/manjaro/stable/$repo/$arch
```
## 相关链接


{{% notice link %}}
官方网址：https://www.manjaro.org/
{{% /notice %}}


{{% notice link %}}
官方论坛：https://forum.manjaro.org/
{{% /notice %}}


{{% notice link %}}
Wiki: https://wiki.manjaro.org/
{{% /notice %}}
