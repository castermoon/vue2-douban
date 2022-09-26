<template>
  <div>
    <common-header></common-header>
    <base-body :title="CommentsMovieData.name + '的短评'">
      <template slot="base-body-left">
        <div class="tab">
          <div class="tab-header" @click="commentTypeChange($event)">
            <button class="tab-header-item" value ="all" :class="{isActive:this.$route.query.commentType !== 'noLooked'}">看过</button>
            <button class="tab-header-item" value ="noLooked" :class="{isActive:this.$route.query.commentType === 'noLooked'}">想看</button>
            <div class="write-short-comment" @click.stop="writeShortComment">我来写短评</div>
          </div>
          <div class="tab-body">
            <div class="comment-filter" @change="commentTypeChange($event)" v-if="this.$route.query.commentType !== 'noLooked'">
              <label>
                <input type="radio" name="sort" value="all" checked>
                <span class="filter-name">全部</span>
                <!--                  <span class="comment-percent"></span>-->
              </label>
              <label>
                <input type="radio" name="sort" value="good">
                <span class="filter-name">好评</span>
                <!--                  <span class="comment-percent">94%</span>-->
              </label>
              <label>
                <input type="radio" name="sort" value="normal">
                <span class="filter-name">一般</span>
                <!--                  <span class="comment-percent">4%</span>-->
              </label>
              <label>
                <input type="radio" name="sort" value="bad">
                <span class="filter-name">差评</span>
                <!--                  <span class="comment-percent">2%</span>-->
              </label>
            </div>
            <ul class="comment-list">
              <CommentItem :comment="item" :key="item.id" v-for="item of commentList"/>
            </ul>
          </div>
        </div>
        <pagination :pageName="'ShortComments'"></pagination>
      </template>
      <template slot="base-body-right">
        <common-movie-data :CommentsMovieData="CommentsMovieData" ></common-movie-data>
      </template>
    </base-body>
    <movie-comment-window ref="shortCommentWindow" :movieId="CommentsMovieData.id" v-if="CommentsMovieData.id"></movie-comment-window>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/commonHeader/Header";
import Star from "@/pages/common/star/Star";
import CommonFooter from "@/pages/common/commonFooter/Footer";
import axios from "axios"
import Pagination from "@/pages/common/pagination/Pagination";
import MovieCommentWindow from "@/pages/common/movieCommentWindow/MovieCommentWindow";
import CommonMovieData from "@/pages/common/commonMovieData/CommonMovieData";
import BaseBody from "@/pages/common/baseBody/BaseBody";
import CommentItem from "@/pages/common/commentItem/CommentItem";
export default {
  name: "ShortComments",
  components: {CommentItem, BaseBody, CommonMovieData, MovieCommentWindow, Pagination, CommonFooter, Star, CommonHeader},
  data(){
    return{
      CommentsMovieData:{},
      commentList:[],
    }
  },
  watch:{
    $route(){
      this.getShortComInfo()
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
  methods:{
    getShortComInfo () {
      // console.log('/api/comments/'+ this.$route.query.movie_id + '/' + this.$route.query.page + "/" + this.$route.query.commentType)
      axios.get('/api/comments/'+ this.$route.query.movie_id + '/' + this.$route.query.page + "/" + this.$route.query.commentType,{
      }).then(this.getShortComInfoSucc)
    },
    getShortComInfoSucc (res) {
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        this.CommentsMovieData = data.CommentsMovieData
        this.commentList= data.commentList
      }
    },
    writeShortComment(){
      this.$refs.shortCommentWindow.shortCommentClick()
    },
    commentTypeChange(e){
      // this.$router.push('/shortComments/' + this.$route.params.id + '/' + this.$route.params.page + "/" + e.target.value )
      this.$route.query.commentType  = e.target.value
      this.getShortComInfo()
    }
  },
  created () {
    this.getShortComInfo()
  }
}
</script>

<style lang="stylus" scoped>
.tab
  width 100%
  .tab-header
    position relative
    width 100%
    height 35px
    line-height 35px
    border-bottom 1px solid #ccc
    .tab-header-item
      background #fff
      width 64px
      float left
      height 35px
      font-size 14px
      text-align center
      &.isActive
        color #258dcd
        border-bottom 5px solid #000
    .write-short-comment
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
      &.write-short-comment:hover
        background: #fad
  .tab-body
    width 100%
    //height 1000px
    margin-top 5px
    .comment-filter
      height 40px
      line-height 40px
      width 100%
      border-bottom 1px solid #ccc
      label
        font-size 14px
        margin-right 25px
        input
          margin-right 8px
    .comment-list
      width 100%
      .comment-list-item
        overflow hidden
        width 100%
        padding 25px 0
        border-bottom 1px solid #ccc
        .icon-wrapper
          width 48px
          height 48px
          float left
          margin-right 15px
          img
            width 100%
        .comment-desc
          float left
          padding 5px 0
          width 600px
          font-size 13px
          .comment-desc-header
            width 100%
            height 22px
            margin-bottom 12px
            font-size 13px
            .icon
              display inline-block
              width 24px
              height 24px
              margin-right 10px
            .name
              display inline-block
              margin-right 10px
            .star-wrapper
              display inline-block
              width 60px
              margin-left 10px
            .date
              margin-left 10px
              color #aaa
            .useful
              display inline-block
              float right
          .comment-content
            line-height 21px
            font-size 13px



</style>
