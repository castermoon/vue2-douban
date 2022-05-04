<template>
  <div>
    <common-header></common-header>
    <base-body :title="CommentsMovieData.name + '的影评'">
      <template slot="base-body-left">
        <ul class="top-tab">
<!--          <li class="top-tab-item" ><a href="javascript:void(0)" :class="{active:true}">最受欢迎的</a></li>/-->
<!--          <li class="top-tab-item" ><a href="javascript:void(0)" :class="{active:false}">最新发布的</a></li>/-->
<!--          <li class="top-tab-item" ><a href="javascript:void(0)" :class="{active:false}">我关注的</a></li>/-->
<!--          <li class="top-tab-item" ><a href="javascript:void(0)" :class="{active:false}">按评星查看</a></li>-->
          <router-link :to="{path:'writeLongComment',query:{movie_id:this.CommentsMovieData.id}}" tag="li" class="write-Long-comment" @click="writeLongComment">我来写评论</router-link>
        </ul>
        <ul class="long-comments-list">
          <li class="long-comments-list-item" v-for="item of longCommentList" :key="item.id">
            <div class="long-comments-list-item-header">
              <img class="icon" src="https://img2.doubanio.com/icon/u155190344-21.jpg">
              <div class="name"><a href="#">{{ item.nickname }}</a></div>
              <div class="star-wrapper"><star :score="item.score"></star></div>
              <div class="date">{{ item.date | timestampChange }}</div>
            </div>
            <router-link :to="{path:'longCommentDetail',query:{longComment_id: item.id}}" class="long-comments-list-item-title">
              {{ item.title }}</router-link>
            <!--            <router-link><a class="long-comments-list-item-title"> 在我学电影之初呢，其实就有前辈一直告诫我</a></router-link>-->
            <div class="Spoiler" v-if="item.spoiler">| 这篇影评可能有剧透</div>
            <p class="long-comments-list-item-content">
              {{ item.content }}
            </p>
          </li>
        </ul>
        <pagination :pageName="'LongComments'"></pagination>
      </template>
      <template slot="base-body-right">
        <common-movie-data :CommentsMovieData="CommentsMovieData"></common-movie-data>
      </template>
    </base-body>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/header/Header";
import Star from "@/pages/common/star/Star";
import CommonFooter from "@/pages/common/footer/Footer";
import axios from "axios"
import Pagination from "@/pages/common/pagination/Pagination";
import BaseBody from "@/pages/common/baseBody/BaseBody";
import CommonMovieData from "@/pages/common/commonMovieData/CommonMovieData";
export default {
  name: "LongComments",
  components: {CommonMovieData, BaseBody, Pagination, CommonFooter, Star, CommonHeader},
  data(){
    return{
      CommentsMovieData:{},
      longCommentList:[],
      isActive:true
    }
  },
  computed:{
    page(){
      return this.$route.query.page
    }
  },
  watch:{
    page(){
      this.getLongComInfo()
    }
  },
  methods:{
    getLongComInfo () {
      axios.get('/api/longComments/'+ this.$route.query.movie_id + '/' + this.$route.query.page,{
      }).then(this.getLongComInfoSucc)
    },
    getLongComInfoSucc (res) {
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        this.CommentsMovieData = data.CommentsMovieData
        this.longCommentList= data.longCommentList
      }
    },
    writeLongComment(){
    },
  },
  filters: {
    timestampChange(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  created () {
    this.getLongComInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/style/mixins.styl"
.top-tab
  position relative
  width 100%
  height 35px
  line-height 35px
  border-bottom 1px solid #ccc
  //.top-tab-item
  //  display inline-block
  //  margin-right 10px
  //  font-size 13px
  //  .active
  //    color #000
  .write-Long-comment
    width 106px
    height 27px
    text-align center
    line-height 27px
    color: #ca6445
    background: #fae9da
    position absolute
    top 0
    right 0
    cursor pointer
    &.write-Long-comment:hover
      background: #fad
.long-comments-list
  line-height 25px
  .long-comments-list-item
    padding 20px 0
    border-bottom  1px solid #eee
    .long-comments-list-item-header
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
      .star-wrapper
        display inline-block
        margin-right 10px
      .date
        display inline-block
        color #999
    .long-comments-list-item-title
      font-size 14px
      ellipsis()
    .Spoiler
      color #9b9b9b
      font-size 13px
    .long-comments-list-item-content
      font-size 13px
      line-height 18px
      ellipsis()
</style>

