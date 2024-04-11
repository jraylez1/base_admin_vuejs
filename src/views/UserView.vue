<template>
  <div>
    <div class="flex sm:flex-row flex-col justify-between items-center">
      <div class="flex gap-2 sm:w-auto w-full">
        <a-button type="primary" size="large" @Click="showModal('add', null)">
          <template #icon>
            <Icon name="circlePlus" class="text-white mr-2" />
          </template>
          {{ $t('Add new') }}
        </a-button>
        <a-popconfirm
          :title="$t(`Delete ${pathName}`)"
          :description="$t(`Are you sure to delete this ${pathName}?`)"
          @confirm="deleteManyItem(selectItemToDelete)"
          :okText="$t('Yes')"
          :cancelText="$t('No')"
          :disabled="selectItemToDelete.length > 0 ? false : true"
          placement="bottom"
        >
          <a-button type="primary" size="large" danger :disabled="selectItemToDelete.length > 0 ? false : true">
            <template #icon>
              <Icon
                name="trash"
                class="mr-2"
                :class="selectItemToDelete.length > 0 ? 'text-white' : 'text-[#33333340]'"
              />
            </template>
            {{ $t('Delete all') }}
          </a-button>
        </a-popconfirm>
      </div>
      <div class="sm:mt-0 mt-4 sm:w-auto w-full">
        <a-input-search :placeholder="$t('input user email / phone')" @Search="onSearch" enterButton />
      </div>
    </div>
    <div class="mt-8">
      <a-table
        :row-selection="{
          type: 'checkbox',
          ...rowSelection
        }"
        :scroll="{
          x: 1000
        }"
        :dataSource="userStore.users"
        :columns="columns"
        rowKey="id"
        bordered
      >
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key === 'ordinal'">
            <a-typography-text>{{ index + 1 }}</a-typography-text>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button @Click="showModal('update', record)">
                <template #icon>
                  <Icon name="update" />
                </template>
                {{ $t('Update') }}
              </a-button>
              <a-popconfirm
                :title="$t(`Delete ${pathName}`)"
                :description="$t(`Are you sure to delete this ${pathName}?`)"
                @confirm="deleteItem(record.id)"
                :okText="$t('Yes')"
                :cancelText="$t('No')"
                :disabled="record.id === userLoginId"
              >
                <a-button danger :disabled="record.id === userLoginId">
                  <template #icon>
                    <Icon name="trash" />
                  </template>
                  {{ $t('Delete') }}
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal
      :title="modalType === 'add' ? $t(`Add new ${pathName}`) : $t(`Update ${pathName}`)"
      v-model:open="isModalOpen"
      :footer="null"
      :closable="false"
      destroyOnClose
      :afterClose="handleCancel"
    >
      <a-form
        ref="formRef"
        name="userForm"
        class="flex justify-center items-center flex-col"
        autoComplete="off"
        :model="formState"
      >
        <div class="w-full">
          <a-typography-text class="pb-2">{{ $t('Email') }}</a-typography-text>
          <a-form-item name="email" v-bind="validateInfos.email">
            <a-input
              v-model:value="formState.email"
              size="large"
              :placeholder="$t('Email')"
              class="text-[#333333]"
              :disabled="checkModalDisable()"
            >
              <template #prefix>
                <Icon name="email" size="1x" />
              </template>
            </a-input>
          </a-form-item>
        </div>
        <div class="w-full">
          <a-typography-text class="pb-2">{{ $t('Phone') }}</a-typography-text>
          <a-form-item name="phone" v-bind="validateInfos.phone">
            <a-input
              v-model:value="formState.phone"
              size="large"
              :placeholder="$t('Phone')"
              class="text-[#333333]"
              :disabled="checkModalDisable()"
              type="number"
            >
            </a-input>
          </a-form-item>
        </div>
        <div class="w-full">
          <a-typography-text class="pb-2">{{ $t('Role') }}</a-typography-text>
          <a-form-item name="role" v-bind="validateInfos.role">
            <a-select
              v-model:value="formState.role"
              size="large"
              :placeholder="$t('select your role')"
              class="text-[#333333]"
              :disabled="checkModalDisable()"
            >
              <a-select-option :value="role.name" v-for="role in roleStore.roles" :key="role.id">{{
                role.name
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="w-full">
          <a-typography-text class="pb-2">{{ $t('Password') }}</a-typography-text>
          <a-form-item name="password" v-bind="validateInfos.password">
            <a-input-password
              v-model:value="formState.password"
              size="large"
              :placeholder="$t('Password')"
              class="text-[#333333]"
            >
              <template #prefix>
                <Icon name="lock" size="1x" />
              </template>
            </a-input-password>
          </a-form-item>
        </div>
        <div class="w-full">
          <a-typography-text class="pb-2">{{ $t('Confirm password') }}</a-typography-text>
          <a-form-item name="confirmPassword" v-bind="validateInfos.confirmPassword">
            <a-input-password
              v-model:value="formState.confirmPassword"
              size="large"
              :placeholder="$t('Confirm password')"
              class="text-[#333333]"
            >
              <template #prefix>
                <Icon name="lock" size="1x" />
              </template>
            </a-input-password>
          </a-form-item>
        </div>
        <div class="flex gap-2 w-full justify-end">
          <a-form-item class="mb-0">
            <a-button type="primary" size="large" htmlType="submit" @click="handleOk">
              {{ $t('Save') }}
            </a-button>
          </a-form-item>
          <a-form-item class="mb-0">
            <a-button size="large" @Click="handleCancel"> {{ $t('Cancel') }} </a-button>
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/userStore.js'
import { useRoleStore } from '~/stores/roleStore.js'
import { useAuthStore } from '~/stores/authStore.js'
import Icon from '~/components/Icon/Icon.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })
const useForm = Form.useForm
const userStore = useUserStore()
const roleStore = useRoleStore()
const authStore = useAuthStore()
const router = useRouter()
const pathName = computed(() => {
  return router.currentRoute.value.path.split('/')[1]
})
const formRef = ref()
const modalType = ref('')
const isModalOpen = ref(false)
const selectItemToDelete = ref([])
const userId = ref(null)
const userLoginId = ref(localStorage.getItem('userLoginId'))
const formState = reactive({
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: ''
})

const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject(t('Please input your password!'))
  } else {
    if (formState.confirmPassword !== '') {
      formRef.value.validateFields('confirmPassword')
    }
    return Promise.resolve()
  }
}
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject(t('Please input your confirm!'))
  } else if (value !== formState.password) {
    return Promise.reject(t('Confirm password do not match!'))
  } else {
    return Promise.resolve()
  }
}

