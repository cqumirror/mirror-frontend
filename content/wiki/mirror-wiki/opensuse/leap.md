---
title: "openSUSE Leap 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/opensuse/leap'
---
## 地址

http://mirrors.cqu.edu.cn/opensuse/distribution/leap/

## 说明

openSUSE Leap 软件仓库

## 收录架构
- i586
- aarch64
- powerpc
- x86_64
## 收录版本
生命期内 Leap 版本(不包含 src 包(源码包)和 debug 包)
## 使用说明
### 简易版本
{{% notice note %}}
此方法适用于安装时装载了 YAST2 组件的情况
{{% /notice %}}

首先从启动器打开`YAST2`

![img1](/static/mirror-wiki/opensuse/images/01.png)

然后打开`软件源配置`，等待加载完成(图中全部软件源已经禁用)

![img2](/static/mirror-wiki/opensuse/images/02.png)

此时我们只需要 4 个仓库即可完成配置：

- OSS
- update:OSS
- update:NON-OSS
- NON-OSS

修改对应条目地址到 `mirrors.cqu.edu.cn`:

![img3](/static/mirror-wiki/opensuse/images/03.png)

对应地址应为(以 Leap 15.1 为例)：

```bash
# OSS
http://mirrors.cqu.edu.cn/opensuse/distribution/leap/15.1/repo/oss/
# NON-OSS
http://mirrors.cqu.edu.cn/opensuse/distribution/leap/15.1/repo/non-oss/
# OSS update
http://mirrors.cqu.edu.cn/opensuse/update/leap/15.1/oss/
# NON-OSS update
http://mirrors.cqu.edu.cn/opensuse/update/leap/15.1/non-oss/
```

修改完成应当如下图所示：

![img4](/static/mirror-wiki/opensuse/images/04.png)

点击`确定`退出

### 通常版本

{{% notice note %}}
此方法适用于所有情况
{{% /notice %}}

首先禁用全部仓库：
```bash
sudo zypper mr -da
```
然后依次执行(Leap 15.1为例):
```bash
# OSS
sudo zypper ar -fc http://mirrors.cqu.edu.cn/opensuse/distribution/leap/15.1/repo/oss   openSUSE-CQU-OSS
# NON-OSS
sudo zypper ar -fc http://mirrors.cqu.edu.cn/opensuse/distribution/leap/15.1/repo/non-oss   openSUSE-CQU-NON-OSS
# OSS update
sudo zypper ar -fc http://mirrors.cqu.edu.cn/opensuse/update/leap/15.1/oss   openSUSE-CQU-OSS-UPDATE
# NON-OSS update
sudo zypper ar -fc http://mirrors.cqu.edu.cn/opensuse/update/leap/15.1/non-oss   openSUSE-CQU-NON-OSS-UPDATE
```
## 相关链接
官方主页
https://www.opensuse.org/

邮件列表
https://en.opensuse.org/Communicate/Mailinglists

论坛
https://forums.opensuse.org/

中文论坛
https://forum.suse.org.cn/

Wiki
https://en.opensuse.org/

中文 Wiki
https://zh.opensuse.org/

文档
https://en.opensuse.org/Documentation

openSUSE Guide
https://lug.ustc.edu.cn/sites/opensuse-guide/
