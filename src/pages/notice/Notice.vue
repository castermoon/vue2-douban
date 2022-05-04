<template>
  <div>
    <common-top-header></common-top-header>
    <personal-header></personal-header>
    <base-body :title="'我的提醒'">
      <template slot="base-body-left">
        <ul class="notice-list">
          <li class="notice-list-item" v-for="item of noticeList" :key="item.id">
            <a href="." class="replier-name">{{ item.replierName }}</a>回复了您的帖子<router-link  :to="{path:'longCommentDetail',query:{longComment_id:item.longComment_id,scrollTop:item.scrollTop}}" class="longComment-name">{{ item.title }}</router-link>
            <div class="no-remind" @click="delNotice(item.id)">不再提醒</div>
          </li>
        </ul>
      </template>
      <template slot="base-body-right"></template>
    </base-body>
  </div>
</template>

<script>
import axios from "axios"
import CommonTopHeader from "@/pages/common/CommonTopHeader/CommonTopHeader";
import PersonalHeader from "@/pages/common/personalHeader/PersonalHeader";
import BaseBody from "@/pages/common/baseBody/BaseBody";
export default {
  name: "Notice",
  components: {BaseBody, PersonalHeader, CommonTopHeader},
  data(){
    return{
      noticeList:[]
    }
  },
  methods:{
    getNoticeInfo () {
      axios.get('/api/notice/' + this.$route.query.user_id, {
      }).then(this.getNoticeInfoSucc)
    },
    getNoticeInfoSucc (res) {
      res = res.data
      if (res.errno === 0 && res.data) {
        const data = res.data
        this.noticeList = data.noticeList
      }
    },
    delNotice(noticeId){
      axios.post('/api/notice/delNotice',{
        id:noticeId
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  created(){
    this.getNoticeInfo()
  }
}
</script>

<style lang="stylus" scoped>
.notice-list
  .notice-list-item
    padding-left 5px
    height 45px
    line-height 45px
    width 100%
    border-bottom 1px solid #cccccc
    .replier-name
      font-size 13px
      margin 0 10px
    .longComment-name
      font-size 13px
      margin  0 10px
    .no-remind
      cursor pointer
      font-size 13px
      float right
      color #AAA
      margin-right 10px

</style>
