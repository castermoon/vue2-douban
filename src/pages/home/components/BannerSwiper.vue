<template>
  <div class="banner-container">
    <div class="header">
      <span class="title">最近热门电影</span>
      <ul class="header-list">
        <li
            v-for="(item,index) of typeList"
            class="header-list-item"
            :key="index"
            @click="$emit('getMovieList',dataType,item)"
        >
          {{item}}
        </li>
      </ul>
      <div class="more">更多»</div>
    </div>
    <div class="banner-body">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(page,index) of pages" :key="index">
          <router-link :to="{path:'detail',query:{movie_id:item.id}}" tag="div" class="item" v-for="item of page" :key="item.id">
            <div class="icon"><img :src="item.cover"/></div>
            <div class="name">{{item.name}}</div>
            <div class="tip_wrapper">
              <Tip :movieItem="item" />
            </div>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import Tip from "@/pages/common/tip/Tip";
export default {
  name: "BannerSwiper",
  components: {Tip},
  props:{
    movieList:{
      type:Array,
      default(){
        return[]
      }
    },
    title:{
      type:String,
      default:"",
    },
    dataType:{
      type:String,
      default:""
    },
    typeList:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return{
      swiperOption:{
        pagination: '.swiper-pagination',
        // paginationType: 'fraction',
        observeParents: true,
        observer: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      },
    }
  },
  computed: {
    pages() {
      let pages = []
      this.movieList.forEach((item,index)=>{
        let page = Math.floor(index / 10)
        if (!pages[page]){
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "~@/assets/style/mixins.styl"
.banner-container >>> .swiper-container
  overflow inherit
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets
  bottom -20px
.swiper-button-prev, .swiper-button-next
  width 20px
  height 15px
  top 447px
.swiper-button-prev
  left 40%
  background-position left
.swiper-button-next
  right 40%
  background-position right
.swiper-slide
  visibility hidden
.swiper-slide-active
  visibility visible
.banner-container
  margin-top 30px
  .header
    height 40px
    line-height 40px
    border-bottom 1px solid #eaeaea
    margin-bottom 15px
    .title
      float left
      margin-right 12px
    .header-list
      float left
      .header-list-item
        float left
        color #9B9B9B
        cursor pointer
        font-size 12px
        margin-right 12px
    .more
      float right
      font-size 12px
      color #258dcd
  .banner-body
    height 450px
    .item
      display inline-block
      margin-right 35px
      width 115px
      height 210px
      position relative
      &:nth-child(5n)
        margin-right 0
      &:hover .tip_wrapper
        display block
      .icon
        width 115px
        height 161px
        overflow hidden
        img
          width 100%
      .name
        ellipsis()
        text-align center
        height 40px
        line-height 40px
        color #258dcd
      .tip_wrapper
        display none


</style>
