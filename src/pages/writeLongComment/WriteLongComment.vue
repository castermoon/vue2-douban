<template>
  <div>
    <div class="nav">
      <div class="nav-inner">
        <div class="nav-logo">
          <router-link class="nav-logo-text" :to="{path: '/'}" tag="a">豆瓣</router-link>
        </div>
        <h1 class="nav-label">写评论</h1>
      </div>
      <div class="nav-right">
        <div class="publish" @click="commentPublish">发表</div>
      </div>
    </div>
    <div class="container">
      <div class="score">
        <label class="label">给个评价吧(1-5):</label><input class="score-input" v-model="score" type="number"/>
        <label class="label">是否剧透:</label><input type="checkbox" v-model="spoiler">
      </div>
      <textarea class="title-input" v-model="commentTitle" maxlength="200" placeholder="添加标题" rows="1" style="resize: none; overflow: hidden; height: 30px;"></textarea>
      <textarea class="comment-input" v-model="commentContent" placeholder="写评论..."></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "WriteLongComment",
  data(){
    return{
      commentTitle:"",
      commentContent:"",
      score: 0,
      spoiler:0,
      userInfo:JSON.parse(localStorage.getItem("userInfo")) || null
    }
  },
  methods: {
    commentPublish () {
      if(!this.userInfo){
        alert("未登录")
        return
      }
      axios.post('/api/longComments/createLongComment',{
        movieId:this.$route.query.movie_id,
        //这里是为了让content在存入数据库时保留空格和换行。
        content:this.commentContent.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '),
        score:parseInt(this.score) * 2,
        userId:this.userInfo.id,
        title:this.commentTitle,
        spoiler:this.spoiler
      }).then((res)=>{
        this.$router.push({
          name: "LongCommentDetail", query: { longComment_id: res.data.data.res.id }
        })
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.nav
  min-width 1078px
  height 40px
  background #f8f8f8
  position: relative;
  .nav-inner
    width: 630px;
    margin: 0 auto;
    height: 40px;
    .nav-logo
      font-weight bold
      display: inline-block;
      vertical-align: bottom;
      width: 40px;
      font-size 20px
      line-height: 40px;
      background-size: 100%;
      margin-right: 20px;
      .nav-logo-text
        color #3DB04D
    .nav-label
      display inline-block
      line-height: 40px;
      font-size 16px
      color #BDBDBD
  .nav-right
    width 76px
    height 40px
    line-height 40px
    text-align center
    background #3DB04D
    color #fff
    position absolute
    right 0
    top 0
.container
  width: 630px;
  margin: auto;
  .score
    margin-top 40px
    height 40px
    line-height 40px
    font-size 12px
    .label
      margin-right 40px
    .score-input
      margin-right 200px
      width 150px
      line-height 20px
      border 1px solid #9b9b9b
  .title-input
    font-weight bolder
    font-size 19px
    width 100%
    outline: none;
    border-bottom 1px solid #ccc
  .comment-input
    padding 20px 5px
    width 100%
    min-height 800px
</style>
