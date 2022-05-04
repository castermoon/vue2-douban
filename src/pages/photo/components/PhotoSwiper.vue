<template>
  <div class="photoSwiper-container">
    <swiper :options="swiperOption" class="photoSwiper">
      <swiper-slide class="photoSwiper-item" v-for="(page,index) of pages" :key="index">
        <div class="photoSwiper-img-wrapper" v-for="item of page" :key="item.id">
          <img :src="item">
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "PhotoSwiper",
  props:{
    imgList:{
      type:Array,
      default() {
        return [
        ]
      }
    }
  },
  data(){
    return{
      swiperOption:{
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      },
    }
  },
  computed: {
    pages() {
      let pages = []
      this.imgList.forEach((item,index)=>{
        let page = Math.floor(index / 3)
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

.photoSwiper-container >>> .swiper-container
  margin-left 0
  margin-right 0
  overflow inherit
.swiper-button-prev, .swiper-button-next
  width 22px
  height 18px
.swiper-button-prev
  left -26px
  top 51px
  background-position left
.swiper-button-next
  right -13px
  top 51px
  background-position right

.photoSwiper-container
  width 320px
  height 82px
  overflow: hidden;
  .photoSwiper
    width 270px
    height 100%
    .photoSwiper-item
      width 100%
      height 100%
      .photoSwiper-img-wrapper
        margin-right 7px
        width 70px
        height 70px
        border 2px solid #eee
        float left
        padding 4px
        img
          width 100%
</style>
