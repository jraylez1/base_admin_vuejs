import { API_ROOT } from '~/utils/constants'
import axiosRequest from '~/utils/axiosRequest'
import { defineStore } from 'pinia'
import { notification } from 'ant-design-vue'
import { i18n } from '~/plugins/i18nPlugin'

const ROLES_URL = `${API_ROOT.mainRoot}/v1/roles`
const PERMISSIONS_URL = `${API_ROOT.mainRoot}/v1/roles/permissions`
const CREATE_ROLE_URL = `${API_ROOT.mainRoot}/v1/roles/create`
const UPDATE_ROLE_URL = `${API_ROOT.mainRoot}/v1/roles/update`
const DETAIL_ROLE_URL = `${API_ROOT.mainRoot}/v1/roles/detail`
const DELETE_ROLE_URL = `${API_ROOT.mainRoot}/v1/roles/delete`
const DELETE_MANY_ROLE_URL = `${API_ROOT.mainRoot}/v1/roles/deleteMany`
export const useRoleStore = defineStore('role-store', {
  state: () => ({
    roles: [],
    permissions: [],
    actions: []
  }),
  actions: {
    showNotification(message, type = 'success') {
      notification[type]({
        message: i18n.global.t('Notification'),
        description: t(message),
        duration: type === 'success' ? 2 : 3
      })
    },
    async getRoles(keyword = '') {
      try {
        const response = await axiosRequest.get(`${ROLES_URL}?keyword=${keyword}`)
        this.roles = response.data.items
        return response.data.items
      } catch (error) {
        return error.message
      }
    },
    async getPermissions() {
      try {
        const response = await axiosRequest.get(`${PERMISSIONS_URL}`)
        return response.data.data
      } catch (error) {
        return error.message
      }
    },
    async createRole(credentials) {
      try {
        const response = await axiosRequest.post(CREATE_ROLE_URL, credentials)
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    },
    async getDetailRole(id) {
      try {
        const response = await axiosRequest.get(`${DETAIL_ROLE_URL}?id=${id}`)
        return response.data.data
      } catch (error) {
        return error.message
      }
    },
    async updateRole({ id, credentials }) {
      try {
        const response = await axiosRequest.put(`${UPDATE_ROLE_URL}?id=${id}`, credentials)
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    },
    async deleteRole(id) {
      try {
        const response = await axiosRequest.delete(`${DELETE_ROLE_URL}?id=${id}`)
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    },
    async deleteManyRole(ids) {
      try {
        const response = await axiosRequest.delete(DELETE_MANY_ROLE_URL, { data: { ids } })
        this.showNotification(response.data.message)
        return response.data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
        return isRejectedWithValue(error.response.data)
      }
    }
  }
})
