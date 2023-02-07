---
title: "Arch Linux 源使用帮助"
draft: false
weight: 2
---
## 地址
https://mirrors.cqu.edu.cn/archlinux/
## 说明
Arch Linux 软件源
## 收录框架
x86_64
## 使用说明
以 root 身份手动编辑文件**/etc/pacman.d/mirrorlist**，在文件顶端加入
```bash
Server = https://mirrors.cqu.edu.cn/archlinux/$repo/os/$arch
```
