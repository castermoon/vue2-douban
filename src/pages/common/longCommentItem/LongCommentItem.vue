<template>
  <li class="longCommentsListItem" :key="longComment.id">
    <div class="longCommentsListItemHeader">
      <img class="icon" src="https://i.postimg.cc/yxMQQrWN/image.jpg" alt="头像"/>
      <div class="name"><a href="#">{{longComment.nickname}}</a></div>
      <div class="starWrapper">
        <Star :score="longComment.score"/>
      </div>
      <div class="date">{{longComment.date | timestampChange}}</div>
    </div>
    <router-link :to="{path:'LongCommentDetail',query:{longComment_id:longComment.id}}" class="longCommentsListItemTitle">{{longComment.title}}</router-link>
    <div class="Spoiler" v-if="longComment.spoiler">| 这篇影评可能有剧透</div>
    <p class="longCommentsListItemContent">
      {{longComment.content}}
    </p>
  </li>
</template>

<script>
import Star from "@/pages/common/star/Star";
export default {
  name: "LongCommentItem",
  components: {Star},
  props:{
    longComment:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    timestampChange(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y+M+D+h+m+s;
    },
    dateChange(date){
      return date.substring(0,10)
    }
  },
}
</script>

<style lang="stylus" scoped>
.longCommentsListItem
  padding 20px 0
  line-height 23px
  border-bottom  1px solid #eee
  .longCommentsListItemHeader
    margin-bottom 10px
    .icon
      display inline-block
      width 24px
      height 24px
      margin-right 10px
    .name
      display inline-block
      font-size 13px
      margin-right 3px
    .starWrapper
      display inline-block
      margin-right 10px
    .date
      display inline-block
      color #999
  .longCommentsListItemTitle
    font-size 14px
    //ellipsis()
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  .Spoiler
    color #9b9b9b
    font-size 13px
  .longCommentsListItemContent
    font-size 13px
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
</style>
