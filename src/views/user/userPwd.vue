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
      ref="ruleForm"
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
          <el-button type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

     </div>
  </el-card>
</template>

<script>
export default {
  data () {
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
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是非空字符', trigger: 'blur' }
        ]

      }

    }
  },
  methods: {
    submitForm () {

    },
    resetForm () {

    }
  }

}
</script>

<style scoped lang="less">
.el-input{
  width: 38%;

}
</style>
