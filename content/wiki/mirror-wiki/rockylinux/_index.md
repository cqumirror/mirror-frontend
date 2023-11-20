---
title: "Rocky Linux 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/rockylinux/_index'
---
## 地址
http://mirrors.cqu.edu.cn/rockylinux
## 说明
Rocky Linux 软件源
## 收录架构
- x86_64
- aarch64

## 收录版本
- Rocky Linux 8
- Rocky Linux 9

## 使用说明

### Rocky Linux 8

首先备份全部 `repo` 文件：
```bash
cd /etc/yum.repos.d/ && mkdir -p backup && mv Rocky-* backup/.
```

根据版本号下载相应文件到指定目录：
</br>

```bash
for i in {AppStream,BaseOS,Devel,Extras,HighAvailability,PowerTools,Sources}; do wget https://mirrors.cqu.edu.cn/repo/rockylinux/8/Rocky-${i}.repo; done
```

{{% notice note %}}
有些情况下系统没有预装`wget`程序，请提前进行安装。
{{% /notice %}}

然后刷新 yum 缓存：
```bash
yum makecache
```

### Rocky Linux 9

首先备份全部 `repo` 文件：
```bash
cd /etc/yum.repos.d/ && mkdir -p backup && mv rocky* backup/.
```

根据版本号下载相应文件到指定目录：
</br>

```bash
for i in {'',-addons,-devel,-extras}; do wget https://mirrors.cqu.edu.cn/repo/rockylinux/9/rocky${i}.repo; done
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
官方主页：https://www.rockylinux.org/
{{% /notice %}}

