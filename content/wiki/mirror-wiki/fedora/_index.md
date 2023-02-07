---
title: "Fedora 镜像使用帮助"
draft: false
weight: 2
---
## 地址
https://mirrors.cqu.edu.cn/fedora
## 描述
Fedora Linux 软件仓库
## 收录架构
x86_64
## 收录版本
仅`release`
## 使用说明
首先做好备份操作：
```bash
# fedora
mv /etc/yum.repos.d/fedora.repo /etc/yum.repos.d/fedora.repo.bak
mv /etc/yum.repos.d/fedora-updates.repo /etc/yum.repos.d/fedora-updates.repo.bak
```
```bash
# fedora modular
mv /etc/yum.repos.d/fedora-modular.repo /etc/yum.repos.d/fedora-modular.repo.bak
mv /etc/yum.repos.d/fedora-updates-modular.repo /etc/yum.repos.d/fedora-updates-modular.repo.bak
```
然后执行：
```bash
wget   -O   /etc/yum.repos.d/fedora.repo   http://mirrors.cqu.edu.cn/repo/fedora/fedora.repo
wget   -O   /etc/yum.repos.d/fedora-updates.repo   http://mirrors.cqu.edu.cn/repo/fedora/fedora-updates.repo
```
```bash
wget   -O   /etc/yum.repos.d/fedora-modular.repo   http://mirrors.cqu.edu.cn/repo/fedora/fedora-modular.repo
wget   -O   /etc/yum.repos.d/fedora-updates-modular.repo   http://mirrors.cqu.edu.cn/repo/fedora/fedora-updates-modular.repo
```

再执行：
```bash
sudo dnf makecache
```
生成缓存。
{{%attachments title="repo 文件直接下载" pattern=".*(repo)"/%}}

## 相关链接
{{% notice %}}
官方主页
https://getfedora.org/
{{% /notice %}}
{{% notice %}}
邮件列表
https://fedoraproject.org/wiki/Communicating_and_getting_help
{{% /notice %}}
{{% notice %}}
论坛
https://forums.fedoraforum.org/
{{% /notice %}}
{{% notice %}}
文档
https://docs.fedoraproject.org/
{{% /notice %}}
{{% notice %}}
Wiki
https://fedoraproject.org/wiki/
{{% /notice %}}
