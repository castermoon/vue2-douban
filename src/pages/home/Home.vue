<template>
  <div>
    <common-header></common-header>
    <base-body>
      <template slot="base-body-left">
        <photo-list :movieList="isShowingMovieList"/>
        <banner-swiper
            :title="'最近热门电影'"
            :movieList="hotMovieList"
            :typeList="typeList"
            :dataType="'hotMovie'"
            @getMovieList="getMovieList"
        ></banner-swiper>
        <banner-swiper
            :title="'最近热门电视剧'"
            :movieList="hotTVList"
            :typeList="typeList"
            :dataType="'hotTV'"
            @getMovieList="getMovieList"
        ></banner-swiper>
        <hot-recommend/>
        <PopularComments :popularCommentList="popularCommentList" v-if="popularCommentList.length"/>
      </template>
      <template slot="base-body-right">
        <div class="weekend-list">
          <div class="weekend-list-header">
            <a href="#">豆瓣电影评分八问</a>
          </div>
          <div class="list-title">
            <span class="list-title-first">一周口碑榜</span>
<!--            <span class="list-title-second">更多榜单»</span>-->
          </div>
          <ul class="list">
            <li tag="li" class="list-item" v-for="(item,index) of weekendList" :key="item.id"><span class="num">{{index+1}}&nbsp;</span><router-link :to="{path:'detail',query:{movie_id:item.id}}" >{{item.name}}</router-link></li>
          </ul>
        </div>
        <div class="doulist">
          <h2 class="doulist-title">热门豆列</h2>
          <ul>
            <li class="doulist-item">英国历史</li>
            <li class="doulist-item">黑暗系日影日剧，专治各种鸡汤病</li>
          </ul>
        </div>
      </template>
    </base-body>
  <CommonFooter></CommonFooter>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/commonHeader/Header";
import PhotoList from "@/pages/home/components/PhotoList";
import BannerSwiper from "@/pages/home/components/BannerSwiper";
import CommonFooter from "@/pages/common/commonFooter/Footer";
import axios from "axios"
import BaseBody from "@/pages/common/baseBody/BaseBody";
import HotRecommend from "@/pages/home/components/HotRecommend";
import PopularComments from "@/pages/home/components/PopularComments";


export default {
  name: "Home",
  components: {PopularComments, HotRecommend, BaseBody, CommonFooter, BannerSwiper, PhotoList, CommonHeader},
  data(){
    return{
      weekendList:[],
      hotMovieList:[],
      isShowingMovieList:[],
      hotTVList:[],
      popularCommentList:[],
      typeList:["所有","中国","日本","美国","韩国"]
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/home')
        .then(this.getHomeInfoSucc)
        .catch(function (error){
          console.log(error)
        })
    },
    getHomeInfoSucc (res) {
      if(res.data.errno == 0){
        this.weekendList = res.data.data.weekendList
        this.hotMovieList = res.data.data.hotMovieList
        this.isShowingMovieList = res.data.data.isShowingMovieList
        this.hotTVList = res.data.data.hotTVList
        this.popularCommentList = res.data.data.popularCommentList
      }
    },
    getMovieList(dataName,country){
      axios.post(`/api/home/getHomeMovieData`,{
        country:country
      }).then((res)=>{
        const data = res.data.data
        if(dataName === "hotMovie"){
          this.hotMovieList = data.dataList
        }else if(dataName === "hotTV"){
          this.hotTVList = data.dataList
        }
      })
    }
  },
  created () {
    this.getHomeInfo()
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/style/mixins.styl"
.weekend-list
  width 100%
  margin-bottom 70px
  .weekend-list-header
    margin: 0 0 15px;
    padding: 12px 0 12px 18px;
    line-height: 1.5;
    background: #f2f7f6;
    border-radius: 4px;
    width: 282px;
    a
      color #258dcd
  .list-title
    height 40px
    line-height 40px
    width 100%
    border-bottom 1px solid #eaeaea
    .list-title-first
      margin-right 15px
    .list-title-second
      color #258dcd
      font-size 14px
  .list
    .list-item
      ellipsis()
      height 33.6px
      width 100%
      font-size 13px
      line-height 33.6px
      color #258dcd
      border-bottom 1px solid #eaeaea
    .num
      color #333333
.doulist
  .doulist-title
    height 30.8px
    border-bottom 1px solid #eaeaea
  .doulist-item
    border-bottom 1px solid #eaeaea
    padding 20px 0
    color #258dcd
</style>
