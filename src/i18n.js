import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ja from './locales/ja.json'
import zhTW from './locales/zhTW.json'
import en from './locales/en.json'

Vue.use(VueI18n)

const lang_array = ['zhTW', 'en', 'ja']
const messages = {
	zhTW,
	en,
	ja
}

let lang
let locale_lang
let locale;

if (localStorage.getItem('lang') !== null) {
	locale = localStorage.getItem('lang')
} else {

	// get locale language
	locale_lang = (window.navigator.userLanguage || window.navigator.language)
	lang = locale_lang.replace('-', '')

	// if locale language is not in setting, use japanese as default
	if (lang_array.includes(lang)) {
		locale = lang
	} else {
		locale = 'zh-TW'
	}

}



const i18n = new VueI18n({
  locale,
  messages,
})

export default i18n
