---
title: "Gentoo-zh distfiles 缓存镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/gentoo-zh.git/cache'
---

## 地址

https://mirrors.cqu.edu.cn/gentoo-zh

## 说明

Gentoo zh Overlay 的 distfiles 缓存


## 使用说明

可使用环境变量 `GENTOO_MIRRORS` 定义，变量值为 `https://mirrors.cqu.edu.cn/gentoo-zh` 。

或在 `/etc/portage/make.conf` 中进行持久化：


```bash
# /etc/portage/make.conf - example
GENTOO_MIRRORS="${GENTOO_MIRRORS} https://mirrors.cqu.edu.cn/gentoo-zh" # gentoo-zh distfiles
```


{{% notice info  %}}
开发人员如因为版权问题或其他因素不希望镜像某些 distfiles，需要在 `ebuild` 中添加 `RESTRICT="mirror"`
{{% /notice %}}
