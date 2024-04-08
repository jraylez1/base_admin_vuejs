import { defineStore } from 'pinia'

export const useI18nStore = defineStore('i18n-store', {
  state: () => ({
    locale: 'vi'
  }),
  actions: {
    setLocale(locale) {
      try {
        this.locale = locale
        return true
      } catch (e) {
        console.log('Set locale failed', e)
        return false
      }
    }
  },
  persist: {
    storage: localStorage
  }
})
