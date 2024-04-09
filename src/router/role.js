import DefaultLayout from '~/layouts/DefaultLayout.vue'

export const roleRoute = {
  path: '/',
  name: 'PublicRole',
  component: DefaultLayout,
  children: [
    {
      path: '/role',
      name: 'role',
      component: () => import('~/views/RoleView.vue'),
      meta: {
        title: 'role'
      }
    }
  ]
}
