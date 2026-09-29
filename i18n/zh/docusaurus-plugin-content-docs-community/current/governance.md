---
title: 社区治理
sidebar_label: 社区治理
slug: /governance
description: 了解 Dayu 的开放参与、角色职责、决策、任命与利益冲突处理方式。
---

# 社区治理

Dayu 由[南京大学](https://www.nju.edu.cn/) [Dislab](https://dislab.nju.edu.cn/) 发起，
欢迎高校、企业及更广泛的开源社区参与。机构归属本身不赋予席位、投票权或仓库权限。

本页介绍项目治理方式。正式政策以
[GOVERNANCE.md](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md)为准，
系统角色由 [MAINTAINERS.md](https://github.com/dayu-autostreamer/dayu/blob/main/MAINTAINERS.md)记录。

## 谁负责什么 {#roles}

| 角色或职务 | 职责 |
| --- | --- |
| Contributor／贡献者 | 参与代码、文档、测试、研究验证、评审、问题分类或支持，无需任命。 |
| Maintainer／维护者 | 负责仓库整体技术质量、兼容性、评审、发布和贡献者支持。 |
| TSC 成员 | 负责项目方向、治理、社区持续发展，以及未解决的分歧。 |
| TSC 主席／副主席 | 协调 TSC 讨论、记录、社区代表事务与后续工作。 |

评审向具备相关能力的贡献者开放，Dayu 不设独立的 Committer 等级。
TSC 成员与维护者分别任职，主席和副主席职务不增加投票权，也不自动授予技术审批或管理权限。
[社区委员会](./committee.mdx)介绍承担这些职责的人员。

## 如何做出决定 {#decisions}

通过 Issue 和 PR 讨论技术工作，优先寻求共识，并记录理由。
常规工作需要独立 Maintainer 评审；重大变更需要设计讨论和两位独立技术评审者的批准，
其中至少一位是 Maintainer，详见[评审要求](./contributing.md#pull-request-expectations)。

未解决的分歧提交 TSC。正式决策记录有资格参与的投票人、利益冲突、截止时间、明确投票与结果。
同一个人即使承担多项职责，也只计一次。治理修改、TSC 成员变化和主席／副主席任命遵循正式政策中的表决门槛。

具体投票门槛、回避和连续性处理方式见
[决策与利益冲突规则](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md#formal-decisions-and-conflicts-of-interest)。

## 如何成为维护者 {#appointments}

任何人都可以表达意愿或提名贡献者。评估考虑持续贡献、技术和评审判断力、协作能力、
对架构的理解以及承担责任的意愿，不设置固定的 PR 数量、雇佣关系、参与年限或每周投入时长要求。

现任 Maintainer 协调提名和意见收集。任命需要独立支持并解决实质性异议，
随后由候选人接受职责、记录职责范围并核实权限。TSC 成员和主席／副主席任命采用各自的治理流程。
[任命规则](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md#appointments-and-delegation)说明具体要求与申诉方式。

## 如何处理利益冲突与行为问题 {#conflicts}

涉及本人任命、免职或直接个人利益冲突时，应当回避。
来自同一机构本身不构成利益冲突。敏感的人事和行为问题私密处理，
在保护隐私的前提下公开适当的处理结果。

请使用[行为问题反馈渠道](./support.md#conduct)，并遵循
[行为准则](https://github.com/dayu-autostreamer/dayu/blob/main/CODE_OF_CONDUCT.md)。
安全漏洞采用单独的[私密报告流程](./support.md#security)。

## 暂停参与后如何交接 {#availability}

成员可以讨论参与时间减少、职责交接或 Emeritus 状态。项目至少每六个月检查一次名单和权限。
毕业或变更工作单位不会自动终止角色，职责与权限调整时仍保留历史贡献致谢。
具体方式见[参与状态与角色转换规则](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md#availability-emeritus-status-and-removal)。

## 完整规则与参考资料 {#references}

- [治理政策](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md)
- [系统成员名单](https://github.com/dayu-autostreamer/dayu/blob/main/MAINTAINERS.md)
- [贡献流程](https://github.com/dayu-autostreamer/dayu/blob/main/CONTRIBUTING.md)
- [OWNERS 与评审指南](https://github.com/dayu-autostreamer/dayu/blob/main/docs/development/owners.md)
- [社区管理指南](https://github.com/dayu-autostreamer/dayu/blob/main/docs/development/community-administration.md)

网站维护有独立的[成员名单](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/MAINTAINERS.md)
和[贡献流程](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md)。
