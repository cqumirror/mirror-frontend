---
title: "ROS 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/ros/_index'
---
## 地址

https://mirrors.cqu.edu.cn/ros/ubuntu

## 说明


ros1 软件源

## 适用系统

* Ubuntu 20.04 LTS
* Ubuntu 18.04 LTS
* Ubuntu 16.04 LTS
* Ubuntu 14.04 LTS
* Debian 10
* Debian 9
* Debian 8


>Ubuntu 22.04 LTS 及其以上版本请使用 ros2 ，或使用 docker 安装 ros1 。


## 使用说明


### 安装需要用到的软件包

```bash
sudo apt update && sudo apt install gpg
```

### 添加 ros1 的 GPG Key

下载 PGP Key 并用 gpg 导入

```bash
gpg --keyserver hkp://keyserver.ubuntu.com --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

若设备只能访问重庆大学内网而无法访问互联网，那么可以使用如下命令从重大开源镜像站下载并导入 OpenPGP 公钥（其他情形不推荐使用这种方式）

```bash
gpg --keyserver hkps://mirrors.cqu.edu.cn  --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

导出 GPG 公钥文件

```bash
gpg --export C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654 | sudo tee /etc/apt/trusted.gpg.d/ros1-latest.gpg > /dev/null
```

（可选）从 gpg 密钥环中删除 ros1 的公钥

```bash
gpg --delete-keys C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
```

### 设置 ros1 镜像源：

```bash
echo "deb [signed-by=/etc/apt/trusted.gpg.d/ros1-latest.gpg] http://mirrors.cqu.edu.cn/ros/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros1-latest.list > /dev/null

sudo apt update
```

## 相关链接

ros 官方 wiki：http://wiki.ros.org/cn/
