<script setup>
import { useThemeStore } from '~/stores/theme.js'

const themeStore = useThemeStore()

const lightTheme = {
  colorPrimary: '#1677FF',
  colorTextBase: '#333333',
  colorTextLightSolid: 'white',
  colorPrimaryBg: '#e4e4e7'
}
const darkTheme = {
  colorPrimary: '#1677FF',
  colorTextBase: 'white',
  colorTextLightSolid: 'white',
  colorPrimaryBg: '#a1a1aa',
  colorErrorBg: '#a1a1aa',
  colorBgContainer: '#737373',
  colorBgElevated: '#a1a1aa'
}
</script>

<template>
  <a-config-provider
    :theme="{
      token: themeStore.currentTheme === 'light' ? lightTheme : darkTheme
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<style scoped></style>
