import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/reset.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import "./assets/style/iconfont/iconfont.css"

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
