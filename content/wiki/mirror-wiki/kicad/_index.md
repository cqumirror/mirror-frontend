---
title: "KiCad 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/kicad/_index'
---
## 地址
https://mirrors.cqu.edu.cn/kicad
## 说明
### KiCad 简介<sup><a href="https://en.wikipedia.org/wiki/KiCad">摘自wikipedia</a></sup>
KiCad (读作 key-CAD) 是一款跨平台的开源的电子设计自动化(EDA)套件。</br>
最初由由法国人 Jean-Pierre Charras 于 1992 年推出。该套件提供包含原理图设计、线路板绘制、符号库设计、封装库设计、线路板 3D 显示、Gerber 查看、线路板实用计算等工具。并支持包括中文在内的 22 种语言。2013 年 CERN（欧洲核子研究组织）的 BE-CO-HT 部门开始贡献一些资源，支持其成为开源硬件领域与商用的 EDA 工具相当的工具套件。目前 KiCad 由 KiCad 团队负责开发维护。
### KiCad 目录说明
由于 KiCad 原储存于 s3 仓库中，因此在同步时我们尽可能去掉了上游用作清理目录以及 s3 仓库用于生成目录的文件，以下进行详细说明：

|目录/文件|说明|是否同步|
|:------|:---|:-----:|
|appimage|适用于 Linux 的 appimage 软件包|是|
|archive|归档文件|是|
|docs|KiCad 手册|是|
|doxygen|KiCad 开发配置|是|
|doxygen-python|KiCad Python 开发配置|是|
|libraries|KiCad 封装库|是|
|osx|适用于 Mac OS 的 KiCad 软件包|是|
|windows|适用于 Windows 的 KiCad 软件包|是|
|cleanup.sh|仓库清理脚本|是|
|favicon.ico|图标|否|
|list.js|动态生成的目录列表|否|
