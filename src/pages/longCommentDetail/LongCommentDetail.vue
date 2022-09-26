<template>
  <div @click.self="respondInputHide">
    <common-header></common-header>
    <base-body :title="longCommentDetail.title">
      <template slot="base-body-left">
        <div class="long-comment-body">
          <div class="long-comment-header">
            <img class="icon" src="https://images.weserv.nl/?url=https://img2.doubanio.com/icon/u155190344-21.jpg">
            <div class="name"><a href="#">{{ longCommentDetail.nickName }}</a></div>
            <div class="star-wrapper"><star :score="longCommentDetail.score"></star></div>
            <div class="date">{{longCommentDetail.date | timestampChange }}</div>
          </div>
          <div class="Spoiler" v-if="CommentsMovieData.spoiler">| 这篇影评可能有剧透</div>
          <p class="long-comment-content" v-html="longCommentDetail.content">
          </p>
          <div class="copyright">
            © 本文版权归作者&nbsp;{{ longCommentDetail.nickName }}&nbsp;所有，任何形式转载请联系作者。
          </div>
<!--          <div class="long-comment-bottom">-->
<!--            <div class="useful">有用的</div>-->
<!--            <div class="useless">无用的</div>-->
<!--          </div>-->
        </div>
        <ul class="respond-list" ref="respondList">
          <li class="respond-item" v-for="(item,index) of longCommentDetailRes" :key="item.id" ref="respondItemList">
            <div class="respond-item-left">
              <img class="respond-item-icon" src="https://img2.doubanio.com/icon/up208248294-1.jpg">
            </div>
            <div class="respond-item-right">
              <div class="respond-user-info">
                <a  href="#" class="respond-user-name">{{ item.firstRes_name }}</a>
                <div class="respond-date">{{ item.firstRes_date | timestampChange }}</div>
              </div>
              <div class="respond-content">{{item.firstRes_content}}</div>
              <div class="respond-item-right-bottom" >
                <span @click="respondInputShow(item)">回应</span>
              </div>
              <div class="respond-input-container" v-if="item.respondInputIsShow">
                <input class="respondInput" v-model="resResInputContent"/>
                <button class="respond-btn" @click="createResRes(item.id,item.firstRes_userId,index)">加上去</button>
              </div>
              <ul class="resRes-list">
                <li class="resRes-item" v-for="secondResItem of item.secondResList" :key="secondResItem.id">
                  <div class="resRes-item-left">
                    <img class="resRes-item-icon" src="https://img2.doubanio.com/icon/up208248294-1.jpg">
                  </div>
                  <div class="resRes-item-right">
                    <div class="resRes-user-info">
                      <a  href="#" class="resRes-user-name">{{ secondResItem.secondRes_name }}</a>
                      <div class="resRes-date">{{ secondResItem.secondRes_date | timestampChange }}</div>
                    </div>
                    <div class="resRes-content"><a href="." class="resRes-name">@{{secondResItem.secondRes_respond_name}}</a>{{ secondResItem.secondRes_content }}</div>
                    <div class="resRes-item-right-bottom" >
                      <span @click="respondInputShow(secondResItem)">回应</span>
                    </div>
                    <div class="respond-input-container" v-if="secondResItem.respondInputIsShow">
                      <input class="respondInput" v-model="resResInputContent"/>
                      <button class="respond-btn" @click="createResRes(item.id,secondResItem.secondRes_userId,index)">加上去</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="my-respond">
          <div class="my-respond-left">
            <img class="my-respond-icon" src="https://images.weserv.nl/?url=https://img2.doubanio.com/icon/u155190344-21.jpg"/>
          </div>
          <textarea class="my-respond-input" placeholder="添加回应" v-model="myRespondInputContent"/>
        </div>
        <button class="my-respond-btn" @click="createMyRespond">加上去</button>
      </template>
      <template slot="base-body-right">
        <common-movie-data :CommentsMovieData="CommentsMovieData"></common-movie-data>
      </template>
    </base-body>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from "@/pages/common/commonHeader/Header";
