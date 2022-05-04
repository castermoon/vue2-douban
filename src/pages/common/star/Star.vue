<template>
  <div class="star">
    <div class="star-item" v-for="(item,index) of itemClasses" :class="item" :key="index"></div>
  </div>
</template>

<script>
export default {
  name: "Star",
  props:{
    score:{
      type:Number,
      default: 0
    }
  },
  computed: {
    itemClasses() {
      let arr = []
      let score = this.score / 2
      let onStar = Math.floor(score)
      let halfStar = 0
      if(score - onStar >= 0.5){
        halfStar = 1
      }
      let offStar = 5 - onStar - halfStar
      for(let i = 0;i<onStar;i++){
        arr.push('on')
      }
      if(halfStar === 1){
        arr.push('half')
      }
      for(let j = 0;j<offStar;j++){
        arr.push('off')
      }
      return arr
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star
    display flex
    .star-item
      width 12px
      height 12px
      flex 1
      &.half
        background url("../star/star24_half@2x.png") no-repeat center
        background-size 12px 12px
      &.on
        background url("../star/star24_on@2x.png") no-repeat center
        background-size 12px 12px
      &.off
        background url("../star/star24_off@2x.png") no-repeat center
        background-size 12px 12px
</style>
