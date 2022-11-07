import { createRouter, createWebHistory } from 'vue-router'
import routes, { registerRouterMethods } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})
registerRouterMethods(router)

export default router
