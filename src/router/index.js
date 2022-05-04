import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home/Home'
import Detail from "@/pages/detail/Detail";
import Celebrity from "@/pages/celebrity/Celebrity"
import ShortComments from "@/pages/shortComments/ShortComments";
import Photo from "@/pages/photo/Photo";
import Login from "@/pages/login/Login";
import Personal from "@/pages/personal/Personal";
import LongComments from "@/pages/longComments/LongComments";
import LongCommentDetail from "@/pages/longCommentDetail/LongCommentDetail";
import Notice from "@/pages/notice/Notice";
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },{
  //   path: '/detail/:id',
  //   name: 'Detail',
  //   component: Detail
  // },{
  //   path: '/celebrity/:id',
  //   name: 'Celebrity',
  //   component: Celebrity
  // },{
  //   path: '/shortComments/:id/:page',
  //   name: 'ShortComments',
  //   component:ShortComments
  // },{
  //   path: '/photo',
  //   name: 'Photo',
  //   component:Photo
  // },{
  //   path: '/login',
  //   name: 'Login',
  //   component:Login
  // },{
  //   path: '/personal/:id',
  //   name: 'Personal',
  //   component:Personal
  // },{
  //   path: '/longComments/:id/:page',
  //   name: 'LongComments',
  //   component:LongComments
  // },{
  //   path: '/longCommentDetail/:id/:scrollTop',
  //   name: 'LongCommentDetail',
  //   component:LongCommentDetail
  // },{
  //   path: '/notice/:id',
  //   name: 'Notice',
  //   component:Notice
  // },
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['@/pages/home/Home'],resolve)
  },{
    path: '/detail',
    name: 'Detail',
    component: resolve => require(['@/pages/detail/Detail'],resolve)
  },{
    path: '/celebrity',
    name: 'Celebrity',
    component: resolve => require(['@/pages/celebrity/Celebrity'],resolve)
  },{
    path: '/shortComments',
    name: 'ShortComments',
    component: resolve => require(['@/pages/shortComments/ShortComments'],resolve)
  },{
    path: '/photo',
    name: 'Photo',
    component: resolve => require(['@/pages/photo/Photo'],resolve)
  },{
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/pages/login/Login'],resolve)
  },{
    path: '/personal',
    name: 'Personal',
    component: resolve => require(['@/pages/personal/Personal'],resolve)
  },{
    path: '/longComments',
    name: 'LongComments',
    component: resolve => require(['@/pages/longComments/LongComments'],resolve)
  },{
    path: '/longCommentDetail',
    name: 'LongCommentDetail',
    component: resolve => require(['@/pages/longCommentDetail/LongCommentDetail'],resolve)
  },{
    path: '/notice',
    name: 'Notice',
    component: resolve => require(['@/pages/notice/Notice'],resolve)
  },{
    path: '/writeLongComment',
    name: 'WriteLongComment',
    component: resolve => require(['@/pages/writeLongComment/WriteLongComment'],resolve)
  },{
    path: '/subjectSearch',
    name: 'SubjectSearch',
    component: resolve => require(['@/pages/subjectSearch/SubjectSearch'],resolve)
  },

]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) { // 每次进入一个新页面时都在顶部
    return {x: 0, y: 0}
  }
})

export default router
