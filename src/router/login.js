export const loginRoute = {
    path: '/login',
    name: 'login',
    component: () => import('~/views/LoginView.vue'),
    meta: {
      title: 'login'
    }
  }
  