---
title: 参与贡献
sidebar_label: 参与贡献
slug: /contributing
description: 通过代码、文档、测试、研究验证、评审和用户支持参与 Dayu。
---

# 参与贡献

参与 Dayu 无需先获得项目职务，也不受机构身份限制。可以从一个能够说明清楚并验证结果的任务开始，
同时遵循[行为准则](https://github.com/dayu-autostreamer/dayu/blob/main/CODE_OF_CONDUCT.md)。

## 可以贡献什么 {#what-to-contribute}

- **反馈与测试：** 复现问题、说明预期行为、补充测试或验证示例。
- **系统改进：** 改进框架、应用、部署模板，或通过已有接口实现扩展。
- **文档与翻译：** 完善教程、更新截图、修复链接，或改进中英文内容。
- **评审与研究：** 评审方案、验证研究结果，或帮助其他用户理解系统。

## 选择合适的仓库 {#choose-a-repository}

| 贡献内容 | 仓库与指南 |
| --- | --- |
| 系统代码、应用、hook、调度策略、测试、实现文档或示例 | [Dayu 系统仓库](https://github.com/dayu-autostreamer/dayu) · [贡献指南](https://github.com/dayu-autostreamer/dayu/blob/main/CONTRIBUTING.md) |
| 公开教程、主页、博客、导航或翻译 | [文档网站仓库](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io) · [网站贡献指南](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md) |

了解系统代码可从[仓库快速入门](https://github.com/dayu-autostreamer/dayu/blob/main/docs/repository-quickstart.md)
和[开发指南](https://github.com/dayu-autostreamer/dayu/blob/main/docs/development/README.md)开始。
选择任务或寻找评审者时，可通过[支持与联系](./support.md)获得帮助。

## 第一份贡献 {#first-contribution}

1. 在 Issue 或 PR 中说明问题和预期结果；也可以在已有 Issue 下表达参与意愿。
2. Fork 对应仓库，从其默认分支创建专注于当前任务的分支。
3. 完成修改，同步受影响的示例、文档、翻译或测试。
4. 提交 PR，说明修改内容、关联问题、验证结果以及未运行的检查。
5. 处理评审意见；发生实质性修改后，请求重新评审。

常规贡献可以直接从 PR 开始。涉及共享系统接口或敏感行为的重大变更，应按下述流程先进行简短的设计讨论。

## 系统变更的评审要求 {#pull-request-expectations}

| 变更类型 | 评审流程 |
| --- | --- |
| 常规修复、文档、测试，或基于已有接口的扩展 | 通过相关检查，并取得至少一位独立 Maintainer 的批准。 |
| 共享 Task/DAG 或 API 契约、安装清理行为、兼容性、安全边界或发布权限的重大变更 | 简短的设计 Issue，以及两位独立技术评审者对实现的批准，其中至少一位是 Maintainer。 |
| 项目方向、治理或未解决的分歧 | 公开讨论并记录 TSC 决定；实现仍需完成适用的技术评审。 |

具备相关能力、没有写权限的 Contributor 可以担任重大变更的第二位技术评审者。
评审者必须是不同的人，且未参与该变更的编写。TSC 职务不增加审批环节。
通过已有 processor、hook、scheduler 或可视化接口实现的扩展，通常按常规变更评审。

请使用 GitHub 的 **Review changes → Approve / Request changes** 提交评审。
评审请求用于协调工作；标签、普通评论、机器人和 AI 评审不能代替所需的人工批准。
需要时可联系 Maintainer 协助请求评审。完整规则见
[GOVERNANCE.md](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md#technical-decisions-and-pull-requests)，
维护者也可查阅 [OWNERS 指南](https://github.com/dayu-autostreamer/dayu/blob/main/docs/development/owners.md)。

网站贡献遵循网站自身的评审流程。涉及系统行为的技术说明，也可能需要熟悉该部分的系统维护者参与评审。

## 本地文档环境 {#local-documentation-setup}

在网站仓库中使用 Node.js 20：

```bash
npm ci
npm start
```

请求评审前，构建两种语言并预览生产结果：

```bash
npm run build
npm run serve
```

构建会检查社区数据、文档链接、MDX 和站点配置。系统贡献应参考
[系统验证指南](https://github.com/dayu-autostreamer/dayu/blob/main/CONTRIBUTING.md#local-validation)，
选择能够覆盖所修改行为的检查。

## 文档协作方式 {#documentation-workflow}

英文内容与中文翻译应同步更新。社区页面介绍项目当前的人员、参与方式和治理规则，
中英文成员表共用来自系统名单的数据。
内容目录与名单同步方式见[网站贡献指南](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md)。

### 版本生命周期 {#version-lifecycle}

技术文档维护各个发布版本的快照，社区内容独立于这些快照持续维护。
与特定版本有关的操作说明放在 Documentation，社区信息放在 Community。

## 提交信息 {#commit-messages}

使用简短的主题说明修改范围和内容，例如
`docs: clarify installation prerequisites` 或 `i18n: translate the contribution guide`。
在 PR 中说明修改原因和验证情况。
