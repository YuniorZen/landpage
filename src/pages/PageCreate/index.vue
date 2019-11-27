<template>
  <div class="page-create full-container">
    <!-- 顶部信息头组件 -->
    <HeadInfo />
    
    <!-- 面包屑导航 -->
    <BreadCrumb>
      <div class="operate-btns">
        <el-button type="primary" size="mini" plain @click="save">保存</el-button>
        <el-button v-if="showBtn" type="primary" size="mini" plain @click="preview">保存并预览</el-button>
        <el-button v-if="showBtn" type="success" size="mini" @click="release">保存并发布</el-button>
      </div>
    </BreadCrumb>
  

    <!-- 自定义页面 -->
    <el-row class="custom-page"  type="flex" justify="space-between">
      <!-- 左侧组件栏 -->
      <el-col class="page-left">
        <div class="component-cate">基础组件</div>
        <el-row class="component-list" type="flex">
          <el-col class="component-item" v-for="item in components.base" :key="item.type" :draggable="!item.disableDrag" @dragstart.native="dragstart(item, $event)" >
            <i :class="`item-icon ${iconClass(item.type)}`"></i>
            <div class="item-name" >{{item.name}}</div>
          </el-col>
        </el-row>

        <div class="component-cate">营销组件</div>
        <el-row class="compoonet-list" type="flex">
          <el-col class="component-item" v-for="item in components.market" :key="item.type" :draggable="!item.disableDrag"  @dragstart.native="dragstart(item, $event)" >
            <i :class="`item-icon ${iconClass(item.type)}`"></i>
            <div class="item-name" >{{item.name}}</div>
          </el-col>
        </el-row>
      </el-col>

      <!-- 中间组件展示栏 -->      
      <el-col class="page-center" id="page-center">
        <pageCenter :dragComponent="dragComponent" @drop="drop" />

        <div class="page-empty" v-if="page.components.length==0">请拖入左侧组件到此区域</div>

        <div class="backTop" v-if="page.extra.needBackTop&&page.extra.backTopImage">
          <img :src="staticURL+page.extra.backTopImage" />
        </div>  
      </el-col>

      <!-- 右侧组件编辑栏 -->
      <el-col class="page-right">
        <pageRight />
      </el-col>
    </el-row>  

    <!-- 自定义菜单组件 -->
    <ContextMenu />  
  </div>
</template>

<script>
import './pagecreate.scss'
import pageCenter from './components/pageCenter'
import pageRight from './components/pageRight'
import ContextMenu from '@/components/ContextMenu'
import HeadInfo from '@/components/HeadInfo'
import BreadCrumb from '@/components/BreadCrumb'
import {mapState} from 'vuex'
import http from '@/http/'
import {validateUtil, arrayFindObject} from '@/utility/'
import {components} from '@/utility/const'

