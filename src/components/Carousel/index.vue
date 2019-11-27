<template>
  <div class="component-carousel component-view" :style="style">
    {{$attrs.name}}
  </div>
</template>

<script>
import './carousel.scss'
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
export default {
  name:'Carousel',
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
    //轮播数组
    slides:{
      type:Array,
      default:function(){
        return [
          {
            imageUrl:'static/img/blank.png',
            linkType:'goods',
            link:''
          }
        ]
      }
    },
    //轮播速度 
    speed:{
      type:Number,
      default:2500
    },
    //循环滑动
    loop:{
      type:Boolean,
      default:false
    },
    //轮播方向 
    direction:{
      type:String,
      default:'horizontal'
    }
  },
  computed:{
    //根据设置参数计算样式
    style(){
      let style='';
      style+=`margin-top:${this.marginTop/rem2px}rem;margin-bottom:${this.marginBottom/rem2px}rem;margin-left:auto;margin-right:auto;`

      if(this.width==viewWidth){
        style+=`width:100%;`
      }else{
        style+=`width:${this.width/rem2px}rem;`
      }
      
      return style
    }
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>
