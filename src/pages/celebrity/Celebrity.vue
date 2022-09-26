<template>
  <div>
    <common-header></common-header>
    <base-body :title="celebrityData.name">
      <template slot="base-body-left">
        <div class="celebrity-content">
          <div class="celebrity-content-img-wrapper">
            <img :src="celebrityData.icon">
          </div>
          <div class="celebrity-content-desc">
            <p class="sex"><span class="label">性别:</span>{{celebrityData.sex}}</p>
            <p class="constellation"><span class="label">星座:</span>{{celebrityData.constellation}}</p>
            <p class="birth"><span class="label">出生日期:</span>{{celebrityData.birth}}</p>
            <p class="vocation"><span class="label">职业:</span>{{celebrityData.vocation}}</p>
            <p class="anotherName"><span class="label">更多外文名:</span>{{celebrityData.anotherName}}</p>
            <p class="anotherChineseName"><span class="label">更多中文名:</span>{{celebrityData.anotherChineseName}}</p>
            <p class="indbLink"><span class="label">IMDb链接:</span><a href="#">{{celebrityData.indbLink}}</a></p>
            <p class="web"><span class="label">官方网站:</span><a href="#">{{celebrityData.web}}</a></p>
          </div>
        </div>
        <div class="celebrity-detail">
          <div class="celebrity-detail-title">影人简介  · · · · · ·</div>
          <div class="celebrity-detail-content" v-html="celebrityData.desc"></div>
        </div>
        <div class="recentWorks">
          <div class="recentWorks-title">最近的5部作品（已上映）  · · · · · ·</div>
          <ul class="recentWorks-list clearfix">
            <router-link tag="li" :to="{path:'detail',query:{movie_id:item.id}}"  class="recentWorks-item" v-for="item of recentWorksListData" :key="item.id">
              <div class="recentWorks-item-title">{{ item.time | timeCutOut }}</div>
              <div class="recentWorks-img-wrapper"><img class="recentWorks-img" :src="item.cover"></div>
              <p class="recentWorks-info multilineEllipsis">{{item.name}}</p>
              <div class="score">{{item.score}}</div>
            </router-link>
          </ul>
        </div>
      </template>
      <template slot="base-body-right">
      </template>
    </base-body>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/commonHeader/Header";
import axios from "axios"
import BaseBody from "@/pages/common/baseBody/BaseBody";
export default {
  name: "Celebrity",
  components: {BaseBody, CommonHeader},
  data(){
    return{
      celebrityData:{},
      recentWorksListData:[]
    }
  },
  methods: {
    getCelebrityInfo () {
      axios.get('/api/celebrity/'+ this.$route.query.celebrity_id)
          .then(this.getCelebrityInfoSucc)
    },
    getCelebrityInfoSucc (res) {
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        this.celebrityData = data.celebrityData
        this.recentWorksListData = data.recentWorksListData
      }
    }
  },
  filters: {
    timeCutOut(time) {
      return time.substr(0,10);
    }
  },
  created () {
    this.getCelebrityInfo()
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/style/mixins.styl"
.celebrity-content
  margin-bottom 30px
  .celebrity-content-img-wrapper
    display inline-block
    width 135px
    height 191px
    margin-right 15px
    vertical-align top
    img
      width 100%
  .celebrity-content-desc
    width 350px
    display inline-block
    font-size 13px
    line-height 22px
    margin-right 20px
    .label
      margin-right 8px
    a
      color #258dcd
      margin-right 5px
.celebrity-detail
  .celebrity-detail-title
    margin-bottom 15px
  .celebrity-detail-content
    line-height 22px
    font-size 13px
    word-wrap break-word
    overflow hidden
    text-indent 2em
.recentWorks
  margin-top 30px
  .recentWorks-title
    margin-bottom 20px
  .recentWorks-list
    .recentWorks-item
      width 115px
      float left
      margin-right 25px
      &:last-child
        margin-right 0
      .recentWorks-item-title
        color: #999
        background: none
        font-size: 16px
        text-align: left
        letter-spacing: 0.1em
        margin-bottom 10px
        height: 29px
        line-height 29px
      .recentWorks-img-wrapper
        width 115px
        height 160px
        overflow: hidden
        .recentWorks-img
          width 100%
      .recentWorks-info
        font-size 13px
        cursor pointer
        color #3377aa
      .score
        text-align center
        color #e09015
        line-height 30px
        font-size 12px

</style>
