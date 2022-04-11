<template>
  <el-card>
    <div class="content-header">
      <h1>预约管理<small>检查组管理</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预约管理</el-breadcrumb-item>
        <el-breadcrumb-item>检查组管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="border-top: 3px solid #3c8dbc;" :gutter="20">
      <el-col :span="7" style="margin-top:15px;"> 
        <el-input placeholder="编码/名称/助记码" v-model="queryInfo.query" clearable @clear="getdataList" style="width: 200px;" class="filter-item"></el-input>
        <el-button @click="getdataList()" class="dalfBut">查询</el-button>
      </el-col>
      <el-col :span="4" style="margin-top:15px;">
        <el-button type="primary" class="btn1" @click="addDialog">新建</el-button>
      </el-col>
    </el-row>
    <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="code" label="检查组编码" align="center"></el-table-column>
      <el-table-column prop="name" label="检查组名称" align="center"></el-table-column>
      <el-table-column label="适用性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == '0' ? '不限' : scope.row.sex == '1' ? '男' : '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="helpCode" label="助记码" align="center"></el-table-column>
      <el-table-column prop="remark" label="说明" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showUpdateDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    <el-dialog title="新增检查组" @close="addDialogClosed" :visible.sync="addDialogVisible">
      <template>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="基本信息" name="first">
            <el-form ref="dataAddForm" :model="addfromData" :rules="rules" label-position="right" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="编码" prop="code">
                    <el-input v-model="addfromData.code"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="addfromData.name"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="适用性别">
                    <el-select v-model="addfromData.sex">
                      <el-option label="不限" value="0"></el-option>
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="助记码">
                    <el-input v-model="addfromData.helpCode"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="说明">
                    <el-input v-model="addfromData.remark" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="注意事项">
                      <el-input v-model="addfromData.attention" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="检查项信息" name="second" >
            <div class="checkScrol" style="overflow-y:scroll;height: 300px;">
              <table class="datatable" >
                <thead>
                  <tr>
                    <th>选择</th>
                    <th>项目编码</th>
                    <th>项目名称</th>
                    <th>项目说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in tableData" :index="c.id" :key="c.id">
                    <td>
                      <input :id="c.id" v-model="checkitemIds" type="checkbox" :value="c.id">
                    </td>
                    <td><label :for="c.id">{{c.code}}</label></td>
                    <td><label :for="c.id">{{c.name}}</label></td>
                    <td><label :for="c.id">{{c.remark}}</label></td>
                  </tr>
                </tbody>
              </table>
            </div>
