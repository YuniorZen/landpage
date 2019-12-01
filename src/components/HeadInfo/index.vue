<!-- 顶部信息头组件 -->
<template>
  <div class="head-info">
    <div class="info-name"><a href="javascript:;" @click="goHome">落地页管理系统</a></div>
    <div class="info-user"><i class="item-icon el-icon-s-custom"></i> 运营-张山</div>
  </div>
</template>

<script>
import './headinfo.scss'

export default {
  name:'HeadInfo',
  data() {
    return {
      
    }
  },
  methods:{
    goHome(){
      window.location.href=window.location.origin+window.location.pathname
    }
  }
}
</script>
