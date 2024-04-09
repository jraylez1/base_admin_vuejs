<template>
  <div>
    <a-typography-text class="text-4xl font-bold gradient-text-blue">Hello Admin</a-typography-text>
    <div>
      <a-typography-text class="text-6xl font-bold mt-6 text-blue-400">Welcome to base Vue Dashboard</a-typography-text>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      <li v-for="(item, index) in tools" :key="{ index }">
        <a-typography-text class="font-medium text-xl">{{ item }}</a-typography-text>
      </li>
    </ul>
    <div class="mt-6">
      <a-typography-text class="text-2xl font-bold gradient-text-red">
        You want to access GitHub, here is the access link:
      </a-typography-text>
    </div>

    <div class="my-2">
      <a href="https://github.com/jraylez1/base_admin_vuejs.git">
        <a-typography-text class="text-lg font-medium">
          https://github.com/jraylez1/base_admin_vuejs.git</a-typography-text
        >
      </a>
    </div>

    <a-typography-text class="text-2xl font-bold gradient-text-red">And how to run this project:</a-typography-text>
    <br />
    <div class="my-2">
      <a-typography-text class="text-lg font-medium">
        Use the command: <Text class="text-2xl font-bold">Yarn dev</Text>
      </a-typography-text>
    </div>
    <a-typography-text class="text-2xl font-bold gradient-text-red">How about building this project?</a-typography-text>
    <br />
    <div class="my-2">
      <a-typography-text class="text-lg font-medium">
        Use the command: <Text class="text-2xl font-bold">Yarn build</Text>
      </a-typography-text>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tools = ref([
  'Vue JS (3.4.21)',
  'Vite (5.2.0)',
  'Ant Design vue (4.1.2)',
  'Tailwindcss (3.4.3)',
  'Vue fontawesome (3.0.6)',
  'vue-i18n (9.11.0)',
  'vue-router (4)',
  'pinia (2.1.7)',
  'axios (1.6.8)',
  'jwt-decode (4.0.0)'
])
</script>

<style lang="scss" scoped></style>
