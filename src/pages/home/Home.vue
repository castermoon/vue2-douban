<template>
  <div>
    <common-header></common-header>
    <base-body>
      <template slot="base-body-left">
        <photo-list :PhotoList="HomeData.PhotoList"></photo-list>
        <banner-swiper :bannerList="HomeData.PhotoList"></banner-swiper>
      </template>
      <template slot="base-body-right">
        <div class="weekend-list">
          <div class="weekend-list-header">
            <a href="#">豆瓣电影评分八问</a>
          </div>
          <div class="list-title">
            <span class="list-title-first">一周口碑榜</span>
            <span class="list-title-second">更多榜单»</span>
          </div>
          <ul class="list">
            <li tag="li" class="list-item" v-for="(item,index) of HomeData.weekendList" :key="item.id"><span class="num">{{index+1}}&nbsp;</span><router-link :to="{path:'detail',query:{movie_id:item.id}}" >{{item.name}}</router-link></li>
          </ul>
        </div>
        <div class="doulist">
          <h2 class="doulist-title">热门豆列</h2>
          <ul>
            <li class="doulist-item">MOViE木卫：你不应该错过的100部韩国电影</li>
            <li class="doulist-item">MOViE木卫：你不应该错过的100部韩国电影</li>
          </ul>
        </div>
      </template>
    </base-body>
  <CommonFooter></CommonFooter>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/header/Header";
import PhotoList from "@/pages/home/components/PhotoList";
import BannerSwiper from "@/pages/home/components/BannerSwiper";
import CommonFooter from "@/pages/common/footer/Footer";
import axios from "axios"
import BaseBody from "@/pages/common/baseBody/BaseBody";

export default {
  name: "Home",
  components: {BaseBody, CommonFooter, BannerSwiper, PhotoList, CommonHeader},
  data(){
    return{
      HomeData:{},
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
        this.HomeData = res.data.data
      }
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
