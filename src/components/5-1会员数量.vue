<template>
  <el-card>
    <div class="content-header">
      <h1>统计分析<small>会员数量</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>统计分析</el-breadcrumb-item>
        <el-breadcrumb-item>会员数量</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="chart1" style="height:600px;"></div>
      </div>
    </div>
  </el-card>
</template>
<script>
let echarts = require('echarts')
import _ from 'lodash'
export default {
  data(){
    return{
    }
  },
  async mounted(){
    var myChart = echarts.init(document.getElementById('chart1'))
    const {data: res} = await this.$http.get('report/getMemberReport')
    console.log(res);
    if(res.flag != true && res.message == "权限不足"){
      this.$router.push({path:"/main"})
      return this.$message.error('您暂无权限访问')
    }else if(res.flag != true && res.message != "权限不足"){
      return this.$message.error('获取折线图数据失败')
    }

    myChart.setOption(
    {
      title: {
        text: '会员数量'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
          backgroundColor: '#E9EEF3'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      
      xAxis: {
        type:'category',
        data: res.data.months
      },
      yAxis: {
        type:'value'
      },
      series: [{
        name: '会员数量',
        type: 'line',
        data: res.data.memberCount
      }]
    })
  }
}
</script>
<style lang="less" scoped>
  .app-container{
    margin-top: 15px;
  }
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
</style>