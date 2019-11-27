<template>
  <div @click="toPageCreate">
    创建落地页
  </div>
</template>

<script>
import './login.scss'
export default {
  name: 'Login',
  data() {
    return {
      
    }
  },
  beforeCreate(){

  },
  mounted(){

  },
  methods:{
    toPageCreate(){
      this.$router.push({
        path:'/'
      })
    }
  },
  components:{

  }
}
</script>
