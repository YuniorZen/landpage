<template>
  <div class="full-container">
    <div class="component-name">{{this.activeComponent.name}}{{this.activeComponent.type=='page'?'':'组件'}}设置</div>
    <!-- 页面属性设置 -->
    <div class="page-set" v-if="this.activeComponent.type=='page'">
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name"><span class="required">*</span> URLKey：</el-col>
        <el-col class="item-value">
          <el-input type="text" :disabled="isEditor" placeholder="请输入唯一的英文、数字或下划线组合" v-model="urlKey"></el-input>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name"><span class="required">*</span> 落地页名称：</el-col>
        <el-col class="item-value">
          <el-input type="text" placeholder="请输入落地页名称" v-model="name"></el-input>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name"><span class="required">*</span> 页面标题：</el-col>
        <el-col class="item-value">
          <el-input type="text" placeholder="请输入页面标题" v-model="title"></el-input>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">页面底色：</el-col>
        <el-col class="item-value">
          <el-color-picker v-model="extra.backgroundColor" show-alpha></el-color-picker>
        </el-col>
      </el-row>
       <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">有效期：</el-col>
        <el-col class="item-value">
          <el-switch v-model="needExpire"></el-switch>          
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle" v-if="needExpire">
        <el-col class="item-name"><span class="required">*</span> 有效期至：</el-col>
        <el-col class="item-value">
          <el-date-picker
            v-model="expireDate"
            :picker-options="pickerOptions"
            type="datetime"
            align="right"
            value-format="timestamp"
            placeholder="请选择日期时间" />
        </el-col>
      </el-row> 
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">自定义分享：</el-col>
        <el-col class="item-value">
          <el-switch v-model="extra.needShare"></el-switch>          
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle"  v-if="extra.needShare">
        <el-col class="item-name"><span class="required">*</span> 分享标题：</el-col>
        <el-col class="item-value">
          <el-input type="text" placeholder="请输入分享标题，建议15个汉字左右" v-model="extra.shareText"></el-input>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle"  v-if="extra.needShare">
        <el-col class="item-name"><span class="required">*</span> 分享图片：</el-col>
        <el-col class="item-value">
          <el-upload class="img-uploader"
            name="picture"
            :action="uploadUrl"
            v-loading="loading"
            accept="image/*"
            :show-file-list="false"
            :on-success="uploadSuccessShare"
            :on-error="uploadError"
            :before-upload="beforeUploadShare">
            <img  :src="extra.shareImage&&(staticURL+extra.shareImage)||'static/img/blank.png'" class="share-image"/>          
          </el-upload>
          <div class="tip-info">图片需为正方形，且最大不能超过800px</div>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">返回顶部功能：</el-col>
        <el-col class="item-value">
          <el-switch v-model="extra.needBackTop"></el-switch>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle"  v-if="extra.needBackTop">
        <el-col class="item-name"><span class="required">*</span> 返回顶部图标：</el-col>
        <el-col class="item-value">
          <el-upload class="img-uploader"
            name="picture"
            :action="uploadUrl"
            v-loading="loading"
            accept="image/*"
            :show-file-list="false"
            :on-success="uploadSuccessBackTop"
            :on-error="uploadError"
            :before-upload="beforeUploadBackTop">
            <img  :src="extra.backTopImage&&(staticURL+extra.backTopImage)||'static/img/blank.png'" class="backtop-image"/>          
          </el-upload>
        </el-col>
      </el-row>          
    </div>

    <!-- 组件属性设置 -->
    <div class="componet-set" v-else>
      <!-- 动态组件加载 -->
      <component v-bind:is="`${activeComponent.type}Set`" :component="activeComponent"></component>
    </div>
  </div>
</template>

<script>
import './pageright.scss'
//动态组件引入
import CarouselSet from '@/components/CarouselSet'
import EventSet from '@/components/EventSet'
import GoodsSet from '@/components/GoodsSet'
import PictureSet from '@/components/PictureSet'
import VideoSet from '@/components/VideoSet'
import http from '@/http/'

