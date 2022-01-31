import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: Home
  },
  {
    path: '/lostpassword',
    name: 'Lostpassword',
    component: Home
  }, 
  {
    path: '/logged',
    name: 'Logged',
    // route level code-splitting
    // this generates a separate chunk (logged.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "logged" */ '../views/Connected.vue')
  },
  {    
    path: '/newedition',
    name: 'NewEdition',
    // route level code-splitting
    // this generates a separate chunk (newedition.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "newedition" */ '../views/NewEdition.vue')
  },
  {
    path: '/admin',
    name: 'Administration',
    // route level code-splitting
    // this generates a separate chunk (admin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "administration" */ '../views/Admin.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (profile.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/modify',
    name: 'Modify',
    // route level code-splitting
    // this generates a separate chunk (modify.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "modify" */ '../views/Modify.vue')
  },
  {    
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
