---
category: news
layout: news
title: "关于裁剪 Kernel 仓库的公告"
author: weearc
date: "2023-11-04"
---

经统计，kernel 仓库使用流量较小，且均集中在主线 tarball 上，由于磁盘阵列冗余较小，经研究决定暂时移除 kernel 仓库在阵列中的存储，改为反向代理。后期将根据实际使用情况对原仓库镜像做出裁剪，未镜像内容改为反向代理。

影响的仓库：

- /kernel/

当前状态：

- 移除公开访问
- 移除存储

解决措施：

- 反向代理，同步状态暂不影响使用
