# 重庆大学开源软件镜像站前端

此分支尝试将架构迁移到 Vue3

## 架构改变

nuxt2 -> nuxt3

element-ui -> element-plus

vuex -> pinia

nodejs 14.20.0 -> nodejs ≥18



## 关于此文档

这个文档又臭又长，但是希望后继维护者能耐心看完，将从以下几方面入手：
- 项目部署：你只有项目部署成功了接下来的才能完成，要不就是闭眼睛过河
- 文档写作：包含新闻公告写作以及镜像 wiki 写作
- 功能配置：基于一些考虑，部分功能作为可配置项目了，需要了解如何配置和如何修改
- 功能开发：包含解析器二次开发以及项目功能开发，想做功能首先得了解都有啥吧

这篇文档面向于：
- 重庆大学开源软件镜像站的维护者
- 想 clone 此渣项目来学习的同僚

请谨记此项目和文档基于 AGPL 进行开源，根据作者意愿不欢迎任何 clone 的直接部署，如果你希望克隆并部署，代码中不允许出现任何`重庆大学`、`CQU`(不区分大小写)
、`蓝盟`、`重庆大学蓝盟`、`Lanunion`(不区分大小写)，作者保留追究对项目和项目直接 clone 部署并违反作者意愿以及AGPL许可证的行为之责任的权力。如果你希望在你的镜像站上
部署此项目，请修改部署中的名称和简介。

## 项目部署
**！！！重要！！！**<br>
在部署项目前我们不清楚部署者是否是 Windows 用户还是 Mac OS 或 Linux 用户，所以请仔细阅读此部分。

