module.exports = {
    title: 'Notes',
    base: '/Blog/',
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
        ['link', { rel: 'icon', href: '/Blog/logo/1.jpg' }],
        ['script', {async:true, src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9017742413133429', crossorigin: 'anonymous' }],
        ['meta', { name: 'google-adsense-account', content: 'ca-pub-9017742413133429' }],
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
        utterances: {
            repo: 'jinhuan138/Blog',
            issueTerm: 'pathname',
            lightTheme: 'github-light',
            darkTheme: 'github-dark',
            showComment: true
        },
        friendLink: [
            {
                title: 'portal mini',
                desc: 'portal website',
                logo: "https://jinhuan138.github.io/portal/logo_100.svg",
                link: 'https://jinhuan138.github.io/portal'
            },]
    },
    configureWebpack: {
        node: { global: true },
        module: {
            //webpack4 将 .mjs 视为严格 ESM，而 vue 解析为 CommonJS，会导致 vue-demi 命名导入失败
            rules: [
                { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' }
            ]
        }
    },
    chainWebpack(config, isServer) {
        if (!isServer) {
            config.resolve.modules.merge(["node_modules"]);
        }
        //vue-reader 经 vue-demi 使用组合式 API，须与应用共用同一个 vue 实例，否则 h()/生命周期取不到当前组件实例
        config.resolve.alias.set(
            'vue$',
            require.resolve(isServer ? 'vue/dist/vue.runtime.common.js' : 'vue/dist/vue.runtime.esm.js')
        )
        //vue-reader 与 @vibrant/* 产物含可选链语法，webpack4 无法解析，需交给 babel 转译
        const jsRule = config.module.rule('js')
        const excludes = jsRule.exclude.values()
        jsRule.exclude.clear()
        excludes.forEach(exclude => {
            jsRule.exclude.add(
                typeof exclude === 'function'
                    ? filePath => /[\/\\](vue-reader|@vibrant)[\/\\]/.test(filePath) ? false : exclude(filePath)
                    : exclude
            )
        })
        return config;
    },
    plugins: [
        ["@mr-hope/copy-code", {//代码块复制
            duration: 1000,
            selector: 'div[class*="language-"] pre',
            showInMobile: true,
        }],
        ["dynamic-title", {//离开文字
            showIcon: "/Blog/logo/1.jpg",
            showText: "(Ő∀Ő3)ノ哇喔！欢迎！",
            hideIcon: "/Blog/logo/1.jpg",
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
            theme: ['yuanDatou', '22', 'mikoto']
        }],
        ["vuepress-plugin-boxx"],
        ['@vuepress-reco/extract-code'],
        ['demo-container-v2'],
    ]
}
