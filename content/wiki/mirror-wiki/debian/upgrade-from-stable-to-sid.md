---
title: "更新或安装至 Debian 不稳定版"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/debian/upgrade-from-stable-to-sid'
---

大多数情况下，Debian Unstable (Sid) 将带来较新的软件包，更多的新特性以及更快的问题修复。软件包在进入 Sid 后将进入测试版（Testing），经过修复和更多测试后将进入稳定版（Stable）发版流程，因此对比 Testing, Sid 拥有更快的来自上游的问题修复，以及类似其他滚动发行版（如 Arch Linux，Gentoo GNU/Linux 或 openSUSE Tumbleweed）的使用体验，从某种角度上讲，Sid 的稳定性高于 Testing，尤其对于较新硬件带来的固件更新和问题修复更是如此。以下将介绍从 Stable 更新到 Sid 的具体流程。

## 从稳定版升级

1. 从 CD 安装 Debian Stable
2. 进行系统更新：
```bash
apt update && apt upgrade -y
```
3. 更改`/etc/apt/sources.list`, 内容为：
```txt
deb https://mirrors.cqu.edu.cn/debian sid main contrib non-free non-free-firmware
# deb-src http://mirrors.cqu.edu.cn/debian sid main contrib non-free non-free-firmware
```
4. 再次执行系统更新，并重启：
```bash
apt update && apt upgrade
```
5. 更新成功后 `/etc/os-release` 将会如下所示（trixie 为下一个稳定版的代号）：
```bash
# root: cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux trixie/sid"
NAME="Debian GNU/Linux"
VERSION_CODENAME=trixie
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

## Sid 的最佳用户实践

作为 sid 用户，应当采取如下措施，例如：

- **禁用或删除无人值守升级**，以防引入无法或难以修复或定位的问题
- 执行更新时请务必小心，并检查包管理工具建议的操作是否符合您的愿望和期望。（即确保不会因盲目接受建议的操作而删除过多的所需软件包）
- 选择升级的良辰吉日：应当在具有**足够多时间解决问题**的前提下进行系统更新，别在任何紧急时间更新！
- 使用 `apt upgrade` 而不是 `apt full-upgrade`` 以避免不必要地删除您所依赖的任何软件包
- ***如果无法安全升级软件包，请使用 `apt-mark` 将其搁置。***
- 安装 `apt-listbugs` 和 `apt-listchanges` 软件包，以便在安装新软件包或升级过程中了解严重错误或重要更改。
- ***自动创建每日、每周和每月备份***，以确保损坏的数据不会成为问题。更新损坏用户数据的情况极为罕见，但备份还可以保护您免受驱动器故障和人为错误的影响。
- 使用支持写入时复制（COW）的文件系统（例如 btrfs）或利用 LVM 快照。在升级之前和之后创建快照。如果系统处于不可恢复的位置，请从系统救援 LiveCD 回滚到最后一个快照。一个可能有用的工具是来自 openSUSE 的 `snapper` 和 `snapper-gui` （Debian wiki 上推荐使用 timeshift,但是 btrfs 子卷并非 @ 或 @var 等 ubuntu 类型的子卷布局时 ***timeshift将没办法创建快照*** ，不要和自己过不去）
- 时刻关注 debian-devel-announce@lists.debian.org 以收到有关未来技术变更或可能出现的问题的通知
- 重中之重：**随时保留一张好的 Live CD/USB**，例如Debian Live，这样即使系统不再启动，您仍然可以进入 Live CD 环境执行回滚操作或修复系统问题

如果使用 btrfs 作为文件系统并使用 snapper 创建和管理快照，使用 grub 管理启动条目，可以考虑使用 [grub-btrfs](https://github.com/Antynea/grub-btrfs)  为快照自动创建 grub 条目，当系统出现故障时可以以只读方式进入快照中的未故障系统并回滚操作
