import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useClientStore } from '@/stores/client'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

const storeClient = useClientStore()
app.provide('storeClient', storeClient)

app.use(router)

app.mount('#app')
