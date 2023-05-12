import { createI18n } from 'vue-i18n'
import zhCN from './i18n/zh-cn.json'
import en from './i18n/en.json'

const messages = {
  'zh-cn': zhCN,
  en
}

const localLang = localStorage.getItem('lang')
const isAuto = localLang === 'withSystem' || localLang === null

const i18n = createI18n({
  legacy: false,
  locale: isAuto ? navigator.language.toLowerCase() : localLang,
  fallbackLocale: 'en',
  messages
})

export default i18n