export default {
  name: 'PageCreate',
  data() {
    return {
      //左侧组件栏数据
      components:components,

      //当前正在拖拽组件类型
      dragComponent:null,

      //判断是否编辑页面，编辑和新建共用PageCreate组件
      isEditor:this.$route.path=='/PageEditor',

      //静态图片地址
      staticURL:http.staticURL,
    }
  },
  computed:{
    //映射组件的状态
    ...mapState({
      activeComponent:state=>state.activeComponent,
      page:state=>state.page,
    }),   
    showBtn(){
      if(this.isEditor&&this.page.status=='release'){
        return false
      }
      return true
    }
  },
  beforeCreate(){
    //点击空白处重置激活组件为当前页面
    document.addEventListener('mousedown',(ev)=>{
      let target=ev.target
      if(target.classList.contains('custom-page')||target.classList.contains('page-wraper')||target.classList.contains('component-wraper')){
        this.$store.commit('resetActiveComponent')
      }
    })
  },
  methods:{   
    //拖拽开始
    dragstart(item, ev){
      //记录拖拽元素信息    
      item.extra={
        width:ev.currentTarget.offsetWidth,
        height:ev.currentTarget.offsetHeight,
        pointX:ev.offsetX,
        pointY:ev.offsetY,
      }
      this.dragComponent=item
      this.$store.commit('resetActiveComponent')
      //兼容firefox
      ev.dataTransfer.setData("type", item.type)
      //用来指定拖动时被允许的效果
      ev.dataTransfer.effectAllowed='copy'
    },
    //拖拽结束 释放正在拖拽暂存
    drop(){
      this.dragComponent=null
    },
    //保存定制
    save(){
      if(!this.validate()) return

      const storePage=this.isEditor?http.savePage:http.createPage
      storePage.call(http, {
        ...this.$store.state.page
      })
      .then(res=>{        
        this.$alert('保存成功，即将跳转到列表页面！', '保存成功', {
          confirmButtonText: 'OK',
          showClose:false,
          callback: action => {
            this.$router.push({path:'/PageList'})
          }
        })  
      })
      .catch(res=>{
        this.$store.commit('resetActiveComponent')
      })
    },
    //保存并预览
    preview(){
      if(!this.validate()) return

      const storePage=this.isEditor?http.savePage:http.createPage
      storePage.call(http, {
        ...this.$store.state.page
      })
      .then(res=>{       
        this.$alert('保存成功，即将跳转到预览页面！', '保存成功', {
          confirmButtonText: 'OK',
          showClose:false,
          callback: action => {
            this.$router.push({path:`/PagePreview?urlKey=${this.$store.state.page.urlKey}`})
          }
        })         
      })
      .catch(res=>{
        this.$store.commit('resetActiveComponent')
      })
    },
    //发布定制
    release(){
      if(!this.validate()) return
      
      const storePage=this.isEditor?http.savePage:http.createPage
      storePage.call(http, {
        ...this.$store.state.page,
        status:'release'
      })     
      .then(res=>{            
        this.$alert('保存并发布成功，即将跳转到列表页面！', '发布成功', {
          confirmButtonText: 'OK',
          showClose:false,
          callback: action => {
            this.$router.push({path:'/PageList'})
          }
        })      
      })
      .catch(res=>{
        this.$store.commit('resetActiveComponent')
      })
    },
    //验证是否有效
    validate(){
      let result=true
      let page=this.page
      let activeComponent=this.activeComponent

      // 组件数量验证
      // if(page.components.length==0){
      //   this.$message({
      //     type: 'error',
      //     message:'请至少拖入一个组件！'
      //   })
      //   return false
      // }
  
      if(activeComponent.type=='page'){
       //先验证激活页面组件,然后依次验证其他组件,其他组件验证不通过则设置为激活组件并返回
       if(this.validatePage(page)){
         for(let i=0;i<page.components.length;i++){
           if(this.validateComponent(page.components[i])){
              continue
           }else{
              this.$store.commit('setActiveComponent', page.components[i])
              return false  
           }
         }
       }else{
         return false
       }
      }else{
        //先验证激活组件,然后依次验证其他组件,最后验证页面组件,验证不通过则设置为激活组件并返回
        //activeComponent=arrayFindObject(page.components,'id',activeComponent.id)
      
        if(this.validateComponent(activeComponent)){
          for(let i=0;i<page.components.length;i++){
            if(this.validateComponent(page.components[i])){
              for(let j=0;page.components[i].children&&j<page.components[i].children.length;j++){
                if(this.validateComponent(page.components[i].children[j])){
                  continue
                }else{
                  this.$store.commit('setActiveComponent', page.components[i].children[j])
                  return false  
                }
              }
            }else{
              this.$store.commit('setActiveComponent', page.components[i])
              return false          
            }
          }
          if(!this.validatePage(page)){
            this.$store.commit('resetActiveComponent')
            return false
          }
        }else{
          return false
        }        
      }
      
      return true
    },
    //验证页面组件
    validatePage(page){
      if(validateUtil.isEmpty(page.urlKey)){
        this.$message({
          type: 'error',
          message:'页面组件-请填写URLKey!'
        })
        return false
      }
      if(!validateUtil.isUrlKey(page.urlKey)){
        this.$message({
          type: 'error',
          message:'页面组件-请填写正确的URLKey!'
        })
        return false
      }
      if(validateUtil.isEmpty(page.name)){
        this.$message({
          type: 'error',
          message:'页面组件-请填写落地页名称!'
        })
        return false
      }
      if(validateUtil.isEmpty(page.title)){
        this.$message({
          type: 'error',
          message:'页面组件-请填写页面标题!'
        })
        return false
      }
      if(page.needExpire){
        if(!page.expireDate){
          this.$message({
            type: 'error',
            message:'页面组件-请选择有效期时间！'
          })
          return false
        }

        if(page.expireDate<=Date.now()){
          this.$message({
            type: 'error',
            message:'页面组件-有效期已过期，请重新选择！'
          })
          return false
        }       
      }
      if(page.extra.needShare){
        if(!page.extra.shareText.trim()){
          this.$message({
            type: 'error',
            message:'页面组件-请填写分享标题！'
          })
          return false
        }
        if(!page.extra.shareImage.trim()){
          this.$message({
            type: 'error',
            message:'页面组件-请上传分享图片！'
          })
          return false
        }      
      }
       if(page.extra.needBackTop&&!page.extra.backTopImage){        
        this.$message({
          type: 'error',
          message:'页面组件-请上传返回顶部图标！'
        })
        return false
      }      

      return  true
    },
    //验证对应组件
    validateComponent(component){   
      let message=''
      switch(component.type){
        case 'Picture':
          if(validateUtil.isEmpty(component.imageUrl)){
            this.$message({
              type: 'error',
              message:'图片组件-请上传图片！'
            })
            return false
          }  

          if(component.linkType=='goods'&&validateUtil.isEmpty(component.link)){
            message='图片组件-请填写小程序商品ID！'
            this.$message({
              type: 'error',
              message:message
            })
            return false
          }

          if(component.linkType=='page'&&validateUtil.isEmpty(component.link)){
            message='图片组件-请填写小程序页面路径！'
            this.$message({
              type: 'error',
              message:message
            })
            return false
          }

          if(component.linkType=='h5'&&validateUtil.isEmpty(component.link)){
            message='图片组件-请填写H5链接地址！'
            this.$message({
              type: 'error',
              message:message
            })
            return false
          }      
        break;

        case 'Video':
          if(validateUtil.isEmpty(component.videoLink)){
            this.$message({
              type: 'error',
              message:'请填写视频链接地址！'
            })
            return false
          }
          if(component.isSwitch&&validateUtil.isEmpty(component.imageUrl)){            
            this.$message({
              type: 'error',
              message:'请上传封面图片！'
            })
            return false            
          }
        break;


        case 'Carousel':
        break;
      }

      return true
    },
    iconClass(type){
      let className=''
      switch(type){
        case 'Picture':
          className='el-icon-picture'
        break;

        case 'Carousel':
          className='el-icon-s-grid'
        break;

        case 'Video':
          className='el-icon-film'
        break;

        case 'Goods':
          className='el-icon-goods'
        break;

        case 'Event':
          className='el-icon-thumb'
        break;

        default:
          className='el-icon-chicken'
      }
      return className
    }
  },
  components:{
    pageCenter,
    pageRight,
    ContextMenu,
    HeadInfo,
    BreadCrumb,
  }
}
</script>
