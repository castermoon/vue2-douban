<template>
  <div>
    <div class="back-link"><router-link  :to="{path:'detail',query:{movie_id:CommentsMovieData.id}}"> 去 {{ CommentsMovieData.name}}的页面</router-link></div>
    <div class="movie-Detail">
      <div class="cover-wrapper"><img :src="CommentsMovieData.cover"/></div>
      <common-label :label="'导演'" :content="CommentsMovieData.director" :pathName="'/celebrity'"></common-label>
      <common-label :label="'主演'" :content="CommentsMovieData.toStar" :pathName="'celebrity'" ></common-label>
      <common-label :label="'类型'" :content="CommentsMovieData.type"></common-label>
      <common-label :label="'制片国家/地区'" :content="CommentsMovieData.country"></common-label>
      <common-label :label="'片长'" :content="CommentsMovieData.timeLen"></common-label>
      <common-label :label="'上映时间'" :content="CommentsMovieData.time | dateChange" v-if="CommentsMovieData.time"></common-label>
    </div>
  </div>
</template>

<script>
import CommonLabel from "@/pages/common/commonLabel/CommonLabel";
export default {
  name: "CommonMovieData",
  components: {CommonLabel},
  props:{
    CommentsMovieData:{
      type: Object,
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
.back-link
  margin-bottom 20px
  line-height 20px
.movie-Detail
  line-height 24px
  font-size 13px
  .label
    margin-right 8px
  .cover-wrapper
    width 100px
    height 141px
    margin-bottom 20px
    img
      width 100%
  .celebrity-name:after
    content '/ '
  .celebrity-name:last-child:after
    content ""
</style>
