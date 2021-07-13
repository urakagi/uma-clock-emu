import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ja from './locales/ja.json'
import zhTW from './locales/zhTW.json'

Vue.use(VueI18n)

const lang_array = ['ja', 'zhTW']
const messages = {
	ja,
	zhTW
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
		locale = 'ja'
	}

}



const i18n = new VueI18n({
  locale,
  messages,
})

export default i18n