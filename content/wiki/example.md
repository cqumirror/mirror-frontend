---
title: "markdown 解析测试文件"
draft: false
weight: 2
---
# title
## title
### title
#### title
##### title
###### title

> test
> > test
> > > test

这是 *斜体* , 这是 **粗体**, 这是 ***又斜又粗***
```bash
rm -rf /*
```


~嗯？~
~*嗯嗯*~
~**嗯嗯**~
~***嗯嗯***~

换</br>行

|11|22|33|44|
|:--|---|--:|:--:|
|12|12|13|14|
|居左|默认|居右|居中|

## 图片

![cqu](https://www.cqu.edu.cn/uploadfile/2023/0119/20230119124238297.jpg)

## vue component
<IndexPage/>

[重大！！！](https://www.cqu.edu.cn)

## shortcode(Hugo style)
{{% notice note %}}
notice note
{{% /notice %}}

<br>

{{% notice warn %}}
notice warn
{{% /notice %}}

<br>

{{% notice info %}}
notice info
{{% /notice %}}

<br>

{{% notice error %}}
notice error
{{% /notice %}}

<br>

{{% notice note %}}
这是 short code，这是 *斜体* , 这是 **粗体**, 这是 ***又斜又粗***
{{% /notice %}}
