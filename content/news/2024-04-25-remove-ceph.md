---
category: news
layout: news
title: "关于移除 ceph 仓库公告"
author: cyy
date: "2024-04-25"
---

经统计，ceph 仓库使用流量较小，且几乎没有除爬虫以外的访问，由于磁盘阵列冗余较小，经研究决定暂时移除 ceph 仓库在阵列中的存储，改为 302 至 USTC 镜像站。

影响的仓库：

- /ceph/

当前状态：

- 移除公开访问
- 移除存储

解决措施：

- 302
