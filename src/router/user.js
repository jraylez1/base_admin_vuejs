import DefaultLayout from '~/layouts/DefaultLayout.vue'

export const userRoute = {
  path: '/',
  name: 'PublicUser',
  component: DefaultLayout,
  children: [
    {
      path: '/user',
      name: 'user',
      component: () => import('~/views/UserView.vue'),
      meta: {
        title: 'user'
      }
    }
  ]
}
