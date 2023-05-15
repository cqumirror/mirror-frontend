---
title: "Kali linux 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/kali/_index'
---
## 地址
https://mirrors.cqu.edu.cn/kali
## 描述
kali Linux 的官方软件包仓库
## 收录架构

- x86_64
- x86

## 使用说明
### 详细使用步骤
{{% notice note %}}
此步骤假定你是一位 Linux 的初级使用者，请跟着步骤一步步操作
{{% /notice %}}

#### 1. 定位并且备份 `sources.list`

```bash
$ cd /etc/apt/
$ sudo cp sources.list sources.list.bak
```

#### 2. 编辑 `sources.list` 文件
一般未编辑的`sources.list`文件如下所示。

```bash
$ sudo vim sources.list

---------------------
# sources.list
---------------------

# deb cdrom:[Debian GNU/Linux 2019.3 _Kali-rolling_ - Official Snapshot amd64 LIVE/INSTALL Binary 20190827-10:52]/ kali-last-snapshot contrib main non-free

# deb cdrom:[Debian GNU/Linux 2019.3 _Kali-rolling_ - Official Snapshot amd64 LIVE/INSTALL Binary 20190827-10:52]/ kali-last-snapshot contrib main non-free

deb http://http.kali.org/kali kali-rolling main non-free contrib
# deb-src http://http.kali.org/kali kali-rolling main non-free contrib

# This system was installed using small removable media
# (e.g. netinst, live or single CD). The matching "deb cdrom"
# entries were disabled at the end of the installation process.
# For information about how to configure apt package sources,
# see the sources.list(5) manual.
```

#### 3. 添加源

> 以下以`vim`作为示例

1. 在键盘按下 <kbd>i</kbd> 键 进入编辑模式
2. 添加下方所示内容或者将`http.kali.org`替换为 `mirrors.cqu.edu.cn`

```txt
deb https://mirrors.cqu.edu.cn/kali kali-rolling main non-free contrib
# deb-src https://mirrors.cqu.edu.cn/kali kali-rolling main non-free contrib
```

3. 按下 <kbd>Esc</kbd> 退出编辑模式，同时按下 <kbd>shift</kbd>+<kbd>;</kbd> 键，在输入 <kbd>w</kbd>+<kbd>q</kbd>，回车保存

#### 4. 刷新缓存

```bash
$ sudo apt-get update
```

### 一般更换步骤

在终端中直接执行以下命令以进行更改：
```bash
sudo sed -i s/http.kali.org/mirrors.cqu.edu.cn/ /etc/apt/sources.list
```


{{% notice tip %}}
详细有关`sed`指令的内容请参考`sed`man page 或者 参阅 [Arch Linux WIKI](https://wiki.archlinux.org/index.php/Core_utilities#Essentials)
{{% /notice %}}


## 相关链接
Kali Linux 主页
https://www.kali.org/

文档
https://www.kali.org/kali-linux-documentation/

论坛
http://forums.kali.org/
