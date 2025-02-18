import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './axios'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.config.globalProperties.$axios = api

app.use(router)
app.use(store)
app.use(Toast)
app.mount('#app')
