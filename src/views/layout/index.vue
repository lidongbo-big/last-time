<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :is-collapse='isCollapse'></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
          <div>
              <i :class="{'el-icon-s-fold': isCollapse, 'el-icon-s-unfold': !isCollapse}" @click="isCollapse = !isCollapse"></i>
              <span class="heima">黑马头条</span>
          </div>
          <el-dropdown>
            <el-button class="more">
              <img :src="user.photo" alt="">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item> <i class="el-icon-setting"></i> 个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut"> <i class="el-icon-lock"></i> 退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
    globalBus.$on('update-user', data => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    loginOut () {
      this.$confirm('确认退出码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
.aside {
    background-color: skyblue;
    .aside-menu {
        height: 100%;
    }
}
.header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.main {
    border-top: 1px solid #ccc;
}
.more {
    border: 0px none;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
.head-i {
    font-size: 24px;
    vertical-align: middle;
}
.heima {
    line-height: 34px;
    margin-left: 4px;
}
</style>
