---
title: "Arch Linux 源使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/archlinux/_index'
---

## 地址

https://mirrors.cqu.edu.cn/archlinux/

## 说明

Arch Linux 软件源

## 收录架构

x86_64

## 使用说明

以 root 身份手动编辑文件`/etc/pacman.d/mirrorlist`，在文件顶端加入

```bash
Server = https://mirrors.cqu.edu.cn/archlinux/$repo/os/$arch
```

## 相关链接


{{% notice link %}}
官方网站 https://archlinux.org
{{% /notice %}}


{{% notice link %}}
官方文档 https://wiki.archlinux.org
{{% /notice %}}


{{% notice link %}}
AUR https://aur.archlinux.org
{{% /notice %}}
