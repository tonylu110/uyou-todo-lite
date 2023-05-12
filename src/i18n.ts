import { createI18n } from 'vue-i18n'
import zhCN from './i18n/zh-cn.json'
import en from './i18n/en.json'

const messages = {
  'zh-CN': zhCN,
  en
}

const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages
})

export default i18n