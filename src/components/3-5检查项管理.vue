<template>
  <!-- <div>预约列表</div> -->
  <el-card>
    <div  style="margin-bottom:15px;" class="content-header">
      <h1>预约管理<small>检查项管理</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>预约管理</el-breadcrumb-item>
          <el-breadcrumb-item>检查项管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="border-top: 3px solid #3c8dbc;" :gutter="20">
      <el-col :span="7" style="margin-top:15px;"> 
        <el-input placeholder="项目编码/项目名称" v-model="queryInfo.query" clearable @clear="getdataList" style="width: 200px;" class="filter-item"></el-input>
        <el-button @click="getdataList()" class="dalfBut">查询</el-button>
      </el-col>
      <el-col :span="4" style="margin-top:15px;">
        <el-button type="primary" class="btn1" @click="addDialogVisible=true">新建</el-button>
      </el-col>
    </el-row>
    <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="code" label="项目编码" align="center"></el-table-column>
      <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
      <el-table-column label="适用性别" align="center">
        <template slot-scope="scope">
            <span>{{ scope.row.sex == '0' ? '不限' : scope.row.sex == '1' ? '男' : '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="适用年龄" align="center"></el-table-column>
      <el-table-column prop="remark" label="项目说明" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="新增检查项" @close="addDialogVisibleFrom" :visible.sync="addDialogVisible">
      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编码" prop="code">
              <el-input v-model="formData.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="formData.name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="性别">
                    <el-select v-model="formData.sex">
                        <el-option label="不限" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="适用年龄">
                <el-input v-model="formData.age"/>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select v-model="formData.type">
                <el-option label="检查" value="1"></el-option>
                <el-option label="检验" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格">
                <el-input v-model="formData.price"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目说明">
              <el-input v-model="formData.remark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="注意事项">
              <el-input v-model="formData.attention" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisibleFrom">取消</el-button>
          <el-button type="primary" @click="handleAdd()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑检查项" @close="EditdialogFormVisible" :visible.sync="dialogFormVisible4Edit">
      <el-form ref="dataEditForm" :model="editFormData" :rules="rules" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编码" prop="code">
              <el-input v-model="editFormData.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="editFormData.name"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="editFormData.sex">
                <el-option label="不限" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适用年龄">
              <el-input v-model="editFormData.age"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select v-model="editFormData.type">
                <el-option label="检查" value="1"></el-option>
                <el-option label="检验" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格">
              <el-input v-model="editFormData.price"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目说明">
              <el-input v-model="editFormData.remark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="注意事项">
              <el-input v-model="editFormData.attention" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditdialogFormVisible">取消</el-button>
        <el-button type="primary" @click="handleEdit()">确定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
      dataList:[],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total:0,
      addDialogVisible:false,
      formData:{},
      rules: {
        //校验规则
        code: [{ required: true, message: '项目编码为必填项', trigger: 'blur' }],
        name: [{ required: true, message: '项目名称为必填项', trigger: 'blur' }]
      },
      dialogFormVisible4Edit:false,
      editFormData:{
        code:'',
        name:'',
        sex:'',
        age:0,
        type:'',
        price:0,
        remark:'',
        attention:''
      }

    }
  },
  created(){
      this.getdataList()
  },
  methods:{
    async getdataList(){
      const {data:res} = await this.$http.get('checkitem/findpage',{params:this.queryInfo})
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
    handleAdd(){
      this.$refs.dataAddForm.validate(async valid=>{
          if(!valid) return
          const {data:res} = await this.$http.post('checkitem/add',this.formData)
          if(res.flag != true && res.message == "权限不足"){
            this.$router.push({path:"/main"})
            return this.$message.error('您暂无权限访问')
          }else if(res.flag != true && res.message != "权限不足"){
            return this.$message.error('添加数据失败')
          }
          console.log(res);
          this.getdataList()
          this.addDialogVisible = false
          this.$refs.dataAddForm.resetFields()
          this.$message.success('创建检查项成功')
        })
    },
    async handleUpdate(row){
      const {data:res} = await this.$http.get('checkitem/findById?id='+row.id);
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('查询检查项失败')
      }
      this.editFormData = res.data
      console.log(res);
      this.dialogFormVisible4Edit = true
      console.log(row);
    },
    async handleEdit(){
      const {data:res} = await this.$http.put('checkitem/edit',this.editFormData);
      console.log(res);
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('更新检查项失败')
      }
      this.dialogFormVisible4Edit = false
      this.$refs.dataEditForm.resetFields()
      this.$message.success('更新检查项成功')
      this.getdataList()
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
      const {data:res} = await this.$http.delete('checkitem/delete?id=' + row.id)
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getdataList()
    },
    EditdialogFormVisible(){
      this.dialogFormVisible4Edit = false
      this.$refs.dataEditForm.resetFields()
    },
    addDialogVisibleFrom(){
      this.addDialogVisible = false
      this.$refs.dataAddForm.resetFields()
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
</style>