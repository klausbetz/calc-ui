import { ROUTE, ROUTE_NAME } from '@calculator/common/config/route'
import { Router, RouteRecordRaw } from 'vue-router'
import NotFoundPage from '../components/404.vue'

const routes: RouteRecordRaw[] = [
  {
    path: ROUTE.HOME,
    name: ROUTE_NAME.HOME,
    component: () => Promise.resolve(import('@calculator/home/home.vue'))
  },
  {
    path: ROUTE.SETTINGS,
    name: ROUTE_NAME.SETTINGS,
    component: () => Promise.resolve(import('@calculator/settings/settings.vue'))
  },
  {
    path: '/:pathMath(.*)*',
    component: NotFoundPage
  }
]

// all routes which are called with additional params or query information should be placed inside here
function registerRouterMethods(router: Router) {
  router.pushSettings = function () {
    return router.push({ name: ROUTE_NAME.SETTINGS })
  }
  router.resolveSettings = function () {
    return router.resolve({ name: ROUTE_NAME.SETTINGS })
  }
  router.pushHome = function () {
    return router.push({ name: ROUTE_NAME.HOME })
  }
  router.resolveHome = function () {
    return router.resolve({ name: ROUTE_NAME.HOME })
  }
  router.replaceHome = function () {
    return router.replace({ name: ROUTE_NAME.HOME })
  }
}

export default routes
export {
  registerRouterMethods
}
