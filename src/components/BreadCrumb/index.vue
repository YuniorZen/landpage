<!-- 顶部信息头组件 -->
<template>
    <el-row class="breadcrumb-wraper" type="flex" justify="space-between" align="middle">
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">落地页列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col>
        <slot />
      </el-col>
    </el-row>
</template>

<script>
import './breadcrumb.scss'

export default {
  name:'BreadCrumb',
  data() {
    return {
      
    }
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>
