---
title: "Debian 软件仓库使用帮助"
draft: false
weight: 2
---
## 地址
<https://mirrors.cqu.edu.cn/debian>
## 说明
Debian 软件仓库
## 收录架构
- x86
- amd64 (x86_64)
- armel
- armhl
- arm64
- mipsel
- mips64el
- ppc64el
- s390x
- 源代码

## 收录版本
- oldoldstable (stretch)
- oldstable (buster)
- stable (bullseye)
- testing (bookworm)
- unstable (sid)
- experimental

## 使用说明
默认情况下，以下命令可以将默认软件源（`deb.debian.org/debian`）替换为重庆大学镜像站（`mirrors.cqu.edu.cn/debian`）。
```shell
sudo sed -i s/deb.debian.org/mirrors.cqu.edu.cn/ /etc/apt/sources.list
```

{{% expand "如果出现“USERNAME 不在 sudoers 文件中。此事将被报告”或“USERNAME is not in the sudoers file.  This incident will be reported.”" %}}
可以使用

```shell
su -c 'sed -i s/deb.debian.org/mirrors.cqu.edu.cn/ /etc/apt/sources.list'
```

来完成这一操作。

但我们更推荐更安全的做法——`sudo`。[如何配置`sudo`](/wiki/mirror-wiki/debian/sudo)。
{{% /expand %}}

除此之外，您亦可手动编辑`/etc/apt/sources.list`。以下是 Debian Stable 参考配置内容：
```
deb http://mirrors.cqu.edu.cn/debian stable main contrib non-free
# deb-src http://mirrors.cqu.edu.cn/debian stable main contrib non-free
deb http://mirrors.cqu.edu.cn/debian stable-updates main contrib non-free
# deb-src http://mirrors.cqu.edu.cn/debian stable-updates main contrib non-free

# deb http://mirrors.cqu.edu.cn/debian stable-proposed-updates main contrib non-free
# deb-src http://mirrors.cqu.edu.cn/debian stable-proposed-updates main contrib non-free
```
