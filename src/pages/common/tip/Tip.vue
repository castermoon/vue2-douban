<template>
  <div class="container">
    <h1 class="title">{{movieItem.name}}</h1>
    <div class="star_wrapper"><Star :score="movieItem.score"/><span class="score">{{movieItem.score}}</span></div>
    <ul class="label_list clearfix">
      <li v-for="(item,index) of labelListFormat" class="label_item" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Star from "@/pages/common/star/Star";
export default {
  name: "Tip",
  components: {Star},
  props:{
    movieItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    labelListFormat(){
      return this.movieItem.type.split("/")
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 270px
  padding: 20px 25px;
  background #ffffff
  line-height 35px
  border:1px solid #000000
  position absolute
  right -322px
  top 0
  z-index 20
  .title
    font-size 18px
    color #3377aa
  .star_wrapper
    width 75px
    margin-bottom 5px
    height 20px
    position relative
    .score
      color #e09015
      font-size 12px
      position absolute
      top -10px
      right -19px
  .label_list
    .label_item
      float: left;
      line-height 20px
      font-size: 13px;
      padding: 2px 10px 1px;
      background: #f5f5f5;
      margin: 0 8px 8px 0;
      border-radius: 12px;
      color: #666;


</style>
