const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
    title: 'Dayu',
    // disableHeaderTitle: true,
    // tagline: 'Dayu is all you need',
    tagline: 'Provide infrastructure for cloud-edge collaborative stream data analysis.',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    favicon: 'img/dayu-logo.png',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'dayu-autostreamer', // Usually your GitHub org/user name.
    projectName: 'dayu', // Usually your repo name.
    trailingSlash: false,

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    // staticDirectories: ['public', 'static'],

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh'],
        localeConfigs: {
            en: {
                label: 'English',
            },
            zh: {
                label: '简体中文',
            },
        },
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/tree/main',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/dayu-autostreamer/dayu-autostreamer.github.io/tree/main',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                // title: 'Dayu',
                logo: {
                    alt: 'Dayu Site Logo',
                    src: 'img/dayu.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'introduction/why-dayu',
                        position: 'left',
                        label: 'Documentation',
                    },
                    {to: '/blog', label: 'Blog', position: 'left'},
                    {
                        href: 'https://github.com/dayu-autostreamer/dayu',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Introduction',
                                to: '/docs/introduction/why-dayu',
                            },
                            {
                                label: 'Tutorial',
                                to: '/docs/getting-start/quick-start',
                            },
                            {
                                label: 'Development',
                                to: '/docs/developer-guide/how-to-develop',
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
                copyright: `Copyright © ${new Date().getFullYear()} Dayu Project Authors. All rights reserved.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
});
