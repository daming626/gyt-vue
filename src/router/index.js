import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/login/login"
import Main from "../components/main/Main"
import MainContent from "../components/main/MainContent";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      redirect:'/mainContent',
      component: Main,
      children: [
        {
          path: '/mainContent',
          name: 'MainContent',
          component: MainContent,
        }
      ]
    }
  ]
});
