// 发请求的文件
import request from '../utils/request'

// 封装一个函数,调用url地址

export const registerAPI = () => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username: 'lidongx',
      password: '111111',
      repassword: '111111'
    }
  })
}
// 没有default 不需要大括号
