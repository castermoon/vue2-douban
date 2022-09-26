<template>
  <div class="container">
    <div class="title">
      <span class="hot">正在热映</span>
    </div>
    <div class="photo-container">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(page,index) in pages" :key="index">
          <router-link :to="{path:'/detail', query:{movie_id:item.id}}" v-for="item in page" tag="div" class="item" :key="item.id">
            <div class="icon"><img :src="item.cover"/></div>
            <div class="name">{{item.name}}</div>
            <div class="star-wrapper"><star :score="item.score"></star><span class="score">{{item.score}}</span></div>
            <div class="button">选座购票</div>
            <div class="tip_wrapper">
              <Tip :movieItem="item"/>
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
import Star from "@/pages/common/star/Star";
import Tip from "@/pages/common/tip/Tip";
export default {
  name: "PhotoList",
  props:{
    movieList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {Tip, Star},
  data(){
    return{
      swiperOption:{
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        observeParents: true,
        observer: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      }
    }
  },
  computed: {
    pages() {
      let pages = []
      this.movieList.forEach((item,index)=>{
        let page = Math.floor(index / 5)
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
.container >>> .swiper-container
  overflow inherit
.swiper-pagination-fraction
  width: 30px;
  height: 20px;
  top: -45px;
  right: 48px;
  bottom auto
  left auto
.swiper-button-prev,.swiper-button-next
  width 15px
  height 15px
  top -24px
.swiper-button-next
  right 14px
  background-position right
.swiper-button-prev
  left 675px
  background-position left
.swiper-slide
  visibility hidden
.swiper-slide-active
  visibility visible
.container
  .title
    height 50px
    width 100%
    line-height 50px
    border-bottom 1px solid #cccccc
    .hot
      margin-right 15px
      font-size 16px
  .photo-container
    padding-top 18px
    .item
      display inline-block
      margin-right 35px
      width 115px
      position relative
      &:last-child
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
      .star-wrapper
        width 64px
        margin-bottom 5px
        text-align center
        height 20px
        padding 0 13px
        position relative
        .score
          color #e09015
          font-size 12px
          position absolute
          top 0
          right -6px
      .button
        margin-left  5px
        width 100px
        color #fff
        height 25px
        line-height 25px
        background #258dcd
        text-align center
      .tip_wrapper
        display none
</style>
