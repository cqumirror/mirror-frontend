---
title: "Homebrew 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/homebrew/_index'
---

## 地址

https://mirrors.cqu.edu.cn/homebrew/

## 说明

Homebrew 的镜像分为两部分，一个是 formula 索引源，另一个已经打包好的二进制文件的 bottle 源。本镜像为 Homebrew formula 的镜像，对应于 `brew update`，而非 `brew upgrade` 与 `brew install`。


{{% notice note %}}
配置了本源只会提高 `brew update` 的速度，如想提高 `brew upgrade` 和 `brew install` 的速度，请另配置 bottle 源。
{{% /notice %}}


## 使用说明

 将以下内容添加到 shell 的配置文件中，如 `.zshrc` 或 `.bash_profile` 中，

 ```sh
 export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.cqu.edu.cn/git/homebrew/brew.git"
 export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.cqu.edu.cn/git/homebrew/homebrew-core.git"
 ```

 再 source 对应的 shell 配置文件，运行 `brew update`，即可更新 Homebrew 的 formula 索引。

 更新完成后，运行 `brew config`，检查 `HOMEBREW_BREW_GIT_REMOTE` 和 `HOMEBREW_CORE_GIT_REMOTE` 项，应变为本软件源镜像。

 ## 相关链接


{{% notice link %}}
官方主页
https://brew.sh/
{{% /notice %}}


{{% notice link %}}
`brew` 命令文档
https://docs.brew.sh/Manpage
{{% /notice %}}


{{% notice link %}}
文档
https://docs.brew.sh/
{{% /notice %}}


{{% notice link %}}
社区讨论
https://github.com/Homebrew/discussions/discussions
{{% /notice %}}


{{% notice link %}}
Blog
https://brew.sh/blog/
{{% /notice %}}


{{% notice link %}}
软件包
https://formulae.brew.sh/
{{% /notice %}}


{{% notice link %}}
分析数据
https://formulae.brew.sh/analytics/
{{% /notice %}}


{{% notice link %}}
捐助
https://github.com/homebrew/brew#donations
{{% /notice %}}

