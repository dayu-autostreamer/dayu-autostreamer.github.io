import versions from '../versions.json';

const contributionAnchors = {
    'before-you-get-started': 'choose-a-repository',
    '开始之前': 'choose-a-repository',
    '本地文档环境': 'local-documentation-setup',
    '可以贡献什么': 'what-to-contribute',
    '文档工作流': 'documentation-workflow',
    '版本生命周期': 'version-lifecycle',
    'pull-request-期望': 'pull-request-expectations',
    'commit-message': 'commit-messages',
};
const contactAnchors = {'contact-us': 'project-contact', '联系我们': 'project-contact'};

export default function communityRedirectsPlugin({baseUrl}) {
    return {
        name: 'dayu-community-redirects',
        async contentLoaded({actions}) {
            const destinations = {
                '': '',
                contributing: 'contributing',
                'contact-us': 'support',
            };
            // Real routes keep both static requests and in-app links working.
            // baseUrl includes the locale prefix during each localized build.
            for (const version of ['', ...versions]) {
                for (const [oldPage, newPage] of Object.entries(destinations)) {
                    const segments = ['docs', version, 'community', oldPage].filter(Boolean);
                    const data = await actions.createData(
                        segments.join('-') + '.json',
                        JSON.stringify({
                            to: baseUrl + 'community/' + newPage,
                            anchors: oldPage === 'contributing' ? contributionAnchors : contactAnchors,
                        }),
                    );
                    actions.addRoute({
                        path: baseUrl + segments.join('/'),
                        exact: true,
                        component: '@site/src/components/CommunityRedirect/index.js',
                        modules: {redirectData: data},
                    });
                }
            }
            // A short, stable alias for bookmarks using the former page name.
            const data = await actions.createData('community-contact-us.json',
                JSON.stringify({to: baseUrl + 'community/support', anchors: contactAnchors}));
            actions.addRoute({
                path: baseUrl + 'community/contact-us',
                exact: true,
                component: '@site/src/components/CommunityRedirect/index.js',
                modules: {redirectData: data},
            });
        },
    };
}
