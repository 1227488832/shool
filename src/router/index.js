import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    // path: '/pageone',
    path: '/pageone',
    name: 'pageone',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pageone.vue')
  },
  {
    path: '/pagetwo',
    name: 'pagetwo',
    component: () => import( '../views/Pagetwo.vue')
  },
  {
    path: '/pagethree',
    name: 'pagethree',
    component: () => import( '../views/Pagethree.vue')
  },
  {
    path: '/pagefour',
    name: 'pagefour',
    component: () => import( '../views/Pagefour.vue')
  },
  {
    path: '/pagefive',
    name: 'pagefive',
    component: () => import( '../views/Pagefive.vue')
  },
  {
    path: '/updatagame',
    name: 'updatagame',
    component: () => import( '../components/Pagefive/updatagame.vue')
  },
  {
    path: '/fourupdata',
    name: 'fourupdata',
    component: () => import( '../components/Pagefour/fourupdata.vue')
  },
  {
    path: '/fourpm',
    name: 'fourpm',
    component: () => import( '../components/Pagefour/fourpm.vue')
  },
  {
    path: '/twoupdata',
    name: 'twoupdata',
    component: () => import( '../components/Pagetwo/twoupdata.vue')
  },
 
 
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
