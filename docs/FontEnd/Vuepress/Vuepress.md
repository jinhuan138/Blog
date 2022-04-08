## 插件

+ [复制代码块](https://vuepress-theme-hope.github.io/copy-code/zh/)

  ```sh
  npm i -D @mr-hope/vuepress-plugin-copy-code
  ```

  ```json
  ["@mr-hope/copy-code", {//代码块复制
      duration: 1000,
      selector: 'div[class*="language-"] pre',
      showInMobile: true,
  }]
  ```

+ 动态标题

  ```sh
  npm i vuepress-plugin-dynamic-title -D
  ```

  ```json
  ["dynamic-title", {//离开文字
      showIcon: "/img/logo.jpg",
      showText: "(Ő∀Ő3)ノ哇喔！欢迎！",
      hideIcon: "/img/logo.jpg",
      hideText: "(●—●)喔哟，崩溃啦！",
      recoverTime: 2000
  }]
  ```

+ [boxx]([https://zpj80231.gitee.io/znote/views/frontend/vuepress-plugin-boxx.html#%E5%BA%8F%E8%A8%80](https://zpj80231.gitee.io/znote/views/frontend/vuepress-plugin-boxx.html#序言))

  ```shell
  npm install vuepress-plugin-boxx
  ```

  ```json
  ["vuepress-plugin-boxx"]
  ```

  ```js
  //使用的地方加上标签
  <Boxx/> 
  ```
  <Boxx changeTime='2000' />
  
+ [音乐](https://moefyit.github.io/moefy-vuepress/packages/meting.html#install)

  ```shell
  yarn add vuepress-plugin-meting -D
  ```

  ```json
  ['meting', { //音乐
        meting: {
            server: "netease",
            type: "playlist",
            mid: "2308169186",
        },
        aplayer: {
            fixed: true,// 吸底模式
            type: 'playlist',
            mini: true,
            listFolded: true,
            lrcType: 3,
        },
        mobile: {
            lrc: true //歌词显示
        }
    }]
  ```
+ [看版娘](https://www.npmjs.com/package/@vuepress-reco/vuepress-plugin-kan-ban-niang)

  ```shell
  npm i @vuepress-reco/vuepress-plugin-kan-ban-niang
  ```

  ```json
  ["@vuepress-reco/vuepress-plugin-kan-ban-niang", {//看板娘        
      theme: ['blackCat']
  }],
  ```

+ 图片放大

  ```shell
  yarn add -D @vuepress/plugin-medium-zoom
  ```

  ```json
  ['@vuepress/medium-zoom']
  ```

+ [extract-code](https://github.com/vuepress-reco/vuepress-plugin-extract-code)

  ```shell
  npm i @vuepress-reco/vuepress-plugin-extract-code
  ```

  ```json
  ['@vuepress-reco/extract-code']
  ```

  ```vue
  <!--在md中使用-->
  <RecoDemo>
    <template slot="code-template">
      <<< @/docs/.vuepress/components/Mustache.vue?template
    </template>
    <template slot="code-script">
      <<< @/docs/.vuepress/components/Mustache.vue?script
    </template>
    <template slot="code-style">
      <<< @/docs/.vuepress/components/Mustache.vue?style
    </template>
    <Mustache slot="demo"/>
  </RecoDemo>
  <!--组件放在.vuepress/components会被注册为全局组件，或使用@vuepress/plugin-register-components注册-->
  ```

+ [Demo Container](https://docs.chenjianhui.site/vuepress-plugin-demo-container/zh/)

  ```shell
  yarn add vuepress-plugin-demo-container -D
  ```

  ```json
  ['demo-container']
  ```

  ::: demo 动态异步组件
  ```html
  <template>
  <div class="red-center-text">
    <keep-alive :exclude="['error', 'loading']">
      <component :is="list[current % list.length]" />
    </keep-alive>
  </div>
  </template>
  <script>
  const createCom = (name, content) => ({
    name,
    render(h){
    return h('div',content)//使用template需要配置
    }
  });
  const createAsync = (item) => () => ({
    //异步组件是函数返回对象
    loading: createCom("loading", "加载中...."),
    error: createCom("error", "加载错误"),
    component: new Promise((resolve) => resolve(createCom("com", item))),
  });
  export default {
    data() {
      return {
        items: ["人面桃花", "山河入梦", "春尽江南"],
        current: 0,
        timer: null,
      };
    },
    computed: {
      list() {
        const comArr = [];
        this.items.forEach((i) => {
          comArr.push(createAsync(i));
        });
        return comArr;
      },
    },
    mounted() {
      this.timer = setInterval(() => {
        this.current++;
      }, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
  };
  </script>
  <style>
  .red-center-text {
    color: #ff7875;
    text-align: center;
  }
  </style>
  ```
  :::

+ [v-md-editor](https://code-farmer-i.github.io/vue-markdown-editor/zh/)
  
  ```shell
  npm i npm i @kangc/v-md-editor -S
  ```

  ::: demo v-md-editor
  ```vue
  <template>
    <v-md-editor v-model="text" height="400px"></v-md-editor>
    <aui-button @click='save'>保存</aui-button>
  </template>
  <script>
    export default {
      data() {
        return {
          text: '花繁一瞬,形色浮云',
        };
      },
      methods:{
       save(){
           console.log(this.text)
       }
      }
    };
  </script>
  :::
---

## 时间轴

## 评论

---

## 参考

+ https://vuepress.vuejs.org/zh/guide/
+ https://www.it235.com/guide/notes/vuepress.html#步骤如下
+ https://vuepress-theme-reco.recoluan.com/
+ [v-md-editor](https://code-farmer-i.github.io/vue-markdown-editor/zh/)
