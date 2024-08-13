import './assets/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import router from './router'
const app = createApp(App).use(autoAnimatePlugin)

app.use(createPinia())
app.use(router)

app.mount('#app')
