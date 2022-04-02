<template>
  <el-container>
  <el-header>
    <div class="imgdiv"><img src="../assets/logo.png" alt=""></div>
    <div class="right">
      <span class="help">
        <i aria-hidden="true" class="fa fa-exclamation-circle"></i>
        帮助
      </span>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
            <img src="../assets/user2-160x160.jpg" class="user-avatar">
            Jay.Liu
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided>
                <span style="display:block;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
                    <span style="display:block;">退出</span>
                </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px" style="background-color: #fff">
      <el-menu unique-opened :collapse="isCollapse"
      :collapse-transition="false" router :default-active="activepath">
        <!-- 一级菜单 -->
        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
          <template slot="title">
            <i class="el-icon-magic-stick"></i>
            <span>{{item.name}}</span>
          </template>
          <!--二级菜单-->
          <el-menu-item :index="sub.path" v-for="sub in item.children" :key="sub.id" @click="save(sub.path)">
            <template slot="title">
            <i class="fa fa-child"></i>
            <span>{{sub.name}}</span>
          </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      menulist:[],
      isCollapse:false,
      activepath:''
    }
  },
  created(){
    this.getMenuList()
  },
  methods:{
    async getMenuList(){
      const{data:res}=await this.$http.get('menu')
      console.log(res);
      if(res.flag == true){
        this.menulist=res.data
      }else{
        this.$message.error('请求错误')
      }
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse
    },
    save(activepath){
      window.sessionStorage.setItem('activepath',activepath)
      this.activepath=activepath
    }
  }
}
</script>

<style lang="less" scoped>
  .el-dropdown{
    color: #fff;
  }
  .imgdiv{
    padding: 10px 0 0 5px;
    float: left;
  }
  .help {
      padding: 0 10px;
  }
  .right {
    float: right;
    // padding: 18px 30px 0 0;
    color: #fff;
  }
  .i {
    font-style: italic;
  }
  .avatar-wrapper img {
    // color: #000;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    vertical-align: middle;
}
  .el-header {
    background: linear-gradient(to right, #0abdfe, #67f0e0);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    // line-height: 160px;
  }
  .el-container{
    height: 100%;
  }
</style>