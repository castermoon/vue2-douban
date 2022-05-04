<template>
  <div class="pagination">
    <div class="prev" @click="prevPageClick" :class="{isActive:currentPage > 1}">< 前页</div>
    <ul class="page-list">
      <li class="page-list-item" v-for="(item,index) of pageList" @click="pageListClick(item)" :class="{isActive:(index+1) === currentPage}" :key="index">
        {{item}}
      </li>
    </ul>
    <div class="next" @click="nextPageClick" :class="{isActive:true}">后页></div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:{
    pageName:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      pageList:[1,2,3,4,5,6,7,8,9,'...'],
      currentPage:parseInt(this.$route.query.page)
    }
  },
  methods:{
    pageListClick(pagination){
      if(this.currentPage === pagination  || pagination === "..."){
        return
      }
      this.currentPage = pagination
      this.$router.push({
       name: this.pageName, query: { movie_id: this.$route.query.movie_id ,page:this.currentPage, commentType: this.$route.query.commentType}
      })
    },
    nextPageClick(){
      this.currentPage += 1
      this.$router.push({
        name: this.pageName, query: { movie_id: this.$route.query.movie_id ,page:this.currentPage, commentType: this.$route.query.commentType}
      })
    },
    prevPageClick(){
      if(this.currentPage <= 1){
        return
      }
      this.currentPage -= 1
      this.$router.push({
        name: this.pageName, query: { movie_id: this.$route.query.movie_id ,page:this.currentPage, commentType: this.$route.query.commentType}
      })
    }
  },
  watch: {
    currentPage(){
      if(this.currentPage <= 5){
        this.pageList = [1,2,3,4,5,6,7,8,9,'...']
      }else if(this.currentPage > 5 && this.currentPage <= 9 && this.pageList.length <= 15){
        let count = this.currentPage - 5
        this.pageList.pop()
        for(let i = 0;i < count;i++){
          this.pageList.push(this.pageList[this.pageList.length-1] + 1)
        }
        this.pageList.push('...')
      }else if(this.currentPage > 9 ){
        let start = this.currentPage - 4
        this.pageList = [1,2,'...']
        for(let j = 0;j < 9;j++){
          this.pageList.push(start)
          start = start + 1
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination
  margin 50px 0
  width 100%
  text-align center
  color #3377aa
  .prev,.next
    color #ccc
    display inline-block
    &.isActive
      color #3377aa
      cursor pointer
  .page-list
    padding 0 15px
    display inline-block
    vertical-align middle
    .page-list-item
      float left
      margin-right 8px
      cursor pointer
      padding 0 4px
      &.isActive
        color #ffffff
        background #83BF73

</style>
