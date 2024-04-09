<template>
  <div
    class="flex justify-center items-center h-screen relative"
    :class="themeStore.currentTheme === 'light' ? 'bg-[#e4e4e7]' : 'bg-[#333333]'"
  >
    <div class="z-20 absolute top-5 right-5">
      <ThemeSwitcher />
    </div>
    <div class="absolute top-1/2 left-0 transform -translate-y-1/2 right-0 z-10">
      <img :src="waveBg" alt="waveBg" class="w-full h-full" />
    </div>

    <a-form
      :model="formState"
      name="login"
      class="z-20 p-8 cardShadow rounded-lg flex justify-center items-center flex-col w-[500px]"
      :class="themeStore.currentTheme === 'light' ? 'backgroundOpacity' : 'bg-[#424242]'"
      @finish="handleLogin"
      autoComplete="off"
    >
      <Icon name="admin" size="4x" class="text-bluePrimary" />
      <a-typography-text class="text-3xl font-semibold my-6">{{ $t('Sign In') }}</a-typography-text>
      <a-typography-text class="mb-8 text-center text-base">
        {{ $t('Welcome back Admin! Please enter your details below to sign in.') }}
      </a-typography-text>
      <div class="w-full">
        <a-typography-text class="pb-2">Email</a-typography-text>
        <a-form-item
          name="email"
          :rules="[
            {
              required: true,
              message: $t('Please input your email!')
            },
            {
              type: 'email',
              message: $t('Email is not valid!')
            }
          ]"
        >
          <a-input size="large" placeholder="Email" v-model:value="formState.email" class="text-[#333333]">
            <template #prefix>
              <Icon name="email" size="1x" />
            </template>
          </a-input>
        </a-form-item>
      </div>
      <div class="w-full">
        <a-typography-text class="pb-2">{{ $t('Password') }}</a-typography-text>
        <a-form-item
          name="password"
          :rules="[
            {
              required: true,
              message: $t('Please input your password!')
            }
          ]"
        >
          <a-input-password
            size="large"
            :placeholder="$t('Password')"
            v-model:value="formState.password"
            class="text-[#333333]"
          >
            <template #prefix>
              <Icon name="lock" size="1x" />
            </template>
          </a-input-password>
        </a-form-item>
      </div>
      <a-form-item class="w-full">
        <a-button type="primary" size="large" htmlType="submit" block> {{ $t('Log in') }} </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { useThemeStore } from '~/stores/theme.js'
import { useAuthStore } from '~/stores/authStore.js'
import ThemeSwitcher from '~/components/ThemeSwitcher/ThemeSwitcher.vue'
import Icon from '~/components/Icon/Icon.vue'
import waveBg from '~/assets/imgs/waveBg.png'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const themeStore = useThemeStore()
const authStore = useAuthStore()

const formState = reactive({
  username: '',
  password: ''
})

const handleLogin = async (values) => {
  await authStore.login(values)
  router.push('/dashboard')
}
</script>

<style lang="scss" scoped></style>
