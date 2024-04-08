import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const piniaPlugin = {
  install(app) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    app.use(pinia)
  }
}
