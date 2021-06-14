import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueGtag from "vue-gtag"
import Ads from 'vue-google-adsense'
import App from './App.vue'

import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueGtag, {
    config: {id: "G-TQ83VX9F79"}
});

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

new Vue({
	i18n,
    render: h => h(App),
}).$mount('#app')
