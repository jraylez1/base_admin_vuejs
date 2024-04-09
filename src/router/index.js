import { createRouter, createWebHistory } from 'vue-router'
import { verifyProtectRouteMiddleware } from '../middlewares/verifyProtectRouteMiddleware'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { loginRoute } from '~/router/login'
import { roleRoute } from '~/router/role'
import { userRoute } from '~/router/user'

import HomeView from '~/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'PublicDashboard',
      component: DefaultLayout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'home',
          component: HomeView
        }
      ]
    },
    loginRoute,
    userRoute,
    roleRoute
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
