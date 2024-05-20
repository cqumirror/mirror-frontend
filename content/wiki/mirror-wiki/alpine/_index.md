---
title: "Alpine Linux 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/alpine/_index'
---

## 地址

https://mirrors.cqu.edu.cn/alpine

## 描述

Alpine Linux 软件仓库。Alpine 是一个使用 busybox 和 musl libc 的轻量级发行版。

## 收录架构

x86_64

## 收录版本

- `latest-release`
- `edge`

## 使用说明

Alpine 共有三个存储库：

- main 软件包是由 Alpine 核心和主要团队直接支持和更新的软件。它们还有官方的特殊文档，始终适用于所有版本，并且如果某些版本不从上游继续，将会有替代品。通常选择这些包是因为它们对上游可用性的责任和稳定性。 来自社区或（很少）测试的包被接受后会转到主存储库。
- community 是用户与官方开发者合作制作的，接近Alpine包流程的包。它们由这些用户的贡献支持，如果用户停止，它们可能会停止更新；由于缺乏上游作者的支持，它们也可能在未来的版本中被删除。被接受的测试包将转到社区存储库。
- testing 是新包所在的地方。这些是由 Alpine 的任何社区贡献者制作的。测试没有链接发布。测试存储库仅在 `edge` 版本可用。接受的测试包将转到社区存储库或（很少）主存储库。


用于检索安装包文件的包存储库在文件`/etc/apk/repositories`中指定。该文件的每一行指定包存储库的位置，以及可选的标签。 该位置可以是 URL ，也本地文件系统上目录的路径。带标签的存储库以说明符为`@tag`前缀，后跟空格和存储库位置。

默认值看起来像：

```txt
#/media/cdrom/apks 
http://dl-cdn.alpinelinux.org/alpine/v3.18/main 
http://dl-cdn.alpinelinux.org/alpine/v3.18/community
```

更改为重庆大学开源镜像站：

```bash
sed -i 's|dl-cdn.alpinelinux.org|mirrors.cqu.edu.cn|g' /etc/apk/repositories
```

如果希望添加测试仓库，可以添加如下行，`replease-ver` 应替换为具体值 ：

```bash
http://mirrors.cqu.edu.cn/apline/<release-ver>/testing
```

并执行： 

```bash
apk update
```

更新索引。

## 相关链接

{{% notice link %}}
官方主页
https://www.alpinelinux.org/
{{% /notice %}}


{{% notice link %}}
文档
https://wiki.alpinelinux.org/
{{% /notice %}}

