---
title: "如何配置 sudo - Debian 软件仓库使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/debian/sudo'
---
默认情况下，Debian 如果安装过程中设置了 root 密码，那么创建的普通用户将没有使用`sudo`的权限。

此处说明如何在这种情况下配置`sudo`。

在普通用户下使用命令：

```bash
su - -c "usermod -a -G sudo `whoami`"
```

之后重新登陆该用户，就可以使用`sudo`命令了。
