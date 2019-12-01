<template>
  <div class="page-wraper" :style="style">
    <div class="component-wraper" v-for="(component) in components" :key="component.id">
      <!-- 动态组件加载 -->
      <component v-bind:is="component.type"  v-bind="component"> </component> 
        <!-- 动态层级子组件加载 -->
        <component  v-for="child in component.children" class="component-child"
          :key="child.id"         
          v-bind:is="child.type"
          v-bind="child"></component>
    </div>

    <transition name="el-fade-in">
    <div class="backTop" v-if="scrollTop&&page&&page.extra.needBackTop" @click="backTop">
      <img :src="staticURL+page.extra.backTopImage" />
    </div>   
    </transition>
  </div>
</template>

<script>
import './landpage.scss'
import http from '@/http/'
import {checkMiniProgram, rem2px, viewWidth, backTop, throttleFn, calcuFontSize} from '@/utility/landpage'

//动态组件引入
import Carousel from '@/components/Carousel'
import Event from '@/components/Event'
import Goods from '@/components/Goods'
import Picture from '@/components/Picture'
import Video from '@/components/Video'

export default {
  data() {
    return {
      scrollbar:null,
      urlKey:null,
      page:null,
      scrollTop:false,
      components:[],
      //静态图片地址
      staticURL:http.staticURL,
    }
  },
  computed:{
    //计算行内样式
    style() {
      let style=''
      if(this.page&&this.page.extra.backgroundColor){
        style+=`background-color:${this.page.extra.backgroundColor};`
      }
      return style   
    }
  },
  created(){
    //落地页动态计算fontsize响应rem布局
    calcuFontSize()
    
    //获取落地页信息
    this.urlKey=this.$route.query.urlKey
    http.getPage({urlKey:this.urlKey})
    .then(res=>{    
      this.page=res.data
      this.components=res.data.components
      this.initPage()     
    })
  },
  methods:{
    //初始化页面设置
    initPage(){
      let page=this.page
      
      window.landpage_env='preview'
      //设置标题
      document.title=page.title

      //监听页面滚动距离显示返回顶部图标
      if(page.extra.needBackTop){
        window.addEventListener('scroll', throttleFn(300, this.onScroll));
      }
    },
    onScroll(){
      let scrollTop=document.documentElement.scrollTop||document.body.scrollTop
      if(scrollTop>200){
        this.scrollTop=true
      }else{
        this.scrollTop=false
      }
    },
    //返回顶部
    backTop(){
      backTop()
    }
  },
  components:{
    Carousel,
    Event,
    Goods,
    Picture,
    Video,
  }
}
</script>

<style lang="scss">

.container{
  min-width:100% !important;
  padding:0 !important;
}

.page-wraper{
  background: #ffffff;

  .component-wraper{
    position: relative;
    z-index:1;
  }
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(147,137,137,1);
}
</style>