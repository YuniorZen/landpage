<template>
  <div class="page-wraper" @dragover="dragover" @drop="drop" :style="style">
    <div
      v-for="(component) in components"
      :key="component.id"
      :class="`component-wraper`">
      <!-- 动态组件加载 -->
      <component :class="`${component.id==activeComponent.id?'active':''} ${relativeComponent&&relativeComponent.id==component.id?('hover-'+relativeType):''}`"
        v-bind:is="component.type"
        v-bind="component"
        @contextmenu.native.prevent="contextmenu($event)"
        @mousedown.native="setActiveComponent(component)"
        @dragover.native.stop="checkDragOver(component,$event)"></component>
        <!-- 动态层级子组件加载 -->
        <component  v-for="child in component.children"
          :key="child.id" 
          :class="`component-child ${child.id==activeComponent.id?'active':''}`"
          v-bind:is="child.type"
          v-bind="child"         
          @contextmenu.native.prevent="contextmenu($event)"
          @mousedown.native="setActiveComponent(child)"
          @dragover.native.stop="checkDragOver(component, $event, child)"></component>
    </div>
  </div>
</template>

<script>
import "./pagecenter.scss";
import BScroll from "better-scroll";
import { mapState } from "vuex";
import { uniqueKey } from "@/utility/";
//动态组件引入
import Carousel from "@/components/Carousel";
import Event from "@/components/Event";
import Goods from "@/components/Goods";
import Picture from "@/components/Picture";
import Video from "@/components/Video";

export default {
  props: ["dragComponent"],
  data() {
    return {
      scrollbar: null,
      //当前经过的组件
      relativeComponent: null,
      //经过组件的关系 child, pre, next
      relativeType:'',      
    }
  },
  computed: {
    //映射组件的状态
    ...mapState({
      activeComponent: state => state.activeComponent,
      components: state => state.page.components,
      page: state => state.page
    }),
    style() {
      let style = "";
      if (this.page.extra && this.page.extra.backgroundColor) {
        style += `background-color:${this.page.extra.backgroundColor};`;
      }
      return style;
    }   
  },
  mounted() {
    //视图窗口的滚动条
    this.scrollbar = new BScroll("#page-center", {
      scrollbar: {
        fade: false,
        interactive: true
      },
      click: true,
      disableMouse: false,
      momentum: true,
      mouseWheel: true,
      bounce: false
    });
  },
  methods: {
    //阻止默认行为使拖拽生效
    dragover(ev) {
      ev.preventDefault();
      console.log("page dragover");
      this.resetRelative()
    },
    //拖拽时计算被拖拽元素的位置
    checkDragOver(component, ev, child) {
      ev.preventDefault();      

      let height = ev.currentTarget.offsetHeight;
      let topDis = ev.offsetY - this.dragComponent.extra.pointY;      
      let bottomDis = height - topDis - this.dragComponent.extra.height;
      let leftDis = ev.offsetX-this.dragComponent.extra.pointX;

      //层叠子组件的dragover处理
      if(child){
        topDis=topDis+child.top
        bottomDis=bottomDis+child.bottom
        leftDis=leftDis+child.left
      }

      if(topDis>=0&&bottomDis>=0){
        //在当前组件内，非图片组件不能添加层级子组件
        if(component.type=='Picture'){
          this.relativeType='child'
        }        
      }else{       
        if(topDis<bottomDis) {
          //上边界超出
          this.relativeType='pre'
        }else{
          //下边界超出
          this.relativeType='next'
        }       
      }
      this.relativeComponent = component
      this.dragComponent.extra.top=topDis
      this.dragComponent.extra.left=leftDis
      this.dragComponent.extra.bottom=bottomDis

      console.log(`top:${topDis},left:${leftDis},bottom:${bottomDis}`,child)
    },
    //拖放创建组件数据
    drop(ev) {     
      ev.preventDefault()

      if(this.dragComponent) {
        const component = { id: uniqueKey(), ...this.dragComponent };
        this.$store.commit("setActiveComponent", component);
      
        if(this.relativeComponent&&this.relativeType){
          //参考组件关系创建新组件
          console.log("relativeComponent drop",this.relativeType)
          if(this.relativeType=='child'){
            component.isChild=true;
            component.width=component.extra.width
            component.height=component.extra.height
            component.top=component.extra.top
            component.left=component.extra.left
            component.bottom=component.extra.bottom
          }
          delete component.extra
          this.$store.commit("addRelativeComponent", {relativeType:this.relativeType, relativeComponent:this.relativeComponent, component})
        }else{
          //直接末尾添加新组件
          console.log("page drop")
          delete component.extra
          this.$store.commit("addComponent", component)
        }       

        //触发父组件事件
        this.$emit("drop")
      
        this.resetRelative()
      }
    },
    //设置当前激活组件
    setActiveComponent(component) {
      this.$store.commit("setActiveComponent", component);
      this.resetRelative()
    },
    //移除组件
    removeComponent(component) {
      this.$store.commit("removeComponent", component);
    },
    //组件的右键菜单显示
    contextmenu(ev) {
      let left = ev.clientX,
          top = ev.clientY;
      this.$store.commit("showContextMenu", { left, top });
    },
    //重置关系组件
    resetRelative(){
      this.relativeComponent=null
      this.relativeType=''
    }
  },
  components: {
    Carousel,
    Event,
    Goods,
    Picture,
    Video
  }
};
</script>
