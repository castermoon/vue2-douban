<template>
  <p v-if="typeof content === 'object'">
    <span class="label">{{ label }}:</span>
    <router-link
        class="link-name"
        :to="{path:pathName,query:{celebrity_id:item.id}}"
        v-for="item of content"
        :key="item.id"
    >{{item.name}}
    </router-link>
  </p>
  <p v-else><span class="label">{{ label }}:</span>{{ content }}</p>
</template>

<script>
export default {
  name: "CommonLabel",
  props:{
    label:{
      type:String,
      default:""
    },
    content:{
      type:[Array, String, Number],
      default:""
    },
    pathName:{
      type:String,
      default:""
    }
  }
}
</script>

<style lang="stylus" scoped>
  .label
    margin-right 8px
  .link-name:after
    content ' / '
  .link-name:last-child:after
    content ""
</style>
