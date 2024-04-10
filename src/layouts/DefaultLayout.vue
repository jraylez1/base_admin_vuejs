<template>
  <a-layout class="min-h-screen">
    <a-layout-sider breakpoint="lg" collapsedWidth="0" class="z-[9999] fixed top-0 left-0 bottom-0" theme="dark">
      <div class="p-4">
        <div class="text-white text-center p-2 font-bold text-xl bg-[#334454] rounded-md">Admin page</div>
      </div>
      <MenuDefaultLayout />
    </a-layout-sider>
    <a-layout class="lg:ml-[200px] ml-0" :class="themeStore.currentTheme === 'light' ? 'bg-[#e4e4e7]' : 'bg-[#333333]'">
      <a-layout-header
        class="px-6 flex justify-between items-center"
        :class="themeStore.currentTheme === 'light' ? 'bg-white' : 'bg-[#424242]'"
      >
        <a-typography-text class="font-bold text-xl uppercase">{{ $t(pathName) }}</a-typography-text>
        <div class="flex">
          <div class="mr-6">
            <ThemeSwitcher />
          </div>
          <AvatarDefaultLayout />
        </div>
      </a-layout-header>
      <div class="mt-6 mx-6">
        <a-breadcrumb>
          <a-breadcrumb-item
            ><router-link :to="{ name: 'home' }">{{ $t('Dashboard') }}</router-link></a-breadcrumb-item
          >
          <a-breadcrumb-item>{{ $t(pathName) }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <a-layout-content class="mt-6 mx-4 mb-0">
        <div
          class="p-6 min-h-[360px] rounded-lg"
          :class="themeStore.currentTheme === 'light' ? 'bg-white' : 'bg-[#424242]'"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer
        class="text-center mt-10"
        :class="themeStore.currentTheme === 'light' ? 'bg-white' : 'bg-[#424242]'"
      >
        {{ `Ant Design ©${new Date().getFullYear()} Created by Ant UED` }}
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { useThemeStore } from '~/stores/theme.js'
import ThemeSwitcher from '~/components/ThemeSwitcher/ThemeSwitcher.vue'
import { useRouter } from 'vue-router'
import MenuDefaultLayout from '../components/LayoutComp/MenuDefaultLayout.vue'
import AvatarDefaultLayout from '../components/LayoutComp/AvatarDefaultLayout.vue'
import { computed } from 'vue'

const router = useRouter()
const themeStore = useThemeStore()

const pathName = computed(() => {
  return router.currentRoute.value.path.split('/')[1]
})
</script>

<style lang="scss" scoped></style>
