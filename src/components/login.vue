<template>
  <div class="login-container">
    <div class="loginBox">    
    <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="LoginFormRules">
        <!---用户名-->
        <el-form-item prop="username">
            <el-input prefix-icon="fa fa-home fa-fw" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
            <el-input prefix-icon="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-button  type="success" @click="login">登录</el-button>
        <el-button  type="info" @click="resetLoginForm">重置</el-button>
    </el-form>

      <!-- <form method="post" class="login-form" label-position="left">
          <div class="title-container">
            <div class="logoInfo clearfix">
              <em class="logo"></em>
            </div>
          </div>
          <div>
            <span class="svg-container svg-container_login">
              <span class="user"></span>
            </span>
            <input type="text" name="username" placeholder="请输入用户名" />
          </div>
          <div>
            <span class="svg-container">
              <span class="username"></span>
            </span>
            <input type="password" name="password" placeholder="请输入密码"/>
          </div>
          <input type="submit" style="width:100%;margin-bottom:30px;" value="登录">
      </form> -->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data(){
    return{
      LoginFormRules:{
        username:[{required:true,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"长度在3到10个字符之间",trigger:"blur"}],
        password:[{required:true,message:"请输入密码",trigger:"blur"},{min:6,max:10,message:"长度在6到10个字符之间",trigger:"blur"}],
      },
      loginForm:{
        username:'测试角色1',
        password:'123456',
      },
    }
  },
  methods:{
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate(async valid=>{
        if(!valid) return
        const{data:res}=await this.$http.post('login?'+qs.stringify(this.loginForm))
        console.log(this.loginForm);
        console.log(res);
        if(res.flag == true){
          window.sessionStorage.setItem("token",res.data.token);
          this.$router.push("/main")
        }

      })
    },
  }
}
</script>

<style lang="less" scoped>
    .btns{
    display: flex;
    justify-content: flex-end; 
    }
.login-container .input{
  display: inline-block;
    height: 47px;
    width: 85%;
  
}
.login-container .input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 0;
  height: 47px;
}
.login-container .el-form-item {
  border: 1px solid #DCDFE6;
  background: #fff;
  border-radius: 5px;
  color: #454545;
}
.login-container .el-button--medium{
  height: 50px;
  line-height: 20px;
  font-size: 22px;
}
.login-container .loginBox{
  height: 100%;
  width: 100%;
 background: url('../assets/logingBg.png') no-repeat 100% 100%;
 position: relative;
}
.login-container .loginBox .el-form-item__content{
  line-height: initial;
}
.login-container form {
  position: absolute;
  left: 20%;
  top: 50%;
  width: 520px;
  padding: 35px 35px 15px 35px;
  margin: -200px 0 0 0;
  background:#f5f5f5;
}
.login-container .tips {
  font-size: 14px;
  /* // color: #fff; */
  margin-bottom: 10px;
  /* span {
    &:first-of-type {
      margin-right: 16px;
    }
  } */
}
.login-container .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
  /* &_login {
    font-size: 20px;
  } */
}
.login-container .title-container {
  position: relative;
  
  
}
.login-container .title-container .title {
  font-size: 26px;
  /* // font-weight: 400; */
  color: #333;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.login-container .title-container .set-language {
  /* // color: #fff; */
  position: absolute;
  top: 5px;
  right: 0px;
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  background: url('../assets/bg.jpg');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.login-container .show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
.login-container .thirdparty-button {
  position: absolute;
  right: 35px;
  bottom: 28px;
}
.logoInfo{
  padding-bottom:35px;
  text-align: center;
}
.logoInfo span{
	font-size: 22px;
	padding: 0 10px;
  display: inline-block;
  
}
.logoInfo .logo{
	background: url(../assets/loginLogo.png) no-repeat;
	display:inline-block;
	width: 200px;
	height: 30px;
  display: inline-block;
  vertical-align: middle;
}
.tipInfo{font-size: 12px;}
.tipInfo span{
  color: #66b1ff;
  padding: 0 5px;
}
.tipInfo .el-checkbox{
  margin: 0;
}
.svg-container span{
  width: 22px;
  height: 22px;
  display: inline-block;
}
.svg-container .user{
  background: url(../assets/user.png) no-repeat 0 50%;
}
.svg-container .username{
  background: url(../assets/pwd.png) no-repeat 0 50%;
}
</style>