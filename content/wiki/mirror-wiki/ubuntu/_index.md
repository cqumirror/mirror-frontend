---
title: "Ubuntu Linux 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/ubuntu/_index'
---

## 地址

https://mirrors.cqu.edu.cn/ubuntu/

## 说明

Ubuntu 软件仓库

## 收录架构

x86_64

## 收录版本

Release

具体说明请查看 [Ubuntu Wiki](http://wiki.ubuntu.com/Releases)

## 使用说明

### 简易版本


{{% notice note %}}
此方法仅适用于桌面（Desktop）版本。
{{% /notice %}}


1. 点击`左侧dock`的菜单，进入`Gnome menu`

2. 搜索`software`，打开`Software & Updates`应用

![img1](/static/mirror-wiki/ubuntu/images/00.jpg)

3. 在打开的对话框中，**第一个标签页** 的下拉选单中（`下载自`）选择`其他站点`。在新打开的对话框选择中国选单，并选择 `mirrors.cqu.edu.cn`，点击 `选择服务器`

![img2](/static/mirror-wiki/ubuntu/images/01.jpg)

4. 点击关闭，此时会询问是否刷新 apt 缓存，选择 **是** 进行apt缓存刷新，即可使用

### 通用版本


{{% notice note %}}
在 **Ubuntu 24.04** 之前，Ubuntu 的软件源配置文件使用传统的 **One-Line-Style**，路径为 `/etc/apt/sources.list`；从 **Ubuntu 24.04** 开始，Ubuntu 的软件源配置文件变更为 [DEB822 格式](#deb822-格式)，路径为 `/etc/apt/sources.list.d/ubuntu.sources`。
{{% /notice %}}

{{% notice info %}}
以下命令适用于 **Ubuntu 24.04 之前**的版本，对于 **Ubuntu 24.04** 版本，`/etc/apt/sources.list`将会是一个**空文件**，需要**直接填充**相应的软件源配置内容，并**删除**`/etc/apt/sources.list.d/ubuntu.sources`防止配置重复，因此建议**直接采用 [DEB822 格式](#deb822-格式) 进行配置**。
{{% /notice %}}


首先备份 `sources.list` 文件

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

然后执行

```bash
sudo nano /etc/apt/sources.list
```

使用 <kbd>ctrl</kbd> + <kbd>\\</kbd> 搜索 `archive.ubuntu.com`，并填入 `mirrors.cqu.edu.cn`，回车提交，按 <kbd>shift</kbd> + <kbd>a</kbd> 即 <kbd>A</kbd> 全部替换。
按 <kbd>Ctrl</kbd> + <kbd>o</kbd> 进行写入更改，按  <kbd>ctrl</kbd> + <kbd>o</kbd>  退出。

> 如果源地址为 `cn.archive.ubuntu.com`，那么请将 `cn.archive.ubuntu.com` 替换为 `mirrors.cqu.edu.cn`

通常更改完成应该是这个样子:

对于 Ubuntu 18.04 (bionic)

```bash
deb http://mirrors.cqu.edu.cn/ubuntu/ bionic main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ bionic-security main restricted universe multiverse

# deb http://mirrors.cqu.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

对于 Ubuntu 20.04 (focal)

```bash
deb http://mirrors.cqu.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# deb http://mirrors.cqu.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

对于 Ubuntu 22.04 (jammy)

```bash
deb http://mirrors.cqu.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://mirrors.cqu.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

# deb http://mirrors.cqu.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# deb-src http://mirrors.cqu.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

对于 Ubuntu 24.04 (noble) (建议采用 [DEB822 格式](#deb822-格式))

```bash
deb https://mirrors.cqu.edu.cn/ubuntu/ noble main restricted universe multiverse
# deb-src https://mirrors.cqu.edu.cn/ubuntu/ noble main restricted universe multiverse
deb https://mirrors.cqu.edu.cn/ubuntu/ noble-updates main restricted universe multiverse
# deb-src https://mirrors.cqu.edu.cn/ubuntu/ noble-updates main restricted universe multiverse
deb https://mirrors.cqu.edu.cn/ubuntu/ noble-backports main restricted universe multiverse
# deb-src https://mirrors.cqu.edu.cn/ubuntu/ noble-backports main restricted universe multiverse
deb https://mirrors.cqu.edu.cn/ubuntu/ noble-security main restricted universe multiverse
# deb-src https://mirrors.cqu.edu.cn/ubuntu/ noble-security main restricted universe multiverse

# deb https://mirrors.cqu.edu.cn/ubuntu/ noble-proposed main restricted universe multiverse
# # deb-src https://mirrors.cqu.edu.cn/ubuntu/ noble-proposed main restricted universe multiverse
```

然后执行

```bash
sudo apt update
```

更新 apt 缓存即可生效。

执行

```bash
sudo apt upgrade
```

即可更新软件包。

### DEB822 格式

{{% notice info %}}
以下命令仅适用于 **Ubuntu 24.04 及之后**的版本。
{{% /notice %}}

首先备份 `ubuntu.sources` 文件

```bash
sudo cp /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
```

然后执行

```bash
sudo nano /etc/apt/sources.list.d/ubuntu.sources
```

将其中的内容替换为：

对于Ubuntu 24.04 (noble)

```bash
Types: deb
URIs: https://mirrors.cqu.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
# Types: deb-src
# URIs: https://mirrors.cqu.edu.cn/ubuntu
# Suites: noble noble-updates noble-backports
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 以下安全更新软件源包含了官方源与镜像站配置，如有需要可自行修改注释切换
# Types: deb
# URIs: https://mirrors.cqu.edu.cn/ubuntu
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.cqu.edu.cn/ubuntu
# # Suites: noble-security
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# Types: deb-src
# URIs: http://security.ubuntu.com/ubuntu/
# Suites: noble-security
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# 预发布软件源，不建议启用
# Types: deb
# URIs: https://mirrors.cqu.edu.cn/ubuntu
# Suites: noble-proposed
# Components: main restricted universe multiverse
# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

# # Types: deb-src
# # URIs: https://mirrors.cqu.edu.cn/ubuntu
# # Suites: noble-proposed
# # Components: main restricted universe multiverse
# # Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

按 <kbd>Ctrl</kbd> + <kbd>o</kbd> 进行写入更改 (输入 <kbd>Enter</kbd> 确认文件名)，按 <kbd>ctrl</kbd> + <kbd>x</kbd> 退出。

然后执行

```bash
sudo apt update
```

更新 apt 缓存即可生效。

执行

```bash
sudo apt upgrade
```

## 相关链接

{{% notice link %}}
官方主页
https://www.ubuntu.com/
{{% /notice %}}

{{% notice link %}}
文档
https://help.ubuntu.com/
{{% /notice %}}

{{% notice link %}}
Wiki
https://wiki.ubuntu.com/
{{% /notice %}}

{{% notice link %}}
邮件列表
https://community.ubuntu.com/contribute/support/mailinglists/
{{% /notice %}}

{{% notice link %}}
提问
https://askubuntu.com/
{{% /notice %}}

{{% notice link %}}
论坛
https://ubuntuforums.org/
{{% /notice %}}

{{% notice link %}}
中文论坛
https://forum.ubuntu.org.cn/
{{% /notice %}}

