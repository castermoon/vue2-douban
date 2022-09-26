<template>
  <div>
    <common-header></common-header>
    <base-body :title="movieData.name">
      <template slot="base-body-left">
        <div class="movie-content">
          <div class="movie-content-img-wrapper">
            <img :src="movieData.cover">
          </div>
          <div class="movie-content-desc">
            <common-label :label="'导演'" :content="movieData.director" :pathName="'celebrity'"></common-label>
            <common-label :label="'编剧'" :content="movieData.author" :pathName="'celebrity'" ></common-label>
            <common-label :label="'主演'" :content="movieData.toStar" :pathName="'celebrity'" ></common-label>
            <common-label :label="'类型'" :content="movieData.type"></common-label>
            <common-label :label="'官方网站'" :content="movieData.web"></common-label>
            <common-label :label="'制片国家/地区'" :content="movieData.country"></common-label>
            <common-label :label="'语言'" :content="movieData.language"></common-label>
            <common-label :label="'上映时间'" :content="movieData.time | dateChange" v-if="movieData.time"></common-label>
            <common-label :label="'片长'" :content="movieData.timeLen"></common-label>
            <common-label :label="'别名'" :content="movieData.anotherName"></common-label>
            <common-label :label="'IMDb链接'" :content="movieData.indbLink"></common-label>
          </div>
          <div class="movie-content-score">
            <div class="movie-content-score-title">豆瓣评分</div>
            <div class="score-line clearfix">
              <div class="num">{{movieData.movieScore}}</div>
              <div class="star-wrapper">
                <star :score="movieData.movieScore"></star>
                <div><a href="#">{{movieData.longCommentsCount + movieData.commentsCount}}人评价</a></div>
              </div>
            </div>
            <div class="rating-percent-wrapper">
              <rating-percent :commentScoreObj="commentScoreObj"></rating-percent>
            </div>
          </div>
          <div class="movie-button-list">
            <a class="movie-button-item" @click="writeShortComment">写短评</a>
            <router-link  :to="{path:'writeLongComment',query:{movie_id:this.$route.query.movie_id}}" class="movie-button-item"  tag="a">写影评</router-link>
          </div>
        </div>
        <common-title :title="movieData.name + '的剧情简介'"></common-title>
        <div class="movie-brief" v-html="movieData.brief"></div>
<!--        <common-title  :title="'空之境界 第五章 矛盾螺旋的演职员'" :content="'全部 15'"></common-title>-->
<!--        &lt;!&ndash;        <div class="staff-list"><photo-box :photoBox="movie.staffList" :height="'133px'" :width="'95px'"></photo-box></div>&ndash;&gt;-->
<!--        <common-title :title="'空之境界 第五章 矛盾螺旋的图片'" :content="'添加视频评论 | 图片126 · 添加'"></common-title>-->
        <!--        <photo-box :photoBox="movie.photoList" :height="'115px'"></photo-box>-->
        <common-title :title="'喜欢这部电影的人也喜欢'" ></common-title>
        <photo-box :photoBox="maybeLikeList" :height="'163px'"></photo-box>
        <common-title :title="movieData.name + '的短评'" :content="`全部 ${movieData.commentsCount} 条`"  :link="{path:'shortComments',query:{movie_id:movieData.id,page:'1',commentType:'all'}}"></common-title>
        <ul>
          <CommentItem :comment="item" :key="item.id" v-for="item of recentCommentList"/>
        </ul>
        <common-title :title="movieData.name + '的长评'" :content="`全部 ${movieData.longCommentsCount} 条`" :link="{path:'longComments',query:{movie_id:movieData.id,page:'1'}}"></common-title>
        <ul>
          <LongCommentItem :longComment="item" :key="item.id" v-for="item of recentLongCommentList"/>
        </ul>
      </template>
      <template slot="base-body-right">
        <div class="movie_list_recommend">
          <CommonTitle title="'以下片单推荐'"/>
            <ul class="recommend_list">
              <li class="recommend_item">豆瓣电影【口碑榜】2022-06-13 更新 (影志)</li>
              <li class="recommend_item">评价人数超过十万的电影 (依然饭特稀)</li>
              <li class="recommend_item">一个人的电影院 (刺青童)</li>
              <li class="recommend_item">2022—2024值得关注的华语电影 (closer)</li>
              <li class="recommend_item">豆瓣电影【口碑榜】2022-06-13 更新 (影志)</li>
              <li class="recommend_item">豆瓣评价人数过十万的影片〖国产篇〗 (莉莉周)</li>
            </ul>
        </div>
      </template>
    </base-body>
    <movie-comment-window ref="shortCommentWindow" :movieId="movieData.id" v-if="movieData.id"></movie-comment-window>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/commonHeader/Header";
