---
title: "Linux.git 使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/linux.git/_index'
---
## 地址
https://mirrors.cqu.edu.cn/git/linux.git

https://mirrors.cqu.edu.cn/git/linux-stable.git

## 说明

Linux内核源代码仓库。目前我们同步了master分支与stable分支。

## 使用说明

### 直接克隆

可以使用以下命令克隆Linux主线代码仓库：

```bash
git clone https://mirrors.cqu.edu.cn/git/linux.git
```

### 增量下载

如果你希望从CQU镜像站克隆主线Linux内核，并从其他来源获得内核的增量修改，以加速获取Linux内核移植版本的速度，可以使用以下操作（以树莓派内核为例）：

```bash
git clone https://mirrors.cqu.edu.cn/git/linux.git
cd linux
git remote add raspberrypi https://github.com/raspberrypi/linux.git
git fetch raspberrypi rpi-6.1.y # 分支可根据需要自行更换
git checkout rpi-6.1.y
```
