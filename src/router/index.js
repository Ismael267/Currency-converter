import { createRouter, createWebHistory } from 'vue-router'
import home from "../views/public/Home.vue"
import NotFound from "../views/public/NotFound.vue"
import liste from "../views/public/Liste.vue"
import layout from "../views/public/layout.vue"
import calcul from "../views/public/Calcul.vue"
import ajouterPair from "../views/admin/AjouterPair.vue"
import listePair from "../views/admin/ListePair.vue"
import editerPair from "../views/admin/EditerPair.vue"
import adminLayout from "../views/admin/AdminLayout.vue"
import register from"../views/auth/Register.vue"
import login from"../views/auth/Login.vue"
import { authGuard } from '../_helpers/auth-guard'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path: '/',
      name: 'layout',
      component: layout,
      children:[
       
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
          path: '/calcul',
          name: 'calcul',
          component: calcul
        },
      ],
      
    },
    {
      path: '/admin',
      name: 'adminLayout',
      beforeEnter: authGuard,
      component:adminLayout,
      children:[
        {
          path: '/ajouterPair',
          name: 'ajouterPair',
          component: ajouterPair},

        {
          path: '/editerPair',
          name: 'editerPair',
          component: editerPair
        },
        {
          path: '/listePair',
          name: 'listePair',
          component: listePair
        },
      
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login,
      
    },
    {
      path:'/register',
      name:'register',
      component:register,
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
router.beforeEach((to,from,next)=>{
  if (to.matched[0].name=='admin') {
    authGuard()
  }
  next()
})

export default router
