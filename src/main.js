import * as Vue from "vue";
import ElementUI from "element-plus";
import "@element-plus/theme-chalk/dist/index.css";
import VueGtag from "vue-gtag";
import VueScript2 from "vue-script2";
import App from "./App.vue";
import store from "./store";
import * as VueRouter from "vue-router";

import routes from "@/routes";
import PluginUtils from "@/components/plugins/PluginUtils";

import { createI18n } from "vue-i18n";

import ja from "./locales/ja.json";
import zhTW from "./locales/zhTW.json";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

import skillZhTW from "./locales/skill-zhTW.json";
import skillKo from "./locales/skill-ko.json";

Object.assign(zhTW, { skill: skillZhTW });
Object.assign(ko, { skill: skillKo });

window.$vueApp = Vue.createApp(App);
window.$vueApp.use(ElementUI);
window.$vueApp.use(VueGtag, {
  config: { id: "G-TQ83VX9F79" },
});

window.$vueApp.use(VueScript2);
window.$vueApp.use(PluginUtils);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes,
});
window.$vueApp.use(router);

const lang_array = ["ja", "zhTW", "ko", "en"];
const messages = {
  ja,
  zhTW,
  ko,
  en,
};

let lang;
let locale_lang;
let locale;

if (localStorage.getItem("lang") !== null) {
  locale = localStorage.getItem("lang");
} else {
  // get locale language
  locale_lang = window.navigator.userLanguage || window.navigator.language;
  lang = locale_lang.replace("-", "");

  // if locale language is not in setting, use japanese as default
  if (lang_array.includes(lang)) {
    locale = lang;
  } else {
    locale = "ja";
  }
}

const i18n = new createI18n({
  locale,
  messages,
});

window.$vueApp.use(i18n);

window.$vueApp.use(store);
window.$vueApp.mount("#app");
window.$vueApp.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith("/") ? "" : "/") + pathToAppend;
};
