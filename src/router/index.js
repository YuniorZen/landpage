import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import PageList from '@/pages/PageList'
import PageCreate from '@/pages/PageCreate'
import PageEditor from '@/pages/PageEditor'
import PagePreview from '@/pages/PagePreview'
import LandPage from '@/pages/LandPage'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      meta:{
        title:"登陆",
      },
      component: Login
    },
    {
      path: '/PageList',
      name: 'PageList',
      meta:{
        title:"落地页列表",
      },
      component: PageList
    },
    {
      path: '/',
      name: 'PageList',
      meta:{
        title:"落地页列表",
      },
      component: PageList
    },
    {
      path: '/PageCreate',
      name: 'PageCreate',
      meta:{
        title:"新建落地页",
      },
      component: PageCreate
    },
    {
      path: '/PageEditor',
      name: 'PageEditor',
      meta:{
        title:"编辑落地页",
      },
      component: PageEditor
    },
    {
      path: '/PagePreview',
      name: 'PagePreview',
      meta:{
        title:"落地页预览",
      },
      component: PagePreview
    },
    {
      path: '/LandPage',
      name: 'LandPage',
      component: LandPage
    }    
  ]
})
