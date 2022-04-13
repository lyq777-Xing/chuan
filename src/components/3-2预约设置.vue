/* eslint-disable vue/require-v-for-key */
<template>
  <el-card>
    <div  style="margin-bottom:15px;" class="content-header">
      <h1>预约管理<small>检查项管理</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预约管理</el-breadcrumb-item>
        <el-breadcrumb-item>预约设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="boxMain">
      <el-button class="el-link" style="margin-bottom: 20px;margin-right: 20px" type="primary" download @click="downloadTemplate()">模板下载</el-button>
      <el-upload action="http://localhost:8889/lyq/ordersetting/upload"
                name="excelFile"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload">
        <el-button type="primary">上传文件</el-button>
      </el-upload>
    </div>
    <div>
      操作说明：请点击"模板下载"按钮获取模板文件，在模板文件中录入预约设置数据后点击"上传文件"按钮上传模板文件。
    </div>
    <el-calendar v-model="value" id="calendar">
        <template
        slot="dateCell"
        slot-scope="{date, data}">
            <div>
                <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}{{ data.isSelected ? '🤢' : ''}}</div>
                    <div v-for="item in ordersettinglist" :key="item.id">
                <div v-if="item.orderDate.slice(0,10)==data.day">
                    <template v-if="item.number > item.reservations">
                        <div  class="usual">
                            <p>可预约{{item.number}}人</p>
                            <p>已预约{{item.reservations}}人</p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="fulled">
                            <p>可预约{{item.number}}人</p>
                            <p>已预约{{item.reservations}}人</p>
                            <p>已满</p>
                        </div>
                    </template>
                    <template v-if="item.orderDate"></template>
                    <template><div class="pp"><el-button  type="primary" plain class="btn2">设置</el-button></div></template>
                </div>
                </div>
            </div>
        </template>
    </el-calendar>
  </el-card>
