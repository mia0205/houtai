<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文章分类</span>
    <el-button style="float: right; padding: 6px 8px;" type="primary" @click="addCateFn">添加分类</el-button>
  </div>
  <div class="text item">
    <el-table
    style="width: 100%"
    border stripe
    :data="cateList"
    >
      <el-table-column label="序号" width="180" prop="id"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="alias"></el-table-column>
      <el-table-column label="操作" width="180">
        <el-button type="primary" size="mini">修改</el-button>
        <el-button type="primary" size="mini">删除</el-button>
      </el-table-column>
    </el-table>

  </div>
  <!-- 添加文字分类 -->
  <el-dialog
  title="添加文章分类"
  :visible.sync="addVisible"
  width="35%"
  @close="dialogCloseFn"
  >

    <el-form :model="ruleForm" ref="addForm" label-width="100px" class="demo-ruleForm" :rule="rules">
  <el-form-item label="分类名称" prop="name">
    <el-input  v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="分类别名" prop="nickname">
    <el-input v-model="ruleForm.nickname"></el-input>
  </el-form-item>

  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="addVisible = false">取 消</el-button>
    <el-button type="primary" @click="addVisible = false">确 定</el-button>
  </span>
</el-dialog>
</el-card>
</template>

<script>
import { getArtCateAPI } from '@/api'

export default {
  data () {
    return {
      cateList: [],
      addVisible: false,
      ruleForm: {
        name: '',
        nickname: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async getArtCateFn () {
      const res = await getArtCateAPI()

      this.cateList = res.data.data
    },
    addCateFn () {
      this.addVisible = true
    },
    dialogCloseFn () {
      // this.ruleForm.name = ''
      // this.ruleForm.nickname = ''
      this.$refs.addForm.resetFields()
    }

  },
  created () {
    this.getArtCateFn()
  }

}
</script>

<style scoped lang="less">
.content{
  margin-left:5px;
}

</style>
