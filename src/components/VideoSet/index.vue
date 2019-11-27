<template>
  <div class="video-set">
    <div class="border-wraper mb20">
        <el-row class="setting-item" type="flex" align="middle">
          <el-col class="item-name">视频链接：</el-col>
          <el-col class="item-value">
            <el-input type="text" placeholder="请输入视频链接地址" v-model.trim="videoLink"></el-input>
          </el-col>
        </el-row> 
       <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">上传封面：</el-col>
        <el-col class="item-value">
          <el-switch v-model="isSwitch"> </el-switch>
        </el-col>
      </el-row> 
      <el-row class="setting-item" type="flex" align="middle" v-if="isSwitch">
        <el-col class="item-name"><span class="required">*</span> 上传封面：</el-col>
        <el-col class="item-value">
          <el-upload class="img-uploader"
            name="picture"
            :action="uploadUrl"
            v-loading="loading"
            accept="image/*"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-progress="uploadProgress"
            :on-error="uploadError"
            :before-upload="beforeUpload">
            <img  :src="imageUrl&&(staticURL+imageUrl)||'static/img/blank.png'" class="img-preview"/>         
          </el-upload>
        </el-col>
      </el-row>
      <div class="tip-info align-center" v-if="isSwitch">图片上传支持jpg/jpeg/png/gif格式，最大不能超过1MB</div>
    </div>
    <div class="border-wraper mb20">
      <!-- 组件基本属性设置 -->
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">宽 度：</el-col>
        <el-col class="item-value">
          <el-row type="flex" align="middle">
            <el-col>
            <el-slider v-model="width" :max="viewWidth" :min="100" :show-tooltip="false"></el-slider>
            </el-col>
            <el-col class="value-right">{{width}}px</el-col>
          </el-row>
        </el-col>
      </el-row> 
      <!-- 层级子组件属性 -->
      <template v-if="component.isChild">
        <el-row class="setting-item" type="flex" align="middle">
          <el-col class="item-name">高度：</el-col>
          <el-col class="item-value">
            <el-row type="flex" align="middle">
              <el-col>
              <el-slider v-model="height" :max="viewWidth" :min="100" :show-tooltip="false"></el-slider>
              </el-col>
              <el-col class="value-right">{{height}}px</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="setting-item" type="flex" align="middle">
          <el-col class="item-name">上边距：</el-col>
          <el-col class="item-value">
            <el-row type="flex" align="middle">
              <el-col>
              <el-slider v-model="top" :max="viewWidth" :show-tooltip="false"></el-slider>
              </el-col>
              <el-col class="value-right">{{top}}px</el-col>
            </el-row>
          </el-col>
        </el-row> 
        <el-row class="setting-item" type="flex" align="middle">
          <el-col class="item-name">左边距：</el-col>
          <el-col class="item-value">
            <el-row type="flex" align="middle">
              <el-col>
              <el-slider v-model="left" :max="viewWidth" :show-tooltip="false"></el-slider>
              </el-col>
              <el-col class="value-right">{{left}}px</el-col>
            </el-row>
          </el-col>
        </el-row>   
      </template>  
      <!-- 普通块级组件属性 -->
      <template v-else>
        <el-row class="setting-item" type="flex" align="middle">
          <el-col class="item-name">上边距：</el-col>
          <el-col class="item-value">
            <el-row type="flex" align="middle">
              <el-col>
              <el-slider v-model="marginTop" :max="100" :show-tooltip="false"></el-slider>
              </el-col>
              <el-col class="value-right">{{marginTop}}px</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="setting-item" type="flex" align="middle">
          <el-col class="item-name">下边距：</el-col>
          <el-col class="item-value">
            <el-row type="flex" align="middle">
              <el-col>
              <el-slider v-model="marginBottom" :max="100" :show-tooltip="false"></el-slider>
              </el-col>
              <el-col class="value-right">{{marginBottom}}px</el-col>
            </el-row>
          </el-col>
        </el-row>  
      </template> 
    </div>
  </div>
</template>

<script>
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
import http from '@/http/'
export default {
  props:{
    component:{
      type:Object,
      required:true
    }
  },
  data() {
    let data={}
    const page=this.$store.state.page
    this.initProps(data)
    return {
      //落地页容器宽度
      viewWidth,
      //加载中
      loading:false,
      //静态图片地址
      staticURL:http.staticURL,
      //图片上传地址
      uploadUrl:http.uploadURL,
       ...data,
    }
  },
  watch:{
    //监听相同组件激活切换
    'component.id':function(newVal, oldVal){
      if(oldVal&&newVal&&oldVal!==newVal){
        this.initProps(this)
      }
    },
    //监听图片上传-同步组件数据
    imageUrl(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'imageUrl', newVal})
    },
    //监听封面开关
    isSwitch(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'isSwitch', newVal})
    },
    //监听宽度设置-同步组件数据
    width(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'width', newVal})
    },
    //监听上边距设置-同步组件数据
    marginTop(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'marginTop', newVal})
    },
    //监听下边距设置-同步组件数据
    marginBottom(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'marginBottom', newVal})
    },
    //监听页面标题-同步页面数据
    videoLink(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id,prop:'videoLink', newVal})
    },
     //监听高度设置-层级子元素属性
    height(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'height', newVal})
    },
    //监听上边距设置-层级子元素属性
    top(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'top', newVal})
    },
    //监听左边距设置-层级子元素属性
    left(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'left', newVal})
    },
  },
  methods:{
    //初始化图片组件状态
    initProps(data){      
      data.imageUrl=this.component.imageUrl||''
      data.videoLink=this.component.videoLink||''
      data.marginTop=this.component.marginTop||0
      data.marginBottom=this.component.marginBottom||0
      data.width=this.component.width||viewWidth
      data.isSwitch=this.component.isSwitch || false
    
      //层级子组件特有属性
      data.height=this.component.height
      data.top=this.component.top
      data.left=this.component.left   
    },
     //上传之前的验证
    beforeUpload(file){
      const isLt1M = file.size / 1024 / 1024 <= 1;
      if (!isLt1M) {
        this.$alert('图片最大不能超过1MB，请调整后，重新上传！', '请重新上传', {
          confirmButtonText: 'OK',
          showClose:false
        })  
        return false
      }
      
      this.loading=true
      return true
    },
     //上传过程中
    uploadProgress(event, file){     
      console.log(event,'上传中')
    },
    //上传成功
    uploadSuccess(res, file){
      this.loading=false
      this.imageUrl = res.data.path
      this.$message.success(`上传图片成功！`); 
    },
    //上传失败
    uploadError(err, file){
      this.loading=false
      this.$message.error(`上传图片失败：${err}`);      
    }
  }
}
</script>
