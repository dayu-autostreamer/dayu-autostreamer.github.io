---
title: Contributing
sidebar_label: Contributing
slug: /contributing
description: Contribute to Dayu through code, documentation, tests, research validation, reviews, and user support.
---

# Contributing

You can contribute to Dayu without a project appointment or institutional affiliation.
Start with a task you can explain and verify, and follow the
[Code of Conduct](https://github.com/dayu-autostreamer/dayu/blob/main/CODE_OF_CONDUCT.md).

## What to contribute {#what-to-contribute}

- **Feedback and tests:** reproduce an issue, describe expected behavior, add a missing test, or check an example.
- **System improvements:** improve the framework, an application, a deployment template, or an extension using existing interfaces.
- **Documentation and translation:** clarify a tutorial, update a screenshot, fix a link, or improve the English and Chinese pages.
- **Review and research:** review a proposal, validate a result, or help another user understand the system.

## Choose a repository {#choose-a-repository}

| Your contribution | Repository and guide |
| --- | --- |
| System code, applications, hooks, scheduling policies, tests, implementation docs, or examples | [Dayu system](https://github.com/dayu-autostreamer/dayu) · [Contribution guide](https://github.com/dayu-autostreamer/dayu/blob/main/CONTRIBUTING.md) |
| Public tutorials, homepage, blog, navigation, or translations | [Documentation website](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io) · [Website contribution guide](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md) |

For system code navigation, start with the
[repository quickstart](https://github.com/dayu-autostreamer/dayu/blob/main/docs/repository-quickstart.md)
and [development guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/development/README.md).
For help choosing a task or finding a reviewer, use [Support & Contact](./support.md).

## Your first contribution {#first-contribution}

1. Explain the problem and intended result in an issue or PR. Comment on an existing issue to express interest.
2. Fork the appropriate repository and create a focused branch from its default branch.
3. Make the change and update affected examples, documentation, translations, or tests.
4. Open a PR describing the change, related issues, validation results, and any checks you could not run.
5. Address review feedback and request renewed review after substantive changes.

Routine contributions can start directly with a PR. Significant changes to shared system interfaces or sensitive
behavior require the short design discussion described below.

## System review requirements {#pull-request-expectations}

| Change | Review path |
| --- | --- |
| Routine fixes, documentation, tests, or extensions within existing interfaces | Relevant checks and at least one independent Maintainer approval. |
| Significant changes to shared Task/DAG or API contracts, install/cleanup behavior, compatibility, security boundaries, or release permissions | A short design issue and two independent technical approvals of the implementation, including at least one Maintainer. |
| Project direction, governance, or an unresolved dispute | Public discussion and a recorded TSC decision; implementation receives the applicable technical review. |

A qualified Contributor without write access can provide the second technical approval for a significant change.
Reviewers must be distinct people who did not author the change. TSC offices add no extra approval stage.
An extension using existing processor, hook, scheduler, or visualization interfaces normally follows routine review.

Use GitHub's **Review changes → Approve / Request changes** controls. Review requests help route work;
labels, ordinary comments, bots, and AI reviews do not replace the required human approvals. A Maintainer can
help request a reviewer when needed. The full rules are in
[GOVERNANCE.md](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md#technical-decisions-and-pull-requests);
maintainers can consult the [OWNERS guide](https://github.com/dayu-autostreamer/dayu/blob/main/docs/development/owners.md).

Website contributions follow the website's own review process. Technical explanations may also need review
from a system maintainer familiar with the affected behavior.

## Local documentation setup {#local-documentation-setup}

In the website repository, use Node.js 20:

```bash
npm ci
npm start
```

Build both languages and preview the production result before requesting review:

```bash
npm run build
npm run serve
```

The build checks community data, document links, MDX, and site configuration. System contributions use the
[system validation guide](https://github.com/dayu-autostreamer/dayu/blob/main/CONTRIBUTING.md#local-validation);
choose checks relevant to the behavior you change.

## Documentation workflow {#documentation-workflow}

Update English content and its Chinese translation together. Community pages describe current project people,
participation, and governance; their shared member data comes from the system roster.
See the [website contribution guide](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md)
for content locations and roster synchronization.

### Version lifecycle {#version-lifecycle}

Technical documentation has release snapshots. Community content is maintained independently of those snapshots.
Keep release-specific instructions in Documentation and community information in Community.

## Commit messages {#commit-messages}

Use a concise subject that identifies the area and change, such as
`docs: clarify installation prerequisites` or `i18n: translate the contribution guide`.
Explain the reason and validation in the PR.
