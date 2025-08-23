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
        @close="dialogClose"
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
            <el-button type="info" @click="publicFn('草稿')">保存</el-button>
            <el-button type="primary" @click="publicFn('已发布')">发表</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
       <el-button type="primary" class="elast" @click="publishArtFn">发表文章</el-button>

    </el-form>

  </div>
  <!-- 文章表格 -->
   <el-table :data="artList" border stripe>
     <el-table-column label="标题" prop="title"></el-table-column>
     <el-table-column label="分类" prop="cate_name"></el-table-column>
     <el-table-column label="时间" prop="pub_date">
      <template v-slot="scope">
        <!-- 自定义插槽收集到变量和值 -->
        <span>{{ $formatDate(scope.row.pub_date) }}</span>
      </template>
     </el-table-column>
     <el-table-column label="状态" prop="state"></el-table-column>
     <el-table-column label="操作"></el-table-column>
   </el-table>
   <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="q.pagenum"
      :page-sizes='[2,3,5,10]'
      :page-size.sync="q.pagesize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
</el-card>

</template>

<script>
import { getArticleListAPI, getCateListAPI, subArtAPI } from '@/api'
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
      //  查询参数对象
      q: {
        pagenum: 1, // 那第一页数据
        pagesize: 2, // 当前页需要几条数据
        cate_id: '',
        state: ''
      },
      // 保存文章列表
      artList: [],
      total: 0,
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

        ],
        catedate: [
          { required: true, message: '请输入更新日期', trigger: 'blur' }

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
        this.putForm.coverfile = null

        this.$refs.putFormRef.validateField('coverimg')
      } else {
        const f = new FileReader()
        f.readAsDataURL(files[0])
        this.putForm.coverfile = files[0]

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

      this.cateList = res.data.data
    },

    // 发表或者保存文章
    publicFn (str) {
      this.putForm.state = str
      // 兜底校验
      this.$refs.putFormRef.validate(async valid => {
        if (valid) {
          const fd = new FormData()
          // append('参数名',值)
          fd.append('title', this.putForm.title)
          fd.append('cate_id', this.putForm.cateid)
          fd.append('content', this.putForm.editorContent)

          fd.append('cover_img', this.putForm.coverfile)

          fd.append('state', this.putForm.state)
          console.log('put', this.putForm)
          const res = await subArtAPI(fd)
          if (res.data.code !== 0) return this.$message.error(res.data.message)
          this.$message.success(res.data.message)
          // 关闭对话框
          this.dialogVisible = false
          // 再次请求文章列表
          this.getArticleListFn()
        } else {
          return false
        }
      })
    },
    // 富文本编辑器
    contentChangeFn () {
      this.$refs.putFormRef.validateField('editorContent')
    },
    dialogClose () {
    // 清空数据
      this.$refs.putFormRef.resetFields()
      this.putForm.coverfile = null
      this.putForm.coverimg = ''
    },
    async getArticleListFn () {
      const res = await getArticleListAPI(this.q)

      this.artList = res.data.data
      this.total = res.data.data.total
    },
    handleSizeChange (val) {
      this.q.pagesize = val
      this.getArticleListFn()
    },
    handleCurrentChange (val) {
      this.q.pagenum = val
      this.getArticleListFn()
    }

  },
  created () {
    this.initCateList()
    this.getArticleListFn()
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
