---
sidebar_label: 贡献指南
sidebar_position: 1
slug: /community/contributing
---

# 贡献指南

Dayu 目前有两个紧密相关的仓库：

- [dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu) 负责系统实现。
- [dayu-autostreamer/dayu-autostreamer.github.io](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io)
  负责当前公共文档站点。

文档、博客、多语言翻译、主页和 Docusaurus 配置相关变更请提交到文档站仓库；后端、前端、运行时、调度器、部署模板和测试相关变更请提交到系统仓库。

## 开始之前

请阅读并遵守
[Code of Conduct](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CODE_OF_CONDUCT.md)。

如果要修改文档站，请同时阅读根目录的
[CONTRIBUTING.md](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md)。

## 本地文档环境

请使用 Node.js `20`，然后安装依赖并启动本地 Docusaurus 服务：

```bash
npm ci
npm start
```

提交 pull request 前请运行：

```bash
npm run build
```

该命令可以检查坏链、MDX 错误和站点配置回归。

## 可以贡献什么

适合提交到文档站仓库的贡献包括：

- 修复坏链、过期截图、表达不清或缺失翻译
- 改进安装、底层系统部署和上层系统启动教程
- 补充架构、API、hook 与调度策略说明
- 添加发布说明、研究文章、案例分析和社区动态
- 改进主页内容、导航或 Docusaurus 配置

## 文档工作流

- 英文文档源文件放在 `docs/`。
- 简体中文文档翻译放在 `i18n/zh/docusaurus-plugin-content-docs/current/`。
- 英文博客文章放在 `blog/`。
- 简体中文博客翻译放在 `i18n/zh/docusaurus-plugin-content-blog/`。
- 公共资源放在 `static/img/`，并以 `/img/...` 形式引用。
- 站内文档链接优先使用相对路径。

当 Dayu 系统变更影响用户可见行为时，请在上游 issue、pull request 或 release 足够明确后同步更新文档。

## Pull request 期望

请保持 pull request 聚焦，并说明：

- 本次变更解决了什么读者问题
- 内容适用于英文、中文还是两者都适用
- 对应哪个上游 Dayu issue、pull request、release 或论文
- 本地是否已经运行 `npm run build`

文档类 pull request 通常需要文档站维护者 review。架构、调度器、运行时或部署教程相关内容，也可能需要对应的 Dayu 系统负责人一起 review。

## Commit message

建议使用简短的 scope-first commit message：

```text
docs: explain scheduler template fields
i18n: sync Chinese getting started guide
site: update homepage feature copy
ci: add pull request build check
```
