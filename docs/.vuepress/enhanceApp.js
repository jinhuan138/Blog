import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import { routers } from './router.js'
import axios from 'axios'
import Meta from 'vue-meta'
VueMarkdownEditor.use(vuepressTheme);



export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    Vue.prototype.$http = axios
    router.addRoutes(routers)
    // Vue.use(Meta, {
    //     attribute: {
    //         keyName: 'note vue vuePress'
    //     }
    // })
    Vue.use(VueMarkdownEditor);
}
//16e915fcec1efefcbcf906c15c8daaf3
//"lat": 39.906217,
//"lon": 116.3912757,