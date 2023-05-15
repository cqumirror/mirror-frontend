---
title: "PyPI 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/pypi/_index'
---
{{% notice note %}}
本镜像站 PyPI 仓库已经移除，请求将被重定向（若从校外访问）/反向代理（若从校内访问）到 [北京外国语大学开源软件镜像站](https://mirrors.bfsu.edu.cn)。
{{% /notice %}}

## 地址
https://mirrors.cqu.edu.cn/pypi/web/simple
## 说明
PyPI 仓库（pip 软件源）
## 使用说明
### 临时变更
```bash
pip install -i https://mirrors.cqu.edu.cn/pypi/web/simple {package name}
```
### 永久变更
#### 手动变更
- Linux & Mac OS

创建`~/.pip/pip.conf`并写入以下内容：
```ini
[global]
index-url = https://mirrors.cqu.edu.cn/pypi/web/simple
```
- Windows

创建`%HOMEPATH%/pip`文件夹，并创建`%HOMEPATH%/pip/pip.ini`文件，并贴入以下内容：
```ini
[global]
timeout = 6000
index-url = https://mirrors.cqu.edu.cn/pypi/web/simple
trusted-host = mirrors.cqu.edu.cn
```
#### 指令变更（推荐）
{{% notice note %}}
请确保`pip`版本大于`10.0.0`（pip version >= 10.0.0）
{{% /notice %}}
执行指令完成镜像变更：
```bash
pip config set global.index-url https://mirrors.cqu.edu.cn/pypi/web/simple
```
如`pip`版本需要升级请执行以下指令使用镜像对`pip`进行升级操作：
```bash
#保存在用户目录，Linux下请确保已经加入到PATH
pip install -i https://mirrors.cqu.edu.cn/pypi/web/simple pip -U
#全局(仅限Linux以及类Unix)
sudo pip install -i https://mirrors.cqu.edu.cn/pypi/web/simple pip
```

## 相关链接

{{% notice link %}}
官方主页： https://www.pypi.org/
{{% /notice %}}
