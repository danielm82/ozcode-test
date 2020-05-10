import Vue from 'vue'
import VueRouter from 'vue-router'
import Fibonaccier from '../components/Fibonaccier.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Fibonaccier',
    component: Fibonaccier
  },
  {
    path: '/fib/:index',
    name: 'fibIndex',
    component: Fibonaccier 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
