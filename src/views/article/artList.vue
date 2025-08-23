<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文章列表</span>

  </div>
  <div class="text item">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
      <el-form-item label="文章分类" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择文章分类">
      <el-option :label="item.cate_name" :value="item.id" v-for="item in cateList" :key="item.id"></el-option>

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
          <el-form-item label="文章分类" prop="cateid">
            <el-select v-model="putForm.cateid" placeholder="请选择分类">
              <el-option :label="item.cate_name" :value="item.id" v-for="item in cateList" :key="item.id"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="文章内容" prop="editorContent" class="cont">
            <quill-editor v-model="putForm.editorContent" @change="contentChangeFn"></quill-editor>
          </el-form-item>
          <el-form-item label="文章封面" prop="coverimg">
            <img src="" alt="" class="cover-img" ref="imgRef" v-if="putForm.coverimg === '' ">
            <img :src="putForm.coverimg" alt=""  class="cover-img" v-else>

            <br>
            <input type="file" style="display: none;" accept="image/*" ref="iptFileRef" @change="changeCover">
            <el-button @click="checkFn">+选择封面</el-button>
          </el-form-item>
          <el-form-item label="文章状态">
            <el-button type="info" @click="publicFn">保存</el-button>
            <el-button type="primary" @click="publicFn">发表</el-button>
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
        cateid: '',
        editorContent: '',
        coverimg: '',
        state: ''
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
        ],
        cateid: [
          { required: true, message: '请选择文章标题', trigger: 'change' }

        ],
        editorContent: [
          { required: true, message: '请输入文章内容', trigger: 'change' }

        ],
        coverimg: [
          { required: true, message: '请输入文章封面', trigger: 'change' }

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
    checkFn () {
      this.$refs.iptFileRef.click()
    },
    changeCover (e) {
      // e.target拿到触发事件的标签
      const files = e.target.files
      if (files.length === 0) {
        this.putForm.coverimg = ''
        this.$refs.putFormRef.validateField('coverimg')
      } else {
        const f = new FileReader()
        f.readAsDataURL(files[0])
        f.onload = e => {
          this.putForm.coverimg = e.target.result
          this.$nextTick(() => {
            this.$refs.putFormRef.validateField('coverimg')
          })
        }
      }
    },
    // 获取分类列表
    async initCateList () {
      const res = await getCateListAPI()
      console.log('res1', res)

      this.cateList = res.data.data
    },

    // 发表或者保存文章
    publicFn (str) {
      this.putForm.state = str
      // 兜底校验
      this.$refs.putFormRef.validate(async valid => {
        if (valid) {
          console.log(this.pubForm)
        } else {
          return false
        }
      })
    },
    // 富文本编辑器
    contentChangeFn () {
      this.$refs.putFormRef.validateField('editorContent')
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
::v-deep .ql-editor{
  min-height:300px;
}
.cover-img{
  width: 400px;
  height: 280px;
  object-fit: cover;
}

</style>
