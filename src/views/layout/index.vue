<template>
  <el-container class="main-container">
  <el-header>
    <!-- 左侧图片 -->
     <div class="ht">
      <img src="../../assets/images/c1.jpg" alt="" class="img1">
      <span class="ht1">后台管理系统</span>
     </div>
     <!-- 右侧菜单 -->
  <el-menu
      background-color="#23262E"
      text-color="#fff"
      mode="horizontal"
      active-text-color="#409EFF"
  >
  <el-submenu index="1" class="index1">
    <template slot="title">
      <!-- 头像 -->
       <img src="../../assets/images/c2.jpg" alt="" class="img2">
       <span>个人中心</span>
    </template>
    <el-menu-item index="1-1">基本资料</el-menu-item>
    <el-menu-item index="1-2">更改头像</el-menu-item>
    <el-menu-item index="1-3">重置密码</el-menu-item>
  </el-submenu>
  <el-menu-item index="2">退出</el-menu-item>

  </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'layout-index'

}
</script>

<style scoped lang="less">
.ht{
  margin-left:20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .img1{
    width: 40px;
    height: 40px;
    margin-left:10px;
    margin-top:6px;

  }
  .ht1{
    color:#fff;
    font-size:20px;
    margin-left:10px;

  }
  .img2{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    margin-right:10px;
    object-fit: cover;

  }
.main-container{
  width: 100%;
  height: 100vh;
}

.el-header {
    background-color: #23262E;
    padding: 0;
    display: flex;
    justify-content: space-between;

  }
.el-aside{
  background-color: #23262E;
  color:#fff;
}
  .el-main {
    background-color: #F2F2F2;
    overflow-y: scroll;
    height: 0;
  }
  .el-footer{
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

  }

</style>
