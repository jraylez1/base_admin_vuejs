import { useI18nStore } from '~/stores/i18nStore'
import { createI18n } from 'vue-i18n'
import viMessage from '~/locales/vi.json'
import enMessage from '~/locales/en.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('language'),
  warnHtmlMessage: false,
  fallbackLocale: 'vi',
  messages: {
    en: enMessage,
    vi: viMessage
  }
})
