import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { tooltip } from '@ionited/tooltip-vue'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.directive('tooltip', tooltip)
app.use(ToastPlugin, { position: 'top' })
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
