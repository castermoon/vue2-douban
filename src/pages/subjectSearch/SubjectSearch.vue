<template>
  <div>
    <common-header></common-header>
    <base-body :title="'搜索 '+this.$route.query.searchContent">
      <template slot="base-body-left">
        <ul class="search-list">
          <li class="search-item" v-for="item of movieContentData">
            <div class="search-item-left">
              <img :src="item.cover"/>
            </div>
            <div class="search-item-right">
              <router-link tag="h1" :to="{path:'detail',query:{movie_id:item.id}}" class="movie-name">{{item.name}} ({{item.time | dateChange }})</router-link>
              <div class="star-wrapper"><star :score="item.score"></star></div>
              <span class="score">{{item.score}}</span>
              <p class="movie-desc">{{item.countryu}}/{{item.type}}/{{item.name}}//{{item.timeLen}}</p>
            </div>
          </li>
        </ul>
        <ul class="search-list">
          <li class="search-item" v-for="item of celebrityContentData">
            <div class="search-item-left">
              <img :src="item.icon"/>
            </div>
            <div class="search-item-right">
              <router-link tag="h1" :to="{path:'celebrity',query:{celebrity_id:item.id}}" class="celebrity-name">{{item.name}}</router-link>
              <p class="movie-desc">{{item.vocation}}/{{item.birth}}</p>
            </div>
          </li>
        </ul>
      </template>
      <template slot="base-body-right"></template>
    </base-body>
    <common-footer></common-footer>
  </div>

</template>

<script>

import CommonHeader from "@/pages/common/header/Header";
import CommonFooter from "@/pages/common/footer/Footer";
import BaseBody from "@/pages/common/baseBody/BaseBody";
import axios from 'axios';
import Star from "@/pages/common/star/Star";

export default {
  name: "SubjectSearch",
  components: {Star, BaseBody, CommonFooter, CommonHeader},
  data(){
    return{
      movieContentData:[],
      celebrityContentData:[]
    }
  },
  methods:{
    SearchInfo(){
      axios.get('/api/subjectSearch/'+ this.$route.query.searchContent + "/" + this.$route.query.searchType,{
      }).then(this.getSearchInfoSucc)
    },
    getSearchInfoSucc(res){
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        if(res.searchType === "movies"){
          this.movieContentData = data
        }else{
          this.celebrityContentData = data
        }
      }
    }
  },
  filters:{
    dateChange(date){
      return date.substring(0,4)
    }
  },
  created(){
    this.SearchInfo()
  }
}
</script>

<style lang="stylus" scoped>
.search-list
  line-height 32px
  .search-item
    display flex
    .search-item-left
      height 97px
      flex 0 0 65px
      margin-right 15px
      img
        width 100%
    .search-item-right
      flex 1
      .movie-name,.celebrity-name
        cursor pointer
        color #3377aa
      .star-wrapper
        margin-right 10px
        width 55px
        display inline-block
      .score
        color #e09015
      .movie-desc
        color:#999
        font-size 13px
</style>
