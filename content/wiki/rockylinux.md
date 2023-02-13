---
title: "Rocky Linux 镜像使用帮助"
draft: false
weight: 2
---
## 地址
http://mirrors.cqu.edu.cn/rockylinux
## 说明
Rocky Linux 软件源
## 收录框架
- x86_64
- aarm64

## 收录版本
- Rocky Linux 8

## 使用说明
首先备份全部 `repo` 文件：
```bash
cd /etc/yum.repos.d/ && mkdir -p backup && mv Rocky-* backup/.
```

根据版本号下载相应文件到指定目录：
</br>
**Rocky Linux 8**:
```bash
for i in {AppStream,BaseOS,Devel,Extras,HighAvailability,PowerTools,Sources}; do wget https://mirrors.cqu.edu.cn/repo/rockylinux/Rocky-${i}.repo; done
```

{{% notice note %}}
有些情况下系统没有预装`wget`程序，请提前进行安装。
{{% /notice %}}

然后刷新 yum 缓存：
```bash
yum makecache
```
## 相关链接
{{% notice %}}
官方主页：https://www.rockylinux.org/
{{% /notice %}}

