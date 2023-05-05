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
    component: () => import('./pages/Setting')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router