<script setup>
import { useThemeStore } from '~/stores/theme.js'
import { useAuthStore } from '~/stores/authStore.js'
import { isTokenExpired } from '~/utils/jwtDecode'
import { onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const router = useRouter()

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


const checkToken = () => {
  const token = localStorage.getItem('accessToken')
  if (token && isTokenExpired(token)) {
    authStore.logout()
    router.push('/login')
  }
}

onMounted(() => {
  checkToken()
})

watchEffect(() => {
  const intervalId = setInterval(checkToken, 900000)
  return () => clearInterval(intervalId)
})

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
