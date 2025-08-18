<template>
  <div>
    <div class="container-fluid">
      <el-row :gutter="10">
        <el-col :sm="6" :xs="12">
          <div class="grid-content bg-purple">
            <em>123</em>
            <span>篇</span>
            <b>总文章数</b>
          </div>
        </el-col>
        <el-col :sm="6" :xs="12">
          <div class="grid-content bg-purple">
          <em>123</em>
            <span>篇</span>
            <b>日新增文章数</b>
         </div>
        </el-col>
        <el-col :sm="6" :xs="12"><div class="grid-content bg-purple">
          <em>123</em>
            <span>篇</span>
            <b>评论总数</b>
        </div></el-col>
        <el-col :sm="6" :xs="12"><div class="grid-content bg-purple">
          <em>123</em>
            <span>篇</span>
            <b>日新增评论数</b>
        </div></el-col>
      </el-row>

    </div>
    <div class="container-fluid">
      <el-row :gutter="10">
        <el-col :sm="16" :xs="16">
          <div class="graph_pannel1" id="curve_show">
            1
          </div>
        </el-col>
        <el-col :sm="8" :xs="8">
          <div class="graph_pannel2" id="pie_show">
            2
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="container-fluid">
      <div class="graph_pannel" id="column_show"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-page'
}

</script>

<style scoped lang="less">

.container-fluid{
  width: 100%;
  height: 270px;
  border:1px solid #c9c8c8;
  margin-bottom:20px;
  background-color: #fff;

}
.el-row{
  margin-bottom:20px;

}
.grid-content{
  margin-bottom:10px;
  border:1px solid #c9c8c8;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;

  b{
    background-color: #c9c7c7;
    margin-top: 205.5px;
    margin-bottom: 0;
    width:220px;
    text-align: center;
  }

}
.graph_pannel1{
  width: 550px;
  border:1px solid #c9c8c8;
  height:270px;

}
.graph_pannel2{
  border:1px solid #c9c8c8;
   height:270px;

}

</style>
