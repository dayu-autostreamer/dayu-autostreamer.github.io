---
sidebar_label: Contributing
sidebar_position: 1
slug: /community/contributing
---

# Contributing

Dayu has two closely related repositories:

- [dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu) contains the system implementation.
- [dayu-autostreamer/dayu-autostreamer.github.io](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io)
  contains this public documentation website.

Use the website repository for documentation, blog, localization, homepage, and Docusaurus configuration changes. Use the
system repository for backend, frontend, runtime, scheduler, deployment template, and test changes.

## Before you get started

Please read and follow the [Code of Conduct](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CODE_OF_CONDUCT.md).

For website changes, also read the root
[CONTRIBUTING.md](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/blob/main/CONTRIBUTING.md).

## Local documentation setup

Use Node.js `20`, then install dependencies and start the local Docusaurus server:

```bash
npm ci
npm start
```

Before opening a pull request, run:

```bash
npm run build
```

This catches broken links, MDX errors, and site configuration regressions.

## What to contribute

Good website contributions include:

- fixing broken links, stale screenshots, unclear wording, or missing translations
- improving tutorials for installation, lower-layer setup, and upper-layer system startup
- expanding architecture, API, hook, and scheduler policy explanations
- adding release notes, research posts, case studies, and community updates
- improving homepage content, navigation, or Docusaurus configuration

## Documentation workflow

- Keep English source pages under `docs/`.
- Keep Simplified Chinese translations under `i18n/zh/docusaurus-plugin-content-docs/current/`.
- Keep English blog posts under `blog/`.
- Keep Simplified Chinese blog translations under `i18n/zh/docusaurus-plugin-content-blog/`.
- Put shared assets under `static/img/` and reference them as `/img/...`.
- Prefer relative links for internal documentation pages.

When a Dayu system change affects user-facing behavior, update the documentation after the upstream issue, pull request,
or release is clear enough to reference.

## Pull request expectations

Please keep pull requests focused and explain:

- what reader problem the change solves
- whether the content applies to English, Chinese, or both
- which upstream Dayu issue, pull request, release, or paper the change reflects
- whether `npm run build` passed locally

Documentation pull requests should usually receive review from a website maintainer. Architecture, scheduler, runtime, or
deployment tutorials may also need review from the corresponding Dayu system owner.

## Commit messages

Use short, scope-first commit messages:

```text
docs: explain scheduler template fields
i18n: sync Chinese getting started guide
site: update homepage feature copy
ci: add pull request build check
```
