import axios from 'axios'
import store from '@/store'

const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})

// 请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在请求前会触发一次,config是配置对象，请求后台的参数都在这个对象里，返回给axios源码,根据配置项发请求
    // api每次调用request都会先走请求拦截器
    // 判断，登录和注册页面，无token
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }

    return config
  },
  function (error) {
    // 请求发起前，如果有异常，会进入这里,返回promise对象
    // return promise对象，这个状态会返回给下一个promise 对象，return 非promise 对象。会作为成功 的结果返回给下一个promise对象（axios)
    // 留在原地
    // reject原地留下一个新的promise对象（状态为失败） return new Promise((resolve,reject)=>{reject(error)})
    return Promise.reject(error)
  }
)

export default myAxios
