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
// 添加文章分类
export const addArtCateAPI = ({ name, nickname }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name: name,
      cate_alias: nickname
    }
  })
}
// 更新分类
export const updateArtCateAPI = ({ id, name, nickname }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name: name,
      cate_alias: nickname
    }
  })
}
// 删除分类
export const deleteArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}
// 获取分类列表
export const getCateListAPI = () => {
  return request({
    url: '/my/cate/list'

  })
}
// 发布文章
export const subArtAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd
  })
}
// formData表单数据对象
// 获取文章列表
export const getArticleListAPI = ({ pagenum, pagesize, cateid, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id: cateid,
      state
    }
  })
}
