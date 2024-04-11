import { API_ROOT } from '~/utils/constants'
import axiosRequest from '~/utils/axiosRequest'
import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'
import { i18n } from '~/plugins/i18nPlugin'

const USERS_URL = `${API_ROOT.mainRoot}/v1/users`
const CREATE_USER_URL = `${API_ROOT.mainRoot}/v1/users/create`
const UPDATE_USER_URL = `${API_ROOT.mainRoot}/v1/users/update`
const DETAIL_USER_URL = `${API_ROOT.mainRoot}/v1/users/detail`
const DELETE_USER_URL = `${API_ROOT.mainRoot}/v1/users/delete`
const DELETE_MANY_USER_URL = `${API_ROOT.mainRoot}/v1/users/deleteMany`
export const useUserStore = defineStore('user-store', {
  state: () => ({
    users: []
  }),
  actions: {
    showNotification(message, type = 'success') {
      notification[type]({
        message: i18n.global.t('Notification'),
        description: i18n.global.t(message),
        duration: type === 'success' ? 2 : 3
      })
    },
    async getUsers(keyword = '') {
      try {
        const response = await axiosRequest.get(`${USERS_URL}?keyword=${keyword}`)
        this.users = response.data.items
        return response.data.items
      } catch (error) {
        return error.message
      }
    },

    async createUser(credentials) {
      try {
        const response = await axiosRequest.post(CREATE_USER_URL, credentials)
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    },
    async getDetailUser(id) {
      try {
        const response = await axiosRequest.get(`${DETAIL_USER_URL}?id=${id}`)
        return response.data.data
      } catch (error) {
        return error.message
      }
    },
    async updateUser({ id, credentials }) {
      try {
        const response = await axiosRequest.put(`${UPDATE_USER_URL}?id=${id}`, credentials)
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    },
    async deleteUser(id) {
      try {
        const response = await axiosRequest.delete(`${DELETE_USER_URL}?id=${id}`)
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    },
    async deleteManyUser(ids) {
      try {
        const response = await axiosRequest.delete(DELETE_MANY_USER_URL, { data: { ids } })
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    }
  }
})
