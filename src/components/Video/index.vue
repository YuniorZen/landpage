<template>
<!-- http://1255402581.vod2.myqcloud.com/7bd8fd48vodtransgzp1255402581/510a4c4b7447398154704162707/v.f20.mp4 -->

  <div class="component-video component-view" :style="style">
    <!-- 封面图片 -->
    <div class="video-poster" :style='posterStyle' v-if="!isPlay" @click="play">
      <div class="icon-play"></div>
    </div>

    <!-- 视频元素 -->
    <video :id="'video'+id"  :src="videoLink" @ended="playEnd"
      controls    
      webkit-playsinline="true" 
      playsinline="true" 
      x-webkit-airplay="allow" 
      x5-video-player-type="h5"  
      x5-video-player-fullscreen="true" 
      x5-video-orientation="portraint">
    </video>
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
  mounted(){
   
  },
  methods:{
    //开始播放
    play(e){
      if(!this.videoLink){
        this.$message({type: 'error',message:'无视频链接~'})
        return
      } else if(!this.confirmEnding(this.videoLink,'.mp4')) {
        this.$message({type: 'error',message:'视频后缀为mp4格式!'})
        return
      }  
      let video=document.querySelector('#video'+this.id);
      if(video){
        video.play()     
      }
      this.isPlay = true
    },
    //监听播放结束
    playEnd(e){
      this.isPlay = false
    },
    // 判断结尾格式方法
    confirmEnding(str, target) {
      let start = str.length-target.length;
      let arr = str.substr(start,target.length);
      if(arr == target){
        return true;
      }
      return false;
    }
  }
}
</script>
