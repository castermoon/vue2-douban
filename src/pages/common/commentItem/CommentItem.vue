<template>
  <li class="commentListItem" :key="comment.id">
    <div class="commentDesc">
      <div class="commentDescHeader">
        <img class="icon" src="https://i.postimg.cc/yxMQQrWN/image.jpg" alt="头像"/>
        <div class="name"><a href="">{{comment.nickname}}</a></div>
        <span v-if="comment.score > 0">看过</span>
        <span v-if="comment.score === 0">想看</span>
        <div class="starWrapper" v-if="comment.score > 0">
          <Star :score="comment.score"/>
        </div>
        <span class="date">{{ comment.date | timestampChange }}</span>
      </div>
      <div class="commentContent ">
        {{comment.content}}
      </div>
    </div>
  </li>
</template>

<script>
import Star from "@/pages/common/star/Star";
export default {
  name: "CommentItem",
  components: {Star},
  props:{
    comment:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    timestampChange(timestamp){
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y+M+D+h+m+s;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/style/mixins.styl"
.commentListItem
  overflow hidden
  width 100%
  padding 12px 0
  border-bottom 1px solid #ddd
  .iconWrapper
    width 48px
    height 48px
    float left
    margin-right 15px
    img
      width 100%
  .commentDesc
    float left
    padding 5px 0
    width 600px
    font-size 13px
    .commentDescHeader
      width 100%
      height 22px
      margin-bottom 6px
      font-size 13px
      .icon
        display inline-block
        width 24px
        height 24px
        margin-right 10px
      .name
        display inline-block
        margin-right 10px
      .starWrapper
        display inline-block
        width 60px
        margin-left 10px
      .date
        margin-left 10px
        color #aaa
      .useful
        display inline-block
        float right
    .commentContent
      line-height 21px
      font-size 13px
</style>
