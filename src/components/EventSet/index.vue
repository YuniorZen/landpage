<template>
  <div class="event-set">

    <!-- 组件基本属性设置 -->
    <el-row class="setting-item" type="flex" align="middle">
      <el-col class="item-name">宽度：</el-col>
      <el-col class="item-value">
        <el-row type="flex" align="middle">
          <el-col>
          <el-slider v-model="width" :max="viewWidth" :min="100" :show-tooltip="false"></el-slider>
          </el-col>
          <el-col class="value-right">{{width}}px</el-col>
        </el-row>
      </el-col>
    </el-row> 
    <el-row class="setting-item" type="flex" align="middle">
      <el-col class="item-name">上边距：</el-col>
      <el-col class="item-value">
        <el-row type="flex" align="middle">
          <el-col>
          <el-slider v-model="marginTop" :max="100" :show-tooltip="false"></el-slider>
          </el-col>
          <el-col class="value-right">{{marginTop}}px</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="setting-item" type="flex" align="middle">
      <el-col class="item-name">下边距：</el-col>
      <el-col class="item-value">
        <el-row type="flex" align="middle">
          <el-col>
          <el-slider v-model="marginBottom" :max="100" :show-tooltip="false"></el-slider>
          </el-col>
          <el-col class="value-right">{{marginBottom}}px</el-col>
        </el-row>
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import {checkMiniProgram, rem2px, viewWidth} from '@/utility/landpage'
export default {
  props:{
    component:{
      type:Object,
      required:true
    }
  },
  data() {
    let data={}
    this.initProps(data)
    return {
      //落地页容器宽度
      viewWidth,

       ...data,
    }
  },
  watch:{
    //监听相同组件激活切换
    'component.id':function(newVal, oldVal){
      if(oldVal&&newVal&&oldVal!==newVal){
        this.initProps(this)
      }
    },
    //监听宽度设置-同步组件数据
    width(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'width', newVal})
    },
    //监听上边距设置-同步组件数据
    marginTop(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'marginTop', newVal})
    },
    //监听下边距设置-同步组件数据
    marginBottom(newVal,oldVal){
      this.$store.commit('setComponentProp',{id:this.component.id, prop:'marginBottom', newVal})
    },
    
  },
  methods:{
    //初始化图片组件状态
    initProps(data){      
      data.marginTop=this.component.marginTop||0
      data.marginBottom=this.component.marginBottom||0
      data.width=this.component.width||viewWidth

      console.log('初始化图片组件参数',data)
    },
  }
}
</script>
