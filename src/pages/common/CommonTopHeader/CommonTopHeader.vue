<template>
  <div class="Common-Top-header">
<!--    <ul class="header-left">-->
<!--      <li class="header-link"><a href="#">豆瓣</a></li>-->
<!--      <li class="header-link"><a href="#">读书</a></li>-->
<!--      <li class="header-link"><a href="#">电影</a></li>-->
<!--      <li class="header-link"><a href="#">音乐</a></li>-->
<!--      <li class="header-link"><a href="#">同城</a></li>-->
<!--      <li class="header-link"><a href="#">小组</a></li>-->
<!--      <li class="header-link"><a href="#">阅读</a></li>-->
<!--      <li class="header-link"><a href="#">FM</a></li>-->
<!--    </ul>-->
    <div class="header-right">
      <router-link :to="{path:'notice'}"  v-if="userInfo" class="header-right-link">提醒<span class="noticeActive" v-if="noticeNum > 0">{{noticeNum}}</span></router-link>
      <router-link to="/login" href="#" v-if="!userInfo" class="header-right-link">登录/注册</router-link>
      <div class="drop-down-menu" v-else>
        <a class="drop-down-menu-btn" @click="dropMenuBtnClick" >{{userInfo.nickname}}的账号</a>
        <ul class="drop-down-menu-list" :class="{isActive:dropMenuShow}">
          <li class="drop-down-menu-item"><router-link  :to="{path:'personal',query:{user_id:userInfo.id}}">个人主页</router-link></li>
          <li class="drop-down-menu-item" @click="logoutBtnClick">退出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "CommonTopHeader",
  data(){
    return{
      dropMenuShow:false,
      userInfo:JSON.parse(localStorage.getItem("userInfo")) || null,
      noticeNum:0
    }
  },
  methods:{
    dropMenuBtnClick(){
      this.dropMenuShow = !this.dropMenuShow
    },
    logoutBtnClick(){
      axios.get('/api/user/logout',{
      }).then((res) => {
        if(res.data.errno == 0){
          localStorage.setItem("userInfo",JSON.stringify(null))
          this.$router.push({
            name: "Login"
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getNoticeNum(){
      if(!this.userInfo){
        return
      }
      if(this.userInfo){
        axios.get('/api/user/notice',{
        }).then((res) => {
          if(res.data.errno == 0){
            this.noticeNum = res.data.data.noticeNum
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  created() {
    this.getNoticeNum()
  }
}
</script>

<style lang="stylus" scoped>
.Common-Top-header
  min-width 1078px
  height 30px
  line-height 30px
  background #545652
  color #eee
  box-sizing border-box
  padding 0 15px
  font-size 13px
  .header-left
    float left
    .header-link
      float left
      margin-right 24px
      a
        color: #ccc
  .header-right
    float: right
    margin-right 30px
    .header-right-link
      margin-right 20px;
      color: #ccc;
      &:nth-last-child(1)
        margin-right 0
      .noticeActive
        text-align center
        line-height 15px
        vertical-align middle
        display inline-block
        margin 0 3px
        width 15px
        height 15px
        background red
        color #fff
        border-radius 5px
    .drop-down-menu
      display inline-block
      vertical-align top
      position relative;
      .drop-down-menu-btn
        color: #ccc
        text-align center
      .drop-down-menu-list
        position absolute
        top 30px
        left -10px
        width 90px
        background #fff
        border 1px solid #ccc
        display none
        &.isActive
          display block
        .drop-down-menu-item
          text-align center
          color #000
          &.drop-down-menu-item:hover
            background #F6F6F6
</style>
