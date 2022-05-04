<template>
  <div class="rating-container">
    <div class="item" v-for="(item, index) of StarLength" :key="index">
      <div class="label">{{ (-5 + index) * -1 }}星</div>
      <div class="line" :style="{width:item}"></div>
      <div class="percent" v-if="ratingPercent[index] !=0">{{ (ratingPercent[index] * 50).toFixed(1) + "%"}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RatingPercent",
  props:{
    commentScoreObj:{
      type: Object,
      default(){
        return{
          "2": "0",
          "4": "0",
          "6": "0",
          "8": "0",
          "10": "0"
        }
      }
    }
  },
  computed:{
    StarLength(){
      let fiveStarLen = Math.floor(this.commentScoreObj["10"] * 88  ) / 2 + 'px'
      let fourStarLen = Math.floor(this.commentScoreObj["8"] * 88 ) / 2 + 'px'
      let threeStarLen = Math.floor(this.commentScoreObj["6"] * 88 ) / 2 + 'px'
      let twoStarLen = Math.floor(this.commentScoreObj["4"] * 88 ) / 2 + 'px'
      let oneStarLen = Math.floor(this.commentScoreObj["2"] * 88 ) / 2 + 'px'
      return [fiveStarLen,fourStarLen,threeStarLen,twoStarLen,oneStarLen]
    },
    ratingPercent(){
      return[this.commentScoreObj["10"],this.commentScoreObj["8"],this.commentScoreObj["6"],this.commentScoreObj["4"],this.commentScoreObj["2"]]
    }
  }
}
</script>

<style lang="stylus" scoped>
.rating-container
  .item
    width 170px
    height 10px
    margin-bottom 8px
    .label
      float left
      width 30px
      font-size 12px
    .line
      width 88px
      height 10px
      float left
      background #ffd596
      margin-right 5px
    .percent
      font-size 12px
      float left
</style>
