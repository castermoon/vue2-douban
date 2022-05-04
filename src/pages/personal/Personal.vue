<template>
  <div>
    <common-top-header></common-top-header>
    <personal-header></personal-header>
    <base-body>
      <template slot="base-body-left">
        <div class="personal-info">
          <img class="icon" src="https://images.weserv.nl/?url=img2.doubanio.com/icon/u1854660-2473.jpg" style="width: 48px;height: 48px;"/>
          <div class="personal-info-right">
            <h1 class="name">{{ userInfo.nickname }}</h1>
            <div class="autograph">(添加签名档)</div>
          </div>
        </div>
        <ul class="info-title-list">
          <li class="info-title-item">我的主页</li>
          <li class="info-title-item">广播</li>
          <li class="info-title-item">相册</li>
          <li class="info-title-item">日记</li>
          <li class="info-title-item">豆列</li>
          <li class="info-title-item">片单|书单</li>
          <li class="info-title-item">设置</li>
        </ul>
        <common-title :title="'我的评论'" :content="'评论'"></common-title>
        <ul class="my-comments-list">
          <li class="my-comments-item" v-for="item of userLongComments" :key="item.id">
            <div class="work-cover-wrapper">
              <img class="work-cover" style="width: 90px;height: 128px;" :src="item.cover"/>
            </div>
            <div class="my-comments-item-right">
              <div class="title"><router-link   :to="{path:'longCommentDetail',query:{longComment_id:item.id,scrollTop:'0'}}">长评的标题。</router-link></div>
              <div class="info">
                <span class="Commentator"><a href="#">{{ item.nickName }}</a></span>
                评论:<span class="Comment-works"><a href="#">{{ item.movie_name}}</a></span>
                <div class="star-wrapper">
                  <star :score="item.score"></star>
                </div>
              </div>
              <div class="Spoiler" v-if="false">
                <div class="tip">提示：评论里有关键情节透露</div>
                <div class="link"><a href="#">>没关系，可以显示全文</a></div>
              </div>
              <p class="comment-content" v-if="true" v-text="substrByByte(item.content,225)">
              </p>
            </div>
          </li>
        </ul>
      </template>
      <template slot="base-body-right">
      </template>
    </base-body>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonTopHeader from "@/pages/common/CommonTopHeader/CommonTopHeader";
import CommonTitle from "@/pages/common/commonTitle/CommonTitle";
import Star from "@/pages/common/star/Star";
import CommonFooter from "@/pages/common/footer/Footer";
import axios from "axios"
import PersonalHeader from "@/pages/common/personalHeader/PersonalHeader";
import BaseBody from "@/pages/common/baseBody/BaseBody";
export default {
  name: "Personal",
  components: {BaseBody, PersonalHeader, CommonFooter, Star, CommonTitle, CommonTopHeader},
  data(){
    return{
      userInfo:{},
      userLongComments:[]
    }
  },
  methods:{
    substrByByte(str, num){
      let bytesCount = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) {
          bytesCount += 1;
        } else {
          bytesCount += 2;
        }
        if (bytesCount > num) {
          return str.substr(0, i) + ' ...'
        }
      }
      return str
    },
    getPersonalInfo () {
      axios.get('/api/personal/'+ this.$route.query.user_id,{
      }).then(this.getPersonalInfoSucc)
    },
    getPersonalInfoSucc (res) {
      res = res.data
      if (res.errno == 0 && res.data) {
        const data = res.data
        this.userInfo = data.userInfo
        this.userLongComments= data.userLongComments
      }
    }
  },
  created(){
    this.getPersonalInfo()
  }
}
</script>

<style lang="stylus" scoped>

.personal-info
  width 100%
  .icon
    vertical-align top
    display inline-block
  .personal-info-right
    display inline-block
    margin-left 10px
    .name
      display inline-block
      font-size 26px
      font-weight bold
    .autograph
      margin-top 10px
      font-size 13px
      color #777
.info-title-list
  padding 10px 0 10px 60px
  .info-title-item
    display inline-block
    margin-right 10px
    font-size 13px
    color #666699
.my-comments-list
  margin-bottom 80px
  .my-comments-item
    width 100%
    margin-bottom 20px
    .work-cover-wrapper
      width 90px
      display inline-block
      margin-right 15px
    .my-comments-item-right
      width 500px
      display inline-block
      vertical-align top
      font-size 13px
      a
        color #666699
      .title
        margin-bottom 11px
      .info
        font-size 13px
        margin-bottom 18px
      .Spoiler
        .tip
          margin-bottom 32px
      .comment-content
        height 67px
        width 100%
        line-height 20px
    .star-wrapper
      width 65px
      display inline-block
//.looked
//  .looked-left
//    display inline-block
//    height 100%
//    line-height 128px
//    margin-right 30px
//    color #acacac
//  .looked-list
//    display inline-block
//    width 600px
//    .looked-list-item
//      margin-right 43px
//      display inline-block
//      &:last-child
//        margin-right 0


</style>