import {mapState} from 'vuex'
export default {
  data() {
    const page=this.$store.state.page
  
    return {
      //页面名称
      name:page.name,
      //页面标题
      title:page.title,
      //页面唯一的key
      urlKey:page.urlKey,
      //是否需要有效期
      needExpire:page.needExpire,
      expireDate:page.expireDate,
      //额外功能字段
      extra:{
        //页面背景色
        backgroundColor:page.extra.backgroundColor,
        //是否需要返回顶部按钮
        needBackTop:page.extra.needBackTop,
        backTopImage:page.extra.backTopImage,
        //是否需要自定义分享
        needShare:page.extra.needShare,
        shareText:page.extra.shareText,
        shareImage:page.extra.shareImage,
      },
      //有效期时间限制
      pickerOptions: {
        disabledDate(time) {
          let today = Date.now()
          return time.getTime() <today;
        }
      },
      isEditor:this.$route.path=='/PageEditor',
       //加载中
      loading:false,
      //图片上传地址
      uploadUrl:http.uploadURL,
      //静态图片地址
      staticURL:http.staticURL,
    }
  },
  watch:{
    //监听URLKey-同步页面数据
    urlKey(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'urlKey', newVal})
    },
    //监听落地页名称-同步页面数据
    name(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'name', newVal})
    },
    //监听页面标题-同步页面数据
    title(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'title', newVal})
    },
     //监听页面底色-同步页面数据
    'extra.backgroundColor':function(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'extra.backgroundColor', newVal, multi:true})         
    },    
    //监听返回顶部开关-同步页面数据
    'extra.needBackTop':function(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'extra.needBackTop', newVal, multi:true})
      if(newVal){
        this.$store.commit('setPageProp',{prop:'extra.backTopImage', newVal:this.extra.backTopImage, multi:true})
      }else{
        this.$store.commit('setPageProp',{prop:'extra.backTopImage', newVal:'', multi:true})
      }     
    },
    //监听返回顶部图片-同步页面数据
    'extra.backTopImage':function(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'extra.backTopImage', newVal, multi:true})
    },
    //监听自定义分享开关-同步页面数据
    'extra.needShare':function(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'extra.needShare', newVal, multi:true})
      if(newVal){
        this.$store.commit('setPageProp',{prop:'extra.shareText', newVal:this.extra.shareText, multi:true})
        this.$store.commit('setPageProp',{prop:'extra.shareImage', newVal:this.extra.shareImage, multi:true})
      }else{
        this.$store.commit('setPageProp',{prop:'extra.shareText', newVal:'', multi:true})
        this.$store.commit('setPageProp',{prop:'extra.shareImage', newVal:'', multi:true})
      }     
    },
    //监听分享标题-同步页面数据
    'extra.shareText':function(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'extra.shareText', newVal, multi:true})
    },
    //监听分享图片-同步页面数据
    'extra.shareImage':function(newVal,oldVal){
      console.log(newVal,oldVal)
      this.$store.commit('setPageProp',{prop:'extra.shareImage', newVal, multi:true})
    },
    //监听有效期开关-同步页面数据
    needExpire(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'needExpire', newVal})
      if(newVal){
        this.$store.commit('setPageProp',{prop:'expireDate', newVal:this.expireDate})
      }else{
        this.$store.commit('setPageProp',{prop:'expireDate', newVal:''})
      }
    },
    //监听有效期-同步页面数据
    expireDate(newVal,oldVal){
      this.$store.commit('setPageProp',{prop:'expireDate', newVal})
    },    
  },
  computed:{
    ...mapState({
      activeComponent:state=>state.activeComponent,
      page:state=>state.page,
    })
  },
  methods:{
    //分享图片上传之前的验证
    beforeUploadShare (file){
      const isLt2M = file.size / 1024 / 1024 <= 1;
      if(!isLt2M) {
        this.$alert('上传图片大小不能超过 1MB！', '上传失败', {
          confirmButtonText: 'OK',
          showClose:false
        })  
        return false
      }

      return  new Promise((resolve, reject)=>{
        let _URL = window.URL || window.webkitURL;         
        let img = new Image();
        img.onload =()=>{        
          if(img.width==img.height&&img.width<=800){
            this.loading=true
            resolve()
          }else{
            this.$alert('图片需为正方形，且最大尺寸不超过800x800，请重新上传！', '上传失败', {
              confirmButtonText: 'OK',
              showClose:false
            })  
            reject()
          }
        }
        img.src = _URL.createObjectURL(file);
      })
    },
    //分享图片上传成功
    uploadSuccessShare(res, file){
      this.loading=false
      this.extra.shareImage = res.data.path
      this.$message.success(`分享图片上传成功！`,file); 
    },
    //返回顶部图片上传之前的验证
    beforeUploadBackTop (file){
      const isLt2M = file.size / 1024 / 1024 <= 1;
      if (!isLt2M) {
        this.$alert('上传图片大小不能超过 1MB！', '上传失败', {
          confirmButtonText: 'OK',
          showClose:false
        })  
        return false
      }
      
      return this.loading=true
    },   
    //返回顶部图片上传成功
    uploadSuccessBackTop(res, file){
      this.loading=false
      this.extra.backTopImage = res.data.path
      this.$message.success(`返回顶部图标上传成功！`,file); 
    },
    //上传失败
    uploadError(err, file){
      this.loading=false
      this.$message.error(`上传图片失败：${err}`);      
    }
  },
  components:{
    CarouselSet,
    EventSet,
    GoodsSet,
    PictureSet,
    VideoSet,
  }
}
</script>