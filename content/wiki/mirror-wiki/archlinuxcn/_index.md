---
title: "Arch Linux CN 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/archlinuxcn/_index'
---
## 地址

https://mirrors.cqu.edu.cn/archlinuxcn/

## 说明

Arch Linux CN 仓库

## 简介

Arch Linux 中文社区仓库是由 Arch Linux 中文社区驱动的非官方用户仓库。包含中文用户常用软件、工具、字体/美化包等。


## 收录架构

- x86_64
- arm64

## 使用说明

以 root 身份手动编辑文件`/etc/pacman.conf`，在文件末尾加入


```bash
[archlinuxcn]
Server = https://mirrors.cqu.edu.cn/archlinuxcn/$arch
```


执行：


```bash
pacman -Syy
```


强制刷新软件源。再执行：


```bash
pacman -S archlinuxcn-keyring
```


添加 archlinuxCN 的 GPG key


{{% notice note %}}
SigLevel 建议为 TrustedOnly
{{% /notice %}}


## 相关链接
Arch Linux 中文社区主页:</br>
[https://www.archlinuxcn.org](https://www.archlinuxcn.org)</br>
Arch Linux 中文社区仓库 / 镜像加速源介绍:</br>
[https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/)
