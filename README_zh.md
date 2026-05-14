简体中文 | [English](./README.md)

# Dayu 文档主页仓库

[![Deploy to GitHub Pages](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/actions/workflows/deploy.yaml/badge.svg)](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/actions/workflows/deploy.yaml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdayu-autostreamer.github.io%2F&label=website)](https://dayu-autostreamer.github.io/)
[![License](https://img.shields.io/github/license/dayu-autostreamer/dayu-autostreamer.github.io.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.8.0-2e8555)](https://docusaurus.io/)

本仓库维护 [Dayu](https://github.com/dayu-autostreamer/dayu) 项目的公共主页、文档站、博客与多语言内容。

Dayu 是一个面向云边协同流式分析的平台，用于在异构云边节点之间部署、调度并运行基于 DAG 的 AI 服务流水线。系统代码仓库负责后端控制面、Vue
前端、数据源运行时、模板、hook、调度策略、测试和实现导向技术文档；本仓库负责把这些项目知识整理成公开文档站点：
[dayu-autostreamer.github.io](https://dayu-autostreamer.github.io/)。

## 仓库职责

本仓库适合处理主页与文档站相关工作：

| 路径 | 用途 |
| --- | --- |
| `docs/` | Docusaurus 使用的英文文档源文件 |
| `i18n/zh/docusaurus-plugin-content-docs/current/` | 简体中文文档翻译 |
| `blog/` | 英文发布说明、研究文章与项目动态 |
| `i18n/zh/docusaurus-plugin-content-blog/` | 简体中文博客翻译 |
| `src/pages/` | 主页与独立 Docusaurus 页面 |
| `src/components/` | 主页使用的 React 组件 |
| `src/css/` | 全局主题样式覆盖 |
| `static/img/` | Logo、架构图、截图和博客图片 |
| `docusaurus.config.js` | 站点元信息、导航栏、页脚、i18n、文档、博客与部署配置 |
| `sidebars.js` | 文档侧边栏配置 |

系统源码、运行时问题、调度策略变更、后端/前端实现、测试和系统发布历史，请在
[dayu 系统仓库](https://github.com/dayu-autostreamer/dayu) 中处理。

## 本地开发

请安装 Node.js `20`，或使用能读取 [`.nvmrc`](.nvmrc) 的版本管理工具。

```bash
npm ci
npm start
```

本地开发服务器默认运行在 `http://localhost:3000/`。

提交 pull request 前请运行生产构建：

```bash
npm run build
```

本地预览构建产物：

```bash
npm run serve
```

## 文档工作流

内容修改以 `docs/` 下的英文文档为主源，并同步维护
`i18n/zh/docusaurus-plugin-content-docs/current/` 下的简体中文翻译。博客内容同样需要在 `blog/` 与
`i18n/zh/docusaurus-plugin-content-blog/` 之间保持对应。

新增或更新页面时：

- 根据页面需要使用 `sidebar_label`、`sidebar_position`、`slug`、`title`、`description` 等 Docusaurus
  front matter
- 站内文档链接优先使用相对路径
- 公共图片放在 `static/img/`，并以 `/img/...` 形式引用
- 上游 Dayu 系统仓库完成对应变更后，同步更新发布、架构和教程内容
- 运行 `npm run build` 检查坏链、MDX 错误和站点配置回归

如果变更属于 Dayu 系统实现，而不是文档站点，请在
[dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu) 中提交 issue 或 pull request。

## 社区文件

本仓库按 Dayu 主仓库的开源维护模式补齐协作入口：

- [CONTRIBUTING.md](CONTRIBUTING.md) 说明文档站贡献流程
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 说明社区行为准则
- [SECURITY.md](SECURITY.md) 说明私下报告安全问题的流程
- [SUPPORT.md](SUPPORT.md) 说明文档、使用和安全问题的反馈渠道
- [MAINTAINERS.md](MAINTAINERS.md) 说明文档站维护职责

## 常用链接

- 文档站：<https://dayu-autostreamer.github.io/>
- Dayu 系统仓库：<https://github.com/dayu-autostreamer/dayu>
- Dayu 发布版本：<https://github.com/dayu-autostreamer/dayu/releases>
- Dayu 系统问题反馈：<https://github.com/dayu-autostreamer/dayu/issues>
- 文档站问题反馈：<https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/issues>

## 许可证

本项目文档站遵循 Apache License 2.0 许可证，详情请参阅 [LICENSE](LICENSE)。
