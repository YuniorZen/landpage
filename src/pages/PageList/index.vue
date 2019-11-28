<template>
<div>
  <!-- 顶部信息头 -->
  <HeadInfo />

  <!-- 查询条件及操作 -->
  <div class="query-wraper">
    <el-row class="maxwidth" type="flex" justify="space-between">
      <el-col :span="5">
        落地页状态：
        <el-select v-model="status" placeholder="请选择状态" @change="search">
          <el-option
            label="全部"
            value="">
          </el-option>
          <el-option
            label="未发布"
            value="unrelease">
          </el-option>
          <el-option
            label="已发布"
            value="release">
          </el-option>
          <el-option
            label="已暂停"
            value="offline">
          </el-option>
          <el-option
            label="已过期"
            value="overdue">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="5">
        UrlKey：
        <el-input placeholder="请输入落地页urlKey" v-model.trim="urlKey" class="query-search" @keydown.enter.native="search">
        </el-input>
      </el-col> 

      <el-col :span="5">
        名称：
        <el-input placeholder="请输入落地页名称" v-model.trim="name" class="query-search" @keydown.enter.native="search">
        </el-input>
      </el-col>
      <el-col :span="5">
        页面标题：
        <el-input placeholder="请输入页面标题" v-model.trim="title" class="query-search" @keydown.enter.native="search">
        </el-input>
      </el-col>

      <el-col :span="4" class="align-right"> 
        <el-button class="query-btn" type="primary"  @click.native="search">查 询</el-button>
        <el-button class="query-btn" type="warning"  @click.native="reset">重 置</el-button>
      </el-col>
    </el-row>
  </div>


  <div class="page-list maxwidth">  
    <div class="operate-row">      
      <el-button class="operate-btn" type="success"  @click.native="releaseTap">发 布</el-button>     
      <el-button class="operate-btn" type="primary" @click="cratePage">新 建</el-button>   
    </div>

    <!-- 查询结果表格 -->
    <el-table
      class="list-table"
      @selection-change="handleSelectionChange"
      :data="tableData"
      border>

      <el-table-column
        type="selection"
        :selectable="selectable"
        width="70">
      </el-table-column>

      <el-table-column
        prop="urlKey"
        label="urlKey"
        >
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
        >
      </el-table-column>
      
      <el-table-column
        prop="title"
        label="页面标题"
      >
      </el-table-column>

      <el-table-column 
        label="状态" 
        width="100">
        <template slot-scope="scope">
        {{statusText(scope.row)}}
        </template>
      </el-table-column>

      <el-table-column
        label="过期日期"
        width="180">
        <template slot-scope="scope">
        {{formatDate(scope.row)}}
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="180">
        <template slot-scope="scope">
        {{scope.row.createDate|formatDateTime}}
        </template>
      </el-table-column>

      <el-table-column label="操作"
        width="320">
        <template slot-scope="scope">
          <span class="operate-btn" @click="copyLink(scope.row)">复制链接</span>
          <span class="operate-btn" @click="pageEditor(scope.row)">编辑</span>
          <span class="operate-btn" @click="previewPage(scope.row)">预览</span>
          <span class="operate-btn operate-delete" @click="deletePage(scope.row)">删除</span>
          <span class="operate-btn" v-if="scope.row.status=='release'" @click="updatePageStatus(scope.row, 'offline')">暂停使用</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-box" v-if="totalSize>0">
      <el-pagination 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next"
        :total="totalSize"
        :disabled="disabled"
        :page-count="pageCount"
        :page-sizes="pageSizes">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import './pagelist.scss'
import HeadInfo from '@/components/HeadInfo'
import http from '@/http/'
import {formatDateTime} from '@/utility/'

