// import AUI from '@agree/aui-web'
// import '@agree/aui-web/lib/theme-default/index.css'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import { routers } from './router.js'
import Meta from 'vue-meta'
VueMarkdownEditor.use(vuepressTheme);



export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    router.addRoutes(routers)
    // Vue.use(AUI)
    Vue.use(Meta, {
        attribute: {
            keyName: 'note vue vuePress'
        }
    })
    Vue.use(VueMarkdownEditor);
}