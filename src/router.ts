import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/Home'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./pages/Settings'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('./pages/Settings/Account'),
  },
  {
    path: '/lang',
    name: 'lang',
    component: () => import('./pages/Settings/Lang'),
  },
  {
    path: '/update',
    name: 'update',
    component: () => import('./pages/Settings/Update'),
  },
  {
    path: '/exmode',
    name: 'exmode',
    component: () => import('./pages/Settings/ExMode'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
