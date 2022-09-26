<template>
  <div class="container">
    <div class="title">
      <span class="hot">最受欢迎的影评</span>
    </div>
    <div class="list">
      <div v-for="item of popularCommentList">
        <div class="commentBox_wrapper"><CommentBox :comment="item" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentBox from "@/pages/common/commentBox/CommentBox";
export default {
  name: "PopularComments",
  components: {CommentBox},
  props:{
    popularCommentList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  overflow hidden
  .title
    height 50px
    width 100%
    line-height 50px
    border-bottom 1px solid #cccccc
    .hot
      margin-right 15px
      font-size 16px
  .list
    .commentBox_wrapper
      padding 20px 0
      border-bottom 1px solid #cccccc
      &:last-child
        border-bottom none
</style>