const rulesRef = reactive({
  email: [
    {
      required: true,
      message: t('Please input your email!')
    },
    {
      type: 'email',
      message: t('Email is not valid!')
    }
  ],
  phone: [
    {
      required: true,
      message: t('Please input your phone!')
    },
    {
      pattern: /^\d{10}$/,
      message: t('The phone number must have 10 digits!')
    }
  ],
  role: [
    {
      required: true,
      message: t('Please input your role!')
    }
  ],
  password: [
    {
      required: modalType.value === 'add' ? true : false,
      validator: validatePass,
      trigger: 'change'
    }
  ],
  confirmPassword: [
    {
      validator: validatePass2,
      trigger: 'change'
    }
  ]
})

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef, {
  onValidate: (...args) => console.log(...args)
})

const columns = [
  {
    title: t('Ordinal'),
    key: 'ordinal',
    rowScope: 'row',
    align: 'center',
    width: 100
  },
  {
    title: t('Action'),
    key: 'action',
    align: 'center',
    width: 400
  },
  {
    title: t('Email'),
    dataIndex: 'email',
    align: 'center',
    key: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
    responsive: ['md']
  },
  {
    title: t('Role'),
    dataIndex: 'role',
    align: 'center',
    key: 'role'
  },
  {
    title: t('Phone'),
    dataIndex: 'phone',
    align: 'center',
    key: 'phone'
  }
]

const setValueUpdate = (detailValue) => {
  formState.email = detailValue.email
  formState.phone = detailValue.phone
  formState.role = detailValue.role
}

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectItemToDelete.value = selectedRowKeys
  },
  getCheckboxProps: (record) => ({
    disabled: record.id === userLoginId.value,
    email: record.email
  })
}

const showModal = async (type, record) => {
  modalType.value = type
  isModalOpen.value = true
  if (type === 'update') {
    userId.value = record.id
    const detailUser = await userStore.getDetailUser(record.id)
    setValueUpdate(detailUser)
  }
}

const checkModalDisable = () => {
  if (modalType.value === 'update' && userLoginId.value === userId.value) {
    return true
  } else {
    return false
  }
}

const handleOk = () => {
  validate()
    .then(async (values) => {
      const { confirmPassword, ...restValues } = values

      if (modalType.value === 'add') {
        const response = await userStore.createUser(restValues)
        if (response) {
          handleCancel()
          userStore.getUsers()
        }
      } else {
        const response = await userStore.updateUser({ id: userId.value, credentials: restValues })
        if (response) {
          if (userId.value === userLoginId.value) {
            // nếu user là người hiện tại sẽ logout
            authStore.logout()
            router.push('/login')
          } else {
            handleCancel()
            userStore.getUsers()
          }
        }
      }
    })
    .catch((errorInfo) => {
      console.log('Validation Failed:', errorInfo)
    })
}

const handleCancel = () => {
  isModalOpen.value = false
  resetFields()
}

const deleteItem = async (id) => {
  const response = await userStore.deleteUser(id)
  if (response) {
    userStore.getUsers()
  }
}

const deleteManyItem = async (ids) => {
  const response = await userStore.deleteManyUser(ids)
  if (response) {
    selectItemToDelete.value = []
    userStore.getUsers()
  }
}

const onSearch = (value) => {
  userStore.getUsers(value)
}

onMounted(() => {
  userStore.getUsers()
  roleStore.getRoles()
})
</script>

<style lang="scss" scoped></style>
