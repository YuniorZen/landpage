<template>
  <div class="carousel-set">
     <!-- 添加轮播图片 -->
    <div class="border-wraper mb20">
      <div class="setting-carousels">
        <div class="carousels-item" v-for="(item,index) in slides" :key="index">
          <div class="item-img">
            <el-upload class="img-uploader"
              name="picture"
              :action="uploadUrl"
              v-loading="loading"
              accept="image/*"
              :show-file-list="false"
              :on-success="uploadSuccess"      
              :on-error="uploadError"
              :before-upload="beforeUpload">
              <img  :src="item.imageUrl&&(staticURL+item.imageUrl)||'static/img/blank.png'" class="img-preview"/>         
            </el-upload>  
          </div>
          <div class="item-attrs">
            <div class="attr-wraper">
              <div class="attr-name">链接类型：</div>
              <div class="attr-value">
                <el-radio v-model="item.linkType" label="page">小程序页面</el-radio>    
                <el-radio v-model="item.linkType" label="h5">H5链接</el-radio>       
              </div>  
            </div> 
            <div class="attr-wraper">
              <template v-if="item.linkType=='page'">
                <el-input type="text" placeholder="请输入小程序页面路径" v-model="item.link"></el-input>
              </template> 
              <template v-else>
                <el-input type="text" placeholder="请输入H5链接地址" v-model="item.link"></el-input>
              </template> 
            </div>  
          </div>
          <div class="item-operate">
            <i class="el-icon-close" title="删除" @click="deleteSlide(index)"></i> 
            <i class="el-icon-sort-up" title="上移" @click="moveSlide(index,'pre')"></i> 
            <i class="el-icon-sort-down" title="下移" @click="moveSlide(index,'next')"></i> 
          </div>
        </div>
        <div class="carousels-add align-center" @click="addSlide">
          <div class="addbtn"><i class="el-icon-plus"></i> 添加轮播图片</div>
          <div class="tip-info">图片上传支持jpg/jpeg/png/gif格式，最大不能超过1MB</div>
        </div>
      </div>
    </div>

     <!-- 轮播组件设置 -->
    <div class="border-wraper mb20">
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">滚动方向：</el-col>
        <el-col class="item-value">
          <el-radio v-model="direction" label="horizontal">横向</el-radio>
          <el-radio v-model="direction" label="vertical">竖向</el-radio>    
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">自动轮播：</el-col>
        <el-col class="item-value">
          <el-switch v-model="autoplay"> </el-switch>   
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle" v-if="autoplay">
        <el-col class="item-name">轮播间隔：</el-col>
        <el-col class="item-value">
          <el-row type="flex" align="middle">
            <el-col>
            <el-slider v-model="interval" :max="10000" :min="100" :show-tooltip="false" :step="100"></el-slider>
            </el-col>
            <el-col class="value-right">{{interval}}ms</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="setting-item" type="flex" align="middle">
        <el-col class="item-name">循环切换：</el-col>
        <el-col class="item-value">
          <el-switch v-model="loop"> </el-switch>   
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
  name:'CarouselSet',
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
      //组件特有属性  
      data.direction=this.component.direction||'horizontal'
      data.autoplay=this.component.autoplay||true
      data.interval=this.component.interval||2500     
      data.loop=this.component.loop||false
      data.slides=this.component.slides||[
        {imageUrl:'',linkType:'page',link:''},
        {imageUrl:'',linkType:'page',link:''},
      ]

      //组件基础属性
      data.width=this.component.width||viewWidth
      data.marginTop=this.component.marginTop||0
      data.marginBottom=this.component.marginBottom||0

      //层级子组件特有属性
      data.height=this.component.height
      data.top=this.component.top
      data.left=this.component.left       
    },
    //添加轮播图选项
    addSlide(){
      this.slides.push({imageUrl:'',linkType:'page',link:''})
    },
    //上移、下移轮播项
    moveSlide(index,type){
      let temp=this.slides[index]
      switch(type){
        case 'pre':
        if(index!=0){
          this.slides.splice(index,1)
          this.slides.splice(index-1,0,temp)
        }
        break;
        
        case 'next':
        if(index!=this.slides.length-1){
          this.slides.splice(index,1)
          this.slides.splice(index+1,0,temp)
        }
        break;
      }
    },
    //删除轮播项
    deleteSlide(index){
      if(this.slides.length==1)return this.$message.error(`至少保留一项轮播图！`); 
      this.slides.splice(index,1)
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
