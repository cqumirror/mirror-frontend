---
title: "Debian 软件仓库使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/debian/_index'
---

## 地址
https://mirrors.cqu.edu.cn/debian

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

### Debian Stable

默认情况下，以下命令可以将默认软件源（`deb.debian.org/debian`）替换为重庆大学镜像站（`mirrors.cqu.edu.cn/debian`）。

```bash
sudo sed -i s/deb.debian.org/mirrors.cqu.edu.cn/ /etc/apt/sources.list
```

如果出现“USERNAME 不在 sudoers 文件中。此事将被报告”或“USERNAME is not in the sudoers file.  This incident will be reported.”,
可以使用

```bash
su -c 'sed -i s/deb.debian.org/mirrors.cqu.edu.cn/ /etc/apt/sources.list'
```

来完成这一操作。

但我们更推荐更安全的做法——`sudo`。[如何配置`sudo`](/wiki/mirror-wiki/debian/sudo)。

除此之外，您亦可手动编辑`/etc/apt/sources.list`。以下是 Debian Stable 参考配置内容：

```txt
deb http://mirrors.cqu.edu.cn/debian stable main contrib non-free
# deb-src http://mirrors.cqu.edu.cn/debian stable main contrib non-free
deb http://mirrors.cqu.edu.cn/debian stable-updates main contrib non-free
# deb-src http://mirrors.cqu.edu.cn/debian stable-updates main contrib non-free

# deb http://mirrors.cqu.edu.cn/debian stable-proposed-updates main contrib non-free
# deb-src http://mirrors.cqu.edu.cn/debian stable-proposed-updates main contrib non-free
```


{{% notice note %}}
注意：从 Debian 12 (bookworm) 开始，Debian 安装 CD 已经包含了部分非自由固件（nonfree-firmware）。以下列出了更改后的部分：
{{% /notice %}}


```txt[/etc/apt/sources.list]
deb http://mirrors.cqu.edu.cn/debian stable main contrib non-free non-free-firmware
# deb-src http://mirrors.cqu.edu.cn/debian stable main contrib non-free non-free-firmware
deb http://mirrors.cqu.edu.cn/debian stable-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.cqu.edu.cn/debian stable-updates main contrib non-free non-free-firmware

# deb http://mirrors.cqu.edu.cn/debian stable-proposed-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.cqu.edu.cn/debian stable-proposed-updates main contrib non-free non-free-firmware
```

## Debian Unstable (sid)

Debian Sid 需要且仅仅需要按照如下样例设置自己的`sources.list`：

```txt
deb https://mirrors.cqu.edu.cn/debian sid main contrib non-free non-free-firmware
# deb-src http://mirrors.cqu.edu.cn/debian sid main contrib non-free non-free-firmware
```



{{% notice warning %}}
为了避免更新冲突导致问题，请回避使用 `apt full-upgrade`,并仅仅使用 `apt upgrade`
{{% /notice %}}