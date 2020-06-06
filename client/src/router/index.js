import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Base from '@/components/Base'
import Listing from '@/components/Listing'
import ListingPosts from '@/components/ListingPosts'
import ListingDetail from '@/components/ListingDetail'
import NewPost from '@/components/NewListing'
import store from '../store/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  duplicateNavigationPolicy: 'ignore',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/add',
      component: Base,
      children: [
        {
          path: 'new',
          name: 'new',
          component: NewPost,
          beforeEnter: authGuard
        },
        {
          path: ':id',
          name: 'edit',
          component: NewPost,
          beforeEnter: authGuard
        },
        {
          path: '',
          name: 'add',
          component: Root,
          beforeEnter: authGuard
        }
      ]
    },
    {
      path: '/browse',
      component: Base,
      children: [
        {
          path: '',
          name: 'browse',
          component: Root
        },
        {
          path: 'category',
          component: Listing,
          children: [
            {
              path: '',
              component: ListingPosts
            }
          ]
        },
        {
          path: 'category/:id',
          component: Listing,
          children: [
            {
              path: '',
              component: ListingPosts
            }
          ]
        },
        {
          path: 'listing/:id',
          component: Listing,
          children: [
            {
              path: '',
              component: ListingDetail
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: 'browse'
    }
  ]
})

function authGuard (to, from, next) {
  var isAuthenticated = store.state.isUserLoggedIn

  if (isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
