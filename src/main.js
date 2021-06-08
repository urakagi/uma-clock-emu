import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueGtag from "vue-gtag"
import Ads from 'vue-google-adsense'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueGtag, {
    config: {id: "G-TQ83VX9F79"}
});

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

new Vue({
    render: h => h(App),
}).$mount('#app')
