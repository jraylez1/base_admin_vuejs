<template>
  <div>
    <div class="flex sm:flex-row flex-col justify-between items-center">
      <div class="flex gap-2 sm:w-auto w-full">
        <a-button type="primary" size="large" @Click="() => showModal('add')">
          <template #icon>
            <Icon name="circlePlus" class="text-white mr-2" />
          </template>
          {{ $t('Add new') }}
        </a-button>
        <a-popconfirm
          :title="$t(`Delete ${pathName}`)"
          :description="$t(`Are you sure to delete this ${pathName}?`)"
          @confirm="() => deleteManyItem(selectItemToDelete)"
          :okText="$t('Yes')"
          :cancelText="$t('No')"
          :disabled="selectItemToDelete.length > 0 ? false : true"
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
        :dataSource="roleStore.roles"
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
              <a-button @Click="() => showModal('update', record)">
                <template #icon>
                  <Icon name="update" />
                </template>
                {{ $t('Update') }}
              </a-button>
              <a-popconfirm
                :title="$t(`Delete ${pathName}`)"
                :description="$t(`Are you sure to delete this ${pathName}?`)"
                @confirm="() => deleteItem(record.id)"
                :okText="$t('Yes')"
                :cancelText="$t('No')"
              >
                <a-button danger :disabled="record.name === 'admin' || record.name === 'user'">
                  <template #icon>
                    <Icon name="update" />
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
      :width="1000"
    >
      <a-form
        v-model:form="form"
        name="roleForm"
        class="flex justify-center items-center flex-col"
        @Finish="handleOk"
        autoComplete="off"
      >
        <div class="w-full">
          <a-typography-text class="pb-2">{{ $t('Name') }}</a-typography-text>
          <a-form-item
            name="name"
            :rules="[
              {
                required: true,
                message: $t('Please input your name!')
              },
              {
                type: 'name',
                message: $t('Name is not valid!')
              }
            ]"
          >
            <a-input size="large" :placeholder="$t('Name')" class="text-[#333333]">
              <template #prefix>
                <Icon name="user" size="1x" />
              </template>
            </a-input>
          </a-form-item>
        </div>
        <div class="w-full">
          <Text class="">{{ $t('Permissions') }}</Text>
          <div v-for="permission in permissions" :key="permission.id" class="mb-4">
            <div class="p-4 flex justify-between items-center rounded-lg bg-[#334454]">
              <div class="font-bold text-lg text-white">{{ $t(permission.name) }}</div>
              <a-switch
                v-model:checked="permission.isAllow"
                @Change="(checked) => onChangePermission(checked, permission.id)"
              />
            </div>
            <div v-if="permission.isAllow">
              <div
                v-for="action in permission.actions"
                :key="action.id"
                class="p-4 flex justify-between items-center rounded-lg mt-2 bg-slate-400"
              >
                <div class="font-bold text-lg text-white">{t(action.name)}</div>
                <a-switch
                  v-model:checked="action.isAllow"
                  @Change="(checked) => onChangeAction(checked, permission.id, action.id)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 w-full justify-end">
          <a-form-item class="mb-0">
            <a-button type="primary" size="large" htmlType="submit" :disabled="checkModalDisable()">
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
import { useRoleStore } from '~/stores/roleStore.js'
import Icon from '~/components/Icon/Icon.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { i18n } from '~/plugins/i18nPlugin'
import { Form } from 'ant-design-vue'

const form = Form.useForm
const roleStore = useRoleStore()
const router = useRouter()
const pathName = computed(() => {
  return router.currentRoute.value.path.split('/')[1]
})
const selectItemToDelete = ref([])
const modalType = ref('')
const isModalOpen = ref(false)
const roleId = ref(null)
const roleName = ref('')
const permissions = ref([])

const columns = [
  {
    title: i18n.global.t('Ordinal'),
    key: 'ordinal',
    rowScope: 'row',
    align: 'center',
    width: 100
  },
  {
    title: i18n.global.t('Action'),
    key: 'action',
    align: 'center',
    width: 400
  },
  {
    title: i18n.global.t('Name'),
    dataIndex: 'name',
    align: 'center',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    responsive: ['md']
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectItemToDelete.value = selectedRowKeys
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'admin' || record.name === 'user',
    name: record.name
  })
}

const showModal = async (type, record) => {
  modalType.value = type
  isModalOpen.value = true
  if (type === 'update') {
    roleId.value = record.id
    roleName.value = record.name
    const detailRole = await roleStore.getDetailRole(record.id)
    form.setFieldsValue(detailRole)
    permissions.value = detailRole.permissions
  } else {
    const detailRole = await roleStore.getPermissions()
    permissions.value = detailRole.permissions
  }
}

const checkModalDisable = () => {
  if (modalType === 'update') {
    if (roleName === 'admin' || roleName === 'user') {
      return true
    }
  } else {
    return false
  }
}

const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        const { name } = values
        const valuesWithPermissions = {
          name,
          permissions: permissions
        }

        if (modalType === 'add') {
          const response = await roleStore.createRole(valuesWithPermissions)
          if (response) {
                isModalOpen.value = false
                roleStore.getRoles()
              }
        } else {
          const response = await roleStore.updateRole({ id: roleId, credentials: valuesWithPermissions })
          if (response) {
                isModalOpen.value = false
                roleStore.getRoles()
              }
          dispatch(updateRole())
            .unwrap()
            .then((response) => {
              if (response) {
                setIsModalOpen(false)
                dispatch(getRoles())
              }
            })
        }
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo)
      })
  }

const onSearch = (value) => {
  roleStore.getRoles(value)
}

onMounted(() => {
  roleStore.getRoles()
})
</script>

<style lang="scss" scoped></style>
