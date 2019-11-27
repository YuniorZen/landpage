<template >
  <PageCreate  v-if="show"/>
</template>

<script>
import PageCreate from '@/pages/PageCreate'
import http from '@/http/'
export default {
  name: 'PageEditor',
  data() {
    return {
      urlKey:'',
      show:false
    }
  },
  created(){
    let load=this.$loading()

    //获取落地页信息
    this.urlKey=this.$route.query.urlKey
    http.getPage({urlKey:this.urlKey})
    .then(res=>{     
      this.$store.state.page=res.data    
      setTimeout(()=>{
        this.show=true
        load.close()     
      },500)  
    })
  },
  mounted(){

  },
  methods:{

  },
  components:{
    PageCreate
  }
}
</script>
