import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HistoryView from '../views/HistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) => {
        const client = inject('storeClient')
        if (client.isUserLogged) to({ name: 'home' })
      }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const client = inject('storeClient')
  if (to.name !== 'login' && !client.isUserLogged) {
    next({ name: 'login' })
  }
  else {
    next()
  }
})

export default router
