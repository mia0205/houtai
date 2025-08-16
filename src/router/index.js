import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/reg',
    component: () => import('@/views/register')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue')
  }
]
// 路由懒加载就是页面路由路径切换到reg,才去加载对应的组件代码，让首页加载文件体积更新，打开更快
const router = new VueRouter({
  routes
})

export default router
