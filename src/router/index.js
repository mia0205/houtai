import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),

    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/userInfo.vue')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/userImage.vue')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/userPwd.vue')
      }

    ]
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

// 全局前置路由守卫
// 当路由跳转的时候，获取用户的信息
router.beforeEach((to, from, next) => {
  // 写个判断
  const token = store.state.token
  const whiteList = ['/login', '/reg']
  // 未登录
  if (token) {
    if (!store.state.userInfo.username) {
      store.dispatch('initUserInfo').then(() => {
        next()
      }).catch(err => {
        console.log(err)
      })
    // 放行
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