### Windows
下载[NVM from Windows](https://github.com/coreybutler/nvm-windows),并安装 Nodejs `v14.20.0`。

### Mac OS （via brew）

```bash
brew update

brew install nvm

mkdir ~/.nvm

# if you are using zsh
echo "export NVM_DIR=~/.nvm\nsource \$(brew --prefix nvm)/nvm.sh" >> .zshrc
source ~/.zshrc
```

### Linux
详情参阅：https://github.com/nvm-sh/nvm

```bash
#curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# or wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

配置好 nvm 后，配置 nodejs 14.20.0：
```bash
# 安装 nodejs
nvm install v14.20.0
# 切换版本
nvm use v14.20.0
```

克隆项目：
```bash
# via ssh
git clone git@github.com:cqumirror/mirror-frontend.git
```

配置环境：

```bash
cd mirror-frontend

# 安装依赖
yarn

# 启动开发服务器
yarn dev

# 生成静态部署文件
yarn generate
```

## 文档写作
所有文档均采用 Github 风格 markdown 进行写作，在写作前请确保语法熟练，另外由于文档曾有 Hugo 部署，Hugo 提供的 shortcode 功能
将丰富文档内容，凸显重要部分。对文档梳理很有裨益，因此保留了对部分 Hugo shortcode 的支持，将在下文阐述。

### Markdown 扩展部分

如果熟悉了 Github 风格 markdown 的写作，可能对于 markdown 的限制会有初步的了解，根据安全规范，项目中渲染器并没有 jsx 模板的渲染支持，另外由于
解析器问题，仅仅对 vue template 有少量支持，对于原生 html 标签为全量支持，具体渲染情况请参考浏览器中实际渲染情况，目前扩展部分主要如下：

#### Hugo shortcode
Hugo shortcode 提供了一种非常棒的写作体验，在文档中你可以这样来使用：
```markdown
{{% notice note %}}
this is a notice
{{% /notice %}}

{{% notice info %}}
this is a notice
{{% /notice %}}

{{% notice %}}
this is a notice
{{% /notice %}}

{{% notice warn %}}
this is a notice
{{% /notice %}}

{{% notice error %}}
this is a notice
{{% /notice %}}

{{% expand "summary" %}}
detail
{{% /expand %}}
```

由于解析器中对换行敏感（将在 AST 中解析为多个 block ），请不要出现以下情况
<pre><code>
# 这将发生渲染出错
{{% notice error %}}

this is a notice
{{% /notice %}}

# 这将发生渲染出错
{{% notice error %}}
this is a notice

{{% /notice %}}

# 这将导致文档不被渲染
{% notice error %}}
this is a notice
```bash
 ls
```
{{% /notice %}}

</code></pre>

以上都是一些比较常见的渲染错误，目前认为是可预期的，如果你认为能够修复，请更改`@/utils/shortcode.js` 来自定义 `remark-js` 插件。



#### remark-gfm

remark 插件提供了较为强大的扩展能力，针对代码框可使用如下写法：

<pre>
<code>
```CODE-LANGUAGE
YOUR CODE
```
</code>
</pre>

其中 `CODE-LANGUAGE` 应当为所使用的编程语言，另外也支持了文件名的输出，请使用如下格式，文件名会渲染在代码框左上角：

<pre>
<code>
```CODE-LANGUAGE[filename]
YOUR CODE
```
</code>
</pre>

### 写作规范

#### 新闻写作规范

1. 文件名应当为 `长日期` + `英文文件名`
2. 文件解析使用了 yaml 文件头协商，因此务必确认包含以上内容的文件头：
```yaml
---
title: "标题"
author: "作者"
date: "日期，长日期格式，如：2023-03-27"
---
```
3. 标题命名应当简明扼要，能够点出公告主题，不应过长
4. 正文应当使用书面语言书写，避免使用口语，避免使用任何带有感情色彩倾向性的语言。应当点明：
  - 事情的情况
  - 发生原因或目的
  - 预计时间或发生时间
  - 发生时长或预计持续时间
  - 处理结果或预期的结果
  - 处理措施或预期的处理措施
5. 正文对于真实个人或团体信息（如 IP，金额，硬件设施）应当做脱敏处理，敏感信息（如可成为安全隐患的信息）不得擅自发布
6. 不得以个人名义发布信息

#### wiki 写作及贡献规范

1. 文件需要遵循以下固定格式：
<pre>
<code>
---
title: "CentOS 镜像使用帮助"
draft: false
weight: 2
filepath: '/wiki/mirror-wiki/centos/_index'
---

## 地址

## 说明

## 收录架构

## 收录版本

## 使用说明

## 相关链接

{{% notice %}}
链接内容
{{% /notice %}}

</code>
</pre>
2. 根据 Hugo 解析器协商，应当保证文件命名具有如下规范：
  - 文档采用树形结构
  - 新发行版应当在 `@/content/wiki/mirror-wiki` 中进行写作，需要以英文正式名称建立文件夹，其中直接文档命名必须为 `_index.md` 
  - 次要文档，如多版本文档或其他补充文档可使用适当的英文名称进行文件名命名，并以适当的形式在主文档中 `_index.md` 中链接
3. 根据 Hugo 兼容性和 `nuxt-content` 静态部署协商，文件应当具备如下文件头
```yaml
---
title: "文档名称"
draft: false
weight: 2
filepath: ' 文档相对于 content 文件夹路径，必须，如：/wiki/mirror-wiki/centos/_index'
---
```
4. 根据写作规范，中英文间应当具备一个半角空格或全角空格
5. 任何 Markdown 块标签应当在前后具备一个换行，主要为标题、代码块、列表、表格
6. hugo-shortcode 前后应当具备一个换行，但是其中不可包含换行
7. 文档主语应当为第三人称，不应包含任何称谓，但可以使用指代
8. 内容应当真实且可靠，任何来自互联网的不可信方法不可以进入文档内容
9. 社区内容不进入文档，只记录官方链接以及官方推荐的做法，但当官方不作为时可不遵守
10. 务必确保渲染无误再进行 pr （pull request）拉取请求
11. 根据写作规范，任何首次出现的缩写应当进行解释，比如：
```txt
pr (pull request) 
```
12. 尽量使用中性词汇
13. 任何变更应当使用 pr 方式进行更新，主分支在保护后不应当直接操作

## 功能配置

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

## `plugins`
This project use Element UI as UI framework for vue2 and element-ui are vue2
frontend best practice in commercial usage.
- Element UI: add element components using tag
- Fontawesome 5: fontawesome prefix has been imported as :`fas` for solid, `fab` for brand and `far` for regular. Use font icons by the method below:
  ```vue
    <fa :icon="['PREFIX','ICON NAME']"/>
  ```
  All icon's names can be find in cheatsheet.
