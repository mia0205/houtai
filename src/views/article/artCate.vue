<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>文章分类</span>
    <el-button style="float: right; padding: 6px 8px;" type="primary">添加分类</el-button>
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
</el-card>
</template>

<script>
import { getArtCateAPI } from '@/api'

export default {
  data () {
    return {
      cateList: []

    }
  },
  methods: {
    async getArtCateFn () {
      const res = await getArtCateAPI()

      this.cateList = res.data.data
    }
  },
  created () {
    this.getArtCateFn()
  }

}
</script>

<style scoped lang="less"></style>
