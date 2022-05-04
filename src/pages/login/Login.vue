<template>
  <div>
    <common-top-header></common-top-header>
    <div class="header">
      <div class="nav">
        <router-link to="/" tag="div" class="img-wrapper">
          <img src="https://img3.doubanio.com/f/accounts/4fd84763a74089b20eb02ba0225d6e7739d2c432/passport/pics/douban_logo@2x.png" width="142">
        </router-link>
      </div>
    </div>
    <div class="login-container">
      <div class="account-tab">
        <div class="tab-header-item" @click="switchTab(0)" :class="{isActive:0===tabShow}">注册</div>
        <div class="tab-header-item" @click="switchTab(1)" :class="{isActive:1===tabShow}">密码登录</div>
      </div>
      <div class="account-tab-body">
        <div class="account-tab-body-item" :class="{isActive:tabShow===0}">
          <input class="username" type="text" v-model="registerName" placeholder="账号">
          <input class="password" type="password" v-model="registerPassword" placeholder="密码">
          <input class="submit" @click="registerClick" type="submit" value="注册账号" :class="{isActive:submitActive}"/>
        </div>
        <div class="account-tab-body-item" :class="{isActive:tabShow===1}">
          <input class="username" type="text" v-model="username" placeholder="账号">
          <input class="password" type="password" v-model="password" placeholder="密码">
          <input class="submit" @click="loginClick" type="submit" value="登录豆瓣" :class="{isActive:submitActive}"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CommonTopHeader from "@/pages/common/CommonTopHeader/CommonTopHeader";
export default {
  name: "Login",
  components: {CommonTopHeader},
  data(){
    return{
      username:'',
      password:'',
      registerName:'',
      registerPassword:'',
      tabShow: 1,
      submitActive:false
    }
  },
  computed:{
    dateRange() {
      const {username, password, registerName,registerPassword} = this;
      return {username, password,registerName,registerPassword}
    }
  },
  watch:{
    dateRange(){
      if((this.username && this.password) || (this.registerName && this.registerPassword)){
        this.submitActive = true
      }else {
        this.submitActive = false
      }
    }
  },
  methods:{
    switchTab(index){
      this.tabShow = index
      this.username = ''
      this.password = ''
      this.registerPassword = ''
      this.registerName = ''
    },
    loginClick(){
      axios.post('/api/user/login',{
        username:this.username,
        password:this.password
      })
      .then(this.loginSucc)
      .catch((err)=>{
        console.log(err)
      })
    },
    registerClick(){
      axios.post('/api/user/register',{
        username:this.registerName,
        password:this.registerPassword
      })
      .then(this.registerSucc)
      .catch((err)=>{
        console.log(err)
      })
    },
    loginSucc(res){
      if(!res.data.data){
        return
      }
      this.$router.push({
        name: "Personal", query: { user_id: res.data.data.id }
      })
    },
    registerSucc(res){
      if(res.data.errno == 0){
        alert("注册成功")
        this.$router.push({
          name: "Personal", query: { user_id: res.data.data.id }
        })
      }else {
        alert(res.data.message)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  min-width 1078px
  padding 0 10px
  box-sizing border-box
  background  #edf4ed
  .nav
    width: 1040px;
    margin: 0 auto;
    overflow: hidden;
    padding: 22px 0 20px;
    .img-wrapper
      display:inline-block
.login-container
  position: relative;
  margin 100px auto
  box-sizing border-box
  width: 340px;
  height 450px
  border 1px solid #eee
  padding 50px 30px 100px
  .account-tab
    font-size 20px
    .tab-header-item
      width 50%
      display inline-block
      padding 10px 0px
      text-align center
      border-bottom 2px solid #eee
      &.isActive
        font-weight 600
        border-bottom 2px solid #000
  .account-tab-body
    padding-top 20px
    .account-tab-body-item
      display none
      &.isActive
        display block
    .username,.password
      width: 280px;
      font-size: 13px;
      padding: 10px;
      border-radius: 3px;
      box-sizing: border-box;
      border: 1px solid #e4e6e5;
      margin-bottom 20px
      .password
        position relative
      .search-password
        position absolute
    .submit
      width 100%
      height 36px
      background #42BD5680
      color #fff
      text-align center
      line-height 36px
      font-weight bold
      margin-bottom 20px
      &.isActive
        background #41AC52

</style>
