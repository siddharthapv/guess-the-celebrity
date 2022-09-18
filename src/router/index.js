import Vue from 'vue'
import VueRouter from 'vue-router'
import CelebrityBox from '../views/CelebrityBox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CelebrityBox',
    component: CelebrityBox
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
