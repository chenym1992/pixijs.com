// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'PixiJS中文网',
    tagline: 'Homepage still needs to be revamped',
    url: 'https://pixijs-cn.vercel.app',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    favicon: 'images/favicon.png',

    customFields: {
        keywords: ['PixiJS中文网', 'pixijs', 'pixijs-cn', 'PixiJS中文', 'PixiJS中文文档'],
        PIXI_VERSION: process.env.PIXI_VERSION || 'dev',
    },

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'pixijs', // Usually your GitHub org/user name.
    projectName: 'pixijs.com', // Usually your repo name.
    trailingSlash: false,

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/pixijs/pixijs.com/tree/main/',
                    routeBasePath: '/',
                    versions: {
                        current: {
                            label: 'Latest',
                        },
                    },
                },
                blog: {
                    blogTitle: 'PixiJS News',
                    blogDescription: 'Latest news from the PixiJS team',
                    postsPerPage: 'ALL',
                    blogSidebarTitle: 'All posts',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.scss'),
                },
                googleAnalytics: {
                    trackingID: 'G-T9RSCE6KDC',
                },
            }),
        ],
    ],

    plugins: ['docusaurus-plugin-sass'],

    themes: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                hashed: true,
                removeDefaultStemmer: true,
                highlightSearchTermsOnTargetPage: true,
                docsRouteBasePath: '/',
                explicitSearchResultPath: true,
                searchContextByPaths: ['guides', 'examples', 'blog'],
                useAllContextsWithNoSearchContext: true,
            },
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                logo: {
                    alt: 'PixiJS',
                    src: 'images/logo.svg',
                },
                items: [
                    {
                        type: 'dropdown',
                        label: '文档',
                        position: 'left',
                        items: [
                            {
                                type: 'doc',
                                docId: 'guides/index',
                                label: '指南',
                            },
                            // TODO: add tutorial back in
                            // {
                            //     label: 'Tutorial',
                            //     to: 'tutorial',
                            // },
                            {
                                type: 'doc',
                                docId: 'examples/index',
                                label: '示例',
                            },
                        ],
                    },
                    {
                        label: 'API',
                        position: 'left',
                        href: `https://pixijs.download/release/docs/index.html`,
                    },
                    // TODO: add docs back in
                    // {
                    //     type: 'doc',
                    //     docId: 'api/index',
                    //     label: 'API',
                    //     position: 'left',
                    // },
                    {
                        to: 'playground',
                        label: '沙盒',
                        position: 'left',
                    },
                    {
                        type: 'dropdown',
                        label: '生态系统',
                        position: 'left',
                        items: [
                            {
                                type: 'html',
                                value: '库',
                                className: 'nav-section-heading',
                            },
                            {
                                label: 'React',
                                href: 'https://github.com/pixijs/pixi-react',
                            },
                            {
                                label: 'Spine',
                                href: 'https://github.com/pixijs/spine',
                            },
                            {
                                label: '滤镜',
                                href: 'https://github.com/pixijs/filters',
                            },
                            {
                                label: '音频',
                                href: 'https://github.com/pixijs/sound',
                            },
                            {
                                label: '动画',
                                href: 'https://github.com/pixijs/animate',
                            },
                            {
                                label: '光照',
                                href: 'https://github.com/pixijs/lights',
                            },
                            {
                                label: 'UI',
                                href: 'https://github.com/pixijs/ui',
                            },
                            {
                                type: 'html',
                                value: 'Tools',
                                className: 'nav-section-heading',
                            },
                            {
                                label: 'AssetPack',
                                href: 'https://github.com/ehtick/pixijs-assetpack',
                            },
                            {
                                label: 'Storybook',
                                href: 'https://github.com/pixijs/storybook',
                            },
                            {
                                label: 'Text Style Editor',
                                href: 'https://pixijs.io/pixi-text-style/#',
                            },
                            {
                                label: 'Customise v6',
                                href: 'https://pixijs.io/customize/',
                            },
                            {
                                type: 'html',
                                value: 'Help',
                                className: 'nav-section-heading',
                            },
                            {
                                label: 'Discussions',
                                href: 'https://github.com/pixijs/pixijs/discussions',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discord.gg/CPTjeb28nH',
                            },
                        ],
                    },
                    {
                        type: 'dropdown',
                        label: '关于',
                        position: 'left',
                        items: [
                            {
                                label: '团队',
                                to: 'team',
                            },
                            {
                                type: 'doc',
                                label: '常见问题',
                                docId: 'faq',
                            },
                            {
                                label: '社区指南',
                                href: 'https://github.com/pixijs/pixijs/blob/dev/.github/CONTRIBUTING.md',
                            },
                            {
                                label: '行为准则',
                                href: 'https://github.com/pixijs/pixijs/blob/dev/.github/CODE_OF_CONDUCT.md',
                            },
                        ],
                    },
                    {
                        to: 'blog',
                        label: '博客',
                        position: 'left',
                    },
                    {
                        label: '赞助',
                        position: 'left',
                        href: 'https://opencollective.com/pixijs',
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownActiveClassDisabled: true,
                        dropdownItemsAfter: [
                            {
                                to: '/versions',
                                label: '所有版本',
                            },
                        ],
                    },
                    {
                        href: 'https://twitter.com/pixijs',
                        position: 'right',
                        className: 'header-link header-twitter-link',
                        'aria-label': 'Twitter account',
                    },
                    {
                        href: 'https://discord.gg/CPTjeb28nH',
                        position: 'right',
                        className: 'header-link header-discord-link',
                        'aria-label': 'Discord server',
                    },
                    {
                        href: 'https://github.com/pixijs/pixijs',
                        position: 'right',
                        className: 'header-link header-github-link',
                        'aria-label': 'GitHub repository',
                    },
                ],
            },
            footer: {
                style: 'dark',
                logo: {
                    alt: 'PixiJS',
                    src: 'images/logo.svg',
                    width: 100,
                },
                // eslint-disable-next-line max-len
                copyright: `© ${new Date().getFullYear()} PixiJS.<br>由 <a href="/team">PixiJS 团队</a>倾心打造.<a target="_blank" href="https://github.com/chenym1992">@chenym1992</a>翻译`,
            },
            image: 'images/ogimage.png',
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
            colorMode: {
                defaultMode: 'light',
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            // algolia: {
            //     appId: 'JX6EBQCAGQ',
            //     apiKey: '2ac1220b913a281bcfeccdf628fa6e99',
            //     indexName: 'beta_pixijs',
            //     contextualSearch: false,
            // },
        }),
};

module.exports = config;
