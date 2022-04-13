<template>
  <el-card>
    <div class="content-header">
      <h1>预约管理<small>套餐管理</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>预约管理</el-breadcrumb-item>
        <el-breadcrumb-item>套餐管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="border-top: 3px solid #3c8dbc;" :gutter="20">
      <el-col :span="7" style="margin-top:15px;"> 
        <el-input placeholder="编码/名称/助记码" v-model="queryInfo.query" clearable @clear="getdataList" style="width: 200px;" class="filter-item"></el-input>
        <el-button @click="getdataList()" class="dalfBut">查询</el-button>
      </el-col>
      <el-col :span="4" style="margin-top:15px;">
        <el-button type="primary" class="btn1" @click="addDialogVisibleOpen">新建</el-button>
      </el-col>
    </el-row>
    <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
      <el-table-column type="index" align="center" label="序号"></el-table-column>
      <el-table-column prop="code" label="套餐编码" align="center"></el-table-column>
      <el-table-column prop="name" label="套餐名称" align="center"></el-table-column>
      <el-table-column label="适用性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == '0' ? '不限' : scope.row.sex == '1' ? '男' : '女'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="适用年龄" align="center"></el-table-column>
      <el-table-column prop="helpCode" label="助记码" align="center"></el-table-column>
      <el-table-column prop="remark" label="说明" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showUpdateDiglog(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[2, 5, 10, 15]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    <el-dialog title="新增套餐" :visible.sync="addDialogVisible" @close="addDialogVisibleClose">
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
                <el-col :span="12">
                  <el-form-item label="套餐价格">
                    <el-input v-model="addfromData.price"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="适用年龄">
                    <el-input v-model="addfromData.age"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="上传图片">
                    <el-upload
                      class="avatar-uploader"
                      action="http://localhost:8889/lyq/setmeal/upload"
                      :auto-upload="autoUpload"
                      name="imgFile"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                        <img  v-if="imageUrl" :src="imageUrl" style="height:150px" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
          <el-tab-pane label="检查组信息" name="second">
           <div class="checkScrol"  style="overflow-y:scroll;height: 300px;">
              <table class="datatable">
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
                      <input :id="c.id" v-model="checkgroupIds" type="checkbox" :value="c.id">
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
        <el-button @click="addDialogVisibleClose">取消</el-button>
        <el-button type="primary" @click="handleAdd()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新套餐" :visible.sync="editDialogVisible" @close="editDialogVisibleClose">
      <template>
        <el-tabs v-model="activeName" type="card">
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
                <el-col :span="12">
                  <el-form-item label="套餐价格">
                    <el-input v-model="editfromData.price"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="适用年龄">
                    <el-input v-model="editfromData.age"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="上传图片">
                    <el-upload
                      class="avatar-uploader"
                      action="http://localhost:8889/lyq/setmeal/upload"
                      :auto-upload="autoUpload"
                      name="imgFile"
                      :show-file-list="false"
                      :on-success="editHandleAvatarSuccess"
                      :before-upload="editBeforeAvatarUpload">
                        <img  v-if="imageUrl" :src="imageUrl" style="height:150px" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
          <el-tab-pane label="检查组信息" name="second">
           <div class="checkScrol"  style="overflow-y:scroll;height: 300px;">
              <table class="datatable">
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
                      <input :id="c.id" v-model="checkgroupIds" type="checkbox" :value="c.id">
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
        <el-button @click="editDialogVisibleClose">取消</el-button>
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
        pagesize: 2,
        query:''
      },
      dataList:[],
      total:0,
      addDialogVisible:false,
      tableData:[],
      checkgroupIds:[],
      autoUpload:true,//自动上传
      imageUrl:null,//模型数据，用于上传图片完成后图片预览
      activeName:'first',//添加/编辑窗口Tab标签名称
      rules: {
        //校验规则
        code: [{ required: true, message: '项目编码为必填项', trigger: 'blur' }],
        name: [{ required: true, message: '项目名称为必填项', trigger: 'blur' }]
      },
      addfromData:{},
      // action:'http://172.18.113.87:8889/lyq/setmeal/upload'
      editDialogVisible:false,
      editfromData:{}
    }
  },
  created(){
    this.getdataList()
  },
  methods:{
    async getdataList(){
      const {data:res} = await this.$http.get('setmeal/findpage',{params:this.queryInfo})
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
    async getTableData(){
      const {data:res} = await this.$http.get('checkgroup/findAll')
      if(res.flag != true && res.message == "权限不足"){
        this.$router.push({path:"/main"})
        return this.$message.error('您暂无权限访问')
      }else if(res.flag != true && res.message != "权限不足"){
        return this.$message.error('获取数据失败')
      }
      console.log(res);
      this.tableData = res.data
    },
    addDialogVisibleOpen(){
      this.getTableData()
      this.addDialogVisible = true
    },
    //文件上传成功后的钩子，response为服务端返回的值，file为当前上传的文件封装成的js对象
    handleAvatarSuccess(response, file) {
      console.log('a');
      this.imageUrl = "http://r96pit9s3.hd-bkt.clouddn.com/"+response.data;
      this.$message({
      message: response.message,
      type: response.flag ? 'success' : 'error'
      });
      //设置模型数据（图片名称），后续提交ajax请求时会提交到后台最终保存到数据库
      this.addfromData.img = response.data;
    },
    //上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传套餐图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传套餐图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAdd(){
      if(this.checkgroupIds.length == 0){
        return this.$message.error('请先选择检查组')
      }
      this.$refs.dataAddForm.validate(async valid=>{
        if(!valid) return
        const {data:res} = await this.$http.post('setmeal/add/'+this.checkgroupIds , this.addfromData)
        console.log(res);
        if(res.flag != true && res.message == "权限不足"){
          this.$router.push({path:"/main"})
          return this.$message.error('您暂无权限访问')
        }else if(res.flag != true && res.message != "权限不足"){
          return this.$message.error('创建套餐失败')
        }
        this.getdataList()
        this.addDialogVisible = false
        this.$refs.dataAddForm.resetFields()
        this.$message.success('创建套餐成功')
      })
    },
    addDialogVisibleClose(){
      this.addDialogVisible = false
      this.addfromData={}
      this.imageUrl = ""
      this.$refs.dataAddForm.resetFields()
      this.checkgroupIds=[]
      this.activeName = 'first'
    },
    editDialogVisibleClose(){
      this.editDialogVisible = false
      this.imageUrl = ""
      this.editfromData={}
      this.$refs.dataEditForm.resetFields()
      this.checkgroupIds=[]
      this.activeName = 'first'
    },
    async handleEdit(){
      console.log(this.editfromData);
      const {data:res} = await this.$http.put(`setmeal/update/${this.checkgroupIds}`,this.editfromData)
      console.log(res); 
      if(res.flag == true){
        this.editDialogVisibleClose()
        this.getdataList()
        return this.$message.success('更新成功')
      }else if(res.data.message == "权限不足"){
        return this.$message.error('您暂无权限操作')
      }else{
        return this.$message.error('更新失败')
      }
    },
    editHandleAvatarSuccess(response, file) {
      console.log('a');
      this.imageUrl = "http://r96pit9s3.hd-bkt.clouddn.com/"+response.data;
      this.$message({
      message: response.message,
      type: response.flag ? 'success' : 'error'
      });
      //设置模型数据（图片名称），后续提交ajax请求时会提交到后台最终保存到数据库
      this.editfromData.img = response.data;
    },
    editBeforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传套餐图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传套餐图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    async showUpdateDiglog(val){
      this.getTableData()
      const {data:res} = await this.$http.get(`setmeal/findbyid/${val.id}`)
      console.log(res);
      if(res.flag == true){
        this.editfromData = res.data
        this.imageUrl = "http://r96pit9s3.hd-bkt.clouddn.com/"+ this.editfromData.img
        this.checkgroupIds = res.data.checkgroupids
      }else{
        return this.$message.error('查询失败')
      }
      this.editDialogVisible = true
    },
    async handleDelete(id){
      const confirmResult = await this.$confirm('此操作将永久删除该套餐, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err=>err)
      if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$http.delete(`setmeal/delete/${id}`)
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
  }

</style>