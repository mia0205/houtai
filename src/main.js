import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/global.less'
import '@/elementui/index'
// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 引入时间格式化的包
import dayjs from 'dayjs'

// 引入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.prototype.$formatDate = (dateobj) => {
  return dayjs(dateobj).format('YYYY-MM-DD HH:mm:ss')
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
