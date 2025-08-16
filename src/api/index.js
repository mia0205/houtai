// 发请求的文件
import request from '../utils/request'
import store from '@/store'

// 封装一个函数,调用url地址

export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
// 没有default 不需要大括号
// 登录接口
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
// 获取用户信息
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',
    headers: {
      Authorization: store.state.token
      // 不能用this
    }
  })
}
