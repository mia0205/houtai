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
  <el-menu-item index="2" @click="logoutFn">退出</el-menu-item>

  </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <div class="userbox">
        <img :src="user_pic" alt="" v-if="user_pic">
        <img src="../../assets/images/c5.jpg" alt="" class="img5" v-else>
        <span>欢迎{{ username || nickname }}</span>
      </div>
<!-- el-menu:导航菜单,default-active:当前激活菜单index,open事件，打开sub-menu active-text-color和default-active一致就会设置动态文字 -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
      >
      <!-- route获取路由信息对象 -->
      <template v-for="item in menu">
        <el-menu-item :index="item.indexPath" v-if="!item.children" :key="item.indexPath">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>

      </el-menu-item>
      <el-submenu :index="item.indexPath" v-else :key="item.indexPath">
        <template  slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item :index="i.indexPath" v-for="(i,obj) in item.children" :key="obj">
          <i :class="i.icon"></i>
          <span>{{ i.title }}</span>
        </el-menu-item>

      </el-submenu>

      </template>

    </el-menu>

    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNavAPI } from '@/api'

export default {
  name: 'layout-index',
  data () {
    return {
      menu: []

    }
  },
  created () {
    this.getMenuListFn()
  },
  methods: {
    // 如果组件不支持这个原生事件名字。使用@时间名.native = 'methods里的方法名'
    logoutFn () {
      // 提示框,在elementui里找
      this.$confirm('您确认退出吗?', '提示', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除vuex,跳转
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        this.$router.push('/login')
      }).catch((error) => error)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    // 请求侧边栏数据函数
    async getMenuListFn () {
      const res = await getNavAPI()
      console.log(res)
      this.menu = res.data.data
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  }

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
  .userbox{
    height: 50px;
    width: 100%;
    display: flex;

    align-items: center;
    span{
      margin-left:20px;
    }
  }
  .img5{
    width: 40px;
    height: 40px;
    margin-left:10px;
    margin-top:5px;
    border-radius: 50%;

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
