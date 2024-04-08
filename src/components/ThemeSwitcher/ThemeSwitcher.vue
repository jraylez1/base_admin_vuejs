<template>
  <a-switch v-model:checked="checked" @change="(checked) => themeStore.setTheme(checked ? 'light' : 'dark')">
    <template #checkedChildren>
      <Icon name="sun" size="1x" className="text-white" />
    </template>
    <template #unCheckedChildren>
      <Icon name="moon" size="1x" className="text-white" />
    </template>
  </a-switch>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '~/components/Icon/Icon.vue'
import { useThemeStore } from '~/stores/theme.js'

const themeStore = useThemeStore()
const checked = ref(themeStore.currentTheme === 'light' ? true : false)
</script>

<style lang="scss" scoped></style>
