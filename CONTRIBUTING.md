# Contributing to the Dayu Documentation Website

Thanks for helping improve the Dayu documentation site. This repository is the public website for the Dayu project; the
system implementation lives in [dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu).

## Before You Start

- Read and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Use this repository for homepage, docs, blog, translation, image, and Docusaurus configuration changes.
- Use the [Dayu system repository](https://github.com/dayu-autostreamer/dayu) for backend, frontend, runtime, scheduler,
  deployment template, and test changes.

## Local Setup

Use Node.js `20` as declared in [`.nvmrc`](.nvmrc).

```bash
npm ci
npm start
```

Run a production build before opening a pull request:

```bash
npm run build
```

## Content Guidelines

### Documentation

- Keep English source pages in `docs/`.
- Keep Simplified Chinese translations in `i18n/zh/docusaurus-plugin-content-docs/current/`.
- Use front matter for sidebar placement and stable URLs:

```md
---
sidebar_label: Page Label
sidebar_position: 3
slug: /section/page
---
```

- Prefer relative links for internal docs, for example `../developer-guide/how-to-develop.md`.
- Put shared images in `static/img/` and reference them as `/img/example.png`.
- Use Docusaurus admonitions when they help readers scan important context:

```md
:::tip
Short practical guidance.
:::
```

### Community

Community uses an independent, unversioned docs plugin and its own sidebar:

- English: `community/`
- Simplified Chinese: `i18n/zh/docusaurus-plugin-content-docs-community/current/`
- Sidebar: `sidebarsCommunity.js`
- Shared people, roles, and founding attribution: `src/data/community.json`

Keep both languages' page names, slugs, and explicit heading IDs aligned. The system repository's
[GOVERNANCE.md](https://github.com/dayu-autostreamer/dayu/blob/main/GOVERNANCE.md) and
[MAINTAINERS.md](https://github.com/dayu-autostreamer/dayu/blob/main/MAINTAINERS.md) are authoritative for project
policy and system roles. This website's [MAINTAINERS.md](MAINTAINERS.md) records website responsibilities separately.

To refresh the shared data from a local Dayu checkout with committed community files:

```bash
npm run community:sync -- /path/to/dayu
npm run community:sync -- /path/to/dayu --check
```

The snapshot records the source commit and policy-file hashes for review. When those policies change, also review the
English and Chinese prose and this repository's support, security, and conduct contacts. The site builds from the
checked-in snapshot; it does not fetch GitHub member lists at build time or in a visitor's browser.

`npm run check:community` checks member references, bilingual routes, and heading anchors; `npm run build` includes
that check. Verify the rendered homepage, Community sidebar, language switching, and legacy links with `npm run serve`.
Keep official logo sources documented in `static/img/community/README.md`.

### Blog Posts

- Put English posts under `blog/YYYY-MM-DD-short-name/index.md` or `index.mdx`.
- Put Chinese translations under `i18n/zh/docusaurus-plugin-content-blog/YYYY-MM-DD-short-name/index.md`.
- Keep release posts aligned with the Dayu system repository changelog and release notes.

### Translation Sync

When you change an English page that already has a Chinese counterpart, update both files in the same pull request. If a
translation needs to follow later, say so clearly in the pull request body.

### Versioned Documentation

The source directories contain the continuously updated current documentation:

- English: `docs/`
- Simplified Chinese: `i18n/zh/docusaurus-plugin-content-docs/current/`

Published releases are immutable snapshots under `versioned_docs/version-<release>/` and the corresponding localized
`version-<release>/` directory. Do not fix a later release by editing an older snapshot. Update the current sources
first, then create and review a new English and Chinese snapshot when the matching Dayu release is cut. Keep `versions.json`,
`versioned_sidebars/`, and the `versions` configuration in `docusaurus.config.js` synchronized with that release.

Community is shared across documentation versions. The older community pages in `docs/`, `versioned_docs/`, and their
localized counterparts are excluded from the documentation build; `plugins/community-redirects.js` preserves their
public URLs. Update the independent Community sources instead of copying governance or member changes into release snapshots.

## Pull Request Checklist

Before requesting review:

- confirm the change belongs in this website repository
- keep the pull request focused on one documentation, site, or configuration topic
- update English and Chinese content together when possible
- add or update screenshots and diagrams only when they help readers understand the system
- run `npm run build`
- link related Dayu system issues, releases, or pull requests when the content depends on upstream behavior

## Commit Messages

Use concise, scope-first commit messages:

```text
docs: explain scheduler template fields
site: update homepage feature copy
i18n: sync Chinese architecture overview
ci: add pull request build check
```

## Review Expectations

Maintainers review documentation changes for accuracy, structure, localization consistency, working links, and whether the
content matches the current Dayu system behavior. Large tutorial or architecture rewrites may need review from both the
website maintainers and the corresponding Dayu system owners.
