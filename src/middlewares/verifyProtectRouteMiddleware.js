import { useAuthStore } from '~/stores/authStore.js'

export const verifyProtectRouteMiddleware = (route, router) => {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn && route.name !== 'login') {
    return { name: 'login' }
  }

  if (authStore.isLoggedIn && route.name === 'login') {
    return { name: 'home' }
  }
}
