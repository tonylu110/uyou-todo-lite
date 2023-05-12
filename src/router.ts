import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/Home')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./pages/Settings')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('./pages/Account')
  },
  {
    path: '/lang',
    name: 'lang',
    component: () => import('./pages/Settings/Lang')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router