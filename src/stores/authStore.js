import { API_ROOT } from '~/utils/constants'
import axios from 'axios'
import axiosRequest from '~/utils/axiosRequest'
import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'
import { i18n } from '~/plugins/i18nPlugin'

const AUTH_LOGIN_URL = `${API_ROOT.authRoot}/v2/authenticate/dashboard/login`
export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    user: null,
    userInfo: null,
    isLoggedIn: localStorage.getItem('accessToken') ? true : false
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(AUTH_LOGIN_URL, credentials)
        if (response && response.data) {
          this.isLoggedIn = true
          localStorage.setItem('accessToken', response.data.data.accessToken)
          localStorage.setItem('userLoginId', response.data.data.user.id)
        }
        return response.data
      } catch (error) {
        notification.error({
          message: i18n.global.t('Notification'),
          description: i18n.global.t(error.response.data.message),
          duration: 2
        })
        return null
      }
    },
    async logout() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userLoginId')
    }
  }
})
