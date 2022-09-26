<template>
  <div class="container">
    <div class="left"><router-link :to="{path:'detail',query:{movie_id:comment.movie_id}}"><img :src="comment.cover" /></router-link></div>
    <div class="right">
      <router-link :to="{path:'longCommentDetail',query:{longComment_id:comment.longComment_id}}"><h1 class="title">{{comment.title}}</h1></router-link>
      <div class="movieInfo">
        <router-link :to="{path:'personal',query: {user_id:comment.user_id}}"><span class="username">{{comment.username}}</span></router-link>评论
        <router-link :to="{path:'detail',query:{movie_id:comment.movie_id}}"><span class="movieName">{{comment.movie_name}}</span></router-link>
        <div class="star_wrapper"><Star :score="comment.score"/></div>
      </div>
      <p class="desc multilineEllipsis">
        {{comment.content}}
      </p>
    </div>
  </div>
</template>

<script>
import Star from "@/pages/common/star/Star";
export default {
  name: "CommentBox",
  components: {Star},
  props:{
    comment:{
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
.container
  display flex
  padding-bottom 10px
  border-bottom  1px solid #eee
  .left
    flex 0 0 68px
    height 100px
    margin-right 20px
    img
      width 100%
  .right
    flex 1
    .title
      font-size 15px
      margin-bottom 10px
    .movieInfo
      font-size 13px
      height 20px
      margin-bottom 7px
      .username
        margin-right 5px
      .movieName
        margin-right 5px
        margin-left 5px
      .star_wrapper
        display inline-block
    .desc
      color #111
      font-size 13px

</style>
