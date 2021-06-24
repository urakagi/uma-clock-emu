import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueGtag from "vue-gtag"
import Ads from 'vue-google-adsense'
import App from './App.vue'
import VueRouter from 'vue-router'

import i18n from './i18n'
import routes from "@/routes";
import PluginUtils from "@/components/plugins/PluginUtils";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueGtag, {
    config: {id: "G-TQ83VX9F79"}
});

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(VueRouter)
Vue.use(PluginUtils)

const router = new VueRouter({routes})

new Vue({
	i18n,
    router,
    render: h => h(App),
}).$mount('#app')
