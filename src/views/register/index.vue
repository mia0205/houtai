<template>
  <div id="re">
    <div class="container">
      <div class="title">
        <p>后台管理系统</p>
      </div>
 <el-form :model="form" :rules="rulesObj" ref="form">
  <el-form-item prop="username">
    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item  prop="repassword">
    <el-input type="password" placeholder="请再次输入密码" v-model="form.repassword"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="registerFn">注册</el-button>
    <el-link type="info" @click="goLogin">去登录</el-link>

  </el-form-item>
</el-form>

    </div>

  </div>
</template>

<script>
// 引入方法
import { registerAPI } from '@/api'

export default {
  name: 'my-register',
  data () {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
      },
      rulesObj: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
          // 正则长度{1,10}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' }

        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码不匹配', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registerFn () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 如果注册失败
          // elementui 在vue原型上添加了弹窗提示，￥message
          if (res.code !== 0) {
            return this.$message.error(res.message)
          }
          this.$message.success('用户注册成功')
          this.$router.push('/login')
        } else {
          return false
        }
      })
    },
    goLogin () {
      this.$router.push('/login')
    }
  }

}
</script>

<style scoped lang="less">
#re{
  width: 100%;
  height: 100vh;
  background: url(../../assets/images/c3.jpg) center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size:cover;

}
.container{
  width: 40%;
  height: 60%;
  background-color: #fff;
  border: 1px solid #585858;
  display: flex;
  flex-direction: column;

  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
}
.title{
  text-align: center;
  color:rgb(72, 166, 228);
  height: 60px;
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
}
.el-input{
  margin-bottom: 30px;

}

.el-button{
 background-color:rgb(80, 105, 218);
 color:#fff;
 width:100%;
 margin-bottom: 30px;
}
.lo{
  margin-bottom:30px;
  color:#858585;
}
.el-form{
  width:65%;
}

</style>
