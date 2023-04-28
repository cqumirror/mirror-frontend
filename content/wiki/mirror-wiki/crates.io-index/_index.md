---
title: "Crates.io-index 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/crates.io-index/_index'
---

## 地址

https://mirrors.cqu.edu.cn/git/crates.io-index

## 说明

Rust crates.io 索引

## 使用说明

在 cargo 的配置文件（Windows 系统下的 `%HOMEPATH%\.cargo\config` 和类 Unix 系统下的 `~/.cargo/config`）中加入如下内容：

```ini
[source.crates-io]
replace-with = 'cqu'

[source.cqu]
registry = "https://mirrors.cqu.edu.cn/git/crates.io-index"
```
