<template>
  <div class="base-body">
    <h1 class="base-body-title" v-if="title">
      {{title}}
    </h1>
    <div class="base-body-left">
      <slot name="base-body-left"></slot>
    </div>
    <div class="base-body-right">
      <slot name="base-body-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseBody",
  props:{
    title:{
      type:String,
      default:""
    }
  }
}
</script>

<style lang="stylus" scoped>

.base-body
  padding 0 10px
  box-sizing border-box
  width 1078px
  margin 40px auto
  overflow hidden
  .base-body-title
    font-size 26px
    margin 0 auto
    font-weight bold
    margin-bottom 30px
  .base-body-left
    min-height 738px
    width 715px
    float left
  .base-body-right
    min-height 395px
    width 300px
    float right
</style>
