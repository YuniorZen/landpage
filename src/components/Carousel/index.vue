<template>
  <div class="component-picture component-view" :style="style">
    <div class="picture-img" @click="click">
      <img :src="imageUrl&&(staticURL+imageUrl)||'static/img/blank.png'" />
    </div>
  </div>
</template>

<script>
import './carousel.scss'
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
import http from '@/http/'

export default {
  name:'Picture',
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
    //图片地址
    imageUrl:String,   
    //链接类型
    linkType:String,
    //链接地址
    link:String,


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
      //静态图片地址
      staticURL:http.staticURL,
    }
  },
  mounted(){
   
  },
  computed:{
    //根据设置参数计算样式
    style(){
      let style='';
      if(this.isChild){
        style+=`position:absolute;top:${this.top/rem2px}rem;left:${this.left/rem2px}rem;
                width:${this.width/rem2px}rem;height:${this.height/rem2px}rem;`
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
    click(){
      let linkType=this.linkType,
          url=linkType=='goods'?`pages/goods-details/goods-details?main_goods_id=${this.link}`:this.link;

      //组件在编辑环境展现不处理事件响应
      if(window.landpage_env&&landpage_env=='editor'||!this.linkType=='none') return     
   
      if(linkType=='goods'||linkType=='page'){
        //小程序商品或页面
        checkMiniProgram()
        .then(res=>{
          if(res){
            wx.miniProgram.navigateTo({url});
          }else{
            alert('当前环境不是小程序端')
          }          
        })
      }else if(linkType=='h5'){
        //h5链接
        location.href=url
      }
    }
  }
}
</script>
