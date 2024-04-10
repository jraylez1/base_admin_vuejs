import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme-store', {
  state: () => ({
    currentTheme: localStorage.getItem('theme') || 'light',
    loading: false
  }),
  actions: {
    setTheme(theme) {
      this.currentTheme = theme
      localStorage.setItem('theme', theme)
    }
  }
})