export default {
  name: 'PageList',
  data() {
    return {
      tableData:[],
      status:'',
      name:'',
      title:'',
      urlKey:'',
      disabled:false,
      pageSize:10,
      pageSizes:[10, 20, 30, 40, 50, 100],
      pageCount: 1,
      totalSize:0,
      page:1,
      multipleSelection: []
    }
  },
  created(){
   this.search()
  },
  methods:{
    //获取落地页列表
    search(flg){
      if(flg != 'flg') {
        this.page = 1
      }
      let status=this.status,
          pageSize=this.pageSize,
          page=this.page,
          title=this.title,
          urlKey=this.urlKey,
          name=this.name;

      http.getAllPage({status, name, pageSize, page, urlKey, title})
      .then(res=>{     
        this.tableData=res.data||[]
        this.totalSize=res.totalSize||0
        if(res.totalSize == 0) {
          this.disabled = true
        }else {
          this.disabled = false
        }
        this.pageCount = Math.ceil(this.totalSize/this.pageSize)     
      })
    },
    //重置操作
    reset(){
      this.status='release'
      this.name=''
      this.title=''
      this.urlKey=''
      this.search()
    },
    //新建落地页
    cratePage(){
      window.open('#/PageCreate','_blank')
    },
    //编辑页面
    editorPage(page){
      window.open(`#/PageEditor?urlKey=${page.urlKey}`,'_blank')
    },
    //删除落地页
    deletePage(page){
      this.$confirm('请确认是否删除？','',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{
        http.deletePage({urlKey:page.urlKey})
        .then(res=>{         
          if(this.tableData.length == 1 && this.page != 1) {
            this.page = this.page - 1
          }
          this.$message({
            type: 'success',
            message:res.message
          })
          this.search('flg')
        })
      })
      .catch(()=>{
        console.log('取消删除')
      })
    },
    //预览落地页
    previewPage(page){
      window.open(`#/PagePreview?urlKey=${page.urlKey}`,'_blank')
    },
    //更新落地页的状态
    updatePageStatus(page, status){
      if(this.tableData.length == 1 && this.page != 1) {
          this.page = this.page - 1
      }
      this.$confirm('落地页将不可见，如需启用，请重新发布。','',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{
        http.updatePageStatus({urlKeys:[page.urlKey], status:'offline'})
        .then(res=>{         
          this.$message({
            type: 'success',
            message:res.message
          })
      
          this.search('flg')
        })      
      })
      .catch(()=>{
        console.log('取消暂停')
      })
    },
    //落地页状态
    statusText(page){
      let status=page.status,
      result='未发布';
      switch(status){
        case 'unrelease':
          result='未发布';
        break;

        case 'release':
          result='已发布';
        break;

        case 'offline':
          result='已暂停';
        break;

        case 'overdue':
          result='已过期';
        break;
      }
      return result
    },
    //格式化日期
    formatDate(page){
      let result=''

      if(page.needExpire){
        result=formatDateTime(page.expireDate)
      }else{
        result='永不过期'
      }
      return result
    },
    // 发布多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //发布
    releaseTap(){
      if(this.multipleSelection.length > 0) {
        let urlKeys= [];
        this.multipleSelection.forEach(function(el) {
          urlKeys.push(el.urlKey)
        }, this);
        if(urlKeys.length == this.tableData.length && this.page != 1) {
          this.page = this.page - 1
        }
        http.updatePageStatus({urlKeys:urlKeys,status:'release'})
        .then(res=>{       
          this.$message({
            message: '发布已成功',
            type: 'success'
          });
          this.search('flg')         
        })
      } else {
        this.$message({
          message: '请选择要发布的选项~',
          type: 'warning'
        });
      }
    },
    // 是否可选
    selectable(row,index) {
      if(row.status === "offline" || row.status === "unrelease"){
          return true
      }else {
          return false
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize =  val*1
      this.page = 1
      this.search('flg')
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = `${val}` - 0
      this.search('flg')
    },
    // 复制链接
    copyLink(data){
      let url = window.location.origin+"/#/landpage?urlKey="+data.urlKey;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value)
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: '链接地址已复制成功',
        type: 'success'
      });
      oInput.remove()
    },
    // 编辑
    pageEditor(data){
      window.open(`#/PageEditor?urlKey=${data.urlKey}`,'_blank')
    }
  },
  components:{
    HeadInfo,
  }
}
</script>
