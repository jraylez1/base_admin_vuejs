import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import { piniaPlugin } from '~/plugins/piniaPlugin'
import { i18n } from '~/plugins/i18nPlugin'

import 'ant-design-vue/dist/reset.css'
import './assets/css/tailwind.css'
import './assets/css/main.css'

createApp(App).use(router).use(Antd).use(i18n).use(piniaPlugin).mount('#app')
