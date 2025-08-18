<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>基本资料</span>

  </div>
  <!-- 表单 -->
   <el-form
   :model="userForm"
   :rules="userFormrules"
   ref="userFormRef"
   label-width="100px"
   >
  <el-form-item label="登录名称" prop="username">
    <el-input  v-model="userForm.username"></el-input>
  </el-form-item>
  <el-form-item label="用户昵称" prop="nickname">
    <el-input type="password"  v-model="userForm.nickname"></el-input>
  </el-form-item>
  <el-form-item label="用户邮箱" prop="email">
    <el-input v-model="userForm.email"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetFn">重置</el-button>
  </el-form-item>
</el-form>

</el-card>
</template>

<script>
import { updateUserInfoAPI } from '@/api'

export default {
  data () {
    return {
      userForm: {
        username: this.$store.state.userInfo.username,
        nickname: '',
        email: '',
        id: 0

      },
      userFormrules: {
        username: [{}],
        nickname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    // 提交修改的点击事件
    submitForm () {
      // ref拿到组件对象,方法校验后会传入回调，如果为true，就通过校验了
      this.$refs.userFormRef.validate(async valid => {
        if (valid) {
          this.userForm.id = this.$store.state.userInfo.id
          const res = await updateUserInfoAPI(this.userForm)
          if (res.data.code !== 0) {
            return this.$message.error(res.data.message)
          }
          this.$message.success(res.data.message)
          this.$store.dispatch('initUserInfo')
          console.log(res)
        } else {
          return false
        }
      })
    },
    resetFn () {
      // el-form有自己的方法
      this.$refs.userFormRef.resetFields()
    }
  }

}
</script>

<style scoped lang="less"></style>
