import '@material-design-icons/font'
import App from '@calculator/application/App.vue'
import router from '@calculator/application/router/router'
import { uiComponents } from '@calculator/ui/plugin/plugin'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import { QueryClient } from 'vue-query'
// eslint-disable-next-line boundaries/no-unknown
import './index.css'

const pinia = createPinia()
const app = createApp(App, { queryClient: new QueryClient({}) })

app.use(router)
   .use(pinia)
   .use(uiComponents)

app.mount('#mounting-point')