import Star from "@/pages/common/star/Star";
import RatingPercent from "@/pages/common/RatingPercent/RatingPercent";
import CommonFooter from "@/pages/common/commonFooter/Footer";
import PhotoBox from "@/pages/detail/components/PhotoBox";
import CommonTitle from "@/pages/common/commonTitle/CommonTitle";
import axios from "axios"
import MovieCommentWindow from "@/pages/common/movieCommentWindow/MovieCommentWindow";
import BaseBody from "@/pages/common/baseBody/BaseBody";
import CommonLabel from "@/pages/common/commonLabel/CommonLabel";
import CommentItem from "@/pages/common/commentItem/CommentItem";
import LongCommentItem from "@/pages/common/longCommentItem/LongCommentItem";
export default {
  name: "Detail",
  components: {
    LongCommentItem,
    CommentItem,
    CommonLabel,
    BaseBody, MovieCommentWindow, CommonTitle, PhotoBox, CommonFooter, RatingPercent, Star, CommonHeader},
  data(){
    return{
      maybeLikeList:[],
      movieData:{},
      commentScoreObj:{},
      recentCommentList:[],
      recentLongCommentList:[]
    }
  },
  watch:{
    $route(){
      this.getDetailInfo()
    }
  },
  methods: {
    getDetailInfo () {
      axios.get('/api/detail/'+ this.$route.query.movie_id,{
      }).then(this.getDetailInfoSucc)
    },
    getDetailInfoSucc (res) {
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        this.maybeLikeList = data.maybeLikeList
        this.movieData= data.movieData
        this.commentScoreObj = data.commentScoreObj
        this.recentCommentList = data.recentCommentList
        this.recentLongCommentList = data.recentLongCommentList
      }
    },
    writeShortComment(){
      this.$refs.shortCommentWindow.shortCommentClick()
    }
  },
  filters:{
    dateChange(date){
      return date.substring(0,10)
    }
  },
  created () {
    this.getDetailInfo()
  },
}
</script>

<style lang="stylus" scoped>
 @import "~@/assets/style/mixins.styl"
//.staff-list >>> .photo-box-item:last-child
//  margin-right 0
//.staff-list >>> .photo-box-item:nth-child(5n)
// margin-right 20px
//.staff-list >>> .photo-box-item
//  margin-right 20px
.movie-content
  .movie-content-img-wrapper
    display inline-block
    width 135px
    height 191px
    margin-right 15px
    vertical-align top
    img
      width 100%
  .movie-content-desc
    width 329px
    display inline-block
    font-size 13px
    line-height 22px
    margin-right 20px
    margin-bottom 10px
  .movie-content-score
    padding-left 15px
    vertical-align top
    display inline-block
    border-left 1px solid #eaeaea
    color #9b9b9b
    .movie-content-score-title
      font-size 12px
      color #9b9b9b
      margin-bottom 14px
    .score-line
      .num
        float left
        color #494949
        font-size 28px
        margin-right 12px
      .star-wrapper
        float left
        line-height 30px
        display inline-block
        width 90px
        a
          font-size 12px
          color #000
  .movie-button-list
    .movie-button-item
      display inline-block
      font-size 13px
      margin-right 20px
.movie-brief
  text-indent 2em
  font-size 13px
  line-height 20px
.movie_list_recommend
  margin-bottom: 40px;
  line-height 22px
 .recommend_list
   border-top: 1px dashed #DDD;
   .recommend_item
     padding: 4.5px 0;
     border-bottom: 1px dashed #DDD;
     color #3377AA
     font-size 13px
</style>
