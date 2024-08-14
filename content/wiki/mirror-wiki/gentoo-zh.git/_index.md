---
title: "Gentoo-zh 社区源使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/gentoo-zh.git/_index'
---

## 地址

http://mirrors.cqu.edu.cn/git/gentoo-zh.git

## 说明

Gentoo zh Overlay

## 收录架构

- Defined in ebuild

## 使用说明
### 首次使用


{{% notice error %}}
务必确保已经预先安装了 `git` ，没有 `git` 将导致以下全部索引添加步骤操作无效。
{{% /notice %}}


确保已经安装了 `git`，如未安装，使用如下命令进行安装：

```bash
sudo emerge -aq git
```

如果同步过 `gentoo-zh` 需要删除已经同步过的内容并重新同步：

```bash
rm -rf /var/db/repos/gentoo-zh
```

执行以下内容添加 gentoo-zh 镜像：


```bash
eselect repository add gentoo-zh git https://mirrors.cqu.edu.cn/git/gentoo-zh.git
```

并执行同步：

```bash
emerge --sync gentoo-zh
```

使用 eix 查询包：

```bash
eix <package>
```

安装 gentoo-zh 包：

```bash
emerge -aq <package>
```


{{% notice note %}}
gentoo-zh 是 https://github.com/microcai/gentoo-zh 的完整镜像，是 [ebuild](https://wiki.gentoo.org/wiki/Ebuild) 仓库，并不包含 ebuild 引用的二进制和源代码内容。
{{% /notice %}}


如需要使用 `distfiles 缓存` 请参考： [Gentoo zh distfile 缓存镜像使用帮助](/wiki/mirror-wiki/gentoo-zh.git/cache)中的说明。


{{% notice warn %}}
gentoo-zh 中部分包需要启用 `~amd64` 关键字，如注重稳定性需要取舍。
{{% /notice %}}
