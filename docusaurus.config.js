// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import statcounterPlugin from './plugins/statcounter';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Dayu',
    tagline: /** @type {import('@docusaurus/Translate').translate} */ ('Provide infrastructure for cloud-edge collaborative stream data analytics.'),
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://dayu-autostreamer.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'dayu-autostreamer', // Usually your GitHub org/user name.
    projectName: 'dayu', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh'],
        localeConfigs: {
            en: {
                label: 'English',
                direction: 'ltr',
            },
            zh: {
                label: '简体中文',
                direction: 'ltr',
            },
        },
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: ({docPath, locale}) => {
                        const baseRepoUrl = 'https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/tree/main';
                        if (locale === 'zh') {
                            return `${baseRepoUrl}/i18n/zh/docusaurus-plugin-content-docs/current/${docPath}`;
                        }
                        return `${baseRepoUrl}/docs/${docPath}`;
                    },
                },
                blog: {
                    showReadingTime: false,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Useful options to enforce blogging best practices
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All posts',
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/dayu-logo-horizontal.svg',
            navbar: {
                title: '',
                logo: {
                    alt: 'Dayu Site Logo',
                    src: 'img/dayu-logo-text.svg',
                    srcDark: 'img/dayu-logo-text-white.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Documentation',
                    },
                    {to: '/blog', label: 'Blog', position: 'left'},
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownActiveClassDisabled: true,
                        docsPluginId: 'default',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                        dropdownItemsBefore: [],
                        dropdownItemsAfter: []
                    },
                    {
                        href: 'https://github.com/dayu-autostreamer/dayu',
                        label: 'GitHub',
                        position: 'right',
                    },

                ],
            },
            footer: {
                style: 'dark',
                links:
                    [
                        {
                            title: 'Docs',
                            items: [
                                {
                                    label: 'Tutorial',
                                    to: '/docs',
                                },

                            ],
                        },
                        {
                            title: 'Community',
                            items: [
                                {
                                    label: 'Github Issue',
                                    href: 'https://github.com/dayu-autostreamer/dayu/issues',
                                },
                                {
                                    label: 'Contributing',
                                    to: '/docs/community/contributing',
                                },

                                {
                                    label: 'Contact Us',
                                    to: '/docs/community/contact-us',
                                },

                            ],
                        },
                        {
                            title: 'More',
                            items: [
                                {
                                    label: 'GitHub',
                                    href: 'https://github.com/dayu-autostreamer/dayu',
                                },
                            ],
                        },
                    ],
                copyright:
                    `Copyright © ${new Date().getFullYear()} Dayu Project Authors. All rights reserved.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: ['bash', 'json'],
                magicComments: [
                    {
                        className: 'code-highlight-line',
                        line: 'highlight-next-line',
                        block: {start: 'highlight-start', end: 'highlight-end'},
                    },
                ],
            },
        }),
    plugins: [statcounterPlugin],
};

export default config;
