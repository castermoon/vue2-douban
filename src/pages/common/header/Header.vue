<template>
  <div>
    <common-top-header></common-top-header>
    <div class="header">
      <div class="body">
        <div class="header-border-line"></div>
        <div class="header-body-top">
          <router-link to="/" class="title">豆瓣电影</router-link>
          <div class="search-container">
            <select class="select" v-model="searchType">
              <option value="movies">电影</option>
              <option value="celebritys">人物</option>
            </select>
            <input class="search-input" placeholder="搜索电影、人物" v-model="searchContent"/>
            <button class="search-button" @click="handleSearch"></button>
          </div>
        </div>
        <ul class="header-body-bottom">
<!--          <li class="header-body-link">影讯&购票</li>-->
<!--          <li class="header-body-link">选电影</li>-->
<!--          <li class="header-body-link">电视剧</li>-->
<!--          <li class="header-body-link">排行榜 </li>-->
<!--          <li class="header-body-link">分类 </li>-->
<!--          <li class="header-body-link">影评</li>-->
<!--          <li class="header-body-link">2019年度榜单 </li>-->
<!--          <li class="header-body-link">2019书影音报告</li>-->
        </ul>
        <div class="header-logo"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTopHeader from "@/pages/common/CommonTopHeader/CommonTopHeader";
export default {
  name: "CommonHeader",
  components: {CommonTopHeader},
  data(){
    return{
      searchContent:"",
      searchType: this.$route.query.searchType || "movies",
    }
  },
  methods:{
    handleSearch(){
      if(!this.searchContent){
        alert("请输入搜索内容")
        return
      }
      if(this.$route.query.searchContent === this.searchContent && this.$route.query.searchType === this.searchType){
        return
      }
      this.$router.push({
        name:'SubjectSearch',query:{searchContent:this.searchContent,searchType:this.searchType}
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.header
  min-width 1078px
  padding 0 10px
  box-sizing border-box
  background #f0f3f5
  .body
    width 1058px
    margin 0 auto
    position relative
    .header-border-line
      width 100%
      height 1px
      background #eaeaea
      position absolute
      top 78px
    .header-body-top
      width 100%
      height 86px
      display inline-block
      .title
        font-weight bold
        line-height 74px
        font-size 32px
        color #258dcd
        float left
        margin-right 55px
        position relative
        .page
          position absolute
          top 0
          left -91px
          font-size 20px
          color #000000
      .search-container
        width 461px
        height 30px
        float left
        display flex
        margin-top 25px
        .search-input
          border-radius 2px 0 0 2px
          box-shadow 0 1px #ccc
          padding-left 10px
          flex 1
        .search-button
          width 40px
          height 30px
          border-radius 0 5px 5px 0
          background #8d969f
        .select
          border-radius 2px 0 0 2px
          box-shadow 0 1px #ccc
          border-right 1px solid #9b9b9b
    .header-body-bottom
      width 850px
      line-height 4px
      .header-body-link
        display inline-block
        margin-right 30px
        color #258dcd
        height 22px
        line-height 22px
    .header-logo
      position absolute
      width 186px
      height 96px
      background:url("https://images.weserv.nl/?url=img3.doubanio.com/dae/accounts/resources/19870c3/movie/assets/annual_2019.png") no-repeat
      background-size 160px 90px
      left 66%
      top 12px
</style>
