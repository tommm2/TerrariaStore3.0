import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () => import('@/views/frontend/Index.vue'),
    children: [
      {
        path: 'home',
        name: 'CustomerHome',
        component: () => import('@/views/frontend/CustomerHome.vue')
      },
      {
        path: 'customerProduct',
        name: 'CustomerProduct',
        component: () => import('@/views/frontend/CustomerProduct.vue')
      },
      {
        path: 'customerCart',
        name: 'CustomerCart',
        component: () => import('@/views/frontend/CustomerCart.vue')
      },
      {
        path: 'customerCheckout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('@/views/frontend/CustomerCheckout.vue')
      },
      {
        path: 'viewMore/:id',
        name: 'ViewMore',
        component: () => import('@/views/frontend/ViewMore.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/frontend/Login.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/views/backend/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/backend/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('@/views/backend/Coupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/backend/Order.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  { path: '*', redirect: '/home' }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
