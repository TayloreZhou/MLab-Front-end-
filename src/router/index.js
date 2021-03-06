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
import modelList from '../components/modelList'
import userDetail from '../components/upload_boot/userDetail'
import userInfo from '../components/userInfo'
import userPost from '../components/userPost'
import userDataset from '../components/userDataset'
import datasetCommunity from '../components/dataset_community/datasetCommunity'
import datasetDetail from '../components/dataset_community/datasetDetail'
import pipeline from '../components/pipeline'
import trainingJobs from '../components/trainingJobs'
import model from '../components/model'
import predictJobs from '../components/predictJobs'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      component: layout,
      children: [
        {
          path: '/dCommunity/detail',
          name: 'datasetDetail',
          component: datasetDetail
        },
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
          path: '/modellist',
          name: 'modelList',
          component: modelList,
          children: [
            {
              path: '/modellist/pipeline',
              name: 'pipeline',
              component: pipeline
            },
            {
              path: '/modellist/train',
              name: 'train',
              component: trainingJobs
            },
            {
              path: '/modellist/model',
              name: 'model',
              component: model
            },
            {
              path: '/modellist/predict',
              name: 'predict',
              component: predictJobs
            }
          ]
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    if (to.name === 'login' || to.name === 'register') {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    if (to.name === 'login' || to.name === 'register') {
      next({
        name: '/'
      })
    } else {
      next()
    }
  }
})

export default router
