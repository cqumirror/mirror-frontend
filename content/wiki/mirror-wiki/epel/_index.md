---
title: "EPEL 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/epel/_index'
---

## 地址

https://mirrors.cqu.edu.cn/epel

## 描述

EPEL 是由 Fedora 维护的红帽系发行版（如 Rocky Linux, CentOS, Fedora, RHEL 等）中经常的包的集合。

## 收录架构

- x86_64
- aarch64

## 收录版本

`release` 和 `testing`

## 使用说明

当存在配置过的 epel 时首先做好备份操作：

```bash
# fedora
mkdir epel-backup
mv /etc/yum.repos.d/epel*.repo /etc/yum.repos.d/epel-backup/.
```

### 在线状态

处于在线状态时：


```bash
# 配置 epel-release
dnf install epel-release
```

配置 repo 文件：

```bash
# fedora epel
for i in {'',-testing}; do wget https://mirrors.cqu.edu.cn/repo/epel/epel${i}.repo; done
```

再执行：

```bash
sudo dnf makecache
```

生成缓存。

### 离线状态

确认不缺少依赖后直接执行：

```bash
# fedora epel
for i in {'',-testing}; do wget https://mirrors.cqu.edu.cn/repo/epel/epel${i}.repo; done
```

再执行：

```bash
dnf install epel-release
```

添加该包的签名和相关内容。
如果该步骤执行错误，则需手动从`epel`仓库中获取`epel-release`文件，并使用`rpm -i <file>.rpm` 来进行装载。再执行上述步骤替换 repo 文件。

## 相关链接

{{% notice link %}}
官方主页
https://getfedora.org/
{{% /notice %}}


{{% notice link %}}
邮件列表
https://fedoraproject.org/wiki/Communicating_and_getting_help
{{% /notice %}}


{{% notice link %}}
论坛
https://forums.fedoraforum.org/
{{% /notice %}}


{{% notice link %}}
文档
https://docs.fedoraproject.org/
{{% /notice %}}


{{% notice link %}}
Wiki
https://fedoraproject.org/wiki/
{{% /notice %}}
