<template>
  <el-card>
    <div class="content-header">
      <h1>统计分析<small>运营数据</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>统计分析</el-breadcrumb-item>
        <el-breadcrumb-item>运营数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box" style="height: 900px">
        <div class="excelTitle" >
          <el-button @click="exportExcel">导出Excel</el-button>
          <el-button @click="exportPDF">导出PDF</el-button>运营数据统计
        </div>
        <div class="excelTime">日期：{{reportData.reportDate}}</div>
        <table class="exceTable" cellspacing="0" cellpadding="0">
          <tr>
            <td colspan="4" class="headBody">会员数据统计</td>
          </tr>
          <tr>
            <td width='20%' class="tabletrBg">新增会员数</td>
            <td width='30%'>{{reportData.todayNewMember}}</td>
            <td width='20%' class="tabletrBg">总会员数</td>
            <td width='30%'>{{reportData.totalMember}}</td>
          </tr>
          <tr>
            <td class="tabletrBg">本周新增会员数</td>
            <td>{{reportData.thisWeekNewMember}}</td>
            <td class="tabletrBg">本月新增会员数</td>
            <td>{{reportData.thisMonthNewMember}}</td>
          </tr>
          <tr>
            <td colspan="4" class="headBody">预约到诊数据统计</td>
          </tr>
          <tr>
            <td class="tabletrBg">今日预约数</td>
            <td>{{reportData.todayOrderNumber}}</td>
            <td class="tabletrBg">今日到诊数</td>
            <td>{{reportData.todayVisitsNumber}}</td>
          </tr>
          <tr>
            <td class="tabletrBg">本周预约数</td>
            <td>{{reportData.thisWeekOrderNumber}}</td>
            <td class="tabletrBg">本周到诊数</td>
            <td>{{reportData.thisWeekVisitsNumber}}</td>
          </tr>
          <tr>
            <td class="tabletrBg">本月预约数</td>
            <td>{{reportData.thisMonthOrderNumber}}</td>
            <td class="tabletrBg">本月到诊数</td>
            <td>{{reportData.thisMonthVisitsNumber}}</td>
          </tr>
          <tr>
            <td colspan="4" class="headBody">热门套餐</td>
          </tr>
          <tr class="tabletrBg textCenter">
            <td>套餐名称</td>
            <td>预约数量</td>
            <td>占比</td>
            <td>备注</td>
          </tr>
          <tr v-for="s in reportData.hotSetmeal" :key="s">
            <td>{{s.name}}</td>
            <td>{{s.setmeal_count}}</td>
            <td>{{s.proportion}}</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
   data(){
    return{
      reportData:{},
      todayNewMember :0,
      totalMember :0,
      thisWeekNewMember :0,
      thisMonthNewMember :0,
      todayOrderNumber :0,
      todayVisitsNumber :0,
      thisWeekOrderNumber :0,
      thisWeekVisitsNumber :0,
      thisMonthOrderNumber :0,
      thisMonthVisitsNumber :0,
      hotSetmeal:[
          {name:'阳光爸妈升级肿瘤12项筛查（男女单人）体检套餐',setmeal_count:200,proportion:0.222},
          {name:'阳光爸妈升级肿瘤12项筛查体检套餐',setmeal_count:200,proportion:0.222}
      ]
    }
  },
  created() {
    this.getReportData();
  },
  methods:{
    async getReportData(){
      const {data:res} = await this.$http.get('report/getBusinessReportData')
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('获取运营数据失败')
      }
      this.$message.success('获取运营数据成功')
      this.reportData = res.data
    },
    exportExcel(){
        window.location.href = '/report/exportBusinessReport';
    },
    exportPDF(){
        window.location.href = '/report/exportBusinessReport4PDF';
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
  /*  */
.app-container{
	background: #fff;
	margin: 15px 30px 15px 15px;
	
}
.pagiantion{
	text-align: right;
	padding: 15px;
}
.box {
	position: relative;
	border-radius: 3px;
	background: #ffffff;
	border-top: 3px solid #3c8dbc;
	padding: 10px;
	margin-bottom: 20px;
	width: 100%;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.filter-container{
	padding:10px 0 15px 0;
}
.main-container{margin-top: 70px;}
.filter-container .el-button,.filter-container .el-input__inner{
 padding: 0 15px;
 height: 34px;
 line-height: 34px;
}
.el-aside{overflow: hidden;}
.el-submenu .el-menu-item a{
	display: block;
	height: 50px;
}
.el-menu--collapse .el-submenu__icon-arrow{ display: none}
/* .el-container{position: relative;} */
/* foot */
.el-footer{
	position: absolute;
	left: 180px;
	right: 0px;
	bottom: -80px;
}
.boxMain .el-upload--text{
	position:static;
}
.boxMain >div{
	display: inline-block;
}
.excelTitle{
	text-align: center;
	overflow: hidden;
	line-height: 40px;
}
.excelTitle .el-button{
	float: left;
}
.excelTime{
	padding: 10px 0;
	text-align: right;
}
.exceTable{
	width: 100%;
	border-right: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
	font-size: 14px;
	color: #333;
}
.exceTable tr,.exceTable td{
	border-left: 1px solid #e6e6e6;
	border-top: 1px solid #e6e6e6;
	height: 40px;
	line-height: 40px;
	padding: 0 10px;
}
.exceTable .headBody{
	text-align: center;
	font-weight: 700;
	font-size: 14px;
}
.tabletrBg{
	background: #fcfcfc;
	text-align: right;
}
.textCenter{
	text-align: center
}
.checkScrol{
	height: 277px;
	overflow-y:scroll; ;
}
</style>