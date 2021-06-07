import Vue from 'vue'
import ElementUI from 'element-ui'
import VueHead from 'vue-head'
import 'element-ui/lib/theme-chalk/index.css'
import VueGtag from "vue-gtag"
import Ads from 'vue-google-adsense'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueHead)
Vue.use(VueGtag, {
    config: {id: "G-LDBKBM6RWC"}
});

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)

new Vue({
    created() {
        const html = document.documentElement
        html.setAttribute('lang', 'ja')
    },
    render: h => h(App),
}).$mount('#app')
