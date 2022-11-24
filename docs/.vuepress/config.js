module.exports = {
    title: 'Notes',
    base: '/page/',
    description: 'Welcome to your vuePress-theme-reco site',
    dest: './dist',
    port: 7777,
    theme: 'reco',
    locales: {
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        }
    },
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],//移动端优化
        ['link', { rel: 'icon', href: '/page/logo/1.jpg' }],
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        type: 'MyHome',
        // type: 'blog',
        authorAvatar: '/logo/3.png',
        nav: require('./nav'),
        sidebar: require('./sidebar'),
        sidebarDepth: 2,
        subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        noFoundPageByTencent: false,//404
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！',
        friendLink: [
            {
                title: 'portal mini',
                desc: 'portal website',
                logo: "https://jinhuan138.github.io/portal/logo_100.svg",
                link: 'https://jinhuan138.github.io/portal'
            },]
    },
    configureWebpack: {
        node: { global: true }
    },
    chainWebpack(config, isServer) {
        if (!isServer) {
            config.resolve.modules.merge(["node_modules"]);
        }
        return config;
    },
    plugins: [
        ["@mr-hope/copy-code", {//代码块复制
            duration: 1000,
            selector: 'div[class*="language-"] pre',
            showInMobile: true,
        }],
        ["dynamic-title", {//离开文字
            showIcon: "/page/logo/1.jpg",
            showText: "(Ő∀Ő3)ノ哇喔！欢迎！",
            hideIcon: "/page/logo/1.jpg",
            hideText: "(●—●)喔哟，崩溃啦！",
            recoverTime: 2000
        }],
        ['meting', { //音乐 https://music.163.com/playlist?id=868052070&userid=559094909
            meting: {
                server: "netease",
                type: "playlist",
                mid: "7372431097",
            },
            aplayer: {
                fixed: true,// 吸底模式
                type: 'playlist',
                mini: true,
                listFolded: true,
                lrcType: 0,
            },
            mobile: {
                cover: false,// 手机端去掉cover图
                lrc: false //歌词显示
            }
        }],
        ["@vuepress-reco/vuepress-plugin-kan-ban-niang", {//看板娘        
            theme: ['22','mikoto',]
        }],
        ["vuepress-plugin-boxx"],
        ['@vuepress-reco/extract-code'],
        ['demo-container-v2'],
    ]
}
