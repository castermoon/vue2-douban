<template>
  <div>
    <common-header></common-header>
    <div class="title">{{PhotoData.name}}</div>
    <div class="body">
      <div class="body-left">
        <div class="photo-container">
          <div class="photo-page">
            <div class="photo-page-left">第45张/共115张</div>
            <div class="photo-page-mid">上一张 / 下一张</div>
            <div class="photo-page-right">>  浏览所有剧照</div>
          </div>
          <div class="photo-show"><img :src="PhotoData.imgUrl"> </div>
        </div>
        <div class="comments">
          <div class="comment-item" v-for="item of PhotoData.comment" :key="item.id">
            <div class="comment-icon"><img :src="item.iconUrl"/></div>
            <div class="comment-content">
              <div class="comment-header">
                <div class="date">{{item.date}}</div>
                <div class="name"><a href="#">{{item.name}}</a> </div>
              </div>
              <div class="comment-content-desc">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="body-right">
        <photo-swiper :imgList="PhotoData.imgList"></photo-swiper>
        <div class="photo-detail">
          <div class="photo-detail-title">图片信息  · · · · · ·</div>
          <div class="photo-detail-content">
            <p class="name"><span class="label">电影名称:</span><a href="#">{{PhotoData.name}}</a></p>
            <p class="type"><span class="label">图片类型:</span>{{PhotoData.type}}</p>
            <p><span class="label">原图尺寸:</span>{{PhotoData.size}}</p>
            <p><span class="label">文件大小:</span>{{PhotoData.big}}</p>
            <p><span class="label">来自</span><a href="#">{{PhotoData.from}}</a></p>
            <p>上传于{{PhotoData.uploadDate}}</p>
          </div>
        </div>
        <div class="back-link reallyLink"><router-link to="/detail">去{{PhotoData.name}} 的页面</router-link></div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/header/Header";
import CommonFooter from "@/pages/common/footer/Footer";
import PhotoSwiper from "@/pages/photo/components/PhotoSwiper";
import axios from "axios"
export default {
  name: "Photo",
  components: {PhotoSwiper, CommonFooter, CommonHeader},
  data(){
    return{
      PhotoData:{}
    }
  },
  methods: {
    getPhotoInfo () {
      axios.get('/api/photo.json')
          .then(this.getPhotoInfoSucc)
    },
    getPhotoInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.PhotoData = data
      }
    }
  },
  created () {
    this.getPhotoInfo()
  },
}
</script>

<style lang="stylus" scoped>
.title
  font-size 26px
  width 1078px
  margin 0 auto
  margin-top 40px
  font-weight bold
.body
  width 1078px
  //height 888px
  //background green
  margin 0 auto
  .body-left
    width 680px
    height 800px
    float left
    margin-top 30px
    .photo-container
      width 100%
      margin-bottom 80px
      .photo-page
        width 100%
        height 27px
        font-size 13px
        border-bottom 1px dashed #ddd
        margin-bottom 15px
        .photo-page-left
          display inline-block
          margin-right 180px
        .photo-page-mid
          display inline-block
          margin-right 220px
        .photo-page-right
          display inline-block
      .photo-show
        width 675px
        height 381px
        img
          width 100%
    .comments
      width 675px
      .comment-item
        width 100%
        //height 72px
        margin-bottom 20px
        .comment-icon
          vertical-align top
          width 48px
          height 48px
          display inline-block
          margin-right 20px
          img
            width 100%
        .comment-content
          vertical-align top
          width: 600px
          height 100%
          display inline-block
          .comment-header
            width 100%
            font-size 13px
            height 25px
            line-height 25px
            background: #f2fbf2
            .date
              display inline-block
            .name
              display inline-block
          .comment-content-desc
            padding 13px 0
  .body-right
    margin-top 50px
    width 300px
    height 656px
    float right
    .photo-detail
      margin-top 30px
      width 310px
      height 226x
      .photo-detail-title
        color #072
        font-size 16px
        margin-bottom 20px
      .photo-detail-content
        font-size 13px
        line-height 20px
        .label
          margin-right 10px
    .back-link
      margin-top 30px

</style>
