# dayu-autostreamer.github.io

Homepage of dayu system

# 文档撰写规范

## 基本操作

### 页面操作

在 docs 文件夹下创建新文件夹，即可创建一个页面组。在页面组下，可以添加 Markdown 文件或 React 文件作为单独的页面。无论是 Markdown 文件还是 React 文件都要遵循一定的格式规范。

### 文档操作

文档是通过侧边栏，前后导航与版本相连接的一组页面。

举例来说，一个包含了侧边栏的页面应该如下所示：

Markdown 版本：

```markdown
---
sidebar_label: "Hi!"
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

### 进阶 Markdown 语法

Docusaurus 的模板引擎对 Markdown 进行了一些额外的增强，将在这一部分进行进一步介绍。

**前言** 实际上前文在 Markdown 段前添加的元数据可以称之为前言。其可以包含以下字段：

```markdown
---
id: my-doc-id
title: My document title
description: My document description
slug: /my-custom-url
---
```

**链接** 支持相对路径链接和 URL 路径链接。举例来说，以下两种寻址方法结果都是一致的：

```markdown
Let's see how to [Create a page](/create-a-page).
Let's see how to [Create a page](./create-a-page.md).
```

**图片** 支持常规 Markdown 图片，也可以直接使用 static 下的图片。

```markdown
![Docusaurus logo](/img/docusaurus.png)
```

**代码块** 可以支持词法高亮。

````markdown
```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```
````

**Tips 和 Dangers** 文档中支持添加 Tips 和 Dangers 提示，如下所示：

```
:::tip[My tip]

Use this awesome feature option

:::

:::danger[Take care]

This action is dangerous

:::
```

**交互式文档** 可以在 Markdown 文档中添加 React 的函数式组件，以进行响应交互。

```javascript
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
```

## 文档的版本管理

可以通过运行以下指令进行版本发布：

```bash
npm run docusaurus docs:version 1.0
```

之后 docs 文件夹会被复制到 versioned_docs/version-1.0，同时会创建 versions.json 文件。

当前就有两个版本的文档了，这两个都可以进行修改。

- 1.0 版本在 http://localhost:3000/docs/
- 当前的版本在 http://localhost:3000/docs/next/

为了实现版本跳转，需要在docusaurus.config.js文件中进行配置。

## 文档多语言管理
todo