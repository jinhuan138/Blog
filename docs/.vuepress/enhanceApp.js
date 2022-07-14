import VueMarkdownEditor from '@kangc/v-md-editor';
VueMarkdownEditor.use(vuepressTheme);
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import routers from './router.js'
import axios from 'axios'
import { VuePlugin } from 'vuera'
import Meta from 'vue-meta'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    Vue.prototype.$http = axios
    Vue.use(VuePlugin)
    routers.forEach(i => {
        router.addRoute(i)//组件需要有name,否则刷新匹配*路由
    })
    Vue.use(Meta, {
        attribute: {
            keyName: 'note vue vuePress',
        },
        refreshOnceOnNavigation:true,
        htmlAttrs: {
            lang: 'zh-CH',
            amp: true
        }
    })
    Vue.use(ElementUI);
    Vue.use(VueMarkdownEditor);
}