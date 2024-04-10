<template>
  <a-menu
    theme="dark"
    @click="handleClick"
    mode="inline"
    v-model:selectedKeys="selectedKey"
    v-model:openKeys="openKeys"
    :items="items"
  >
  </a-menu>
</template>

<script setup>
import { ref, h, watchEffect } from 'vue'
import { SafetyCertificateOutlined, PieChartOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const selectedKey = ref([router.currentRoute.value.path.split('/')[1]])
const openKeys = ref(['example'])
const items = ref([
  {
    key: 'dashboard',
    icon: () => h(PieChartOutlined),
    label: t('Dashboard'),
    title: 'Dashboard'
  },
  {
    label: t('Managements'),
    icon: () => h(ProjectOutlined),
    title: 'Managements',
    key: 'example',
    children: [
      {
        label: t('Roles'),
        icon: () => h(SafetyCertificateOutlined),
        title: 'Roles',
        key: 'role'
      },
      {
        label: t('Users'),
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
