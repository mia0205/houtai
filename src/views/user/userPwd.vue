<template>
  <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span>卡片名称</span>
     </div>
     <div class="text item">
      <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="pwdruleForm"
      label-width="100px"
      class="demo-ruleForm">
        <el-form-item label="原密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

     </div>
  </el-card>
</template>

<script>
import { updatePwdAPI } from '@/api'

export default {
  data () {
    const samePwd = (rules, value, callback) => {
      if (this.ruleForm.pass === value) {
        callback(new Error('新旧密码不能相同'))
      } else {
        callback()
      }
    }
    const rePwd = (rules, value, callback) => {
      if (value !== this.ruleForm.checkPass) {
        callback(new Error('两次新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        newPass: ''

      },
      rules: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' }

        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' },
          // 加校验规则
          { validator: samePwd, trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]

      }

    }
  },
  methods: {
    updatePwdFn () {
      this.$refs.pwdruleForm.validate(async valid => {
        if (!valid) {
          return false
        }
        const res = await updatePwdAPI(this.ruleForm)
        console.log(res)
        if (res.data.code !== 0) {
          return this.$message.error(res.data.message)
        } else {
          this.$message.success(res.data.message)
          this.$refs.pwdruleForm.resetFields()
          // 重置密码,清空vuex
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          this.$router.push('/login')
        }
      })
    },
    resetForm () {
      this.$refs.pwdruleForm.resetFields()
    }
  }

}
</script>

<style scoped lang="less">
.el-input{
  width: 38%;

}
</style>
