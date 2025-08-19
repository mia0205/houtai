// 发请求的文件
import request from '../utils/request'

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
    url: '/my/userinfo'
    // headers: {
    //   Authorization: store.state.token
    //   // 不能用this
    // }
  })
}
// 获取侧边栏数据
export const getNavAPI = () => {
  return request({
    url: '/my/menus'
    // headers: {
    //   Authorization: store.state.token
    // }
  })
}

// 提交修改用户信息
export const updateUserInfoAPI = ({ id, username, nickname, email, userpic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      email,
      user_pic: userpic
    }

  })
}
// 更新头像
export const updateUserAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

// 更新密码
export const updatePwdAPI = ({ pass, checkPass, newPass }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd: pass,
      new_pwd: checkPass,
      re_pwd: newPass
    }
  })
}
// 获取文章分类
export const getArtCateAPI = () => {
  return request({
    url: '/my/cate/list'

  })
}