import CommonFooter from "@/pages/common/commonFooter/Footer";
import Star from "@/pages/common/star/Star";
import axios from "axios"
import BaseBody from "@/pages/common/baseBody/BaseBody";
import CommonMovieData from "@/pages/common/commonMovieData/CommonMovieData";
import Vue from "vue"
export default {
  name: "LongCommentDetail",
  components: {CommonMovieData, BaseBody, CommonFooter, CommonHeader,Star},
  data(){
    return{
      CommentsMovieData:{},
      longCommentDetailRes:[],
      longCommentDetail:{},
      resResInputContent:"",
      myRespondInputContent:"",
      isFirstEnterPage:true,
      userInfo:JSON.parse(localStorage.getItem("userInfo")) || null,
    }
  },
  methods:{
    getLongComDetail () {
      axios.get('/api/longCommentDetail/' + this.$route.query.longComment_id, {
      }).then(this.getLongComDetailSucc)
    },
    getLongComDetailSucc (res) {
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        this.CommentsMovieData = data.CommentsMovieData
        this.longCommentDetailRes = data.longCommentDetailRes
        this.longCommentDetail = data.longCommentDetail
        this.setInputStatus()
        this.$nextTick(() => {
          if(this.isFirstEnterPage){
            window.scrollTo(0,this.$route.query.scrollTop)
            this.isFirstEnterPage = false
          }
        })
      }
    },
    respondInputShow(item){
      this.resResInputContent = ""
      this.longCommentDetailRes.map((item) => {
        item.respondInputIsShow = false
        item.secondResList.map((item2) => {
          item2.respondInputIsShow = false
        })
      })
      item.respondInputIsShow = true
    },
    respondInputHide(){
      this.longCommentDetailRes.map((item) => {
        item.respondInputIsShow = false
        item.secondResList.map((item2) => {
          item2.respondInputIsShow = false
        })
      })
      this.resResInputContent = ""
    },
    createMyRespond(){
      if(this.myRespondInputContent.trim() === ""){
        alert("没有输入回应内容")
        return
      }
      if(!this.userInfo){
        alert("未登录")
        return;
      }
      axios.post('/api/longCommentDetail/createLongCommentRes',{
        user_id:this.userInfo.id,
        longComment_id:this.longCommentDetail.id,
        content:this.myRespondInputContent.trim(),
        scrollTop:document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        respondent_id:this.longCommentDetail.user_id
      })
      .then((data) => {
        this.getLongComDetail()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    createResRes(longCommentRes_id,respond_id,index){
      if(this.resResInputContent.trim() === ""){
        alert("没有输入回应内容")
        return
      }
      if(!userInfo){
        alert("没有登录")
        return
      }
      //index表示被回复楼层所在列表的索引,scrollTop为产生的评论距离顶部的高度。
      let scrollTop = this.$refs.respondItemList[index].offsetTop + this.$refs.respondItemList[index].offsetHeight - 200
      axios.post('/api/longCommentDetail/createLongCommentResRes',{
        user_id:this.userInfo.id,
        longCommentRespond_id:longCommentRes_id,
        longComment_id:this.longCommentDetail.id,
        respond_id:respond_id,
        content:this.resResInputContent.trim(),
        scrollTop:scrollTop
      })
      .then((data) => {
        this.getLongComDetail()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    setInputStatus(){
      this.longCommentDetailRes.map((item) => {
        Vue.set(item,"respondInputIsShow",false)
        item.secondResList.map((item2) => {
          Vue.set(item2,"respondInputIsShow",false)
        })
      })
    }
  },
  filters: {
    timestampChange(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  created () {
    this.getLongComDetail()
  }
}
</script>

<style lang="stylus" scoped>
.long-comment-body
  line-height 25px
  padding 20px 0
  .long-comment-header
    margin-bottom 10px
    .icon
      display inline-block
      width 24px
      height 24px
      margin-right 10px
    .name
      display inline-block
      font-size 13px
      margin-right 3px
    .star-wrapper
      display inline-block
      margin-right 10px
    .date
      display inline-block
      color #999
  .Spoiler
    color #9b9b9b
    font-size 13px
    margin-bottom 25px
  .long-comment-content
    font-size 14px
    line-height 18px
    overflow hidden
  .copyright
    margin-top 70px
    margin-bottom 50px
    color #999
    font-size 13px
  .long-comment-bottom
    width 100%
    text-align center
    .useful,.useless
      display inline-block
      height 32px
      line-height 32px
      text-align center
      min-width 90px
      border 1px solid #a4d0a1
      color #072
    .useful
      margin-right 20px
.respond-list
  width 100%
  margin-top 30px
  .respond-item
    width 100%
    display flex
    .respond-item-left
      margin-right 18px
      flex 0 0 48px
      .respond-item-icon
        width 48px
        height 48px
    .respond-item-right
      flex 1
      .respond-user-info
        padding-left 7px
        font-size 13px
        width 100%
        height 27px
        line-height 27px
        background-color: rgb(243, 245, 247)
        .respond-user-name
          margin-right 10px
          display inline-block
        .respond-date
          display inline-block
          color #9b9b9b
      .respond-content
        padding 15px 0
        font-size 13px
      .respond-item-right-bottom,.resRes-item-right-bottom
        display inline-block
        text-align right
        width 100%
        color #9b9b9b
        font-size 13px
        margin-bottom 10px
      .respond-input-container
        width 100%
        .respondInput
          width 84%
          margin-right 15px
          display inline-block
          height 26px
          border: 1px solid #ccc
          padding: 2px
          font-size: 13px;
        .respond-btn
          border-radius 3px
          border 1px solid #c0c0c0
          display inline-block
          width 66px
          height 30px
      .resRes-list
        margin-top 30px
        .resRes-item
          width 100%
          display flex
          .resRes-item-left
            flex 0 0 24px
            margin-right 15px
            .resRes-item-icon
              width 24px
              height 24px
          .resRes-item-right
            flex 1
            padding-bottom 10px
            .resRes-user-info
              padding-left 7px
              font-size 13px
              width 100%
              height 27px
              line-height 27px
              .resRes-user-name
                margin-right 10px
                display inline-block
              .resRes-date
                display inline-block
                color #9b9b9b
            .resRes-content
              padding 15px 0
              font-size 13px
              .resRes-name
                color blue
                margin-right 10px
.my-respond
  width 100%
  display flex
  .my-respond-left
    margin-right 18px
    flex 0 0 48px
    .my-respond-icon
      width 48px
      height 48px
  .my-respond-input
    border 1px solid #ccc
    padding 5px
    height 65px
    flex 1
.my-respond-btn
   margin 10px 0
   border-radius 3px
   border 1px solid #c0c0c0
   float right
   width 66px
   height 30px
</style>
