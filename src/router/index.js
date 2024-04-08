import { createRouter, createWebHistory } from 'vue-router'
import { verifyProtectRouteMiddleware } from '../middlewares/verifyProtectRouteMiddleware'
import { loginRoute } from '~/router/login'
import HomeView from '~/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    loginRoute
  ]
})

router.beforeEach(async (to, from, next) => {
  const result = verifyProtectRouteMiddleware(to, router)
  if (result) {
    next(result)
  } else {
    next()
  }
})

export default router
