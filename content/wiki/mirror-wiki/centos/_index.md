---
title: "CentOS 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/centos/_index'
---
## 地址

http://mirrors.cqu.edu.cn/CentOS

## 说明

CentOS 软件源

## 收录架构

- x86_64
- i386

## 收录版本

- CentOS 5
- CentOS 6
- CentOS 7
- CentOS 8

## 使用说明

首先备份`CentOS-Base.repo`:


```bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```


然后查看 CentOS 版本：


```bash
cat /etc/system-release
```


根据版本号下载相应文件到指定目录：</br>
**CentOS 5**:

```bash
wget   -O   /etc/yum.repos.d/CentOS-Base.repo  http://mirrors.cqu.edu.cn/repo/centos/Centos-5.repo
```

**CentOS 6**:

```bash
wget   -O   /etc/yum.repos.d/CentOS-Base.repo  http://mirrors.cqu.edu.cn/repo/centos/Centos-6.repo
```

**CentOS 7**:

```bash
wget   -O   /etc/yum.repos.d/CentOS-Base.repo  http://mirrors.cqu.edu.cn/repo/centos/Centos-7.repo
```

**CentOS 8**:

```bash
# CentOS-Base
wget   -O   /etc/yum.repos.d/CentOS-Base.repo  http://mirrors.cqu.edu.cn/repo/centos/Centos-8-repo/CentOS-Base.repo
# CentOS-Extra
wget   -O   /etc/yum.repos.d/CentOS-Extras.repo  http://mirrors.cqu.edu.cn/repo/centos/Centos-8-repo/CentOS-Extras.repo
# CentOS-AppStream
wget   -O   /etc/yum.repos.d/CentOS-AppStream.repo  http://mirrors.cqu.edu.cn/repo/centos/Centos-8-repo/CentOS-AppStream.repo
```


{{% notice note %}}
有些情况下系统没有预装`wget`程序，请提前进行安装。
{{% /notice %}}


然后刷新 yum 缓存：

```bash
yum makecache
```

## 相关链接


{{% notice link %}}
官方主页：https://www.centos.org/
{{% /notice %}}


{{% notice link %}}
邮件列表：https://www.centos.org/modules/tinycontent/index.php?id=16
{{% /notice %}}


{{% notice link %}}
论坛：https://www.centos.org/modules/newbb/
{{% /notice %}}


{{% notice link %}}
文档：https://www.centos.org/docs/
{{% /notice %}}


{{% notice %}}
Wiki：https://wiki.centos.org/
{{% /notice %}}
