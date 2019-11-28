<template>
<div>
  <!-- 顶部信息头 -->
  <HeadInfo />

  <!-- 面包屑导航 -->
  <BreadCrumb />

  <div class="preview" >
    <div class="miniprogram-wraper">
      <div class="miniprogram-head">
        <div class="head-title ellipsis">{{title}}</div>
      </div>
      <div class="miniprogram-con">
        <iframe :src="`#/LandPage?urlKey=${urlKey}`" />
      </div>
    </div>

    <div class="erweima-wraper"></div>
  </div>
</div>
</template>

<script>
import './pagepreview.scss'
import http from '@/http/'
import HeadInfo from '@/components/HeadInfo'
import BreadCrumb from '@/components/BreadCrumb'

export default {
  data() {
    return {
      urlKey:null,
      title:'',
      page:{}
    }
  },
  created(){
    this.urlKey=this.$route.query.urlKey
    http.getPage({urlKey:this.urlKey})
    .then(res=>{   
      this.page=res.data
      this.title=res.data.title      
    })
  },
  mounted(){   
   
  },
  methods:{
    
  },
  components:{
    HeadInfo,
    BreadCrumb,
  }
}
</script>
