import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/login/login"
import Main from "../components/main/Main"
import Heal from "../components/heal/Heal";

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
      component: Main,
      children: [
        {
          path: '/jqys',
          name: 'heal',
          component: Heal
        },
        {
          path: '/zwbj',
        },
        {
          path: '/yssl',
        },
        {
          path: '/zycs',
        },
        {
          path: '/zywh',
        },
        {
          path: '/etjk',
        },
        {
          path: '/hygl',
        },
        {
          path: '/fwtd',
        },
        {
          path: '/kzxm',
        },
        {
          path: '/gxts',
        },
        {
          path: '/xxwh',
        }
      ]
    }
  ]
});
