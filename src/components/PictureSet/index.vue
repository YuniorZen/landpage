<template>
  <div class="picture-set">
     <!-- 上传图片 -->
    <div class="border-wraper mb20">
      <el-row class="setting-item nomargin-bottom" type="flex" align="middle">
        <el-col class="item-name">上传图片：</el-col>
        <el-col class="item-value">
          <el-upload class="img-uploader"
            name="picture"
            :action="uploadUrl"
            v-loading="loading"
            accept="image/*"
            :show-file-list="false"
            :on-success="uploadSuccess"      
            :on-error="uploadError"
            :before-upload="beforeUpload">
            <img  :src="imageUrl&&(staticURL+imageUrl)||'static/img/blank.png'" class="img-preview"/>         
          </el-upload>        
        </el-col>
      </el-row>
      <div class="tip-info align-center">图片上传支持jpg/jpeg/png/gif格式，最大不能超过1MB</div>
    </div>
     <!-- 图片链接 -->
    <div class="border-wraper mb20">
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">链接类型：</el-col>
        <el-col class="item-value">
          <el-radio v-model="linkType" label="goods">商品</el-radio>
          <el-radio v-model="linkType" label="page">页面</el-radio>    
          <el-radio v-model="linkType" label="h5">H5链接</el-radio>       
          <el-radio v-model="linkType" label="none">无</el-radio>     
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle" v-if="linkType=='goods'">
        <el-col class="item-name">小程序商品：</el-col>
        <el-col class="item-value">
          <el-input type="text" placeholder="请输入商品ID" v-model="goodsLink"></el-input>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle" v-if="linkType=='page'">
        <el-col class="item-name">小程序页面:</el-col>
        <el-col class="item-value">
          <el-input type="text" placeholder="请输入小程序页面路径" v-model="pageLink"></el-input>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle" v-if="linkType=='h5'">
        <el-col class="item-name">H5链接:</el-col>
        <el-col class="item-value">
          <el-input type="text" placeholder="请输入H5链接地址" v-model="h5Link"></el-input>
        </el-col>
      </el-row>
    </div>


    <!-- 组件基本属性设置 -->
    <div class="border-wraper">
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">宽度：</el-col>
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
import {viewWidth} from '@/utility/landpage'
import http from '@/http/'
export default {
  name:'PictureSet',
  props:{
    component:{
      type:Object,
      required:true
    }
  },
  data() {
    let data={}
    this.initProps(data)
    return {
      //落地页容器宽度
      viewWidth,
      //小程序商品链接
      goodsLink:'',
      //小程序页面链接
      pageLink:'',
      //H5链接
      h5Link:'',
      //加载中
      loading:false,
      //图片上传地址
      uploadUrl:http.uploadURL,
      //静态图片地址
      staticURL:http.staticURL,
      
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
    //监听链接类型-同步组件数据
    linkType(newVal,oldVal){
      let link=''
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'linkType', newVal})
      switch(newVal){
        case 'goods':
          link=this.goodsLink;
        break;
        
        case 'page':
          link=this.pageLink;
        break;

        case 'h5':
          link=this.h5Link;
        break;

        case 'none':
          link='';
        break;
      }
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'link', newVal:link})
      this.link=link
    },
    //监听小程序商品链接-同步组件数据
    goodsLink(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'link', newVal})
      this.link=newVal
    },
    //监听小程序页面链接-同步组件数据
    pageLink(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'link', newVal})
      this.link=newVal
    },
    //监听H5链接-同步组件数据
    h5Link(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'link', newVal})
      this.link=newVal
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
      data.imageUrl=this.component.imageUrl
      data.linkType=this.component.linkType||'none'
      data.link=this.component.link||''      
     
      switch(data.linkType){
        case 'goods':
          data.goodsLink=data.link;
        break;
        
        case 'page':
          data.pageLink=data.link;
        break;

        case 'h5':
          data.h5Link=data.link;
        break;
      } 
    

      data.width=this.component.width||viewWidth
      data.marginTop=this.component.marginTop||0
      data.marginBottom=this.component.marginBottom||0

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
