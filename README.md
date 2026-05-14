English | [简体中文](./README_zh.md)

# Dayu Documentation Website

[![Deploy to GitHub Pages](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/actions/workflows/deploy.yaml/badge.svg)](https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/actions/workflows/deploy.yaml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdayu-autostreamer.github.io%2F&label=website)](https://dayu-autostreamer.github.io/)
[![License](https://img.shields.io/github/license/dayu-autostreamer/dayu-autostreamer.github.io.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.8.0-2e8555)](https://docusaurus.io/)

This repository maintains the public homepage, documentation, blog, and localized content for the
[Dayu](https://github.com/dayu-autostreamer/dayu) project.

Dayu is a cloud-edge stream analytics platform for deploying, scheduling, and operating DAG-based AI pipelines across
heterogeneous cloud and edge nodes. The system repository contains the backend control plane, Vue frontend, datasource
runtime, templates, hooks, scheduling policies, tests, and implementation-facing technical documentation. This repository
turns that project knowledge into the public documentation site at
[dayu-autostreamer.github.io](https://dayu-autostreamer.github.io/).

## Repository Scope

Use this repository for website and documentation work:

| Path | Purpose |
| --- | --- |
| `docs/` | English documentation source used by Docusaurus |
| `i18n/zh/docusaurus-plugin-content-docs/current/` | Simplified Chinese documentation translation |
| `blog/` | English release notes, research posts, and project updates |
| `i18n/zh/docusaurus-plugin-content-blog/` | Simplified Chinese blog translation |
| `src/pages/` | Homepage and standalone Docusaurus pages |
| `src/components/` | React components used by the homepage |
| `src/css/` | Global theme overrides |
| `static/img/` | Logos, architecture diagrams, screenshots, and blog images |
| `docusaurus.config.js` | Site metadata, navbar/footer, i18n, docs, blog, and deployment configuration |
| `sidebars.js` | Documentation sidebar configuration |

Use the [dayu system repository](https://github.com/dayu-autostreamer/dayu) for source code, runtime bugs, scheduling
policy changes, backend/frontend implementation work, tests, and system release history.

## Local Development

Install Node.js `20` or use a version manager that reads [`.nvmrc`](.nvmrc).

```bash
npm ci
npm start
```

The local development server starts at `http://localhost:3000/` by default.

Run a production build before opening a pull request:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run serve
```

## Documentation Workflow

For content changes, treat English documentation under `docs/` as the canonical source and keep the Simplified Chinese
translation under `i18n/zh/docusaurus-plugin-content-docs/current/` in sync. Blog posts follow the same pattern between
`blog/` and `i18n/zh/docusaurus-plugin-content-blog/`.

When adding or updating pages:

- use Docusaurus front matter such as `sidebar_label`, `sidebar_position`, `slug`, `title`, and `description` where
  appropriate
- keep internal documentation links relative when possible
- place shared images under `static/img/` and reference them as `/img/...`
- update release, architecture, and tutorial content after corresponding changes land in the Dayu system repository
- run `npm run build` to catch broken links, MDX errors, and site configuration regressions

If a change belongs to Dayu implementation rather than the documentation site, open the issue or pull request in
[dayu-autostreamer/dayu](https://github.com/dayu-autostreamer/dayu).

## Community Files

This repository follows the same open-source maintenance style as the main Dayu project:

- [CONTRIBUTING.md](CONTRIBUTING.md) explains the website contribution workflow
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) defines expected community behavior
- [SECURITY.md](SECURITY.md) explains private vulnerability reporting
- [SUPPORT.md](SUPPORT.md) routes documentation, usage, and security questions
- [MAINTAINERS.md](MAINTAINERS.md) lists website maintenance responsibilities

## Useful Links

- Website: <https://dayu-autostreamer.github.io/>
- Dayu system repository: <https://github.com/dayu-autostreamer/dayu>
- Dayu releases: <https://github.com/dayu-autostreamer/dayu/releases>
- Dayu issues: <https://github.com/dayu-autostreamer/dayu/issues>
- Documentation site issues: <https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/issues>

## License

This documentation website is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