<!--             <el-table
              :data="tableData"
              style="width: 100%"
              height="250">
              <el-table-column
                fixed
                label="选择">
                <template slot-scope="scope">
                  <input type="checkbox" :value="scope.row.id" :v-model="checkitemIds">
                </template>
              </el-table-column>
              <el-table-column
                fixed
                prop="code"
                label="项目编码">
              </el-table-column>
              <el-table-column
                prop="name"
                label="项目名称">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="项目说明">
              </el-table-column>
            </el-table> -->
          </el-tab-pane>
        </el-tabs>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogClosed">取消</el-button>
        <el-button type="primary" @click="handleAdd()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑检查组" @close="editDialogClosed" :visible.sync="editDialogVisible">
      <template>
        <el-tabs v-model="editActiveName" type="card">
          <el-tab-pane label="基本信息" name="first">
            <el-form ref="dataEditForm" :model="editfromData" :rules="rules" label-position="right" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="编码" prop="code">
                    <el-input v-model="editfromData.code"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="editfromData.name"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="适用性别">
                    <el-select v-model="editfromData.sex">
                      <el-option label="不限" value="0"></el-option>
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="助记码">
                    <el-input v-model="editfromData.helpCode"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="说明">
                    <el-input v-model="editfromData.remark" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="24">
                    <el-form-item label="注意事项">
                      <el-input v-model="editfromData.attention" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="检查项信息" name="second" >
            <div class="checkScrol" style="overflow-y:scroll;height: 300px;">
              <table class="datatable" >
                <thead>
                  <tr>
                    <th>选择</th>
                    <th>项目编码</th>
                    <th>项目名称</th>
                    <th>项目说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="c in tableData" :index="c.id" :key="c.id">
                    <td>
                      <input :id="c.id" v-model="checkitemIds" type="checkbox" :value="c.id">
                    </td>
                    <td><label :for="c.id">{{c.code}}</label></td>
                    <td><label :for="c.id">{{c.name}}</label></td>
                    <td><label :for="c.id">{{c.remark}}</label></td>
                  </tr>
                </tbody>
              </table>
            </div>
         </el-tab-pane>
        </el-tabs>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogClosed">取消</el-button>
        <el-button type="primary" @click="handleEdit()">确定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      queryInfo: {
        pagenum: 1,
        pagesize: 10,
        query:''
      },
      total:0,
      dataList:[],
      addDialogVisible:false,
      activeName:'first',
      addfromData:{},
      rules: {
        //校验规则
        code: [{ required: true, message: '项目编码为必填项', trigger: 'blur' }],
        name: [{ required: true, message: '项目名称为必填项', trigger: 'blur' }]
      },
      tableData:[],//新增和编辑表单中对应的检查项列表数据
      checkitemIds:[],//新增和编辑表单中检查项对应的复选框，基于双向绑定可以进行回显和数据提交
      editDialogVisible:false,
      editActiveName:'first',
      editfromData:{},
      editTableData:[],
      editCheckitemIds:[]
    }
  },
  created(){
    this.getdataList()
  },
  methods:{
    async getdataList(){
      const {data:res} = await this.$http.get('checkgroup/findpage',{params:this.queryInfo})
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('获取数据失败')
      }
      console.log(res);
      this.dataList = res.data.records
      this.total = res.data.total
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.getdataList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val;
      this.getdataList();
    },
    addDialog(){
      this.getTableData()
      this.addDialogVisible = true
      this.activeName = 'first'
      this.checkitemIds = [];
    },
    async getTableData(){
      const {data:res} = await this.$http.get('checkitem/findAll')
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('获取数据失败')
      }
      console.log(res);
      this.tableData = res.data
    },
    addDialogClosed(){
      console.log(this.checkitemIds);
      this.addDialogVisible = false
      this.activeName = 'first'
      this.checkitemIds = [];
      // 清空复选框中的值
      // this.$("input")
      this.addfromData = {};
      this.$refs.dataAddForm.resetFields()
    },
    handleAdd(){
      if(this.checkitemIds.length == 0){
        return this.$message.error('请先选择检查项')
      }
      this.$refs.dataAddForm.validate(async valid=>{
        if(!valid) return
        const {data:res} = await this.$http.post('checkgroup/add/'+this.checkitemIds , this.addfromData)
        console.log(res);
        if(res.flag != true && res.message == "权限不足"){
          this.$router.push({path:"/main"})
          return this.$message.error('您暂无权限访问')
        }else if(res.flag != true && res.message != "权限不足"){
          return this.$message.error('创建检查组失败')
        }
        this.getdataList()
        this.addDialogVisible = false
        this.$refs.dataAddForm.resetFields()
        this.$message.success('创建检查组成功')
      })
    },
    editDialogClosed(){
      console.log(this.checkitemIds);
      this.editDialogVisible = false
      this.editActiveName = 'first'
      this.checkitemIds = [];
      // 清空复选框中的值
      // this.$("input")
      this.editfromData = {};
      this.$refs.dataEditForm.resetFields()
    },
    async handleEdit(){
      const {data:res} = await this.$http.put(`checkgroup/edit/${this.checkitemIds}`,this.editfromData)
      console.log(res);
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('更新数据失败')
      }
      this.editDialogVisible = false
      this.getdataList();
      this.$refs.dataEditForm.resetFields()
      this.$message.success('更新检查组成功')
    },
    async showUpdateDialog(val){
      this.getTableData()
      // 根据id查询检查组
      const {data:res} = await this.$http.get('checkgroup/findbyid?id='+val.id)
      console.log(res);
      if(res.flag == true){
        this.editfromData = res.data
        // 根据id查询检查项信息
        const {data:res2} = await this.$http.get('checkgroup/findCheckItemIdsByCheckGroupId?id='+val.id)
        console.log(res2);
        if(res2.flag != true && res2.message == "权限不足"){
          this.$router.push({path:"/main"})
          return this.$message.error('您暂无权限访问')
        }else if(res2.flag != true && res2.message != "权限不足"){
          return this.$message.error('获取数据失败')
        }
        this.checkitemIds = res2.data
        console.log(this.checkitemIds);
        this.editDialogVisible = true
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('查询数据失败')
      }else{
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无访问权限')
      }
      console.log(val);
    },
    async handleDelete(row){
      const confirmResult = await this.$confirm('此操作将永久删除该检查项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err=>err)
      if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$http.delete('checkgroup/delete?id=' + row.id)
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getdataList()
    },
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
</style>