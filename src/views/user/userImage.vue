<template>
<div>
  <el-card class="box-card">
       <div slot="header" class="clearfix">
         <span>更换头像</span>

       </div>
       <div class="text item">
        <img v-if="avatar === '' " src="" alt="">
        <img v-else :src="avatar" alt="">
        <div class="btn">
          <input type="file" accept="images/*" style="display: none;" @change="onFileChange" ref="iptRef">
          <el-button type="primary" @click="chooseImg">
          <i class="el-icon-plus">选择图片</i>
        </el-button>
        <el-button type="success" @click="uploadFn">
          <i class="el-icon-cloudy">上传头像</i>
        </el-button>
        </div>

       </div>

    </el-card>

</div>

</template>

<script>
import { updateUserAvatarAPI } from '@/api'

// @change="onFileChange"
export default {
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    chooseImg () {
      this.$refs.iptRef.click()
    },
    // 选择图片确定,获取用户选择的图片
    onFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.avatar = ''
      } else {
        // 默认只能选一个
        // console.log(files[0])
        // 文件转内存临时地址
        // URL.createObjectURL(文件)
        // 把文件转成base64文件，可以发给后台,new FileReader().readAsDataURL(FILES[0]).onload=>e=>e.target.result
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        // onload等待把文件读成base64字符串后会触发onload事件函数
        fr.onload = e => {
          this.avatar = e.target.result
        }
      }
    },
    // 上传头像
    async uploadFn () {
      const res = await updateUserAvatarAPI(this.avatar)
      console.log(res)
      if (res.data.code !== 0) {
        return this.$message.error(res.data.message)
      } else {
        this.$message.success(res.data.message)
        this.$store.dispatch('initUserInfo')
      }
    }
  }

}
</script>

<style scoped lang="less">
.box-card{
  height: 70%;
}
.text{
  height: 400px;
  img{
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
}

.btn{
  margin-bottom:10px;
}

</style>
