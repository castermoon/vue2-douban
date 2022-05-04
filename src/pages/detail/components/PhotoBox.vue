<template>
  <ul class="photo-box clearfix" >
    <li class="photo-box-item" v-for="item of photoBox" :style="{width:width}" :key="item.id">
      <div class="img-wrapper" :style="{height:height,width:width}">
        <router-link :to="{path:'detail',query:{movie_id:item.id}}"><img :src="item.cover"/></router-link>
      </div>
      <p class="photo-box-item-tile" v-if="item.name">
        <a href="#">{{item.name}}</a>
      </p>
      <p class="photo-box-item-brief" v-if="item.brief">
        {{item.brief}}
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PhotoBox",
  props:{
    photoBox: {
      type:Array,
      default(){
        return []
      }
    },
    height: {
      type:String,
      default:"0"
    },
    width: {
      type:String,
      default:"115px"
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/style/mixins.styl"
.photo-box
  .photo-box-item
    margin-right 35px
    float left
    margin-bottom 15px
    &:nth-child(5n)
      margin-right 0
    .img-wrapper
      overflow hidden
      img
        width 100%
    .photo-box-item-tile
      margin-top 8px
      width 100%
      text-align center
      font-size 13px
      line-height 20px
    .photo-box-item-brief
      margin-top 3px
      width 100%
      color #9b9b9b
      font-size 13px
      text-align center
</style>
