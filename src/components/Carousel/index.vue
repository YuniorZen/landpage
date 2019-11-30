<!-- 轮播图展示组件 -->
<template>
  <div class="component-carousel component-view" :style="style">
    <el-carousel 
    :height="height/rem2px+'rem'" 
    :direction="direction"
    :loop="loop"
    :autoplay="autoplay"
    :interval="interval">
      <el-carousel-item v-for="(item,index) in slides" :key="index">
        <img :src="item.imageUrl&&(staticURL+item.imageUrl)||'static/img/blank.png'" @click="click(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import './carousel.scss'
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
import http from '@/http/'

export default {
  name:'Carousel',
  //组件需要的属性
  props:{
    //组件名称
    name:String,
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
    //轮播项
    slides:{
      type:Array,
      default:function(){
        return [
          {imageUrl:'',linkType:'page',link:''},
          {imageUrl:'',linkType:'page',link:''}
        ]
      }
    },   
    //滚动方向
    direction:{
      type:String,
      default:'horizontal'
    },
    //自动播放
    autoplay:{
      type:Boolean,
      default:true
    },
    //间隔时间
    interval:{
      type:Number,
      default:2500,
    },
    //循环切换
    loop:{
      tyep:Boolean,
      default:true
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
    //高度
    height:{
      type:Number,
      default:300,
    },

    //是否层级子组件
    isChild:{
      type:Boolean,
      default:false
    },
    //层级子组件左距离
    left:Number,
    //层级子组件上距离
    top:Number   
  },
  data() {
    return {    
      //静态图片地址
      staticURL:http.staticURL,
      //rem to px的比例
      rem2px:rem2px,
    }
  },
  computed:{
    //根据设置参数计算样式
    style(){
      let style= `height:${this.height/rem2px}rem;`;
      if(this.isChild){
        style+=`position:absolute;top:${this.top/rem2px}rem;left:${this.left/rem2px}rem;
                width:${this.width/rem2px}rem;`
      }else{
        style+=`margin-top:${this.marginTop/rem2px}rem;margin-bottom:${this.marginBottom/rem2px}rem;margin-left:auto;margin-right:auto;`
        if(this.width==viewWidth){
          style+=`width:100%;`
        }else{
          style+=`width:${this.width/rem2px}rem;`
        }
      }    
     
      return style
    }
  },
  methods:{
    click(item){
      let linkType=item.linkType;

      //组件在编辑环境展现不处理事件响应
      if(window.landpage_env&&landpage_env=='editor'||!item.link) return     
   
      if(linkType=='page'){
        //小程序页面
        checkMiniProgram()
        .then(res=>{
          if(res){
            wx.miniProgram.navigateTo({url:item.link});
          }else{
            alert('当前环境不是小程序端')
          }          
        })
      }else if(linkType=='h5'){
        //h5链接
        location.href=item.link
      }
    }
  }
}
</script>
