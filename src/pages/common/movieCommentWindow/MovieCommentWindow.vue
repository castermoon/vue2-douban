<template>
  <div class="movie-comment-window" v-if="shortCommentWindowShow">
    <div class="window-header">
      <span>添加收藏：写短评</span>
      <div class="close" @click="closeShortCommentWindow">关闭</div>
    </div>
    <div class="window-body">
      <div class="window-checkbox-list">
        <div class="window-checkbox-item"><input type="radio" value="1" name="isLooked" v-model="status"/>看过</div>
        <div class="window-checkbox-item"><input type="radio" value="0" name="isLooked" v-model="status"/>想看</div>
        <div class="score-input-wrapper" v-if="status == 1">评分(1-5)<input class="score-input" type="text" v-model="score"/></div>
      </div>
      <div>标签(多个标签用空格分隔):</div>
      <input class="label-input" v-model="labelInput"/>
      <div class="window-label">
        <div class="window-label-left">我的标签:</div>
        <div class="window-label-list" >
          <div class="window-label-item" v-for="(item,index) of myLabel" :key="index" @click="AddLabel(item)" :class="{isActive:item.status}">{{item.name}}</div>
        </div>
      </div>
      <div class="window-label">
        <div class="window-label-left">常用标签:</div>
        <div class="window-label-list" >
          <span class="window-label-item"  v-for="(item,index) of usedLabel" :key="index" @click="AddLabel(item)" :class="{isActive:item.status}">{{item.name}}</span>
        </div>
      </div>
      <div>简短评论:</div>
      <textarea class="shortComment-input" v-model="shortCommentContent"/>
      <div class="only-me "><input type="checkbox" v-model="onlyMe"/>仅自己可见</div>
    </div>
    <div class="window-footer">
      <input type="checkbox" v-model="isShare"/>
      <div class="share">分享到我的广播</div>
      <div class="save" @click="saveShortComment">保存</div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "MovieCommentWindow",
  props:{
    movieId:{
      type:Number,
      required:true
    }
  },
  data(){
    return{
      shortCommentWindowShow:false,
      myLabelList:["悬疑","推理","治愈","推的","大萨达","啊啊啊","抖动","zz","学习","dd","打得","党的","到底","qq"],
      usedLabelList:["悬疑","推理","警匪"],
      labelInput:"",
      score:0,
      shortCommentContent:"",
      onlyMe:0,
      isShare:1,
      status:1
    }
  },
  methods: {
    shortCommentClick(){
      this.shortCommentWindowShow = true
    },
    closeShortCommentWindow(){
      this.shortCommentWindowShow = false
      this.labelInput = ""
      this.myLabel.map((item) => {
        item.status = false
      })
      this.usedLabel.map((item) => {
        item.status = false
      })
    },
    saveShortComment(){
      axios.post('/api/comments/createComment',{
        movieId:this.movieId,
        userId:this.$store.state.userInfo.id,
        content:this.shortCommentContent,
        score:parseInt(this.score) * 2,
        status:this.status,
        labelList:this.labelInput,
        onlyMe:this.onlyMe,
        isShare:this.isShare
      })
      .then(function (data){
        alert("保存成功")
      })
      .catch(function (err){
        console.log(err)
      })
      this.shortCommentWindowShow = false
    },
    AddLabel(labelItem){
      this.myLabel.map((item) => {
        if(item.name === labelItem.name){
          item.status = !item.status
        }
      })
      this.usedLabel.map((item) => {
        if(item.name === labelItem.name){
          item.status = !item.status
        }
      })
      const index = this.labelInput.indexOf(" "+ labelItem.name)
      if(index !== -1){
        this.labelInput = this.labelInput.replace(" "+ labelItem.name,"")
        return
      }
      this.labelInput = this.labelInput +" "+ labelItem.name
    }
  },
  computed:{
    myLabel(){
      return this.myLabelList.map((item) => {
        return {name:item,status:false}
      })
    },
    usedLabel(){
      return this.usedLabelList.map((item) => {
        return {name:item,status:false}
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
.movie-comment-window
  background #fff
  box-sizing border-box
  border: 8px solid transparent;
  border-color: rgba(0,0,0,0.5);
  border-radius 10px
  width 550px
  height 376px
  margin-left -225px
  margin-top -188px
  position fixed
  top 50%
  left 50%
  .window-header
    line-height 43px
    padding 0 18px
    height 43px
    background #ebf5ea
    color #007722
    .close
      float right
      cursor pointer
  .window-body
    position relative
    font-size 13px
    padding 15px 18px
    .window-checkbox-list
      height 30px
      .window-checkbox-item
        display inline-block
        margin-right 20px
        font-size 15px
      .score-input-wrapper
        display inline-block
        float right
        .score-input
          width 150px
          line-height 20px
          border 1px solid #9b9b9b
    .label-input
      margin-top 5px
      margin-bottom 15px
      width 265px
      height 23px
      border 1px solid #ccc
    .window-label
      display flex
      margin-bottom 10px
      width: 100%;
      color: #303133;
      .window-label-left
        flex 0 0 70px
        line-height: 20px;
        color: #303133;
      .window-label-list
        flex 1
        line-height: 20px;
        font-size: 14px;
        .window-label-item
          background #ebf5ea
          color #007722
          font-size 12px
          margin-right 10px
          padding 0 3px
          cursor pointer
          display inline-block
          &.isActive
            color #ccc
    .shortComment-input
      margin-top 4px
      width 500px
      height 38px
      border 1px solid #ccc
      margin-bottom 15px
    .only-me
      float right
  .window-footer
    position absolute
    bottom 0
    box-sizing border-box
    padding 0 18px
    font-size 13px
    width 100%
    height 43px
    line-height 43px
    background #E9EEF2
    .share
      display inline-block
      margin-right 15px
    .save
      margin-top 10px
      float right
      width 56px
      height 25px
      line-height 25px
      text-align center
      background #fff
      border 1px solid #ccc
      border-radius 2px
      cursor pointer
</style>
