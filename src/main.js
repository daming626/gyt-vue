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

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

