<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文章列表</span>

  </div>
  <div class="text item">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
      <el-form-item label="文章分类" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择文章分类">
      <el-option :label="item.cate_name" :value="item.cate_id" v-for="(item,index) in cateList" :key="index"></el-option>

    </el-select>
       </el-form-item>
       <el-form-item label="发布状态" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
       </el-form-item>
       <el-form-item>
         <el-button type="primary">筛选</el-button>
         <el-button type="info">重置</el-button>

       </el-form-item>
      <el-dialog
        title="发表文章"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :fullscreen="true"
        >

        <el-form :model="putForm" ref="putFormRef" :rules="pubFormRules" class="fo">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="putForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select v-model="putForm.cate_id" placeholder="请选择分类">
              <el-option :label="item.cate_name" :value="item.cate_id" v-for="(item,index) in cateList" :key="index"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="文章内容" prop="content" class="cont">
            <quill-editor v-model="putForm.editorContent"></quill-editor>
          </el-form-item>
        </el-form>

      </el-dialog>
       <el-button type="primary" class="elast" @click="publishArtFn">发表文章</el-button>

    </el-form>

  </div>
</el-card>

</template>

<script>
import { getCateListAPI } from '@/api'
export default {
  data () {
    return {
      cateList: [],
      ruleForm: {
        region: ''

      },
      rules: {
        region: {}

      },
      dialogVisible: false,
      putForm: {
        title: '',
        cate_id: '',
        editorContent: ''
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'blur' }

        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }

        ]

      }

    }
  },
  methods: {
    publishArtFn () {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // 调用就会关闭对话框 done
          done()
        })
        .catch(_ => {})
    },
    // 获取分类列表
    async initCateList () {
      const res = await getCateListAPI()

      this.cateList = res.data.data
    }
  },
  created () {
    this.initCateList()
  }

}
</script>

<style scoped lang="less">
.fo{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cont{
    width: 100%;
  }
}

</style>
