import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('../views/carousel-demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