</template>
<script>
export default {
    data(){
        return{
            value:new Date(),
            ordersettinglist:[]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        downloadTemplate(){
        const url = "/ordersetting_template.xlsx"
        window.location.href= url;
        },
        handleOrderSet(){

        },
        handleSuccess(){
            this.$message.success('上传成功') 
        },
        beforeUpload(){

        },
        async getData(){
            const {data:res}  = await this.$http.get('ordersetting/findall')
            console.log(res);
            if(res.flag == true){
                this.$message.success('查询成功')
                this.ordersettinglist = res.data
            }else{
                this.$message.error('查询失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>
  .content-header {
    position: relative;
    padding: 15px 15px 0 15px;
    /* margin-top: 70px; */
  }
  .content-header > h1 {
    margin: 0;
    font-size: 24px;
    font-weight: normal;
  }
  .content-header > h1 > small {
    font-size: 15px;
    display: inline-block;
    padding-left: 4px;
    font-weight: 300;
  }
  .content-header > .breadcrumb {
    float: right;
    background: transparent;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 12px;
    padding: 7px 5px;
    position: absolute;
    top: 20px;
    right: 10px;
    border-radius: 2px;
  }
  .h1{
    float: left;
  }
  .ordersetting .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .ordersetting {
      background: #f5f5f5;
      box-shadow: none;
      border-top: none;
  }
  .gotoday {
      border: 1px solid #d5d9df
  }
  .calendar p {
      margin: 0;
  }
  .filebtn {
      padding: 9px 20px;
      border: none;
      font-size: 18px;
      background: #0ebffc;
  }
  .month {
      width: 100%;
      line-height: 3;
      /* background: #00B8EC; */
  }

  .month ul {
      margin: 0;
      padding: 0;
      display: flex;
  }

  .year-month {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
  }

  .year-month:hover {
      background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
      padding-left: 20px;
      font-size: 1.2rem;
  }

  .choose-month {
      text-align: center;
      font-size: 1.2rem;
  }

  .arrow {
      padding: 30px;
  }

  .arrow:hover {
      background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
      color: white;
      font-size: 20px;
      text-transform: uppercase;
      letter-spacing: 3px;
  }
  .caldate {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  .weekdays {
      margin: 0;
      padding: 0;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      color: #333;
      justify-content: space-around;
      border-bottom: 1px solid #ededed;
      border-top: 2px solid #0ebffc;
  }

  .weekdays li {
      display: inline-block;
      width: 14%;
      text-align: center;
      padding: 10px 0;
      border-right: 1px solid #f1efef;
      color: #000;
      font-size: 20px;

  }

  .days {
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      
  }

  .days li {
      height: 160px;
      list-style-type: none;
      display: inline-block;
      width: 14%;
      text-align: right;
      font-size: 1rem;
      color: #000;
      list-style-type: none;
      display: inline-block;
      width: 14.2%;
      font-size: 1rem;
      color: #000;
      border-bottom: 1px solid #fff;
  }
  .everyday {
      height: 160px;
      border-bottom: 1px solid #f1efefef;
      position: relative;
      background: #fff;
  }
  .everyday .datenumber {
      position: absolute;
      right: 10px;
      top: 10px;
  }
  .everyday .usual {
      height: 100%;
      background: #1ed7fc;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 20px;
      line-height: 1.5;
  }
  .everyday .fulled {
      height: 100%;
      background: #ff9c9d;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 20px;
  }
  .everyday .nochoose {
      height: 100%;
      background: #effbff;
  }
  .everyday .orderbtn {
      position: absolute;
      right: 10px;
      bottom: 10px;
      cursor: pointer;
      border: none;
      background: #d6ffff;
      padding: 3px 10px;
      color: #0ebffc;
      border-radius: 4px;
      font-size: 16px;
  }
  .days li .active {
      padding: 6px 10px;
      border-radius: 50%;
      background: #00B8EC;
      color: #fff;
  }

  .days li .other-month {
      padding: 10px;
      height: 140px;
      color: gainsboro;
      background: #f9f9f9;
  }

  /* .singlebtn {
      font-size: 18px;
  }
  .mutiplebtn {
      font-size: 18px;
  } */



  .filebox {
      position: relative;
  }
  .el-card__body {
      position: relative;
  }
  .el-upload--text {
      position: absolute;
      left: 22%;
      top: 14px;
  }
  .el-upload--text .el-button {
      background: #0ebffc;
      border: none
  }

  .el-upload-list {
      width: 20%;
  }
  .filebtns {
      position: relative
  }
  .multifile {
      width: 100%;
  }
  .mutibtn {
      position: absolute;
      left: 12%;
      top: 0;
  }
  .uploadfile{
      padding: 4px 10px;
      height: 20px;
      line-height: 20px;
      position: relative;
      border: 1px solid #999;
      text-decoration: none;
      color: #666;
  }
  .change{
      position: absolute;
      overflow: hidden;
      right: 0;
      top: 0;
      opacity: 0;
  }
  .singleuploaded {

  }
  .mutiuploaded {
      left: 31.5%;
  }
  .outputloaded {
      left: 43%;
  }
  .inputfile-text {
      height: 33px;
      width: 233px;
      display: inline-block;
      border: 1px solid #ccc;
      line-height: 36px;
      border-radius: 7px;
      cursor: pointer;
  }
  .inputfile-text span {
      padding-left: 11px;
      color: #aba7a7;
  }

  .days li .current-month .full {
      background: #ff8a8a;
      text-align: center;
      line-height: 100px;
      color: #fff;

  }

  .days li .current-month .full .full-text {
      font-size: 26px;
  }

  .clearfix {clear: both}
  .month .currentdate { float: left}
  .month .choose { 
      float: right;
      line-height: 57px;
      padding-right: 30px;
      color: #676767
  }
  .month .choose span {
      background: #fff;
      padding: 5px 10px;
      cursor: pointer;
  }

  /* upload */
  .file {
      display: flex;
      width: 60px;
      height: 33px;
      overflow: hidden;
      border: 1px solid #ccc;
      width: 20%;
      margin-top: -4px;
      border-radius: 7px;
      position: relative;
  }
  .file .defaulttext {
      position: absolute;
      top: 5px;
      left: 10px;
      color: #bdbdbd;
  }
  .file input {
      width: 100%;
      height: 40px;
      position: relative;
      top: -10px;
      font-size: 0;
      opacity: 0;
      cursor: pointer;
  }
  .el-card__body #span {
      font-size: 14px;
      padding-left: 20px;
      color: #555;
      margin-top: 10px;
      display: block;
      width: 20%;
  }
</style>