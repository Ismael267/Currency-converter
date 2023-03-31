import { createRouter, createWebHistory } from 'vue-router'
import home from "../views/public/Home.vue"
import NotFound from "../views/public/NotFound.vue"
import liste from "../views/public/Liste.vue"
import layout from "../views/public/layout.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/liste',
      name: 'liste',
      component: liste
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
   {
    path:'/:pathmatch(.*)*',
    redirect:'/404'
   }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
