<template>
  <div class="header">
    <div class="nav">
      <div class="img-wrapper">
        <router-link to="/">
          <img src="https://img3.doubanio.com/f/accounts/4fd84763a74089b20eb02ba0225d6e7739d2c432/passport/pics/douban_logo@2x.png" width="142"/>
        </router-link>
      </div>
      <ul class="nav-list">
        <li class="nav-item"><a href="/home">首页</a></li>
        <li class="nav-item"><a href="#">我的豆瓣</a></li>
        <li class="nav-item"><a href="#">浏览发现</a></li>
        <li class="nav-item"><a href="#">话题广场</a></li>
      </ul>
      <div class="search">
        <input class="search-input" placeholder="搜索你感兴趣的内容或人"/>
        <button class="search-button">搜</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalHeader"
}
</script>

<style lang="stylus" scoped>
.header
  background  #edf4ed
  height 74px
  min-width 1078px
  .nav
    width: 1040px;
    margin: 0 auto;
    overflow: hidden;
    padding: 22px 0 20px;
    .img-wrapper
      display inline-block
    .nav-list
      margin-left 50px
      vertical-align bottom
      display inline-block
      .nav-item
        font-size 17px
        display inline-block
        margin-right 30px
        a
          color #007722
    .search
      margin-left 200px
      height 28px
      display inline-block
      color #eee
      vertical-align bottom
      position relative
      .search-input
        width 280px
        line-height 28px
      .search-button
        background #fff
        cursor pointer
        right 0
        top 0
        position absolute
        width 30px
        height 28px
</style>
