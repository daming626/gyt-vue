import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '@/icons' // icon
import {store} from './store'

Vue.prototype.axios=axios;
Vue.use(ElementUI);

// router.beforeEach((to,from,next)=>{
//   if (to.meta.requireAuth){//判断此路由是否需要登陆权限
//     // console.log("有此路径")
//     if (store.state.username){//通过vuex state判断token是否存在
//       console.log(store.state.username)
//       // console.log("有token")
//       next()
//     }else{
//       // console.log("无token")
//       next({
//         path:'/'
//       })
//     }
//   }else {
//     // console.log("无此路径")
//     next();
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

