<template>
  <a-menu
    theme="dark"
    @click="handleClick"
    mode="inline"
    v-model:selectedKeys="selectedKey"
    v-model:openKeys="openKeys"
    :items="items"
  />
</template>

<script setup>
import { ref, h } from 'vue'
import { i18n } from '~/plugins/i18nPlugin'
import { SafetyCertificateOutlined, PieChartOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedKey = ref([router.currentRoute.value.path.split('/')[1]])
const openKeys = ref(['example'])
const items = ref([
  {
    key: 'dashboard',
    icon: 'role',
    icon: () => h(PieChartOutlined),
    label: i18n.global.t('Dashboard'),
    title: 'Dashboard'
  },
  {
    label: i18n.global.t('Managements'),
    icon: () => h(ProjectOutlined),
    title: 'Managements',
    key: 'example',
    children: [
      {
        label: i18n.global.t('Roles'),
        icon: () => h(SafetyCertificateOutlined),
        title: 'Roles',
        key: 'role'
      },
      {
        label: i18n.global.t('Users'),
        icon: () => h(UserOutlined),
        title: 'Users',
        key: 'user'
      }
    ]
  }
])

const handleClick = (e) => {
  router.push(e.key)
}
</script>

<style lang="scss" scoped></style>
