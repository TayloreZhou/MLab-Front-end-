import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import layout from '../components/layout'
import register from '../components/register'
import joblist from '../components/joblist'
import canvas from '../components/canvas'
import trainlist from '../components/trainlist'
import predictlist from '../components/predictlist'
import community from '../components/community'
import postDetail from '../components/postDetail'
import article from '../components/article'
import uploader from '../components/uploader'
import uploaderBoot from '../components/upload_boot/uploaderBoot'
import testSideBar from '../components/testComponet/testSideBar'
import userDetail from '../components/upload_boot/userDetail'
import userInfo from '../components/userInfo'
import userPost from '../components/userPost'
import userDataset from '../components/userDataset'
import datasetCommunity from '../components/dataset_community/datasetCommunity'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: layout,
      children: [
        {
          path: '/dCommunity',
          name: 'dCommunity',
          component: datasetCommunity
        },
        {
          path: '/userDetail',
          name: 'userDetail',
          component: userDetail,
          children: [
            {
              path: '/userDetail/info',
              name: 'info',
              component: userInfo
            },
            {
              path: '/userDetail/posts',
              name: 'posts',
              component: userPost
            },
            {
              path: '/userDetail/dataset',
              name: 'dataset',
              component: userDataset
            },
            {
              path: '/userDetail/train',
              name: 'train',
              component: trainlist
            },
            {
              path: '/userDetail/predict',
              name: 'predict',
              component: predictlist
            }
          ]
        },
        {
          path: '/uploaderTest',
          name: 'uploaderTest',
          component: uploader
        },
        {
          path: '/uploaderTest1',
          name: 'uploaderTest1',
          component: uploaderBoot
        },
        {
          path: '/society',
          name: 'society',
          component: community
        },
        {
          path: '/society/detail',
          name: 'detail',
          component: postDetail
        },
        {
          path: '/society/write',
          name: 'write',
          component: article
        },
        {
          path: '/canvas',
          name: 'canvas',
          component: canvas
        },
        {
          path: '/joblist',
          name: 'joblist',
          component: joblist,
          children: [
            {
              path: '/joblist/train',
              name: 'trainlist',
              component: trainlist
            },
            {
              path: '/joblist/predict',
              name: 'predictlist',
              component: predictlist
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/ts',
      name: 'ts',
      component: testSideBar
    }
  ]
})
