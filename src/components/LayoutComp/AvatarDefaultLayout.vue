<template>
  <div>
    <a-dropdown :trigger="['click']" :open="open">
      <a
        @click="
          () => {
            open = !open
          }
        "
      >
        <div>
          <a-avatar size="large" class="bg-bluePrimary hover:bg-slate-400">
            <template #icon><Icon name="user" class="text-white" /></template>
          </a-avatar>
        </div>
      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1" @click="changeLanguage('vi')">
            <a-typography-text :type="locale === 'vi' ? 'success' : ''" strong>
              {{ $t('Vietnamese') }}
            </a-typography-text>
          </a-menu-item>
          <a-menu-item key="2" @click="changeLanguage('en')">
            <a-typography-text strong :type="locale === 'en' ? 'success' : ''">
              {{ $t('English') }}
            </a-typography-text>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a-popconfirm
              placement="bottomLeft"
              :title="$t('logout')"
              :description="$t('Are you sure you want to log out?')"
              :okText="$t('Yes')"
              :cancelText="$t('No')"
              @Confirm="() => handleLogout()"
              @Cancel="() => setOpen(false)"
            >
              <a-button
                :icon="h(PoweroffOutlined)"
                block
                danger
                class="bg-red-200 text-red-400 border-red-200 hover:bg-red-200 hover:border-red-400"
              >
                {{ $t('logout') }}
              </a-button>
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import Icon from '~/components/Icon/Icon.vue'
import { ref, h } from 'vue'
import { PoweroffOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '~/stores/authStore.js'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const open = ref(false)
const authStore = useAuthStore()

const handleMenuClick = (e) => {
  if (e.key === '3') {
    open.value = true
  } else open.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const changeLanguage = (localeValue) => {
  // locale.value = localeValue
  localStorage.setItem('language', localeValue)
  window.location.reload()
}
</script>

<style lang="scss" scoped></style>
