<template>
  <div class="component-event component-view" :style="style">
    {{$attrs.name}}
  </div>
</template>

<script>
import './event.scss'
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
export default {
  name:'Event',
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
