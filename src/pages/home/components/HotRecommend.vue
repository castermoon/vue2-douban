<template>
  <div class="container">
    <div class="title">
      <span class="hot">热门推荐</span>
    </div>
    <div class="photoContainer">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="slide_left"><img src="https://i.postimg.cc/G4M7RLyD/075a5cd8faef84e.png"/></div>
          <div class="slide_right">
            <p class="slide_right_title">主旋律网络电影《狙击英雄》今日上线</p>
            <p class="slide_right_desc">热血谱写抗美援朝神枪手英雄史！不忘最冷的枪，不负最热的血。</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="slide_left"><img src="https://i.postimg.cc/G4M7RLyD/075a5cd8faef84e.png"/></div>
          <div class="slide_right">
            <p class="slide_right_title">主旋律网络电影《狙击英雄》今日上线</p>
            <p class="slide_right_desc">热血谱写抗美援朝神枪手英雄史！不忘最冷的枪，不负最热的血。</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotRecommend",
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
}
</script>

<style lang="stylus" scoped>
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
.container
  overflow hidden
  margin-bottom 30px
  .title
    height 50px
    width 100%
    line-height 50px
    border-bottom 1px solid #cccccc
    .hot
      margin-right 15px
      font-size 16px
  .photoContainer
    padding-top 18px
    .slide_left
      display inline-block
      width 350px
      height 240px
      img
        width 100%
    .slide_right
      width 317px
      height 168px
      display inline-block
      vertical-align top
      background #F9F9F9
      padding 48px 24px 24px 24px
      .slide_right_title
        font-size 18px
        margin-bottom 20px
      .slide_right_desc
        font-size 13px
        line-height 25px
        color #999
</style>
