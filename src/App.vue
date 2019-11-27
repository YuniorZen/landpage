<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
  beforeCreate(){
    //vuex的状态预读取和缓存,防止刷新异常
    // const vuexState=localStorage.getItem("vuexState");    
    // if(vuexState){
    //   this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(vuexState)));
    // }
    // window.addEventListener("beforeunload",()=>{
    //   localStorage.setItem("vuexState",JSON.stringify(this.$store.state))
    // })
  },
  mounted(){

  },
  methods:{

  },
  components:{

  }
}
</script>
