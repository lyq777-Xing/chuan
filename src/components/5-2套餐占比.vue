<template>
  <el-card>
    <div class="content-header">
      <h1>统计分析<small>套餐占比</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>统计分析</el-breadcrumb-item>
        <el-breadcrumb-item>套餐占比</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box">
        <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <div id="chart2" style="height:600px;"></div>
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
    var myChart = echarts.init(document.getElementById('chart2'))
    const {data: res} = await this.$http.get('report/getSetmealReport')
    console.log(res);
    if(res.flag != true && res.message == "权限不足"){
      this.$router.push({path:"/main"})
      return this.$message.error('您暂无权限访问')
    }else if(res.flag != true && res.message != "权限不足"){
      return this.$message.error('获取折线图数据失败')
    }

    myChart.setOption(
      {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: res.data.setmealCount
          }
        ]
      }
    )
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