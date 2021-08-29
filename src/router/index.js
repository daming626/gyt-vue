import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/login/login"
import Main from "../components/main/Main"
import Heal from "../components/information/Information";
import Project from "../components/project/Project";
import Feature from "../components/project/Feature";
import Table from "../components/component/Table";
import Information from "@/components/information/Information";

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
      // meta:{requireAuth:true},//需要登陆权限
      children: [
        {
          path: '/jqys',
          name: 'heal',
          component: Heal,
          meta:{requireAuth:true},
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
          name: 'project',
          component: Project
        },
        {
          path: '/gxts',
          name: 'feature',
          component: Feature
        },
        {
          path: '/xxwh',
          component:Information
        },
        {
          path: '/table',
          component:Table
        }
      ]
    }
  ]
});
