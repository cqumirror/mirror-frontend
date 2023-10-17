---
title: "Gentoo portage git 源使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/gentoo-portage.git/_index'
---
## 地址

http://mirrors.cqu.edu.cn/git/gentoo-portage.git

## 说明

Gentoo portage git 同步仓库。

## 收录架构

- Defined in ebuild

## 使用说明
### 首次使用

首次切换为**git**方式需要清除已同步内容：

```bash
rm -rf /var/db/repos/gentoo
```

并修改`/etc/portage/repos.conf/gentoo.conf`，修改项目：

```ini
# change sync-type to git
sync-type=git
```

```ini
# change sync-uri
sync-uri=https://mirrors.cqu.edu.cn/git/gentoo-portage.git
```

并执行同步：

```bash
emerge --sync
```


{{% notice note %}}
初次同步将花费较多时间
{{% /notice %}}


