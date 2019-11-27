<template>
  <div class="component-contextmenu" :style="style" @mouseleave="mouseleave">
    <template v-if="isChild">
      <div class="contextmenu-item" @click="removeComponent">删除</div>
      <template v-if="hasLevel">
        <div class="contextmenu-item" @click="updateLevel('pre')">上一层</div>
        <div class="contextmenu-item" @click="updateLevel('next')">下一层</div>
      </template>
    </template>
    <template v-else>
      <div class="contextmenu-item" @click="removeComponent">删除</div>
      <div class="contextmenu-item" @click="updateIndex('pre')">上移</div>
      <div class="contextmenu-item" @click="updateIndex('next')">下移</div>
      <div class="contextmenu-item" @click="updateIndex('top')">置顶</div>
      <div class="contextmenu-item" @click="updateIndex('bottom')">置底</div>
    </template>
  </div>
</template>

<script>
import './contextmenu.scss'
import {mapState} from 'vuex'

export default {
  name:'ContextMenu',  
  computed:{
    //映射组件的状态
    ...mapState({
      components:state=>state.page.components,
      activeComponent:state=>state.activeComponent,
      contextMenu:state=>state.contextMenu,
      isChild:state=>state.activeComponent.isChild,
    }),

    //根据设置参数计算样式
    style(){
      let style='';
      style+=`top:${this.contextMenu.top-2}px; left:${this.contextMenu.left-5}px; display:${this.contextMenu.show?'block':'none'};`      
      return style
    },

    //层级上一层/下一层功能显示判断，仅有两个及以上层级子元素才显示
    hasLevel(){
      if(this.isChild){
        for(let i=0;i<this.components.length;i++){
          if(this.components[i].children){
            let index=this.components[i].children.findIndex(item=>{
              return item.id==this.activeComponent.id
            })
            if(index!=-1&&this.components[i].children.length>1){
              return true
            }
          }
        }
      }

      return false      
    }
  },
  mounted(){
    //失去焦点隐藏菜单
    document.addEventListener('mouseup',(ev)=>{
      this.$store.state.contextMenu.show=false
    })
  },
  methods:{
    //移除组件
    removeComponent(){
      if(this.activeComponent&&this.activeComponent.type!='page'){
        this.$store.commit('removeComponent', this.activeComponent)
      }        
    },
    //更新组件的顺序
    updateIndex(type){
      this.$store.commit('updateComponentIndex', {component:this.activeComponent, type})
    },
    //更新层级关系 #仅适用层级子组件
    updateLevel(type){
      this.$store.commit('updateComponentLevel', {component:this.activeComponent, type})
    },
    //鼠标离开菜单关闭
    mouseleave(){
      this.$store.state.contextMenu.show=false
    }
  }
}
</script>
