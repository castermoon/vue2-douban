
<template>
  <div id="app">
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name:'App',
  computed:{
    key(){
      return this.$route.name?this.$route.name+ +new Date():this.$route+ +new Date() //确保同页面参数改变时，页面数据重新获取
    }
  }
}
</script>
<style lang="stylus">


</style>
