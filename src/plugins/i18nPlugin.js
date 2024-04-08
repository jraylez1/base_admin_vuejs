import { useI18nStore } from '~/stores/i18nStore'
import { createI18n } from 'vue-i18n'
import viMessage from '~/locales/vi.json'
import enMessage from '~/locales/en.json'

export const i18nPlugin = {
  install(app) {
    const { locale } = useI18nStore()
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale,
      warnHtmlMessage: false,
      fallbackLocale: 'vi',
      messages: {
        en: enMessage,
        vi: viMessage
      },
      datetimeFormats: {
        vi: {
          short: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          },
          long: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          }
        }
      }
    })

    app.use(i18n)
  }
}
