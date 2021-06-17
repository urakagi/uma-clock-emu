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

// check url to get the language settings
var lang
var locale_lang
var locale
var pathname = window.location.pathname.substring(1)
if (pathname.includes('/')) {
	pathname = pathname.substring(0, pathname.indexOf('/', 0))
}


// default
if (pathname.length === 0) {

	// get locale language
	locale_lang = (window.navigator.userLanguage || window.navigator.language)
	lang = locale_lang.replace('-', '')
	
	// if locale language is not in setting, use japanese as default
	if (lang_array.includes(lang)) {
		locale = lang
	} else {
		locale = 'ja'
	}
} else { // change language by url( or dropdown button)

	lang = pathname.replace('-', '')

	// if select language is not in setting, use japanese as default
	if (lang_array.includes(lang)) {
		locale = lang
	} else {
		locale = 'ja'
	}
}


// FIXME: Until path problem is fixed, always set ja
locale = 'ja'


const i18n = new VueI18n({
  locale,
  messages,
})

export default i18n