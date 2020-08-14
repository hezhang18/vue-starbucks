import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import TokenTools from '@/utils/tokenTools'
import CookieTools from '@/utils/cookieTools'

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
import PrivatePVRecord from '@/views/private/pvrecord'

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
    },
    {
      path: '/pvrecord',
      name: 'pvrecord',
      component: PrivatePVRecord
    }
  ]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(res => res.meta.requireAuth)) {
    let loginState = false;
    let ReqToken = TokenTools.TokenSetting('sbux_token_cl');

		if(ReqToken){
      axios.post("users/checkLogin",{
        ReqToken: ReqToken
      }).then((res)=>{
        let data = res.data;
        if(data.status == '0'){
          loginState = true;
        }else{
          loginState = false;
        }
        CookieTools.DelCookie('sbux_token_cl');
      }).then(()=>{
        if (loginState) {
          next()
        }else {
          next({
            path: '/account/login',
            redirect: '/account',
            // query: {redirect: to.fullPath}
          })
        }
      })
    }
	}else {
		next()
	}
})

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

// 使用HttpOnly后，JS无法获取cookie，所以下面的方案弃用
// function getCookie(cookieName) {
//   var strCookie = document.cookie;
//   var arrCookie = strCookie.split("; ");
//   for(var i = 0; i < arrCookie.length; i++){
//       var arr = arrCookie[i].split("=");
//       if(cookieName == arr[0]){
//           return arr[1];
//       }
//   }
//   return "";
// }

export default router
