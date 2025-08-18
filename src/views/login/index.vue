<template>
  <div id="log">
    <div class="container">
      <div class="title">
        <p>后台管理系统</p>
      </div>
    <el-form :rules="rulesObj" ref="loginform" :model="loginform">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="loginform.username"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
       <el-input type="password" placeholder="请输入密码" v-model="loginform.password"></el-input>
      </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="loginFn">登录</el-button>
    <el-link type="info" @click="goRegister">去注册</el-link>

  </el-form-item>
</el-form>

    </div>

  </div>
</template>

<script>
import { loginAPI } from '@/api'
export default {
  name: 'my-login',
  data () {
    return {
      loginform: {
        username: '',
        password: ''
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

        ]
      }

    }
  },
  methods: {
    loginFn () {
      // 校验
      this.$refs.loginform.validate(async valid => {
        if (valid) {
          const { data: logres } = await loginAPI(this.loginform)
          console.log(logres)
          if (logres.code !== 0) {
            return this.$message.error(logres.message)
          }
          this.$message.success('登录成功')
          // 保存到vuex里
          this.$store.commit('updateToken', logres.token)
          // 跳转
          this.$router.push('/layout')
        } else {
          return false
        }
      })
    },
    goRegister () {
      this.$router.push('/reg')
    }
  }
}

</script>

<style scoped lang="less">
#log{
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
