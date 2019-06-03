import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Index from '@/views/index'
import Stores from '@/views/stores/index'
import Account from '@/views/account/account'
import AccountIndex from '@/views/account/index'
import AccountLogin from '@/views/account/login'
import AccountRegister from '@/views/account/register'
import AccountStarbucksRewards from '@/views/account/starbucksRewards'
import AccountActivity from '@/views/account/activity'
import AccountRewards from '@/views/account/rewards'
import AccountProfile from '@/views/account/profile/profile'
import AccountProfileIndex from '@/views/account/profile/index'
import AccountProfileSvc from '@/views/account/profile/svc'
import Menu from '@/views/menu/menu'
import MenuIndex from '@/views/menu/index'
import MenuBeverages from '@/views/menu/beverages'
import MenuFood from '@/views/menu/food'
import MenuCoffee from '@/views/menu/coffee'
import MenuMerchandise from '@/views/menu/merchandise'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
    	path: '/stores',
    	name: 'stores',
    	component: Stores
    },
    {
    	path: '/account',
    	component: Account,
      children: [
        {
          path: '',
          meta: { 
            requireAuth: true
          },
          component: AccountIndex
        },
        {
          path: 'login',
          name: 'login',
          component: AccountLogin
        },
        {
          path: 'register',
          name: 'register',
          component: AccountRegister
        },
        {
          path: 'starbucks-rewards',
          name: 'starbucks-rewards',
          component: AccountStarbucksRewards
        },
        {
          path: 'activity',
          meta: { 
            requireAuth: true
          },
          name: 'activity',
          component: AccountActivity
        },
        {
          path: 'rewards',
          meta: { 
            requireAuth: true
          },
          name: 'rewards',
          component: AccountRewards
        },
        {
          path: 'profile',
          meta: { 
            requireAuth: true
          },
          component: AccountProfile,
          children: [
            {
              path: '',
              component: AccountProfileIndex
            },
            {
              path: 'svc',
              name: 'svc',
              component: AccountProfileSvc
            }
          ]
        }
      ]
    },
    {
    	path: '/menu',
    	component: Menu,
      children: [
        {
          path: '',
          component: MenuIndex
        },
        {
          path: 'beverages',
          name: 'beverages',
          component: MenuBeverages
        },
        {
          path: 'food',
          name: 'food',
          component: MenuFood
        },
        {
          path: 'coffee',
          name: 'coffee',
          component: MenuCoffee
        },
        {
          path: 'merchandise',
          name: 'merchandise',
          component: MenuMerchandise
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    let UserID = getCookie('UserID');
    if (UserID) {
      next()
    }else {
      next({
        path: '/account/login',
        query: {redirect: to.fullPath}
      })
    }
  }else {
    next()
  }
})

function getCookie(cookieName) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split("; ");
  for(var i = 0; i < arrCookie.length; i++){
      var arr = arrCookie[i].split("=");
      if(cookieName == arr[0]){
          return arr[1];
      }
  }
  return "";
}

export default router
