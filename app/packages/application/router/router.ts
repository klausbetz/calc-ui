import { createRouter, createWebHashHistory } from 'vue-router'
import routes, { registerRouterMethods } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
registerRouterMethods(router)

export default router
