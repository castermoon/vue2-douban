<template>
  <div class="common-title">{{title}}· · · · · ·<router-link v-if="content" :to="{path:link.path,query:link.query}">( {{content}} )</router-link></div>
</template>

<script>
export default {
  name: "CommonTitle",
  props:{
    title:{
      type:String,
      default:""
    },
    content:{
      type:String,
      default:""
    },
    link:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/style/mixins.styl"
.common-title
  color #007722
  font-size 16px
  font-weight normal
  height 24px
  line-height 24px
  margin 24px 0 12px 0
  a
    margin-left 4px
    font-size 13px
</style>
