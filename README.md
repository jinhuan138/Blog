 ## Note

基于vuepress1.x开发的博客网站

## Installation

```bash
# install dependencies
$ npm install
add book cover
$ npm run book
```

## Add kan-ban-niang
```js
//node_modules/@vuepress-reco/vuepress-plugin-kan-ban-niang/bin/KanBanNiang.vue
themeName: ['22','mikoto'],
model: {
  22:
      '/Blog/kanBanNiang/22/model.2017.newyear.json',
    mikoto:
      '/Blog/kanBanNiang/mikoto/mikoto.model.json'
 }
```

## 修改skycon图标
```js
//node_modules/vue-skycons/src/Skycon.vue
//监听color修改icon
```

## Running the app

```bash
 development
 $ npm run dev

 build
 $ npm run build
```

## Site

 https://jinhuan138.github.io/Blog/

![notes](https://jinhuan138.github.io/Blog/logo/1.jpg) 

## GitHub Issues 评论

文章评论使用 [Utterances](https://utteranc.es/) 保存到 `jinhuan138/Blog` 的 GitHub Issues。

首次启用前需要：

1. 确保仓库是公开仓库，并在仓库设置中启用 Issues。
2. 为 `jinhuan138/Blog` 安装 [Utterances GitHub App](https://github.com/apps/utterances)。

评论默认按文章路径关联 Issue。单篇文章可在 front matter 中添加 `isShowComments: false` 关闭评论；全站配置位于 `docs/.vuepress/config.js` 的 `themeConfig.utterances`。
