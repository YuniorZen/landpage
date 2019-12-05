<template>
  <div class="component-video component-view" :style="style">
    <!-- 封面图片 -->
    <div class="video-poster" :style='posterStyle' v-if="!isPlay" @click="play">
      <div class="icon-play"></div>
    </div>

    <!-- 视频元素 -->
    <video :id="'video'+id"  :src="videoLink" @ended="playEnd" controls ></video>
  </div>
</template>

<script>
import './video.scss'
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
import http from '@/http/'
export default {
  name:'Video',
  props:{
    //组件唯一的ID
    id:{
      type:String,
      required:true
    },
    //组件的类型
    type:{
      type:String,
      required:true
    },
    //上边距
    marginTop:{
      type:Number,
      default:0
    },
    //下边距
    marginBottom:{
      type:Number,
      default:0
    },
    //宽度
    width:{
      type:Number,
      default:viewWidth
    },
    //封面图地址
    imageUrl:String,
    //是否开启封面图
    isSwitch:Boolean,
    //视屏地址
    videoLink:String,
    //是否层级子组件
    isChild:{
      type:Boolean,
      default:false
    },
    //层级子组件的高度
    height:Number,
    //层级子组件左距离
    left:Number,
    //层级子组件上距离
    top:Number   
  },
  data() {
    return {    
      isPlay: false,
      //静态图片地址
      staticURL:http.staticURL,
    }
  },
  computed:{
    //根据设置参数计算样式
    style(){
      let style='';
      if(this.isChild){
        style+=`position:absolute;top:${this.top/rem2px}rem;left:${this.left/rem2px}rem;width:${this.width/rem2px}rem;height:${this.height/rem2px}rem;`
      }else {
        style+=`margin-top:${this.marginTop/rem2px}rem;margin-bottom:${this.marginBottom/rem2px}rem;margin-left:auto;margin-right:auto;`
  
        if(this.width==viewWidth){
          style+=`width:100%;`
        }else{
          style+=`width:${this.width/rem2px}rem;`
        }
      }
      
      return style
    },
    //根据设置参数计算封面图片
    posterStyle(){
      let style='';
      if(this.isSwitch&&this.imageUrl){
        style+=`background-image:url(${this.staticURL+this.imageUrl})`
      }      
      return style
    }
  },
  methods:{
    //开始播放
    play(e){
      if(this.videoLink){
        let video=document.querySelector('#video'+this.id);
        if(video){
          video.play()     
          this.isPlay = true
        }  
      }else{
        if(window.landpage_env!='editor'){
          this.$message.error('未添加视频链接！')
        } 
      }          
    },
    //监听播放结束
    playEnd(e){
      this.isPlay = false
    }
  }
}
</script>
